"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { PlusCircle, MinusCircle, BookOpen, Award, Briefcase, Code, User, School, AlertCircle, Trophy, Star, Target, Sparkles, Lightbulb, Wand2, X, Check, Bot, Waves, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { FormInputWithHints } from './form-input-with-hints';

// Add this interface at the top of the file
interface TourStep {
  title: string;
  message: string;
  highlight: string | null;
}

// Update the debounce function with proper typing
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  
  const executedFunction = function (...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };

  executedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return executedFunction;
};

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact1: '',
    education: {
      school: '',
      degree: '',
      date: '',
      cgpa: '',
    },
    skills: {
      skills: '',
      tools: '',
      languages: '',
      courses: '',
    },
    experience: [
      {
        title: '',
        company: '',
        date: '',
        description: '',
      },
    ],
    projects: [
      {
        name: '',
        description: '',
        skills: '',
        date: '',
        link: '',
      }
    ],
    achievements: '',
    interests: '',
  });

  const [activeSection, setActiveSection] = useState('personal');

  const [resumeScore, setResumeScore] = useState({
    score: 0,
    feedback: [] as string[],
  });

  const [achievements, setAchievements] = useState({
    sectionsCompleted: 0,
    skillsAdded: 0,
    experienceAdded: 0,
    level: 1,
    badges: [] as string[],
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    loading: false,
    suggestions: {} as Record<string, string[]>,
  });

  const [showGuide, setShowGuide] = useState(true);
  const [tourStep, setTourStep] = useState(0);

  // Move tourSteps inside the component
  const tourSteps: TourStep[] = [
    {
      title: "Hi there! 👋",
      message: "I'm Bhubhu, your friendly AI Resume Assistant! I'll help you create an amazing resume with smart suggestions.",
      highlight: null
    },
    {
      title: "Let's Build Together! ✨",
      message: "Fill in each section, and I'll give you real-time tips and improvements. Click the magic wand whenever you need my help!",
      highlight: "ai-suggestions"
    }
  ];

  // Update handleInputChange to not trigger immediate recalculation
  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      if (!name.includes('.')) {
        return { ...prev, [name]: value };
      }

      const [section, field] = name.split('.');
      if (section === 'experience') {
        const [, index, field] = name.split('.');
        return {
          ...prev,
          experience: prev.experience.map((exp, i) => 
            i === parseInt(index) ? { ...exp, [field]: value } : exp
          )
        };
      }
      
      if (section === 'education' || section === 'skills') {
        return {
          ...prev,
          [section]: {
            ...(prev[section] as Record<string, string>),
            [field]: value
          }
        };
      }

      return prev;
    });
  }, []);

  const handleExperienceChange = React.useCallback((index: number, field: string, value: string) => {

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: 'VIKAS GUPTA',
    contact1: '+919781686507 | https://vikasdev.vercel.app/ | vikasgupta.92155@gmail.com',
    education: {
      school: 'Thapar Institute of Engineering and Technology',
      degree: 'BE in Software Engineering',
      date: 'August 2015 – May 2019',
      cgpa: '7.80/10.00',
    },
    skills: {
      skills: 'Full Stack Web Development, Application Security, Penetration Testing, Automation, OWASP TOP-10, Googling',
      tools: 'Visual Studio Code, Burp Suite, OWASP-ZAP, Metasploit, Jira, John the Ripper, Bit Bucket, Nmap, NoCode Tools',
      languages: 'JavaScript, PHP, Html, CSS, AngularJS, Python, Garv, Django',
      courses: 'Computer Networks, Operating System, Database Management System, Data Structure and Algorithms, Penetration Testing by Cybrary, Frontend Development by Udacity',
    },
    experience: [
      {
        title: 'Security Engineer',
        company: 'RecordedFuture',
        date: 'May 2023 – Present',
        description: 'Worked on the development of internal tools and did automation of vulnerability rule creation.\nConduct in-depth research on CVEs to understand the underlying vulnerabilities, affected systems, and potential exploits.\nWork closely with other security team members, including threat analysts, incident responders, and vulnerability assessors, to share knowledge and insights.',
      },
      {
        title: 'Marketing Web Developer',
        company: 'SecurityTrails',
        date: 'May 2021 – May 2023',
        description: 'Worked on the development of multiple landing pages in core website and HubSpot landing pages using Markdown, Html, JS, etc.\nDeveloped Chrome Browser Extension for Cyber Security Marketing.\nWorked on scripting for microservices and blogposts for Marketing.\nWorked on Bpgview.io website using Laravel, Html, etc.\nWorked on core website to improve CLS, LCP for google page speed score.',
      },
    ],
    projects: 'SEO Ninja, Contenxt Analyzer, Shoutout, Hulu Clone, Intrustion Detection System, etc.',
    achievements: 'CVE-2023-3479, Reflected XSS in HestiaCP (https://nvd.nist.gov/vuln/detail/CVE-2023-3479)\nGot hall of fame/rewards from top companies for reporting security vulnerabilities.\nGot Employee of the Quarter Award in Xlpat Labs on 08th May 2020\nGot Invited to fully sponsored Cyber Security Convention by Govt. of India on 03th-06th July 2020.\nSecured 3rd place in CTF organized by CyberTalents on 09th May 2018.\nSecured 1st place in CTF orgnized by Creative Computing Society and Thapar University on 09th September 2017.\nSelected among 49 others for Frontend scholarship in Udacity Sponsored by Google India.\nSecured 41th position and swag in CTF hosted by DRDO (Defence Research and Development Organisation India)',
    interests: 'Security Community Affiliations: OWASP Chandigarh, Null Chandigarh\nSecurity Conferences Attended: DefCon 28, BSides Delhi 2019',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {

    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', date: '', description: '' }],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleCreateResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
    window.open('/resume-preview', '_blank');
  };

  // Update the useEffect to use debounced calculation
  useEffect(() => {
    const debouncedCalculation = debounce(() => {
      calculateResumeScore();
      checkAchievements(formData);
    }, 1000);

    debouncedCalculation();

    return () => {
      debouncedCalculation.cancel();
    };
  }, [formData]);

  const calculateResumeScore = () => {
    const feedback: string[] = [];
    let score = 0;
    
    // Personal Information (20%)
    if (formData.name.length > 0) score += 10;
    if (formData.contact1.length > 0) score += 10;
    if (formData.name.length < 2) feedback.push("Add your full name");
    if (!formData.contact1.includes('@')) feedback.push("Include a valid email address");

    // Education (20%)
    const educationFields = Object.values(formData.education);
    const filledEducation = educationFields.filter(field => field.length > 0).length;
    const educationScore = (filledEducation / educationFields.length) * 20;
    score += educationScore;
    if (educationScore < 20) {
      feedback.push(`Complete your education details (${Math.round(educationScore)}% done)`);
    }

    // Skills (20%)
    const skillsFields = Object.values(formData.skills);
    const filledSkills = skillsFields.filter(field => field.length > 0).length;
    const skillsScore = (filledSkills / skillsFields.length) * 20;
    score += skillsScore;
    if (skillsScore < 20) {
      feedback.push(`Add more skills to increase visibility (${Math.round(skillsScore)}% done)`);
    }

    // Experience (30%)
    const validExperiences = formData.experience.filter(exp => 
      exp.title && exp.company && exp.date && exp.description.length > 20
    ).length;
    const experienceScore = Math.min(30, validExperiences * 15);
    score += experienceScore;
    if (experienceScore < 30) {
      feedback.push(`Add more detailed work experiences (${Math.round(experienceScore/30*100)}% done)`);
    }

    // Projects & Achievements (10%)
    if (formData.projects.length > 50) score += 5;
    if (formData.achievements.length > 50) score += 5;
    if (formData.projects.length < 50) feedback.push("Describe your projects in more detail");
    if (formData.achievements.length < 50) feedback.push("Add notable achievements");

    setResumeScore({ 
      score: Math.round(score), 
      feedback: feedback.slice(0, 3) // Show top 3 most important feedback
    });
  };

  const checkAchievements = (formData: any) => {
    const newAchievements = {
      sectionsCompleted: 0,
      skillsAdded: 0,
      experienceAdded: 0,
      level: 1,
      badges: [] as string[],
    };

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.length > 0) {
        newAchievements.sectionsCompleted++;
      }
    });

    const skillsCount = Object.values(formData.skills)
      .filter(skill => typeof skill === 'string' && skill.length > 0).length;
    newAchievements.skillsAdded = skillsCount;

    newAchievements.experienceAdded = formData.experience.filter((exp: any) =>
      exp.title && exp.company && exp.description.length > 20
    ).length;

    newAchievements.level = Math.min(10, Math.floor(resumeScore.score / 10));

    if (resumeScore.score >= 90) newAchievements.badges.push('Resume Master');
    if (skillsCount >= 3) newAchievements.badges.push('Skill Collector');
    if (newAchievements.experienceAdded >= 2) newAchievements.badges.push('Experience Pro');
    if (formData.projects.length > 100) newAchievements.badges.push('Project Guru');

    setAchievements(newAchievements);
  };

  const getAISuggestions = async (field: string, content: string) => {
    setAiSuggestions(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field,
          content,
          context: formData // Send relevant context
        }),
      });

      if (!response.ok) throw new Error('Failed to get suggestions');
      
      const data = await response.json();
      setAiSuggestions(prev => ({
        loading: false,
        suggestions: {
          ...prev.suggestions,
          [field]: data.suggestions
        }
      }));
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      setAiSuggestions(prev => ({ ...prev, loading: false }));
    }
  };

  const sections = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'education', icon: School, label: 'Education' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: BookOpen, label: 'Projects' },
    { id: 'achievements', icon: Award, label: 'Achievements' },
  ];

  const ScoreDisplay = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    // Animate when score changes
    useEffect(() => {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }, [resumeScore.score]);

    return (
      <motion.div 
        className="bg-card rounded-xl shadow-sm border border-border p-6"
        animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Resume Compatibility Score</h3>
            <motion.span 
              className={`text-2xl font-bold ${
                resumeScore.score >= 80 ? 'text-green-600' : 
                resumeScore.score >= 60 ? 'text-blue-600' : 
                'text-orange-600'
              }`}
              animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {resumeScore.score}%
            </motion.span>
          </div>
          
          <div className="relative pt-2">
            <Progress 
              value={resumeScore.score} 
              className="h-2"
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-50"
              animate={isAnimating ? { 
                backgroundColor: ['rgba(59, 130, 246, 0)', 'rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0)']
              } : {}}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {resumeScore.feedback.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mt-4 bg-red-50 dark:bg-red-900/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <motion.ul 
                    className="list-none space-y-2 mt-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } }
                    }}
                  >
                    {resumeScore.feedback.map((feedback, index) => (
                      <motion.li
                        key={index}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-red-500">•</span>
                        {feedback}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Quick Tips */}
          {resumeScore.score < 80 && (
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium mb-2">Quick Tips to Improve:</p>
              <ul className="list-disc list-inside space-y-1">
                {resumeScore.score < 40 && (
                  <li>Start by completing your personal information and education details</li>
                )}
                {resumeScore.score < 60 && (
                  <li>Add at least one work experience with detailed description</li>
                )}
                {resumeScore.score < 80 && (
                  <li>Include relevant skills and highlight key achievements</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const AchievementsDisplay = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className={`w-6 h-6 ${achievements.level >= 8 ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h3 className="text-lg font-semibold text-blue-800">Resume Level {achievements.level}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Next Level: {Math.min(100, (achievements.level + 1) * 10)}%</span>
          </div>
        </div>

        <Progress 
          value={resumeScore.score % 10 * 10} 
          className="h-2"
        />

        <div className="grid grid-cols-3 gap-4 text-center py-2">
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-blue-600 font-semibold">{achievements.sectionsCompleted}</div>
            <div className="text-sm text-gray-600">Sections Done</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-blue-600 font-semibold">{achievements.skillsAdded}</div>
            <div className="text-sm text-gray-600">Skills Added</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-blue-600 font-semibold">{achievements.experienceAdded}</div>
            <div className="text-sm text-gray-600">Experiences</div>
          </div>
        </div>

        {achievements.badges.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Earned Badges
            </h4>
            <div className="flex flex-wrap gap-2">
              {achievements.badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center gap-1"
                >
                  <Star className="w-3 h-3" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 italic text-center">
          {resumeScore.score < 60 && "Keep going! You're making progress! 🚀"}
          {resumeScore.score >= 60 && resumeScore.score < 80 && "Great work! Almost there! ⭐"}
          {resumeScore.score >= 80 && "Outstanding! Your resume is looking professional! 🏆"}
        </div>
      </div>
    </div>
  );

  const calculateSectionCompletion = (sectionId: string): number => {
    switch (sectionId) {
      case 'personal':
        return ((formData.name ? 50 : 0) + (formData.contact1 ? 50 : 0));
      case 'education':
        return Object.values(formData.education).filter(v => v.length > 0).length * 25;
      case 'skills':
        return Object.values(formData.skills).filter(v => v.length > 0).length * 25;
      case 'experience':
        return Math.min(100, formData.experience.filter(exp => 
          exp.title && exp.company && exp.description
        ).length * 33);
      case 'projects':
        return formData.projects.length > 50 ? 100 : Math.round((formData.projects.length / 50) * 100);
      case 'achievements':
        return formData.achievements.length > 50 ? 100 : Math.round((formData.achievements.length / 50) * 100);
      default:
        return 0;
    }
  };

  const AvatarGuide = () => {
    const [isHappy, setIsHappy] = useState(false);

    const handleNext = () => {
      setIsHappy(true);
      setTimeout(() => {
        if (tourStep < tourSteps.length - 1) {
          setTourStep(prev => prev + 1);
        } else {
          setShowGuide(false);
        }
        setIsHappy(false);
      }, 500);
    };

    // Add a safety check for tourStep
    const currentStep = tourSteps[tourStep] || tourSteps[0];

    return (
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-blue-50 to-white border-none 
          mx-4 w-[calc(100%-2rem)] sm:w-full rounded-3xl">
          <div className="flex flex-col items-center space-y-6 py-6">
            {/* Cute Avatar */}
            <motion.div 
              className="relative cursor-pointer"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 
                flex items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl 
                transition-shadow border-4 border-white">
                <motion.div
                  animate={{ 
                    rotate: isHappy ? [0, -15, 15, -15, 0] : 0,
                    scale: isHappy ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <Bot className="w-16 h-16 text-blue-600" />
                    {/* Eyes */}
                    <motion.div 
                      className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    />
                    <motion.div 
                      className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    />
                    {/* Smile */}
                    <motion.div 
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-white rounded-full"
                      animate={{ scaleX: isHappy ? 1.2 : 1 }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute bottom-0 w-full"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Waves className="w-full h-8 text-blue-200 opacity-50" />
                </motion.div>
              </div>
              {/* Sparkle effects */}
              <motion.div
                className="absolute -right-2 -top-2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              key={tourStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-4 px-4"
            >
              <h3 className="text-2xl font-bold text-blue-800">
                {currentStep.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {currentStep.message}
              </p>
              
              {/* Simple dots */}
              <div className="flex justify-center gap-3 pt-4">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === tourStep ? 'bg-blue-600 scale-125' : 'bg-blue-200'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleNext}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700 gap-2 px-8 py-3 rounded-full
                  text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {tourStep === tourSteps.length - 1 ? "Let's Start! ✨" : "Next →"}
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  useEffect(() => {
    if (!showGuide) return;
    
    // Add safety check for tourStep access
    const currentStep = tourSteps[tourStep] || tourSteps[0];
    const highlight = currentStep?.highlight;

    if (highlight) {
      const element = document.querySelector(`.${highlight}`);
      if (element) {
        element.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-50');
      }
      
      return () => {
        if (element) {
          element.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-50');
        }
      };
    }
  }, [tourStep, showGuide, tourSteps]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="w-full px-2 sm:px-6 py-2">
          {/* Title Bar */}
          <div className="flex items-center justify-between mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <h1 className="font-playfair text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent
                animate-gradient relative group cursor-default truncate max-w-[200px] sm:max-w-none">
                LvlUp
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700
                  group-hover:w-full transition-all duration-300"></span>
              </h1>
              <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700
                text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium">
                Resume
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md flex items-center gap-1 sm:gap-2">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-700 dark:text-blue-300" />
                <span className="font-medium text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  <span className="hidden sm:inline">Level </span>
                  {achievements.level}
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="w-full -mx-2 px-2 sm:mx-0 sm:px-0">
            <nav className="flex overflow-x-auto scrollbar-none py-1">
              <div className="flex space-x-1 sm:space-x-2 min-w-full sm:min-w-0">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 transition-all duration-200
                      whitespace-nowrap text-xs sm:text-sm rounded-md flex-1 sm:flex-none justify-center
                      ${activeSection === section.id 
                        ? 'bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                  >
                    <section.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="truncate">{section.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-2 sm:p-6">
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-6">
          {/* Form Area */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="bg-card border border-border p-3 sm:p-6 rounded-lg">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeSection === 'personal' && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Personal Information</h2>
                    <div className="space-y-4">
                      <FormInputWithHints
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        label="Full Name"
                        placeholder="e.g., John Doe"
                      />
                      <FormInputWithHints
                        id="contact1"
                        name="contact1"
                        value={formData.contact1}
                        onChange={handleInputChange}
                        label="Contact Information"
                        placeholder="Email, Phone, LinkedIn"
                      />
                    </div>
                  </motion.div>
                )}

                {activeSection === 'education' && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Education</h2>
                    <div className="space-y-4">
                      {Object.entries(formData.education).map(([key, value]) => (
                        <FormInputWithHints
                          key={key}
                          id={`education.${key}`}
                          name={`education.${key}`}
                          value={value}
                          onChange={handleInputChange}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'skills' && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Skills</h2>
                    <div className="space-y-4">
                      {Object.entries(formData.skills).map(([key, value]) => (
                        <FormInputWithHints
                          key={key}
                          id={`skills.${key}`}
                          name={`skills.${key}`}
                          value={value}
                          onChange={handleInputChange}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          type="textarea"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'experience' && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <h2 className="text-xl md:text-2xl font-semibold text-blue-800">Experience</h2>
                      <Button 
                        onClick={addExperience} 
                        variant="outline" 
                        size="sm" 
                        className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.experience.map((exp, index) => (
                        <Card key={index} className="p-4 border-2 border-blue-200 rounded-xl relative">
                          <Button
                            onClick={() => removeExperience(index)}
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            <MinusCircle className="w-4 h-4" />
                          </Button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInputWithHints
                              id={`experience.${index}.title`}
                              name={`experience.${index}.title`}
                              value={exp.title}
                              onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                              label="Job Title"
                              placeholder="e.g., Senior Software Engineer"
                            />
                            <FormInputWithHints
                              id={`experience.${index}.company`}
                              name={`experience.${index}.company`}
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                              label="Company"
                            />
                            <FormInputWithHints
                              id={`experience.${index}.date`}
                              name={`experience.${index}.date`}
                              value={exp.date}
                              onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                              label="Date"
                            />
                            <FormInputWithHints
                              id={`experience.${index}.description`}
                              name={`experience.${index}.description`}
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                              label="Description"
                              type="textarea"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <h2 className="text-xl md:text-2xl font-semibold text-blue-800">Projects</h2>
                      <Button 
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          projects: [...prev.projects, { 
                            name: '', 
                            description: '', 
                            skills: '', 
                            date: '', 
                            link: '' 
                          }]
                        }))} 
                        variant="outline" 
                        size="sm" 
                        className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {formData.projects.map((project, index) => (
                        <Card key={index} className="p-6 border-2 border-blue-200 rounded-xl relative">
                          <Button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                projects: prev.projects.filter((_, i) => i !== index)
                              }));
                            }}
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                          >
                            <MinusCircle className="w-4 h-4" />
                          </Button>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInputWithHints
                              id={`projects.${index}.name`}
                              name={`projects.${index}.name`}
                              value={project.name}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index] = { ...project, name: e.target.value };
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                              label="Project Name"
                              placeholder="e.g., E-commerce Website"
                            />

                            <FormInputWithHints
                              id={`projects.${index}.date`}
                              name={`projects.${index}.date`}
                              value={project.date}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index] = { ...project, date: e.target.value };
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                              label="Date"
                              placeholder="e.g., Jan 2023 - Mar 2023"
                            />

                            <div className="sm:col-span-2">
                              <FormInputWithHints
                                id={`projects.${index}.description`}
                                name={`projects.${index}.description`}
                                value={project.description}
                                onChange={(e) => {
                                  const newProjects = [...formData.projects];
                                  newProjects[index] = { ...project, description: e.target.value };
                                  setFormData(prev => ({ ...prev, projects: newProjects }));
                                }}
                                label="Description"
                                type="textarea"
                                placeholder="Describe your project, its goals, and your role"
                              />
                            </div>

                            <FormInputWithHints
                              id={`projects.${index}.skills`}
                              name={`projects.${index}.skills`}
                              value={project.skills}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index] = { ...project, skills: e.target.value };
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                              label="Technologies & Skills Used"
                              placeholder="e.g., React, Node.js, MongoDB"
                            />

                            <FormInputWithHints
                              id={`projects.${index}.link`}
                              name={`projects.${index}.link`}
                              value={project.link}
                              onChange={(e) => {
                                const newProjects = [...formData.projects];
                                newProjects[index] = { ...project, link: e.target.value };
                                setFormData(prev => ({ ...prev, projects: newProjects }));
                              }}
                              label="Project Link"
                              placeholder="e.g., GitHub URL or Live Demo"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'achievements' && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Achievements</h2>
                    <FormInputWithHints
                      id="achievements"
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      label="Achievements"
                      type="textarea"
                    />
                  </motion.div>
                )}

                <ScoreDisplay />
                <AchievementsDisplay />
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="space-y-3 sm:space-y-4 lg:sticky lg:top-[140px]">
              {/* Progress Card */}
              <div className="bg-card border border-border p-4 sm:p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resume Progress</h3>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
                  {sections.map((section) => {
                    const completion = calculateSectionCompletion(section.id);
                    return (
                      <div key={section.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-muted-foreground">{section.label}</span>
                          <span className="text-primary font-medium">{completion}%</span>
                        </div>
                        <Progress value={completion} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Generate Resume Button */}
              <Button 
                onClick={handleCreateResume} 
                disabled={resumeScore.score < 60}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                  transition-all duration-300 py-3 sm:py-6 text-sm sm:text-base font-medium
                  rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Generate Resume</span>
                {resumeScore.score < 60 && (
                  <span className="text-[10px] sm:text-xs opacity-80 absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    Complete more sections to unlock
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <AvatarGuide />

  };

  const handleCreateResume = () => {
    // Store the form data in localStorage
    localStorage.setItem('resumeData', JSON.stringify(formData));
    // Open the preview page in a new tab
    window.open('/resume-preview', '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-2 p-6">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
          
          <Label htmlFor="contact">Contact</Label>
          <Input id="contact" name="contact" value={formData.contact1} onChange={handleInputChange} />
          
          <Label>Education</Label>
          <Input name="education.school" value={formData.education.school} onChange={handleInputChange} placeholder="School" />
          <Input name="education.degree" value={formData.education.degree} onChange={handleInputChange} placeholder="Degree" />
          <Input name="education.date" value={formData.education.date} onChange={handleInputChange} placeholder="Date" />
          <Input name="education.cgpa" value={formData.education.cgpa} onChange={handleInputChange} placeholder="CGPA" />
          
          <Label>Skills</Label>
          <Textarea name="skills.skills" value={formData.skills.skills} onChange={handleInputChange} placeholder="Skills" />
          <Textarea name="skills.tools" value={formData.skills.tools} onChange={handleInputChange} placeholder="Tools" />
          <Textarea name="skills.languages" value={formData.skills.languages} onChange={handleInputChange} placeholder="Languages" />
          <Textarea name="skills.courses" value={formData.skills.courses} onChange={handleInputChange} placeholder="Courses" />
          
          <Label>Experience</Label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <Input 
                value={exp.title} 
                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} 
                placeholder="Job Title" 
              />
              <Input 
                value={exp.company} 
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} 
                placeholder="Company" 
              />
              <Input 
                value={exp.date} 
                onChange={(e) => handleExperienceChange(index, 'date', e.target.value)} 
                placeholder="Date" 
              />
              <Textarea 
                value={exp.description} 
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} 
                placeholder="Job Description" 
              />
            </div>
          ))}
          
          <Label htmlFor="projects">Projects</Label>
          <Textarea id="projects" name="projects" value={formData.projects} onChange={handleInputChange} />
          
          <Label htmlFor="achievements">Achievements</Label>
          <Textarea id="achievements" name="achievements" value={formData.achievements} onChange={handleInputChange} />
          
          <Label htmlFor="interests">Interests</Label>
          <Textarea id="interests" name="interests" value={formData.interests} onChange={handleInputChange} />
          
          <Button onClick={handleCreateResume} className="mt-4 text-white">
            Preview Resume
          </Button>
        </CardContent>
      </Card>

    </div>
  );
};

export default ResumeForm;