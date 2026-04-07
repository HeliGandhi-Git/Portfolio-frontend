
import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Briefcase, Calendar, Building, AlignLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../../api';
import ConfirmModal from './ConfirmModal';

interface Experience {
    _id: string;
    duration: string;
    jobTitle: string;
    companyName: string;
    description: string;
}

const ManageExperience: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [experienceToDelete, setExperienceToDelete] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [formData, setFormData] = useState({
        duration: '',
        jobTitle: '',
        companyName: '',
        description: ''
    });

    const fetchExperiences = async () => {
        try {
            const res = await api.get('/content/experiences');
            setExperiences(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: null, message: '' });
        try {
            if (isEditing && editId) {
                await api.put(`/content/experiences/${editId}`, formData, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setStatus({ type: 'success', message: 'Experience updated successfully!' });
            } else {
                await api.post('/content/experiences', formData, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setStatus({ type: 'success', message: 'Experience added successfully!' });
            }
            fetchExperiences();
            resetForm();
            // Clear message after 3 seconds
            setTimeout(() => setStatus({ type: null, message: '' }), 3000);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: `Failed to ${isEditing ? 'update' : 'add'} experience.` });
        }
    };

    const handleEdit = (exp: Experience) => {
        setIsEditing(true);
        setEditId(exp._id);
        setFormData({
            duration: exp.duration,
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            description: exp.description
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({
            duration: '',
            jobTitle: '',
            companyName: '',
            description: ''
        });
    };

    const openDeleteModal = (id: string) => {
        setExperienceToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!experienceToDelete) return;
        try {
            await api.delete(`/content/experiences/${experienceToDelete}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchExperiences();
            setIsDeleteModalOpen(false);
            setExperienceToDelete(null);
        } catch (err) {
            console.error(err);
            alert('Failed to delete experience');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8 text-gradient">Manage Experience</h1>

            {/* Status Message */}
            {status.type && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-[slideInUp_0.3s_ease-out] ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    <p className="font-medium text-sm">{status.message}</p>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Experience' : 'Add New Experience'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                           <Calendar size={14} /> Duration (e.g. 2023 - Present)
                        </label>
                        <input
                            type="text"
                            placeholder="Duration"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                           <Briefcase size={14} /> Job Title
                        </label>
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={formData.jobTitle}
                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                           <Building size={14} /> Company Name
                        </label>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                           <AlignLeft size={14} /> Description
                        </label>
                        <textarea
                            placeholder="Briefly describe your responsibilities and achievements"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none h-32"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-instagram text-white rounded-lg font-medium shadow-glow hover:shadow-glow-hover flex items-center justify-center gap-2"
                        >
                            {isEditing ? 'Update Experience' : <><Plus size={20} /> Add Experience</>}
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

            <div className="space-y-4">
                {loading ? (
                    <p>Loading experiences...</p>
                ) : experiences.length === 0 ? (
                    <p className="text-center py-8 text-gray-500 bg-white rounded-xl border border-gray-100">No experiences added yet.</p>
                ) : (
                    experiences.map((exp) => (
                        <div key={exp._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start group hover:border-ig-pink/20 transition-all">
                            <div>
                                <div className="flex items-center gap-2 text-ig-pink text-xs font-bold uppercase tracking-wider mb-1">
                                    <Calendar size={12} /> {exp.duration}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
                                <p className="text-ig-purple font-semibold mb-2">{exp.companyName}</p>
                                <p className="text-gray-600 text-sm whitespace-pre-wrap">{exp.description}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(exp)}
                                    className="p-2 text-gray-400 hover:text-ig-blue transition-colors"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                </button>
                                <button
                                    onClick={() => openDeleteModal(exp._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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
                title="Delete Experience"
                message="Are you sure you want to delete this experience record? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};

export default ManageExperience;
