"use client";

import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FaFire } from "react-icons/fa"; // Fire icon
import { getDoc, doc } from "firebase/firestore"; // Firestore functions
import { db } from '../../firebase-config'; // Import Firestore instance (already initialized)

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(5); // Hardcoded streak
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);

  const userId = 'hardcodedUserId'; // Simulated user ID
  const hardcodedStreak = 5; // Simulated streak

  // Use the already initialized `db` instance from firebase-config.ts
  // No need to call `getFirestore()` here

  // Helper function for conditional class names (equivalent to 'cn')
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
  };

  useEffect(() => {
    setStreak(hardcodedStreak); // Set hardcoded streak
  }, []);

  const handleIconClick = async () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const questionRef = doc(db, 'questions', today); // Get the daily question
    const questionSnap = await getDoc(questionRef);

    if (questionSnap.exists()) {
      setQuestion(questionSnap.data().question); // Set the question
      setIsModalOpen(true); // Open the modal
    }
  };


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


        {/* FIRE STREAK */}
        <div className="flex items-center space-x-2 cursor-pointer absolute right-[150px] top-1/2 transform -translate-y-1/2 max-w-screen-lg" onClick={handleIconClick}>
        <FaFire size={24} className="text-orange-500" />
        <span className="text-white font-semibold">{streak}</span>
      </div>

        {/* Modal */}
        {isModalOpen && question && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Today&apos;s Question</h2>
            <p className="text-black">{question}</p>
            <button
              className="mt-4 px-4 py-2 bg-teal-500 text-black rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}



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
