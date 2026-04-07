
import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../api';
import ConfirmModal from './ConfirmModal';

interface Skill {
    _id: string;
    name: string;
    level: number;
    category: string;
}

const ManageSkills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        level: 50,
        category: 'Languages & Frameworks'
    });

    const fetchSkills = async () => {
        try {
            const res = await api.get('/content/skills');
            setSkills(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && editId) {
                await api.put(`/content/skills/${editId}`, formData, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
            } else {
                await api.post('/content/skills', formData, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
            }
            fetchSkills();
            resetForm();
        } catch (err) {
            console.error(err);
            alert(`Failed to ${isEditing ? 'update' : 'add'} skill`);
        }
    };

    const handleEdit = (skill: Skill) => {
        setIsEditing(true);
        setEditId(skill._id);
        setFormData({
            name: skill.name,
            level: skill.level,
            category: skill.category
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', level: 50, category: 'Languages & Frameworks' });
    };

    const openDeleteModal = (id: string) => {
        setSkillToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!skillToDelete) return;
        try {
            await api.delete(`/content/skills/${skillToDelete}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchSkills();
            setIsDeleteModalOpen(false);
            setSkillToDelete(null);
        } catch (err) {
            console.error(err);
            alert('Failed to delete skill');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8 text-gradient">Manage Skills</h1>

            {/* Add/Edit Skill Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Skill' : 'Add New Skill'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Skill Name (e.g. React)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none"
                        required
                    />
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none"
                    >
                        <option>Languages & Frameworks</option>
                        <option>Tools & Technologies</option>
                    </select>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 w-12">{formData.level}%</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                            className="flex-1 accent-ig-pink"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-instagram text-white rounded-lg font-medium shadow-glow hover:shadow-glow-hover flex items-center justify-center gap-2"
                        >
                            {isEditing ? 'Update Skill' : <><Plus size={20} /> Add Skill</>}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    skills.map((skill) => (
                        <div key={skill._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-gray-800 break-words">{skill.name}</h3>
                                    <p className="text-xs text-gray-500 break-all">{skill.category} • {skill.level}%</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="text-gray-400 hover:text-ig-purple transition-colors p-1"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                </button>
                                <button
                                    onClick={() => openDeleteModal(skill._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Delete Skill"
                message="Are you sure you want to delete this skill? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};

export default ManageSkills;
