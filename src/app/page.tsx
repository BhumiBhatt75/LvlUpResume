"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-144px)] flex flex-col">
      {/* Hero Section */}
      <div className="py-16 text-center bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Create Your Professional Resume <br />
          <span className="text-blue-600">in Minutes</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Stand out from the crowd with a beautifully designed resume that
          highlights your skills and achievements.
        </p>
        <Link
          href="/create-resume"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full
            text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Create Your Resume
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How to Create a Perfect Resume
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Start with Personal Info",
              "Highlight Experience",
              "Showcase Skills",
              "Education Details",
              "Project Portfolio",
              "Final Review",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <p className="text-gray-600">
                  {index === 0 &&
                    "Begin with your name, contact details, and a professional summary that highlights your key strengths."}
                  {index === 1 &&
                    "List your work experience with specific achievements and responsibilities using action verbs."}
                  {index === 2 &&
                    "Include relevant technical skills, soft skills, and certifications that match the job requirements."}
                  {index === 3 &&
                    "Add your educational background, including degrees, relevant coursework, and academic achievements."}
                  {index === 4 &&
                    "Showcase your best projects with clear descriptions of your role and the impact you made."}
                  {index === 5 &&
                    "Review for proper formatting, correct spelling, and ensure all information is accurate and up-to-date."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Build Your Resume?</h2>
        <p className="text-xl mb-8 opacity-90">
          Create a professional resume in minutes with our easy-to-use builder
        </p>
        <Link
          href="/create-resume"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full
            text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
        >
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
