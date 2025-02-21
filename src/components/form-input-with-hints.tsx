"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface FormInputWithHintsProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  type?: 'input' | 'textarea';
  placeholder?: string;
  hints?: {
    title: string;
    suggestions: string[];
  };
}

export const FormInputWithHints = ({
  id,
  name,
  value,
  onChange,
  label,
  type = 'input',
  placeholder = '',
  hints
}: FormInputWithHintsProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const defaultHints = {
    'name': {
      title: 'Name Tips',
      suggestions: [
        'Use your full professional name',
        'Avoid nicknames unless professionally known by them',
        'Consider including relevant credentials (e.g., MBA, Ph.D.)'
      ]
    },
    'contact1': {
      title: 'Contact Tips',
      suggestions: [
        'Use a professional email address',
        'Include LinkedIn profile URL',
        'Add location (city, state)',
        'Include professional phone number'
      ]
    },
    'education.school': {
      title: 'School Name Tips',
      suggestions: [
        'Use the official institution name',
        'Include campus location if relevant',
        'Add university abbreviation if well-known (e.g., MIT, UCLA)'
      ]
    },
    'education.degree': {
      title: 'Degree Tips',
      suggestions: [
        'Specify the full degree name',
        'Include major/specialization',
        'Add honors if applicable (e.g., cum laude)'
      ]
    },
    'education.date': {
      title: 'Education Date Tips',
      suggestions: [
        'Include expected graduation date if current',
        'Use Month Year format (e.g., May 2023)',
        'Add study duration for special programs'
      ]
    },
    'education.cgpa': {
      title: 'GPA Tips',
      suggestions: [
        'Include if above 3.5',
        'Use the standard 4.0 scale',
        'Add relevant academic achievements'
      ]
    },
    'skills.skills': {
      title: 'Technical Skills Tips',
      suggestions: [
        'List relevant technical skills',
        'Group similar skills together',
        'Include proficiency levels',
        'Focus on in-demand technologies'
      ]
    },
    'skills.tools': {
      title: 'Tools Tips',
      suggestions: [
        'List software and tools you\'re proficient in',
        'Include industry-standard tools',
        'Mention version control systems',
        'Add relevant certifications'
      ]
    },
    'skills.languages': {
      title: 'Languages Tips',
      suggestions: [
        'Specify programming languages',
        'Include proficiency levels',
        'List relevant frameworks',
        'Add spoken languages if relevant'
      ]
    },
    'skills.courses': {
      title: 'Courses Tips',
      suggestions: [
        'List relevant coursework to the job',
        'Include online certifications',
        'Mention specialized training',
        'Add course completion dates'
      ]
    },
    'experience.title': {
      title: 'Job Title Tips',
      suggestions: [
        'Use standard industry titles',
        'Be specific about your role',
        'Include level/seniority if applicable',
        'Avoid company-specific titles'
      ]
    },
    'experience.company': {
      title: 'Company Tips',
      suggestions: [
        'Use the official company name',
        'Add brief company description if not well-known',
        'Include industry/sector',
        'Mention company size if relevant'
      ]
    },
    'experience.date': {
      title: 'Work Date Tips',
      suggestions: [
        'Use Month Year format',
        'Include current position as "Present"',
        'Be accurate with dates',
        'Show progression if promoted'
      ]
    },
    'experience.description': {
      title: 'Experience Description Tips',
      suggestions: [
        'Start with strong action verbs',
        'Include quantifiable achievements',
        'Focus on impact and results',
        'Use industry-specific keywords'
      ]
    },
    'projects.name': {
      title: 'Project Name Tips',
      suggestions: [
        'Use clear, descriptive names',
        'Include the project type',
        'Add technology stack if relevant',
        'Keep it concise but informative'
      ]
    },
    'projects.description': {
      title: 'Project Description Tips',
      suggestions: [
        'Highlight your role and contributions',
        'Describe technical challenges solved',
        'Mention impact and results',
        'Include technologies used'
      ]
    },
    'projects.skills': {
      title: 'Project Skills Tips',
      suggestions: [
        'List technologies used',
        'Include methodologies',
        'Mention soft skills demonstrated',
        'Add relevant tools'
      ]
    },
    'projects.date': {
      title: 'Project Date Tips',
      suggestions: [
        'Use Month Year format',
        'Include duration for long projects',
        'Mention if ongoing',
        'Show recent projects first'
      ]
    },
    'projects.link': {
      title: 'Project Link Tips',
      suggestions: [
        'Include GitHub repository URL',
        'Add live demo links if available',
        'Ensure links are accessible',
        'Use shortened URLs if necessary'
      ]
    },
    'achievements': {
      title: 'Achievements Tips',
      suggestions: [
        'Quantify results when possible',
        'Include awards and recognition',
        'Mention leadership roles',
        'Add relevant certifications'
      ]
    }
  };

  const currentHints = hints || defaultHints[name as keyof typeof defaultHints];

  return (
    <div className="relative space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        {currentHints && (
          <Popover open={showHints} onOpenChange={setShowHints}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 w-6 p-0.5 text-gray-500 hover:text-blue-600"
              >
                <Wand2 className="w-full h-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-[calc(100vw-2rem)] sm:w-72 max-w-sm"
              side="top"
              align="end"
            >
              <div className="space-y-2">
                <h4 className="font-medium text-sm">{currentHints.title}</h4>
                <ul className="text-sm space-y-1.5">
                  {currentHints.suggestions.map((suggestion, i) => (
                    <li key={i} className="text-gray-600 flex items-start gap-2 text-[13px] leading-tight">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {type === 'textarea' ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full min-h-[80px] sm:min-h-[100px] px-3 py-2 
            text-base text-gray-900
            border rounded-lg resize-none
            placeholder:text-gray-500
            bg-white
            ${isFocused 
              ? 'border-gray-500 ring-1 ring-gray-200' 
              : 'border-gray-300 hover:border-gray-400'
            }
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            leading-relaxed
            transition-colors duration-200`}
        />
      ) : (
        <Input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full h-10 sm:h-11 px-3 
            text-base text-gray-900
            border rounded-lg
            placeholder:text-gray-500
            bg-white
            ${isFocused 
              ? 'border-gray-500 ring-1 ring-gray-200' 
              : 'border-gray-300 hover:border-gray-400'
            }
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            transition-colors duration-200`}
        />
      )}
    </div>
  );
}; 