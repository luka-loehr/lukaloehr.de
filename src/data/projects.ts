import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'airgo',
    title: 'AirGo',
    description: 'A cross-platform file sharing app inspired by AirDrop. Works between Android and iOS.',
    image: 'https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React Native', 'Typescript', 'WebRTC']
  },
  {
    id: 'ai-sub-checker',
    title: 'AI Substitution Checker',
    description: 'An AI-powered tool for students to check class substitutions, compatible with school schedule systems.',
    image: 'https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Python', 'LLaMA', 'ReactJS']
  },
  {
    id: 'task-manager',
    title: 'AI-Powered Task Manager',
    description: 'Intelligent task scheduling with AI prioritization and automation.',
    image: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Cursor AI', 'TypeScript']
  },
  {
    id: 'smart-garden',
    title: 'Arduino Smart Garden',
    description: 'Automated plant care system built with Arduino and IoT sensors.',
    image: 'https://images.pexels.com/photos/8802732/pexels-photo-8802732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Arduino', 'IoT', 'C++']
  }
];