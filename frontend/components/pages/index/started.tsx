"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Rocket, Play, X, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GetStartedSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "-100px",
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleOpenChange = (open: boolean) => {
    setVideoPlaying(open);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="w-full py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden"
      id="get-started"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[30rem] h-[30rem] bg-blue-700/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        </div>
      </div>

      <motion.div
        className="container px-4 md:px-6 relative"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full border bg-blue-950/50 backdrop-blur-sm border-blue-800/20 text-blue-400 shadow-sm">
            <Rocket className="h-3.5 w-3.5 mr-2" />
            <span>Start Your Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mb-4">
            Transform Your Teaching Experience
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of educators who are creating engaging, interactive
            quizzes that students love.
          </p>
        </motion.div>

        <motion.div className="max-w-6xl mx-auto" variants={itemVariants}>
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8 items-center">
            <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-800/20 shadow-xl shadow-blue-500/5 p-5 sm:p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-6">
                  Create your first quiz in minutes and see the difference
                  SmartQuiz can make in your classroom.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Link href="/auth/register">
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                        >
                          <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></span>
                          <Rocket className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="relative z-10">
                            Create Free Account
                          </span>
                        </Button>
                      </Link>
                    </motion.div>

                    <Dialog onOpenChange={handleOpenChange}>
                      <DialogTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full"
                        >
                          <Button
                            size="lg"
                            variant="outline"
                            className="w-full border-blue-700/30 hover:bg-blue-900/20 hover:text-blue-400 relative overflow-hidden group h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                          >
                            <span className="absolute inset-0 w-0 bg-blue-500/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                            <Play className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="relative z-10">Watch Demo</span>
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-[#030711]/95 backdrop-blur-lg border-blue-900/20 rounded-2xl">
                        <div className="relative aspect-video w-full">
                          {videoPlaying ? (
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                              title="SmartQuiz Demo Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-blue-950 flex items-center justify-center">
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="text-sm text-blue-400">
                                  Loading video...
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogClose className="absolute top-3 right-3 z-10 rounded-full bg-[#030711]/80 p-2 backdrop-blur-sm border border-blue-900/20 hover:bg-blue-900/20 transition-colors duration-200">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="pt-4 space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-blue-900/20 p-1 mt-0.5">
                          <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-800/20 shadow-xl shadow-blue-500/5 p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-[#030711]"
                      >
                        <span className="text-xs font-medium text-white">
                          {i}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Joined this week
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl sm:text-2xl font-bold">10,000+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Educators trust SmartQuiz
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden border border-blue-900/30 shadow-2xl shadow-blue-500/10 aspect-[16/9]">
                  <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="SmartQuiz Dashboard"
                    width={1920}
                    height={1080}
                    className="object-cover w-full h-full"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 to-blue-900/50 backdrop-filter backdrop-blur-[2px]"></div>

                  <Dialog onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                      <button className="absolute inset-0 w-full h-full flex items-center justify-center group">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute -inset-12 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                            <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-50"></div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white ml-1 relative z-10" />
                          </div>
                        </div>
                        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#030711]/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Watch Demo Video
                        </span>
                      </button>
                    </DialogTrigger>
                  </Dialog>

                  {/* UI Preview Elements */}
                  <div className="absolute inset-0 p-4 sm:p-8 opacity-60 pointer-events-none">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6 border-b border-blue-900/20 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/30"></div>
                          <div className="h-3 sm:h-4 w-24 sm:w-32 bg-blue-500/30 rounded"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-6 sm:h-8 w-16 sm:w-20 bg-blue-500/30 rounded-md"></div>
                          <div className="h-6 sm:h-8 w-6 sm:w-8 bg-blue-500/30 rounded-md"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="bg-blue-950/40 p-3 sm:p-4 rounded-lg border border-blue-900/30 flex flex-col gap-2"
                          >
                            <div className="h-2 sm:h-3 w-2/3 bg-blue-500/30 rounded mb-1"></div>
                            <div className="h-1.5 sm:h-2 w-full bg-blue-500/20 rounded mb-1"></div>
                            <div className="h-1.5 sm:h-2 w-4/5 bg-blue-500/20 rounded mb-1"></div>
                            <div className="h-1.5 sm:h-2 w-3/5 bg-blue-500/20 rounded"></div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex gap-2">
                          <div className="h-6 sm:h-8 w-6 sm:w-8 bg-blue-500/30 rounded-md"></div>
                          <div className="h-6 sm:h-8 w-6 sm:w-8 bg-blue-500/30 rounded-md"></div>
                        </div>
                        <div className="h-6 sm:h-8 w-24 sm:w-32 bg-blue-500/30 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-700/5 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const benefits = [
  "FOR FREE USE",
  "No credit card required",
  "Free for educators",
  "Unlimited students",
  "Advanced analytics included",
];
