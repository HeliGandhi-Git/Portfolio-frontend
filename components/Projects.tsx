import React, { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import api from "../api";
import { Project } from "../types";

const ProjectDescription: React.FC<{ description: string }> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const isTooLong = description.length > maxLength;

  const toggleExpand = (e: React.MouseEvent) => {
    if (isExpanded) {
      const projectSection = document.getElementById('projects');
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <p className="text-gray-600 text-sm leading-relaxed break-words">
        {isExpanded ? description : (isTooLong ? `${description.substring(0, maxLength)}...` : description)}
      </p>
      {isTooLong && (
        <button
          onClick={toggleExpand}
          className="text-xs font-bold text-ig-purple mt-2 hover:text-ig-pink transition-colors flex items-center gap-1"
        >
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      )}
    </div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/content/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div id="projects" className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="text-xs font-bold text-ig-pink uppercase tracking-[0.2em] mb-3 block">My Work</span>
          <h2 className="text-5xl font-bold text-ig-dark mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </div>
        <a
          href="https://github.com/HeliGandhi-Git"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <button className="px-8 py-3 rounded-full bg-instagram text-white font-bold shadow-glow hover:shadow-glow-hover transition-all duration-300 transform hover:-translate-y-1">
            View All GitHub
          </button>
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-large overflow-hidden border border-gray-100 shadow-sm animate-pulse">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-white rounded-large overflow-hidden border border-transparent hover:border-ig-pink hover:shadow-glow-hover transition-all duration-300 hover:-translate-y-2 shadow-soft relative"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-bold text-ig-purple rounded-full shadow-lg uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Dynamic Link Icon Overlay */}
                {project.linkType && project.linkType !== 'none' && project.url && (
                  <div className="absolute top-4 right-4 z-20">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110
                        ${project.linkType === 'github' ? 'bg-[#24292e]' : 'bg-instagram'}
                      `}
                    >
                      {project.linkType === 'github' ? <Github size={20} /> : <ExternalLink size={20} />}
                    </a>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-ig-dark group-hover:text-ig-pink transition-colors break-words leading-tight">
                        {project.title}
                    </h3>
                </div>

                <ProjectDescription description={project.description} />

                <div className="flex flex-col gap-3 pt-2 border-t border-gray-50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Technologies</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold text-ig-purple bg-ig-purple/5 border border-ig-purple/10 px-3 py-1 rounded-full whitespace-nowrap"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
