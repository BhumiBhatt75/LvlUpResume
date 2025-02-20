import { ResumeTemplateProps } from './types';

export const ModernTemplate = ({ formData }: ResumeTemplateProps) => {
  return (
    <div className="p-4 sm:p-8 bg-white">
      {/* Header */}
      <header className="border-l-4 border-blue-600 pl-3 sm:pl-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 truncate">{formData.name}</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-sm sm:text-base text-gray-600">
          {formData.contact1.split(',').map((contact, i) => (
            <span key={i} className="flex items-center gap-1 sm:gap-2 truncate">
              {contact.trim()}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Experience</h2>
            {formData.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.date}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Projects</h2>
            {formData.projects.map((project, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.date}</p>
                <p className="mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.split(',').map((skill, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Education</h2>
            <h3 className="text-lg font-semibold">{formData.education.school}</h3>
            <p className="text-gray-600">{formData.education.degree}</p>
            <p className="text-sm text-gray-500">{formData.education.date}</p>
            <p className="text-sm">GPA: {formData.education.cgpa}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Skills</h2>
            <div className="space-y-2">
              {formData.skills.skills.split(',').map((skill, i) => (
                <span key={i} className="block text-gray-700">{skill.trim()}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Tools</h2>
            <div className="space-y-2">
              {formData.skills.tools.split(',').map((tool, i) => (
                <span key={i} className="block text-gray-700">{tool.trim()}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}; 