import React from "react";
import ModeToggle from "./ModeToggle";
import { BellIcon, HomeIcon, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";

const DesktopNav = async () => {
  const user = await currentUser();
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" asChild className="flex items-center space-x-1">
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="">Home</span>
        </Link>
      </Button>
      {user ? (
        <>
          <Button
            variant="ghost"
            asChild
            className="flex items-center space-x-1"
          >
            <Link href="/">
              <BellIcon className="w-4 h-4" />
              <span className="">Notification</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="flex items-center space-x-1"
          >
            <Link href="/">
              <User className="w-4 h-4" />
              <span className="">Profile</span>
            </Link>
          </Button>
          <UserButton/>
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="outline">Dang nhap</Button>
        </SignInButton>
      )}
      <ModeToggle />
    </div>
  );
};

export default DesktopNav;
