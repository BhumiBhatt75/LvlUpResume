import { ResumeTemplateProps } from './types';

export const ProfessionalTemplate = ({ formData }: ResumeTemplateProps) => {
  return (
    <div className="p-8 bg-white max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8 pb-8 border-b-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{formData.name}</h1>
        <div className="flex justify-center flex-wrap gap-6 text-gray-600">
          {formData.contact1.split(',').map((contact, i) => (
            <span key={i} className="flex items-center gap-2">
              {contact.trim()}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Professional Experience</h2>
          {formData.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-gray-500">{exp.date}</p>
              </div>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Projects</h2>
          {formData.projects.map((project, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-gray-500">{project.date}</p>
              </div>
              <p className="mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.skills.split(',').map((skill, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Education</h2>
            <h3 className="text-xl font-semibold">{formData.education.school}</h3>
            <p className="text-gray-600">{formData.education.degree}</p>
            <p className="text-gray-500">{formData.education.date}</p>
            <p>GPA: {formData.education.cgpa}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Technical Skills</h3>
                {formData.skills.skills.split(',').map((skill, i) => (
                  <p key={i} className="text-gray-700">{skill.trim()}</p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tools</h3>
                {formData.skills.tools.split(',').map((tool, i) => (
                  <p key={i} className="text-gray-700">{tool.trim()}</p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}; 