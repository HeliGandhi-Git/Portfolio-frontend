
import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import api from '../api';

interface Experience {
    _id: string;
    duration: string;
    jobTitle: string;
    companyName: string;
    description: string;
}

const Experience: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const res = await api.get('/content/experiences');
                setExperiences(res.data);
            } catch (err) {
                console.error("Error fetching experiences:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ig-pink"></div>
            </div>
        );
    }

    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-16">
                    <span className="px-4 py-1.5 rounded-full bg-ig-pink/5 text-ig-pink text-sm font-semibold mb-4 border border-ig-pink/10 uppercase tracking-widest">
                        Career Path
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-ig-dark text-center">
                        My <span className="text-gradient">Experience</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Timeline Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ig-blue via-ig-pink to-ig-orange opacity-40 hidden md:block"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => {
                            const isExpanded = expandedIds.includes(exp._id);
                            return (
                                <div key={exp._id} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    {/* Progress Bullet (Desktop) */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full border-2 border-ig-pink shadow-glow-hover z-10 hidden md:block">
                                        <div className="w-3 h-3 bg-ig-pink rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`w-full md:w-[45%] group transition-all duration-300 hover:-translate-y-2`}>
                                        <div className={`p-8 rounded-large bg-white border border-transparent shadow-soft hover:shadow-glow-hover hover:border-ig-pink transition-all duration-300 relative overflow-hidden text-left`}>
                                            
                                            {/* Background Decoration */}
                                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-ig-pink/5 to-transparent rounded-full blur-3xl group-hover:from-ig-pink/10 transition-colors"></div>

                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 rounded-pill bg-ig-blue/5 text-ig-blue text-[10px] font-bold flex items-center gap-1 border border-ig-blue/10 uppercase tracking-wider">
                                                    <Calendar size={12} /> {exp.duration}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-ig-dark mb-2 group-hover:text-ig-pink transition-colors leading-tight">{exp.jobTitle}</h3>
                                            <h4 className="text-lg font-semibold text-ig-purple mb-4 flex items-center gap-2">
                                                <Briefcase size={18} />
                                                {exp.companyName}
                                            </h4>
                                            
                                            <p className={`text-gray-600 leading-relaxed text-sm whitespace-pre-wrap transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                                                {exp.description}
                                            </p>

                                            <div className="mt-6 flex">
                                                <button 
                                                    onClick={() => toggleExpand(exp._id)}
                                                    className="flex items-center gap-2 text-ig-purple font-bold text-[10px] uppercase tracking-widest hover:text-ig-pink transition-colors group/btn"
                                                >
                                                    {isExpanded ? 'See Less' : 'See More'} 
                                                    <ChevronRight size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Side (Desktop) */}
                                    <div className="hidden md:block w-[45%]"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
