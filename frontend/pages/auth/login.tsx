"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, LogIn, BookOpen, BrainCircuit, Trophy } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { axiosInstance } from "@/lib/axios"

// Zod schemas for validation
const emailSchema = z.string().email("Invalid email address")
const passwordSchema = z.string().min(6, "The minimum  Length for the password is 6")

export default function SmartQuizLogin() {
  const [email, setEmail] = useState("Mohammed@gmail.com")
  const [password, setPassword] = useState("agjnags12")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create a schema for the form
    const loginSchema = z.object({
      email: emailSchema,
      password: passwordSchema,
    })

    // Use safeParse to validate the form data
    const result = loginSchema.safeParse({ email, password })

    if (result.success) {
      setErrors({})
      setIsLoading(true)

      //  API call
      try {
        const response=await axiosInstance.post("api/users/login", { email, password })
        console.log(response.data)
      } catch (error) {
        console.error("Error logging in:", error)
      }

      setIsLoading(false)
    } else {
      // Extract and set errors from the validation result
      const formattedErrors = result.error.format()
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-900 to-zinc-950 md:flex-row">
      {/* Decorative Side Panel */}
      <div className="relative hidden w-full overflow-hidden md:flex md:w-1/2">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-blue-900 to-zinc-900"></div>

        {/* Animated elements */}
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-400 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-indigo-600 opacity-20 blur-3xl"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-lg space-y-8 text-center"
          >
            <div className="mx-auto h-20 w-20 rounded-full bg-indigo-600/30 p-4 ring-2 ring-indigo-500/50">
              <BookOpen className="h-full w-full text-indigo-200" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">
                Smart Quiz
              </span>
            </h1>
            <p className="text-lg text-indigo-200">
              Empower your teaching with AI-driven quizzes and personalized learning paths.
            </p>

            <div className="space-y-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900/60 text-indigo-300">
                  <BrainCircuit size={20} />
                </div>
                <p className="text-left text-sm text-zinc-300">AI-powered quiz generation</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900/60 text-indigo-300">
                  <Trophy size={20} />
                </div>
                <p className="text-left text-sm text-zinc-300">Adaptive learning paths for students</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex w-full items-center justify-center bg-zinc-900/50 p-6 backdrop-blur-sm md:w-1/2 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-zinc-400">Sign in to your Smart Quiz account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <div className="group relative z-0 mb-6 w-full">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer block w-full appearance-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0"
                />
                <Label
                  htmlFor="email"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                >
                  Email address
                </Label>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div className="group relative z-0 mb-6 w-full">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="peer block w-full appearance-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-3 text-zinc-400 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <Label
                    htmlFor="password"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    Password
                  </Label>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>

           

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="mt-8 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-white shadow-lg shadow-indigo-900/30 transition-all hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    Sign in
                    <LogIn className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>


          <div className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 hover:underline">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

