"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileQuestion, Clock, BarChart3, Shuffle, Lightbulb, Shield, Sparkles } from "lucide-react"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="features" className="w-full py-16 sm:py-20 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030711] via-blue-950/5 to-[#030711]"></div>

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
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Everything You Need to Create Amazing Quizzes
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-base sm:text-lg md:text-xl">
            SmartQuiz provides all the tools you need to create, distribute, and analyze quizzes that engage your
            students and save you time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col h-full space-y-5 rounded-2xl p-6 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm border border-blue-900/20 hover:border-blue-800/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 group-hover:from-blue-500/30 group-hover:to-blue-700/30 transition-all duration-300 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base flex-1">{feature.description}</p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const features = [
  {
    title: "Question Bank",
    description:
      "Create and store questions in your personal bank. Reuse them across multiple quizzes to save time and maintain consistency.",
    icon: <FileQuestion className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Timed Quizzes",
    description:
      "Set time limits for your quizzes to simulate exam conditions and prevent cheating. Customize time limits per question or for the entire quiz.",
    icon: <Clock className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Detailed Analytics",
    description:
      "Get insights into student performance with detailed reports and analytics. Identify knowledge gaps and adjust your teaching accordingly.",
    icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Randomized Questions",
    description:
      "Shuffle questions and answer options to create unique quiz experiences for each student, reducing the possibility of cheating.",
    icon: <Shuffle className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Smart Suggestions",
    description:
      "Our AI suggests improvements to your questions and helps identify knowledge gaps. Get recommendations for better question phrasing and difficulty balance.",
    icon: <Lightbulb className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Secure Testing",
    description:
      "Advanced security features to maintain academic integrity during online assessments. Prevent unauthorized access and detect suspicious behavior.",
    icon: <Shield className="h-6 w-6 text-blue-400" />,
  },
]

