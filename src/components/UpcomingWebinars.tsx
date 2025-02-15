'use client'
import Link from "next/link"
import { HoverEffect } from "./ui/card-hover-effect";

function Featured() {

  const featuredWebinars = [
    {
      title: 'Chat with Tutor',
      description:
        'Get personalized guidance from a real tutor to enhance your learning.',
      link: '/chat-tutor',
    },
    {
      title: 'Chat with AI',
      description:
        'Instantly chat with an AI mentor for quick financial insights and advice.',
      link: '/chat-ai',
    },
  ];

  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED OPTIONS</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Choose Your Mentor</p>
        </div>

        <div className="mt-10 content-center">
          <HoverEffect items={featuredWebinars} />
        </div>
      </div>
    </div>
  );
}

export default Featured;
