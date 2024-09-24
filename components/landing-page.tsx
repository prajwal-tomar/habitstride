'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Bell, BarChart, Footprints } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isNavSticky, setIsNavSticky] = useState(false);

  const testimonials = [
    {
      quote: "HabitStride has completely transformed my daily routine. The AI insights are like having a personal coach!",
      author: "Sarah K."
    },
    {
      quote: "I love how encouraging the app is. Even on days when I struggle, it keeps me motivated to continue.",
      author: "Michael R."
    },
    {
      quote: "The habit grid is so satisfying to fill out. It&apos;s become a game to keep my streak going!",
      author: "Emily T."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F4F8] to-[#E1E8ED] text-gray-800">
      {/* Header */}
      <header className={`bg-white py-4 px-6 shadow-md transition-all duration-300 ${isNavSticky ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Footprints className="h-8 w-8 text-[#4CAF50]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">
              HabitStride
            </span>
          </Link>
          <nav>
            <ul className="flex space-x-8">
              <li><Link href="#features" className="text-gray-700 hover:text-[#4CAF50] transition duration-300">Features</Link></li>
              <li><Link href="#how-it-works" className="text-gray-700 hover:text-[#4CAF50] transition duration-300">How It Works</Link></li>
              <li><Link href="#testimonials" className="text-gray-700 hover:text-[#4CAF50] transition duration-300">Testimonials</Link></li>
              <li><Link href="#pricing" className="text-gray-700 hover:text-[#4CAF50] transition duration-300">Pricing</Link></li>
            </ul>
          </nav>
          <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-24 text-center bg-gradient-to-r from-[#E1E8ED] to-[#F0F4F8]">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Transform Your Habits with <span className="bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">AI-Powered Guidance</span>
        </h1>
        <p className="mb-8 text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Say goodbye to procrastination. Achieve consistency with personalized reminders and AI insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/sign-up">
            <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
              Get Started Now
            </Button>
          </Link>
          <Button className="bg-white text-[#4CAF50] hover:bg-[#E8F5E9] px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
            Learn More
          </Button>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">How HabitStride Works</h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="p-4 border rounded-xl shadow-md text-center transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <CheckCircle className="mx-auto mb-6 h-24 w-24 text-[#4CAF50]" />
              <h3 className="mb-4 text-2xl font-semibold">Create Achievable Goals</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Define your habits and let our AI guide you towards success</p>
            </div>
            <div className="p-4 border rounded-xl shadow-md text-center transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <Bell className="mx-auto mb-6 h-24 w-24 text-[#2196F3]" />
              <h3 className="mb-4 text-2xl font-semibold">Get Personalized Reminders</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Stay on track with smart notifications tailored to your routine</p>
            </div>
            <div className="p-4 border rounded-xl shadow-md text-center transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <BarChart className="mx-auto mb-6 h-24 w-24 text-[#FF9800]" />
              <h3 className="mb-4 text-2xl font-semibold">Visualize Your Growth Daily</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Watch your progress unfold with our intuitive habit grid and analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="mb-6 text-4xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">Harness the Power of AI to Build Better Habits</h2>
            <p className="mb-8 text-xl text-gray-700 leading-relaxed">
              HabitStride&apos;s advanced AI provides personalized insights, helping you understand your habits better and stay motivated throughout your journey.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <CheckCircle className="mr-4 h-6 w-6 text-[#4CAF50]" />
                <span>Tailored habit suggestions based on your goals and lifestyle</span>
              </li>
              <li className="flex items-center text-lg">
                <CheckCircle className="mr-4 h-6 w-6 text-[#4CAF50]" />
                <span>Adaptive goal setting that evolves with your progress</span>
              </li>
              <li className="flex items-center text-lg">
                <CheckCircle className="mr-4 h-6 w-6 text-[#4CAF50]" />
                <span>In-depth behavior pattern analysis for continuous improvement</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg bg-white p-8 shadow-xl transform transition duration-500 hover:scale-105">
              <div className="mb-6 grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-10 w-10 rounded-sm ${
                      i % 7 === 0 ? 'bg-[#FFCDD2]' :
                      i % 7 === 1 ? 'bg-[#FFF9C4]' :
                      i % 7 === 2 ? 'bg-[#C8E6C9]' :
                      i % 7 === 3 ? 'bg-[#BBDEFB]' :
                      i % 7 === 4 ? 'bg-[#D1C4E9]' :
                      i % 7 === 5 ? 'bg-[#FFCCBC]' :
                      'bg-[#B2DFDB]'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-center text-lg text-gray-600">Your Habit Grid: Watch your progress bloom day by day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">What Our Users Say</h2>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg bg-white p-8 shadow-xl">
              <p className="mb-6 text-gray-700 text-xl italic leading-relaxed">&quot;{testimonials[currentTestimonial].quote}&quot;</p>
              <p className="font-semibold text-right text-lg">- {testimonials[currentTestimonial].author}</p>
            </div>
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`mx-2 h-4 w-4 rounded-full transition duration-300 ${
                    index === currentTestimonial ? 'bg-[#4CAF50] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="mb-8 text-4xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">Ready to Transform Your Habits?</h2>
        <p className="mb-12 text-xl text-gray-700 max-w-2xl mx-auto">
          Join 1,000+ users who&apos;ve already transformed their habits with HabitStride
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md rounded-full px-6 py-3 text-lg"
          />
          <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
            Start Your Free Trial
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          No credit card required. Get your first week free!
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <Image src="/shield-icon.svg" alt="Secure" width={40} height={40} />
          <Image src="/lock-icon.svg" alt="Private" width={40} height={40} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#4CAF50] to-[#2196F3] py-12 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="text-lg">&copy; 2024 HabitStride. All rights reserved.</p>
          <div className="mt-6 space-x-8">
            <a href="#" className="text-white hover:underline text-lg">Privacy Policy</a>
            <a href="#" className="text-white hover:underline text-lg">Terms of Service</a>
            <a href="#" className="text-white hover:underline text-lg">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* Sticky Footer CTA */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 py-4 shadow-md transition-all duration-300 transform translate-y-full" style={{ transform: isNavSticky ? 'translateY(0)' : 'translateY(100%)' }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-lg font-semibold">Ready to Build Better Habits?</p>
          <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
            Get Started Free
          </Button>
        </div>
      </div> */}
    </div>
  )
}