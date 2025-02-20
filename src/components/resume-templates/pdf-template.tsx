import { ResumeTemplateProps } from './types';
import { Mail, Phone, Linkedin, Link as LinkIcon } from 'lucide-react';

export const PDFTemplate = ({ formData }: ResumeTemplateProps) => {
  return (
    <div className="p-[40px] bg-white w-[21cm] min-h-[29.7cm] mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{formData.name}</h1>
        <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
          {formData.contact1.split(',').map((contact, i) => (
            <span key={i} className="flex items-center gap-2">
              {contact.includes('@') && <Mail className="w-4 h-4" />}
              {contact.includes('linkedin') && <Linkedin className="w-4 h-4" />}
              {contact.match(/^\+?\d{10,}$/) && <Phone className="w-4 h-4" />}
              {contact.trim()}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="col-span-3 space-y-6">
          {/* Experience Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {formData.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className="text-base font-semibold">{exp.title}</h3>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{exp.date}</span>
                  </div>
                  <ul className="list-disc ml-4 text-sm text-gray-600 mt-1">
                    {exp.description.split('\n').map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {formData.projects.map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-semibold flex items-center gap-2">
                      {project.name}
                      {project.link && <LinkIcon className="w-3 h-3" />}
                    </h3>
                    <span className="text-gray-500 text-sm">{project.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.split(',').map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Education Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
              Education
            </h2>
            <div>
              <h3 className="text-base font-semibold">{formData.education.school}</h3>
              <p className="text-sm text-gray-600">{formData.education.degree}</p>
              <div className="text-sm text-gray-500 mt-1">
                <p>{formData.education.date}</p>
                <p>GPA: {formData.education.cgpa}</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
              Skills
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">Technical Skills</h3>
                <div className="space-y-1">
                  {formData.skills.skills.split(',').map((skill, i) => (
                    <p key={i} className="text-sm text-gray-600">{skill.trim()}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Tools</h3>
                <div className="space-y-1">
                  {formData.skills.tools.split(',').map((tool, i) => (
                    <p key={i} className="text-sm text-gray-600">{tool.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          {formData.achievements && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
                Achievements
              </h2>
              <ul className="list-disc ml-4 text-sm text-gray-600 space-y-1">
                {formData.achievements.split('\n').map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}; 