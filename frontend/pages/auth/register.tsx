"use client";

import type React from "react";

import { useState, useReducer } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  BookOpen,
  BrainCircuit,
  Trophy,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ToastContainer, toast } from "react-toastify";
// Zod schemas
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");
const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters");
const roleSchema = z.enum(["teacher", "administrator", "other"]);

// Form state type
type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  username: string;
  role: string;
  agreeToTerms: boolean;
};

// Form action type
type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string | boolean }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof FormState, string>> }
  | { type: "CLEAR_ERRORS" };

// Initial form state
const initialFormState: FormState = {
  email: "mohafnsn@gmail.com",
  password: "Moh032t732b",
  confirmPassword: "Moh032t732b",
  name: "Mohammedpro",
  username: "ZZZZz",
  role: "",
  agreeToTerms: true,
};

// Form reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export default function SmartQuizRegistration() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [formStep, setFormStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const setFormField = (field: keyof FormState, value: string | boolean) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const validateForm = async () => {
    try {
      if (formStep === 0) {
        await emailSchema.parseAsync(formState.email);
        await passwordSchema.parseAsync(formState.password);
        if (formState.password !== formState.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (!formState.agreeToTerms) {
          throw new Error("You must agree to the terms and conditions");
        }
      } else {
        await nameSchema.parseAsync(formState.name);
        await usernameSchema.parseAsync(formState.username);
        await roleSchema.parseAsync(formState.role);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.flatten().fieldErrors as Partial<
            Record<keyof FormState, string>
          >
        );
      } else if (error instanceof Error) {
        setErrors({
          [formStep === 0 ? "confirmPassword" : "role"]: error.message,
        });
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      if (formStep === 0) {
        setFormStep(1);
      } else {
        // Here you would typically send the data to your backend
        try {
          // const response = await axiosInstance.post("/api/users/register", formState);
          const repsonse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(formState),
            }
          );
          if (!repsonse.ok) {
            toast.error("Registration failed");
            console.log("Registration failed");
            return;
          }
          const json = await repsonse.json();
          console.log(json);
          // Redirect or show success message
          console.log("Registration Successful");
          toast.success("Registration Successful");
        } catch (error) {
          toast.error("Registration failed");
          console.log("The Error Come From " + error);
        }
      }
    }
  };

  const prevStep = () => {
    setFormStep(0);
  };

  const getPasswordStrength = () => {
    const { password } = formState;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 50) return "bg-red-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-900 to-zinc-950 md:flex-row">
      {/* Decorative Side Panel */}
      <div className="relative hidden w-full overflow-hidden md:flex md:w-1/2">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-blue-900 to-zinc-900"></div>
        <ToastContainer />
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
              Empower your teaching with AI-driven quizzes and personalized
              learning paths.
            </p>

            <div className="space-y-4 pt-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900/60 text-indigo-300">
                  <BrainCircuit size={20} />
                </div>
                <p className="text-left text-sm text-zinc-300">
                  AI-powered quiz generation
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900/60 text-indigo-300">
                  <Trophy size={20} />
                </div>
                <p className="text-left text-sm text-zinc-300">
                  Adaptive learning paths for students
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900/60 text-indigo-300">
                  <Check size={20} />
                </div>
                <p className="text-left text-sm text-zinc-300">
                  Real-time performance analytics
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex w-full items-center justify-center bg-zinc-900/50 p-6 backdrop-blur-sm md:w-1/2 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
              {formStep === 0 ? "Create your account" : "Complete your profile"}
            </h2>
            <p className="text-zinc-400">
              {formStep === 0
                ? "Start your journey with Smart Quiz today."
                : "Tell us a bit more about yourself."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 0 ? (
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
                    value={formState.email}
                    onChange={(e) => setFormField("email", e.target.value)}
                    placeholder=" "
                    className="peer block w-full appearance-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0"
                  />
                  <Label
                    htmlFor="email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    Email address
                  </Label>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="group relative z-0 mb-6 w-full">
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formState.password}
                      onChange={(e) => setFormField("password", e.target.value)}
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
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.password}
                    </p>
                  )}

                  {formState.password && (
                    <div className="mt-2 space-y-1">
                      <Progress
                        value={getPasswordStrength()}
                        className="h-1 w-full bg-zinc-800"
                      >
                        <div
                          className={`h-full ${getStrengthColor()}`}
                          style={{ width: `${getPasswordStrength()}%` }}
                        ></div>
                      </Progress>
                      <p className="text-xs text-zinc-500">
                        {getPasswordStrength() < 50 && "Weak password"}
                        {getPasswordStrength() >= 50 &&
                          getPasswordStrength() < 75 &&
                          "Medium strength"}
                        {getPasswordStrength() >= 75 && "Strong password"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="group relative z-0 mb-6 w-full">
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formState.confirmPassword}
                      onChange={(e) =>
                        setFormField("confirmPassword", e.target.value)
                      }
                      placeholder=" "
                      className="peer block w-full appearance-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 top-3 text-zinc-400 hover:text-zinc-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                    <Label
                      htmlFor="confirmPassword"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                    >
                      Confirm Password
                    </Label>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formState.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormField("agreeToTerms", checked === true)
                    }
                    className="border-zinc-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                  />
                  <Label htmlFor="terms" className="text-sm text-zinc-400">
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="text-indigo-400 hover:text-indigo-300 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-indigo-400 hover:text-indigo-300 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.agreeToTerms}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-white shadow-lg shadow-indigo-900/30 transition-all hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <div className="group relative z-0 mb-6 w-full">
                  <Input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormField("name", e.target.value)}
                    placeholder=" "
                    className="peer block w-full appearance-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0"
                  />
                  <Label
                    htmlFor="name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    Full Name
                  </Label>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="group relative z-0 mb-6 w-full">
                  <Input
                    id="username"
                    type="text"
                    value={formState.username}
                    onChange={(e) => setFormField("username", e.target.value)}
                    placeholder=" "
                    className="peer block w-full appearance-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-0"
                  />
                  <Label
                    htmlFor="username"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-zinc-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-400"
                  >
                    Username
                  </Label>
                  {errors.username && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm text-zinc-400">
                    What best describes your role?
                  </Label>
                  <select
                    id="role"
                    value={formState.role}
                    onChange={(e) => setFormField("role", e.target.value)}
                    className="w-full rounded-md border-zinc-700 bg-zinc-800 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select your role</option>
                    <option value="teacher">Teacher</option>
                    <option value="administrator">Administrator</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-xs text-red-400">{errors.role}</p>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                  >
                    Back
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-indigo-900/30 hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    Complete Registration
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
