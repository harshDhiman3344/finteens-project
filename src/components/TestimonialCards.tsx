'use client'
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const ourTestimonials = [
    {
      quote:
        'Learning about money has never been this fun! 🚀 The interactive challenges keep me engaged, and I actually enjoy budgeting now. I feel way more confident about managing my allowance and saving up!',
      name: 'Alex',
      title: '15',
    },
    {
      quote:
        "FinTeens makes financial literacy so easy to understand. The AI coach gives me personalized tips, and I love the rewards system. I even started investing with my first $50!",
      name: 'Samantha',
      title: '16',
    },
    {
      quote:
        "I used to think finance was boring, but FinTeens turned it into a game! The real-world challenges make saving and budgeting feel like a mission I actually want to complete.",
      name: 'Jordan',
      title: '16',
    },
    {
      quote:
        'This app is a game-changer! I learned how to start my own small business, and now I make money selling custom stickers online. Thanks, FinTeens!',
      name: 'Esha',
      title: '19',
    },
    {
      quote:
        'I never understood how credit works until FinTeens explained it in such a simple way. Now, I know how to build a good credit score before I even get my first card!',
      name: 'Abhinav',
      title: '18',
    },
  ];

function FinSchoolTestimonials() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Real Teens. Real Wins. Real Money Skills.</h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={ourTestimonials}
                direction="right"
                speed="slow"
      />
            </div>
        </div>
    </div>
  )
}

export default FinSchoolTestimonials