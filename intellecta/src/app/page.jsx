/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YHFjIqpXylv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function Component() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[auto_1fr] overflow-hidden">
      <div className="border-b lg:border-r bg-[#6D28D9] p-6 lg:p-8 text-white relative">
        <div className="flex h-[60px] items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <LayoutGridIcon className="h-6 w-6" />
            <span>Greetings, Della!</span>
          </div>
          <Button className="rounded-full lg:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
        <div className="flex-1 transition-all duration-300 ">
          <nav className="grid items-start gap-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <CalendarIcon className="h-4 w-4" />
              Events
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <TextIcon className="h-4 w-4" />
              Forums
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <UsersIcon className="h-4 w-4" />
              Mentors
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <UsersIcon className="h-4 w-4" />
              Groups
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-[#7C3AED]"
              href="#"
            >
              <BookOpenIcon className="h-4 w-4" />
              Resources
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-[#F0F0F0] px-4 md:px-6 dark:bg-gray-800/40">
          <Button className="rounded-full lg:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-[#D6BCFA]">
              <CardHeader>
                <CardTitle>Today's Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>time</p>
                    <p>event name</p>
                    <p>event details</p>
                  </div>
                  <div className="flex justify-between">
                    <p>time</p>
                    <p>event name</p>
                    <p>event details</p>
                  </div>
                  <div className="flex justify-between">
                    <p>time</p>
                    <p>event name</p>
                    <p>event details</p>
                  </div>
                  <div className="flex justify-between">
                    <p>time</p>
                    <p>event name</p>
                    <p>event details</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#D6BCFA]">
              <CardHeader>
                <CardTitle>Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Topic 1</p>
                  <p>Topic details</p>
                  <p>Topic 1</p>
                  <p>Topic details</p>
                  <p>Topic 1</p>
                  <p>Topic details</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#D6BCFA]">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar className="border-none bg-[#D6BCFA] text-black" />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-[#D6BCFA]">
              <CardHeader>
                <CardTitle>Meet the mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" />
                    <div>
                      <p>mentor name</p>
                      <p>mentor details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" />
                    <div>
                      <p>mentor name</p>
                      <p>mentor details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" />
                    <div>
                      <p>mentor name</p>
                      <p>mentor details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" />
                    <div>
                      <p>mentor name</p>
                      <p>mentor details</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#D6BCFA]">
              <CardHeader>
                <CardTitle>Interested Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Group 1</p>
                    <p>group details</p>
                    <p>group mentors</p>
                  </div>
                  <div>
                    <p className="font-semibold">Group 2</p>
                    <p>group details</p>
                    <p>group mentors</p>
                  </div>
                  <div>
                    <p className="font-semibold">Group 3</p>
                    <p>group details</p>
                    <p>group mentors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#D6BCFA]">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Course</p>
                    <p>module name</p>
                    <p>note details</p>
                    <Link className="text-blue-300" href="#">
                      Registration link
                    </Link>
                  </div>
                  <div>
                    <p className="font-semibold">Course</p>
                    <p>module name</p>
                    <p>note details</p>
                    <Link className="text-blue-300" href="#">
                      Registration link
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}


function UserCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}