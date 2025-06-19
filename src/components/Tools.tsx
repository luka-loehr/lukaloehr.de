import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { tools } from '../data/tools';
import { FileCode, Cloud, Database, Terminal, CircuitBoard, Monitor } from 'lucide-react';

const Tools: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Changed to true so content stays visible
    threshold: 0.1,
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode':
        return <FileCode size={32} />;
      case 'Cloud':
        return <Cloud size={32} />;
      case 'Database':
        return <Database size={32} />;
      case 'Terminal':
        return <Terminal size={32} />;
      case 'CircuitBoard':
        return <CircuitBoard size={32} />;
      case 'Monitor':
        return <Monitor size={32} />;
      default:
        return <FileCode size={32} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="tools" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={headerVariants}
          >
            TOOLS & <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">TECHNOLOGIES</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            variants={headerVariants}
          >
            THE TOOLS AND TECHNOLOGIES I USE TO BRING IDEAS TO LIFE
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 hover:border-purple-600 transition-all duration-300 flex flex-col items-center text-center"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)' }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4 text-white"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                {getIcon(tool.icon)}
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
              
              <p className="text-gray-400 text-sm">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;