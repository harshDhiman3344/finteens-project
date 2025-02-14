"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50")}>
      <div className="flex items-center justify-between w-full px-6 py-3 bg-gray-900 rounded-lg">
        {/* Left Side - Logo or Name */}
        <Link href="/">
          <h1 className="text-white text-lg font-bold cursor-pointer">FinTeens</h1>
        </Link>

        {/* Center Menu */}
        <Menu setActive={setActive} className="flex space-x-6">
          <Link href={"/"}>
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>

          <MenuItem setActive={setActive} active={active} item="Our Courses">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/courses">All Courses</HoveredLink>
              <HoveredLink href="/courses">Basic</HoveredLink>
              <HoveredLink href="/courses">Advanced</HoveredLink>
              <HoveredLink href="/courses">Noble</HoveredLink>
              <HoveredLink href="/courses">Master</HoveredLink>
            </div>
          </MenuItem>

          <Link href={"/contact"}>
            <MenuItem setActive={setActive} active={active} item="Contact Us" />
          </Link>
        </Menu>

        {/* Right Side - Sign In / User Button */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-lg text-white bg-[#001F3F] hover:bg-[#001530] transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
