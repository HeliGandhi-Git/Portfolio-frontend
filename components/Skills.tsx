import React, { useEffect, useState } from 'react';
import api from '../api';
import { Skill } from '../types';

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/content/skills');
        const skills: Skill[] = res.data;

        // Group skills by category
        const groups: { [key: string]: Skill[] } = {};
        skills.forEach(skill => {
          if (!groups[skill.category]) {
            groups[skill.category] = [];
          }
          groups[skill.category].push(skill);
        });

        const categories: SkillCategory[] = Object.keys(groups).map(title => ({
          title,
          skills: groups[title]
        }));

        setSkillCategories(categories);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-ig-dark mb-4">Technical <span className="text-gradient">Skills</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical stack and proficiency levels across modern web development technologies.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-large shadow-sm border border-transparent animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
                <div className="flex flex-col gap-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j}>
                      <div className="flex justify-between mb-2">
                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                        <div className="h-6 w-12 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-large shadow-soft border border-transparent hover:border-ig-pink hover:shadow-glow transition-all duration-300 group"
              >
                <h3 className="text-2xl font-bold text-ig-dark mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-instagram rounded-full"></span>
                  {category.title}
                </h3>

                <div className="flex flex-col gap-6">
                  {category.skills.map((skill) => (
                    <div key={skill._id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-ig-dark flex items-center gap-2">
                          {skill.name}
                        </span>
                        <span className="text-ig-purple font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-instagram rounded-full relative"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;