"use client";

import '../styles/globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import MyThemeProvider from "@/components/theme-provider"
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-gray-50`}>
        <MyThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
        >
          <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-blue-600 text-white p-4 shadow-md">
              <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-white">LvlUp</span>
                    <div className="bg-white/20 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                      Resume
                    </div>
                  </div>
                </div>
                <div className="space-x-4">
                  <Link 
                    href="/create-resume" 
                    className="text-white/90 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Create Resume
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="text-white/90 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Pricing
                  </Link>
                </div>
              </nav>
            </header>
            <main className="flex-grow container mx-auto p-4">
              {children}
            </main>
            <footer className="bg-blue-600 text-white p-4 shadow-md">
              <div className="container mx-auto flex flex-col items-center gap-2">
                <div className="text-white/90">
                  © 2023 ResumeBuilder. All rights reserved.
                </div>
                <div className="text-white/80 text-sm font-medium">
                  Made with ❤️ by Bhumi
                </div>
              </div>
            </footer>
          </div>
        </MyThemeProvider>
      </body>
    </html>
  )
}
