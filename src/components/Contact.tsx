import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Changed to true so content stays visible
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
      transition: { duration: 0.6 }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02,
      borderColor: '#8B5CF6',
      boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)'
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute -inset-[10px] opacity-30">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            GET IN <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">TOUCH</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-xl mx-auto"
            variants={itemVariants}
          >
            INTERESTED IN WORKING TOGETHER OR HAVE A QUESTION?
            DROP ME A MESSAGE AND I'LL GET BACK TO YOU SOON.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800"
              variants={itemVariants}
            >
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">NAME</label>
                    <motion.input
                      type="text"
                      id="name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">EMAIL</label>
                    <motion.input
                      type="email"
                      id="email"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                      whileFocus="focus"
                      variants={inputVariants}
                    />
                  </motion.div>
                </div>
                
                <motion.div className="mb-6" variants={itemVariants}>
                  <label htmlFor="subject" className="block text-gray-400 mb-2 text-sm">SUBJECT</label>
                  <motion.input
                    type="text"
                    id="subject"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>
                
                <motion.div className="mb-6" variants={itemVariants}>
                  <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">MESSAGE</label>
                  <motion.textarea
                    id="message"
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none resize-none"
                    whileFocus="focus"
                    variants={inputVariants}
                  ></motion.textarea>
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-between"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6">CONTACT INFORMATION</h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">EMAIL</p>
                    <p className="text-white">luka@example.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">GITHUB</p>
                    <p className="text-white">github.com/luka-dev</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LINKEDIN</p>
                    <p className="text-white">linkedin.com/in/luka-dev</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-10">
              <h3 className="text-2xl font-bold mb-6">CURRENT AVAILABILITY</h3>
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <p className="text-gray-300">
                  I'm currently available for freelance work and collaborations.
                  Feel free to reach out if you have an interesting project in mind.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-500 font-medium">Available for new projects</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;