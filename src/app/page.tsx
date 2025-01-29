"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[2800px] h-[2800px] rounded-full bg-gradient-dali animate-gradient-dali bg-[length:180%_180%]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-white text-8xl font-bold mb-8 tracking-wider dosis-font">
          DALI Link
        </h1>
        <h2 className="text-white text-2xl mb-6">
          Get to know the members of DALI Lab!
        </h2>
        <Button 
          variant="outline" 
          size="lg"
          className="text-black border-white bg-white hover:text-dali transition-colors duration-300 text-lg px-8 py-6"
          onClick={() => window.location.href = '/profile'}
        >
          Get Started
        </Button>
      </div>

      <div className="absolute bottom-4 w-full text-center">
        <p className="text-white text-sm">
          Created by {" "}
          <Link 
            href="https://albertastrom.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 hover:bg-white rounded-md transition-all duration-300 cursor-pointer z-20 relative"
          >
            Albert Astrom
          </Link>
          {" "}for DALI Lab
        </p>
      </div>
    </div>
  )
}