import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const codeSnippet = `// Arduino Smart Lighting System
#include <Arduino.h>

const int lightSensor = A0;
const int motionSensor = 2;
const int ledPin = 9;

void setup() {
  pinMode(lightSensor, INPUT);
  pinMode(motionSensor, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(lightSensor);
  bool motionDetected = digitalRead(motionSensor);
  
  if (lightLevel < 300 && motionDetected) {
    digitalWrite(ledPin, HIGH);
    Serial.println("Motion detected in low light -> LED ON");
    delay(5000);
  } else {
    digitalWrite(ledPin, LOW);
  }
  
  delay(100);
}`;

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 left-0 w-3/4 h-3/4 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/2 right-0 w-3/4 h-3/4 bg-pink-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="relative">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              ABOUT <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">ME</span>
            </motion.h2>
            
            <motion.p className="text-gray-300 mb-6" variants={itemVariants}>
              I'M A 15-YEAR-OLD SOFTWARE DEVELOPMENT ENTHUSIAST WITH A PASSION FOR 
              AI, CODING, AND BUILDING INNOVATIVE SOLUTIONS. CURRENTLY STUDYING AT 
              LESSING-GYMNASIUM KARLSRUHE, I SPEND MY FREE TIME EXPLORING THE 
              INTERSECTION OF TECHNOLOGY AND CREATIVITY.
            </motion.p>
            
            <motion.p className="text-gray-300 mb-6" variants={itemVariants}>
              WHEN I'M NOT CODING, YOU CAN FIND ME PLAYING TENNIS, EXPERIMENTING 
              WITH ARDUINO PROJECTS, OR EXPLORING THE POSSIBILITIES OF LINUX (RUNNING 
              UBUNTU GUI ON VIRTUALBOX).
            </motion.p>
            
            <motion.p className="text-gray-300" variants={itemVariants}>
              MY JOURNEY IN PROGRAMMING BEGAN WITH C++ AND HAS EXPANDED TO 
              INCLUDE VARIOUS LANGUAGES AND TOOLS. I'M PARTICULARLY INTERESTED IN AI 
              DEVELOPMENT AND USE TOOLS LIKE CURSOR AI, CLAUDE, CHATGPT, WINDUSURF, 
              OLLAMA, WARP TERMINAL, AND PINOKIO TO ENHANCE MY WORKFLOW.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="relative max-w-lg mx-auto group"
            variants={itemVariants}
          >
            {/* Terminal window gradient glow effect */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-75 blur group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Terminal window */}
            <div className="relative bg-[#1E1E1E] rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-1.5 bg-[#323233] px-4 py-2.5">
                <div className="w-3 h-3 rounded-full bg-[#FF605C]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD44]"></div>
                <div className="w-3 h-3 rounded-full bg-[#00CA4E]"></div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-400 text-sm ml-2">ARDUINO PROJECT</span>
                  <span className="text-gray-400 text-sm">CPP</span>
                </div>
              </div>
              <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;