
import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Upload, Github, ExternalLink, Link } from 'lucide-react';
import api from '../../api';
import ConfirmModal from './ConfirmModal';

interface Project {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    linkType: 'github' | 'live' | 'none';
    url: string;
}

const ManageProjects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: '',
        tags: '',
        linkType: 'none' as 'github' | 'live' | 'none',
        url: ''
    });

    const fetchProjects = async () => {
        try {
            const res = await api.get('/content/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim());
            // If No Link is selected, ensure URL is empty
            const data = {
                ...formData,
                tags: tagsArray,
                url: formData.linkType === 'none' ? '' : formData.url
            };

            if (isEditing && editId) {
                await api.put(`/content/projects/${editId}`, data, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
            } else {
                await api.post('/content/projects', data, {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
            }
            fetchProjects();
            resetForm();
        } catch (err) {
            console.error(err);
            alert(`Failed to ${isEditing ? 'update' : 'add'} project`);
        }
    };

    const handleEdit = (project: Project) => {
        setIsEditing(true);
        setEditId(project._id);
        setFormData({
            title: project.title,
            category: project.category,
            description: project.description,
            image: project.image,
            tags: project.tags.join(', '),
            linkType: project.linkType || 'none',
            url: project.url || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({
            title: '',
            category: '',
            description: '',
            image: '',
            tags: '',
            linkType: 'none',
            url: ''
        });
    };

    const openDeleteModal = (id: string) => {
        setProjectToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!projectToDelete) return;
        try {
            await api.delete(`/content/projects/${projectToDelete}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            fetchProjects();
            setIsDeleteModalOpen(false);
            setProjectToDelete(null);
        } catch (err) {
            console.error(err);
            alert('Failed to delete project');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8 text-gradient">Manage Projects</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none transition-all"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category (e.g. E-Commerce)"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none transition-all"
                        required
                    />

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <ImageIcon size={16} /> Project Image
                        </label>
                        <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-ig-pink/50 transition-all cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                            ) : (
                                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                    <Upload size={24} />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Tech Stack (comma separated)"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none transition-all"
                        required
                    />

                    <div className="md:col-span-2 space-y-4">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                           <Link size={16} /> Project Link Configuration
                        </label>
                        <div className="flex flex-wrap gap-4">
                            <label className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${formData.linkType === 'none' ? 'bg-gray-800 text-white border-gray-800 shadow-lg' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                                <input
                                    type="radio"
                                    name="linkType"
                                    value="none"
                                    checked={formData.linkType === 'none'}
                                    onChange={() => setFormData({ ...formData, linkType: 'none', url: '' })}
                                    className="hidden"
                                />
                                No Link
                            </label>
                            <label className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${formData.linkType === 'github' ? 'bg-ig-purple text-white border-ig-purple shadow-glow-hover' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                                <input
                                    type="radio"
                                    name="linkType"
                                    value="github"
                                    checked={formData.linkType === 'github'}
                                    onChange={() => setFormData({ ...formData, linkType: 'github' })}
                                    className="hidden"
                                />
                                <Github size={18} /> GitHub
                            </label>
                            <label className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${formData.linkType === 'live' ? 'bg-ig-pink text-white border-ig-pink shadow-glow-hover' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                                <input
                                    type="radio"
                                    name="linkType"
                                    value="live"
                                    checked={formData.linkType === 'live'}
                                    onChange={() => setFormData({ ...formData, linkType: 'live' })}
                                    className="hidden"
                                />
                                <ExternalLink size={18} /> Project Live
                            </label>
                        </div>
                    </div>

                    {formData.linkType !== 'none' && (
                        <input
                            type="url"
                            placeholder={formData.linkType === 'github' ? "GitHub Repository URL" : "Live Project URL"}
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none transition-all animate-[slideDown_0.2s_ease-out]"
                            required={formData.linkType !== 'none'}
                        />
                    )}

                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-ig-pink/20 outline-none h-24 transition-all"
                        required
                    />
                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-instagram text-white rounded-lg font-medium shadow-glow hover:shadow-glow-hover flex items-center justify-center gap-2"
                        >
                            {isEditing ? 'Update Project' : <><Plus size={20} /> Add Project</>}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 group relative">
                            <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 break-words">{project.title}</h3>
                                <p className="text-xs text-gray-500 mb-2 break-all">{project.category}</p>
                                <p className="text-sm text-gray-600 line-clamp-2 break-words">{project.description}</p>
                            </div>
                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="text-gray-400 hover:text-ig-purple transition-colors p-1"
                                    title="Edit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                </button>
                                <button
                                    onClick={() => openDeleteModal(project._id)}
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
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};

export default ManageProjects;
