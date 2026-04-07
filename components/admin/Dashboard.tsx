
import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Briefcase, Award, Code } from 'lucide-react';
import api from '../../api';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({ skills: 0, projects: 0, experience: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [skillsRes, projectsRes, expRes] = await Promise.all([
                    api.get('/content/skills'),
                    api.get('/content/projects'),
                    api.get('/content/experiences')
                ]);

                // Count total skills (sum of all skills in all categories)
                const totalSkills = skillsRes.data.reduce((acc: number, cat: any) => acc + (cat.skills ? cat.skills.length : 0), 0);
                // Sometimes skills might be returned flat or categorized. Assuming flat list from backend model based on schema.
                // Wait, schema is 'name', 'level', 'category'. So it returns a flat list of skills.
                // My previous constants.ts had nested structure. The backend returns flat list.
                // So total skills is just skillsRes.data.length

                setStats({
                    skills: skillsRes.data.length,
                    projects: projectsRes.data.length,
                    experience: expRes.data.length
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Skills', value: stats.skills, icon: <Code size={24} />, color: 'bg-blue-50 text-blue-600' },
        { label: 'Projects', value: stats.projects, icon: <Briefcase size={24} />, color: 'bg-purple-50 text-purple-600' },
        { label: 'Experience', value: stats.experience, icon: <Award size={24} />, color: 'bg-pink-50 text-pink-600' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-lg ${card.color}`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                            <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
