"use client"

import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, Briefcase, Target, Book } from 'lucide-react';

interface CareerSuggestionsProps {
  formData: any;
}

export const CareerSuggestions = ({ formData }: CareerSuggestionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/career-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) throw new Error('Failed to get suggestions');
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error getting career suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          if (!suggestions) getSuggestions();
        }}
        className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
      >
        <Lightbulb className="w-4 h-4" />
        Career Insights
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              Career Insights
            </h2>

            {loading ? (
              <div className="text-center py-8">Loading suggestions...</div>
            ) : suggestions ? (
              <div className="space-y-6">
                <section className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    Potential Career Paths
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {suggestions.careerPaths.map((path: string, i: number) => (
                      <li key={i}>{path}</li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    Skills to Develop
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {suggestions.skillGaps.map((skill: string, i: number) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Book className="w-5 h-5 text-purple-500" />
                    Industry Insights
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {suggestions.industryInsights.map((insight: string, i: number) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No suggestions available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 