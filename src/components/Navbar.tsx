import Link from "next/link";
import React from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

const Navbar = async () => {
  const user = await currentUser();
  if (user) await syncUser();
  return (
    <nav className="w-full sticky top-0 z-50 bg-background/95  border-b border-green-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              Socially
            </Link>
          </div>
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
