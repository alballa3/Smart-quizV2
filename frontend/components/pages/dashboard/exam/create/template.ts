export const multipleChoiceTemplates = [
  {
    text: "Which of the following is a primary color?",
    options: ["Red", "Green", "Purple", "Orange"],
    correctIndex: 0,
    category: "Art",
  },
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2,
    category: "Geography",
  },
  {
    text: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctIndex: 1,
    category: "Science",
  },
  {
    text: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    correctIndex: 2,
    category: "Literature",
  },
  {
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctIndex: 2,
    category: "Science",
  },
  {
    text: "Which of these is not a programming language?",
    options: ["Java", "Python", "Cobra", "HTML"],
    correctIndex: 3,
    category: "Computer Science",
  },
  {
    text: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctIndex: 1,
    category: "Biology",
  },
];

export const trueFalseTemplates = [
  {
    text: "The Earth is the third planet from the Sun.",
    correctAnswer: true,
    category: "Science",
  },
  {
    text: "Water boils at 100 degrees Fahrenheit.",
    correctAnswer: false,
    category: "Science",
  },
  {
    text: "Humans have 206 bones in their body.",
    correctAnswer: true,
    category: "Biology",
  },
  {
    text: "Mount Everest is the tallest mountain in the world.",
    correctAnswer: true,
    category: "Geography",
  },
  {
    text: "The Great Wall of China is visible from space with the naked eye.",
    correctAnswer: false,
    category: "Geography",
  },
  {
    text: "JavaScript is a compiled programming language.",
    correctAnswer: false,
    category: "Computer Science",
  },
  {
    text: "Leonardo da Vinci painted the Mona Lisa.",
    correctAnswer: true,
    category: "Art",
  },
];

export const essayTemplates = [
  {
    text: "Explain the causes and effects of climate change.",
    wordLimit: 500,
    modelAnswer:
      "A comprehensive answer would discuss greenhouse gas emissions, industrial activities, deforestation, rising temperatures, extreme weather events, and impacts on ecosystems.",
    category: "Environmental Science",
  },
  {
    text: "Compare and contrast the themes in two works of literature you have studied.",
    wordLimit: 750,
    modelAnswer:
      "Students should identify major themes in two literary works and analyze similarities and differences, providing specific examples from the texts.",
    category: "Literature",
  },
  {
    text: "Discuss the impact of social media on modern society.",
    wordLimit: 600,
    modelAnswer:
      "A strong response would address both positive aspects (connectivity, information sharing) and negative aspects (privacy concerns, mental health impacts, misinformation).",
    category: "Social Studies",
  },
  {
    text: "Analyze the significance of a major historical event of the 20th century.",
    wordLimit: 800,
    modelAnswer:
      "Students should select an event, describe its historical context, analyze its immediate and long-term impacts, and evaluate its historical significance.",
    category: "History",
  },
  {
    text: "Describe how technological advancements have changed education in the past decade.",
    wordLimit: 500,
    modelAnswer:
      "Responses should cover digital learning tools, online education platforms, accessibility improvements, and challenges of technology integration in educational settings.",
    category: "Education",
  },
  {
    text: "Explain the principles of object-oriented programming and provide examples.",
    wordLimit: 600,
    modelAnswer:
      "Students should explain encapsulation, inheritance, polymorphism, and abstraction with practical code examples showing how these principles are implemented.",
    category: "Computer Science",
  },
];
