import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    getDoc,
    addDoc,
    doc,
    updateDoc,
    or,
    and,
    FieldPath
} from 'firebase/firestore/lite';

const app = express();

// Middleware
app.use(bodyParser.json());

const firebaseConfig = {
    apiKey: "AIzaSyBIXjCazFjCaHH-jyONjHH66vX1tSFjf5U",
    authDomain: "intellecta-e4131.firebaseapp.com",
    projectId: "intellecta-e4131",
    storageBucket: "intellecta-e4131.appspot.com",
    messagingSenderId: "1014338758665",
    appId: "1:1014338758665:web:a95be90e839e525c2070d8",
    measurementId: "G-BY9KJDKFDZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

// Models
class User {
    constructor(email, password, dob, is_admin = false, id = null) {
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.is_admin = is_admin;
        this.id = id;
    }
    toString() {
        return this.email + ', ' + this.password + ', ' + this.dob;
    }
}

// Firestore data converter
const userConvertor = {
    toFirestore: (user) => {
        return {
            email: user.email,
            password: user.password,
            dob: user.dob,
            is_admin: user.is_admin || false
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.email, data.password, data.dob, data.is_admin, snapshot.id);
    }
};

const Users = collection(db, "users").withConverter(userConvertor)

class Profile {
    constructor(academic_preference, interest, userid, id = null) {
        this.academic_preference = academic_preference.split(',');
        this.interest = interest.split(',');
        this.userid = userid;
        this.id = id;
    }
    toString() {
        return this.academic_preference + ',' + this.interest;
    }
};

const profileConvertor = {
    toFirestore: (profile) => {
        return {
            academic_preference: profile.academic_preference,
            interest: profile.interest,
            userid: profile.userid,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Profile(data.academic_preference.join(','), data.interest.join(','), data.userid, snapshot.id);
    }
}

const Profiles = collection(db, 'profiles').withConverter(profileConvertor)

class Event {
    constructor(name, type, datetime, college_id = null, college = null, id = null) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.datetime = datetime;
        this.college_id = college_id;
        if (college) {
            this.college = college;
        }
    }
    toString() {
        return this.name + ', ' + this.type + ', ' + this.datetime;
    }
}

const eventConvertor = {
    toFirestore: (event) => {
        return {
            name: event.name,
            type: event.type,
            datetime: event.datetime,
            college_id: event.college_id,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Event(data.name, data.type, data.datetime, data.college_id, null, snapshot.id);
    }
};

const Events = collection(db, "events").withConverter(eventConvertor)

class College {
    constructor(name, created_at = null, updated_at = null, delete_at = null, id = null) {
        this.name = name
        this.created_at = created_at
        this.updated_at = created_at
        this.delete_at = delete_at
        this.id = id
    }
    toString() {
        return this.name
    }
}

const collegeConvertor = {
    toFirestore: (college) => {
        return {
            name: college.name,
            created_at: college.created_at,
            updated_at: college.updated_at,
            delete_at: college.delete_at,
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new College(data.name, data.created_at, data.updated_at, data.delete_at, snapshot.id)
    }
}

const Colleges = collection(db, "colleges").withConverter(collegeConvertor)

app.post('/register', async (req, res) => {
    try {
        const { password, email, dob } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the email already exists
        const q = query(Users, where('email', '==', email))
        const usersRef = await getDocs(q)
        if (!usersRef.empty) {
            return res.status(400).send("Email already exists");
        }

        // Add user to Firestore
        await addDoc(Users, new User(email, hashedPassword, dob))
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
});

app.post('/admin', verifyToken, adminUser, async (req, res) => {
    try {
        const { email } = req.body;

        const q = query(Users, where('email', '==', email))
        const usersRef = await getDocs(q)
        if (usersRef.empty) {
            return res.status(404).send("User not found");
        }
        const userDoc = usersRef.docs[0];
        await updateDoc(doc(db, "users", userDoc.id), {
            is_admin: true
        });
        res.status(200).send("User updated.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error making admin");
    }
});

app.post('/profile', verifyToken, async (req, res) => {
    try {
        const { academic_preference, interest } = req.body;

        await addDoc(Profiles, new Profile(academic_preference, interest, req.userId))
        res.status(201).send('profile created successfully.')
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating profile");
    }

});

app.get('/profile/similar', verifyToken, async (req, res) => {
    try {
        const profiles = []
        const q = query(Profiles, where('userid', '==', req.userId));
        const profileRef = await getDocs(q)
        if (profileRef.empty) {
            return res.status(400).send('User profile not found');
        }
        const userProfileDoc = profileRef.docs[0];
        const userProfile = userProfileDoc.data();

        const profilesQuery = query(Profiles, and(
            where('userid', '!=', req.userId),
            or(
                where('academic_preference', 'array-contains-any', userProfile.academic_preference),
                where('interest', 'array-contains-any', userProfile.interest)
            )
        ));
        const profilesRef = await getDocs(profilesQuery)
        if (profilesRef.empty) {
            return res.status(404).send('No similar profiles found')
        }

        const userIds = []
        profileRef.forEach(async (profileDoc) => {
            const profileData = profileDoc.data()
            userIds.push(profileData.userid);
        });
        const userQuery = query(Users, where('__name__', 'in', userIds))
        const usersRef = await getDocs(userQuery)
        usersRef.forEach((userDoc) => {
            profiles.push(userDoc.data())
        })

        res.status(200).send(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while fetching profiles")
    }

});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve user from Firestore
        const q = query(Users, where('email', '==', email))
        const usersRef = await getDocs(q)
        if (usersRef.empty) {
            return res.status(404).send("User not found");
        }
        const userDoc = usersRef.docs[0];
        const user = userDoc.data();

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid password");
        }

        // Generate JWT token
        const token = jwt.sign({ id: userDoc.id }, 'secretkey');
        res.status(200).send({ token: token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error logging in");
    }
});

// Middleware for authentication
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send("Token not provided");
    }
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid token");
        }
        req.userId = decoded.id;
        next();
    });
}

async function adminUser(req, res, next) {
    const user = (await getDoc(doc(db, "users", req.userId))).data()
    if (!user.is_admin) {
        return res.status(401).send("You are not authorized for this action.")
    }
    req.is_admin = true
    next();
}

app.post('/colleges', verifyToken, adminUser, async (req, res) => {
    try {
        const { name } = req.body;

        await addDoc(Colleges, new College(name, Date.now(), Date.now()))
        res.status(201).send('College created successfully.')
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating college.")
    }
});

app.get('/colleges', verifyToken, async (req, res) => {
    try {
        const colleges = [];
        const q = query(Colleges)

        const collegesSnapShot = await getDocs(q)
        collegesSnapShot.forEach((doc) => {
            colleges.push(doc.data());
        })
        res.status(200).json(colleges);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching colleges");
    }
});

app.post('/events', verifyToken, adminUser, async (req, res) => {
    try {
        const { name, type, datetime, college_id } = req.body;

        await addDoc(Events, new Event(name, type, datetime, college_id))
        res.status(201).send("Event created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating event");
    }
});

app.get('/events', verifyToken, async (req, res) => {
    try {
        const events = [];
        const q = query(Events)

        const eventsSnapShot = await getDocs(q)
        eventsSnapShot.forEach(async (eventDoc) => {
            // const event = eventDoc.data()
            // var college = null
            // if (event.college_id) {
            //     college = (await getDoc(doc(db, "colleges", event.college_id))).data()
            // }
            // const newEvent = new Event(event.name, event.type, event.datetime, event.college_id, college, eventDoc.id);
            // events.push(newEvent);
            events.push(eventDoc.data());
        })
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching events");
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
