import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Bell, BarChart, Footprints } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5] text-gray-800">
      {/* Header */}
      <header className="bg-white bg-opacity-90 py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Footprints className="h-8 w-8 text-[#4CAF50]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#2196F3] bg-clip-text text-transparent">
              HabitStride
            </span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#features" className="text-gray-700 hover:text-[#4CAF50]">Features</Link></li>
              <li><Link href="#how-it-works" className="text-gray-700 hover:text-[#4CAF50]">How It Works</Link></li>
              <li><Link href="#testimonials" className="text-gray-700 hover:text-[#4CAF50]">Testimonials</Link></li>
              <li><Link href="#pricing" className="text-gray-700 hover:text-[#4CAF50]">Pricing</Link></li>
            </ul>
          </nav>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Build Lasting Habits with HabitStride
        </h1>
        <p className="mb-8 text-xl text-gray-700">
          Your AI-powered companion for consistent personal growth and achievement
        </p>
        <Link href={"/sign-up"}>
        <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
          Start Your Journey
        </Button>
        </Link>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-white bg-opacity-80 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">How HabitStride Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-[#4CAF50]" />
              <h3 className="mb-2 text-xl font-semibold">Set Your Goals</h3>
              <p className="text-gray-600">Define your habits and let our AI help you create achievable goals</p>
            </div>
            <div className="text-center">
              <Bell className="mx-auto mb-4 h-16 w-16 text-[#2196F3]" />
              <h3 className="mb-2 text-xl font-semibold">Stay on Track</h3>
              <p className="text-gray-600">Receive personalized reminders and motivational check-ins</p>
            </div>
            <div className="text-center">
              <BarChart className="mx-auto mb-4 h-16 w-16 text-[#FF9800]" />
              <h3 className="mb-2 text-xl font-semibold">Track Progress</h3>
              <p className="text-gray-600">Visualize your growth with our soothing habit grid and insightful analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="mb-4 text-3xl font-bold">AI-Powered Insights</h2>
            <p className="mb-4 text-lg text-gray-700">
              HabitStride uses advanced AI to provide personalized feedback, helping you understand your habits better and stay motivated.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-[#4CAF50]" />
                <span>Tailored habit suggestions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-[#4CAF50]" />
                <span>Adaptive goal setting</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-[#4CAF50]" />
                <span>Behavior pattern analysis</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-sm ${
                      i % 7 === 0 ? 'bg-[#FFCDD2]' :
                      i % 7 === 1 ? 'bg-[#FFF9C4]' :
                      'bg-[#C8E6C9]'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">Your Habit Grid: Visualize your progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="bg-white bg-opacity-80 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="mb-4 text-gray-600">"HabitStride has completely transformed my daily routine. The AI insights are like having a personal coach!"</p>
              <p className="font-semibold">- Sarah K.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="mb-4 text-gray-600">"I love how encouraging the app is. Even on days when I struggle, it keeps me motivated to continue."</p>
              <p className="font-semibold">- Michael R.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="mb-4 text-gray-600">"The habit grid is so satisfying to fill out. It's become a game to keep my streak going!"</p>
              <p className="font-semibold">- Emily T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="mb-6 text-4xl font-bold">Ready to Transform Your Habits?</h2>
        <p className="mb-8 text-xl text-gray-700">
          Join thousands of users who are achieving their goals with HabitStride
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md rounded-full px-4 py-2 text-gray-800"
          />
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-2 rounded-full text-lg font-semibold transition duration-300">
            Get Started Free
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          No credit card required. Start your 14-day free trial today.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center text-white">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 HabitStride. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}