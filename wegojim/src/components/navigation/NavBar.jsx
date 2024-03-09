import { Button, buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/authStore";


const NavBar = ({user}) => {  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link to="/">
          <h1 className="ml-5 mb-7 font-extrabold text-5xl text-white">
            We Go Jim!
          </h1>
        </Link>
        {user ? (
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "absolute right-4 top-4 md:right-8 md:top-8"
              )}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;

function handleLogout(){
  useAuthStore.getState().clearUser();
  localStorage.removeItem('userData');
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
