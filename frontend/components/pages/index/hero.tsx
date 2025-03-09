"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  FileQuestion,
  Sparkles,
  Play,
} from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      setIsVisible(true);
    }
  }, [controls, isInView]);

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
      ref={ref}
      className="w-full py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden relative"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container px-4 md:px-6 relative"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            variants={itemVariants}
            className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left max-w-3xl mx-auto lg:mx-0"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-full border bg-blue-950/50 backdrop-blur-sm border-blue-800/20 text-blue-400 shadow-sm">
              <FileQuestion className="h-3.5 w-3.5 mr-2" />
              <span>Create quizzes in minutes, not hours</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                Smart Quizzes
              </span>
              <span className="block mt-1">for Smart Teachers</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-[600px] mx-auto lg:mx-0">
              Create, distribute, and grade quizzes effortlessly. Help your
              students succeed with our intuitive quiz platform designed
              specifically for educators.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 rounded-full px-6 sm:px-8 h-12 text-sm sm:text-base"
                >
                  Create Your First Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-700/30 hover:bg-blue-900/20 rounded-full px-6 sm:px-8 h-12 text-sm sm:text-base"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
              {[
                "No credit card required",
                "Free for educators",
                "Instant results",
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 relative w-full max-w-xl mx-auto lg:mx-0"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden border border-blue-900/30 shadow-2xl shadow-blue-500/10">
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* Main dashboard preview */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 to-blue-900/50"></div>

                  {/* Quiz Creator Preview */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4 border-b border-blue-900/20 pb-4">
                      <div className="text-sm sm:text-lg font-semibold text-blue-400">
                        New Quiz: Mathematics 101
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                      >
                        Save Quiz
                      </Button>
                    </div>

                    <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                      <div className="bg-blue-950/40 p-3 sm:p-4 rounded-lg border border-blue-900/30">
                        <div className="text-xs sm:text-sm text-blue-400 mb-2">
                          Question 1
                        </div>
                        <div className="text-sm sm:text-base mb-3">
                          What is the value of π (pi) to two decimal places?
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            A) 3.14
                          </div>
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            B) 3.15
                          </div>
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            C) 3.16
                          </div>
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            D) 3.17
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-950/40 p-3 sm:p-4 rounded-lg border border-blue-900/30">
                        <div className="text-xs sm:text-sm text-blue-400 mb-2">
                          Question 2
                        </div>
                        <div className="text-sm sm:text-base mb-3">
                          Solve for x: 2x + 5 = 15
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            A) x = 5
                          </div>
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            B) x = 10
                          </div>
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            C) x = 7.5
                          </div>
                          <div className="bg-blue-950/30 p-2 rounded border border-blue-900/20 text-xs sm:text-sm">
                            D) x = 3
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Stats bar */}
                <div className="bg-blue-950/60 p-3 sm:p-4 border-t border-blue-900/30 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">
                      Questions
                    </div>
                    <div className="text-sm sm:text-xl font-semibold text-blue-400">
                      10
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Time</div>
                    <div className="text-sm sm:text-xl font-semibold text-blue-400">
                      15 min
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Points</div>
                    <div className="text-sm sm:text-xl font-semibold text-blue-400">
                      100
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-700/10 rounded-full blur-xl"></div>

              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full p-3 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full py-1 px-3 shadow-lg shadow-blue-500/20 text-xs font-medium text-white">
                AI-Powered
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-[#030711]/95 backdrop-blur-lg border-blue-900/20 rounded-2xl">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={
                showVideo
                  ? "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  : ""
              }
              title="SmartQuiz Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <DialogClose className="absolute top-3 right-3 z-10 rounded-full bg-[#030711]/80 p-2 backdrop-blur-sm border border-blue-900/20 hover:bg-blue-900/20 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
