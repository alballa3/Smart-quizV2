"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-100px",
  });

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
      id="about"
      className="w-full py-16 sm:py-20 md:py-24 lg:py-32 relative"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container px-4 md:px-6 relative"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full border bg-blue-950/50 backdrop-blur-sm border-blue-800/20 text-blue-400 shadow-sm">
            <Users className="h-3.5 w-3.5 mr-2" />
            <span>About Us</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Empowering Educators Worldwide
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg">
            SmartQuiz was created by educators for educators. We understand the
            challenges of modern teaching and built a platform to make
            assessment easier and more effective.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-20"></div>
            <div className="relative rounded-2xl overflow-hidden border border-blue-900/30 shadow-2xl shadow-blue-500/10">
              <Image
                src="/meme.webp"
                alt="Teachers using SmartQuiz"
                width={800}
                height={600}
                className="object-cover w-full aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/80 via-transparent to-transparent"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-700/10 rounded-full blur-xl"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold">Our Story</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              this website is based on a ai bro every text is from ai bro is
              going real work nice work ai
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              we are trying our best to hack you and steal your information and
              money and get every thing that i should do
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-900/20">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-2" />
                <div className="text-xl sm:text-3xl font-bold text-blue-400">
                  1 users (ONLY ME)
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Educators
                </div>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-900/20">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-2" />
                <div className="text-xl sm:text-3xl font-bold text-blue-400">
                  5 ( FROM ME)
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Quizzes Created
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 text-sm sm:text-base">
                Join Our Community( THERE IS NO COMMUNITY )
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 md:mt-20 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm border border-blue-900/20"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto">
              We're on a mission to transform assessment from a time-consuming
              chore into a powerful tool that enhances teaching and learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">
                Simplify Assessment
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We make it easy to create, distribute, and grade quizzes, saving
                teachers valuable time.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">
                Engage Students
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our interactive quizzes keep students engaged and motivated
                throughout the learning process.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">
                Improve Outcomes
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our analytics help identify knowledge gaps and tailor
                instruction to improve learning outcomes.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
