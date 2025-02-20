export interface ResumeData {
    name: string;
    contact1: string;
    experience: Array<{
        title: string;
        company: string;
        date: string;
        description: string;
    }>;
    projects: Array<{
        name: string;
        date: string;
        description: string;
        skills: string;
        link?: string;
    }>;
    education: {
        school: string;
        degree: string;
        date: string;
        cgpa: string;
    };
    skills: {
        skills: string;
        tools: string;
    };
    achievements?: string;
    // Add other fields as necessary
}

// Define and export ResumeTemplateProps
export interface ResumeTemplateProps {
    formData: ResumeData; // Use the ResumeData type
} 