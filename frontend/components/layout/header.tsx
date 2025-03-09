"use client";

import Link from "next/link";
import {
  Menu,
  BookOpen,
  User,
  LogIn,
  ChevronDown,
  Bell,
  Settings,
  LogOut,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ISession, useSession } from "@/lib/auth";
import { toast, ToastContainer } from "react-toastify";

// Animation variants in a separate object for cleaner code
const animations = {
  navItem: {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
  logo: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  },
  button: {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  },
  authState: {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction * 20,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction * -20,
      transition: { duration: 0.3 },
    }),
  },
};

// Navigation items in a constant outside the component
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<ISession | null>(null);
  useEffect(() => {
    const handleUser = async () => {
      const session = await useSession();
      console.log(session.session);
      if (session.isAuth) {
        setUser(session.session);
        setIsLoggedIn(session.isAuth);
      }
    };
    handleUser();
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const json = await response.json();
    console.log(json);
    toast.success(json.message);
    window.location.reload();
  };
  // Extracted component for logo for cleaner JSX
  const Logo = () => (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={animations.logo}
      className="flex items-center gap-2"
    >
      <ToastContainer />
      <Link href="/" className="flex items-center space-x-2 group">
        <span className="relative flex h-9 w-9 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-70 blur-sm group-hover:opacity-100 transition-all duration-300"></span>
          <span className="absolute h-full w-full rounded-full bg-blue-500/30 animate-pulse"></span>
          <BookOpen className="relative h-5 w-5 text-white" />
        </span>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          SmartQuiz
        </span>
      </Link>
    </motion.div>
  );

  // Extracted user dropdown component for cleaner JSX
  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-blue-800/20 hover:bg-blue-900/20 hover:border-blue-700/30 group"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
            <span className="absolute inset-0 bg-blue-500/30 group-hover:bg-blue-500/50 transition-colors duration-300"></span>
            <User className="h-4 w-4 text-white relative z-10" />
          </div>
          <span className="text-sm font-medium hidden sm:inline-block">
            {user?.name}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:rotate-180 transition-transform duration-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 mt-2 bg-background/95 backdrop-blur-lg border border-blue-900/20 p-2 rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-start gap-2 p-3 border-b border-blue-900/10 mb-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-blue-900/20 focus:bg-blue-900/20 rounded-lg p-2 my-1 transition-colors duration-200">
          <User className="h-4 w-4 text-blue-400" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-blue-900/20 focus:bg-blue-900/20 rounded-lg p-2 my-1 transition-colors duration-200">
          <Settings className="h-4 w-4 text-blue-400" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-blue-900/20 my-1" />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer hover:bg-blue-900/20 focus:bg-blue-900/20 rounded-lg p-2 my-1 transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 text-blue-400" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Auth button components for reuse
  const LogInButton = () => (
    <motion.div
      variants={animations.button}
      whileHover="hover"
      whileTap="tap"
      className="hidden sm:block"
    >
      <Link href="/auth/login">
        <Button
          variant="outline"
          className="border-blue-700/30 hover:bg-blue-900/20 hover:text-blue-400 relative overflow-hidden group"
          onClick={() => setIsLoggedIn(true)}
        >
          <span className="absolute inset-0 w-0 bg-blue-500/10 transition-all duration-300 ease-out group-hover:w-full"></span>
          <LogIn className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
          <span className="relative z-10">Log In</span>
        </Button>
      </Link>
    </motion.div>
  );

  const GetStartedButton = () => (
    <motion.div variants={animations.button} whileHover="hover" whileTap="tap">
      <Link href="/auth/register">
        <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group">
          <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
          <Rocket className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
          <span className="relative z-10">Get Started</span>
        </Button>
      </Link>
    </motion.div>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-500 ${
        scrolled
          ? "bg-background/80 shadow-lg shadow-blue-500/5 border-b border-blue-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={animations.navItem}
            >
              <Link
                href={item.href}
                className="text-sm font-medium relative group"
              >
                <span className="relative z-10 transition-colors group-hover:text-blue-400">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait" initial={false}>
            {isLoggedIn ? (
              <motion.div
                key="logged-in"
                custom={1}
                initial="enter"
                animate="center"
                exit="exit"
                variants={animations.authState}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-blue-400"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                  </Button>
                </motion.div>

                <UserDropdown />
              </motion.div>
            ) : (
              <motion.div
                key="logged-out"
                custom={-1}
                initial="enter"
                animate="center"
                exit="exit"
                variants={animations.authState}
                className="flex items-center gap-2 sm:gap-3"
              >
                <LogInButton />
                <GetStartedButton />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-blue-700/30 hover:bg-blue-900/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l-blue-900/20 backdrop-blur-xl bg-background/95"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-8">
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <span className="absolute h-full w-full rounded-full bg-blue-500 opacity-70 blur-sm"></span>
                    <BookOpen className="relative h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                    SmartQuiz
                  </span>
                </div>

                <nav className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item, i) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-all hover:text-blue-400 p-3 hover:bg-blue-900/10 rounded-md flex items-center"
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-blue-900/20 flex flex-col gap-3">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/auth/login">
                        <Button
                          variant="outline"
                          className="border-blue-700/30 hover:bg-blue-900/20 w-full justify-start"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Log In
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-500 w-full justify-start">
                          <Rocket className="h-4 w-4 mr-2" />
                          Get Started
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-blue-700/30 hover:bg-blue-900/20 w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Border effect */}
      <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </header>
  );
}
