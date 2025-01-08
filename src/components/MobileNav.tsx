import React from "react";
import ModeToggle from "./ModeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { BellIcon, HomeIcon, MenuIcon, User } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";

const MobileNav = async () => {
  const user = await currentUser();

  // Conditional rendering based on user authentication
  return (
    <div className="flex md:hidden items-center space-x-2">
      <ModeToggle />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <MenuIcon className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-7 z-50">
            {/* Home Button */}
            <Button
              variant="ghost"
              asChild
              className="flex justify-start items-center space-x-0"
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </Button>
            {user ? (
              <>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  asChild
                  className="flex justify-start items-center space-x-0"
                >
                  <Link href="/">
                    <BellIcon className="w-4 h-4" />
                    <span>Notification</span>
                  </Link>
                </Button>
                {/* Profile */}
                <Button
                  variant="ghost"
                  asChild
                  className="flex justify-start items-center space-x-0"
                >
                  <Link href="/">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </Button>
                <UserButton />
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
