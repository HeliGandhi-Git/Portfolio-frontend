
import React, { useEffect, useState } from 'react';
import { FileText, Upload, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../../api';

interface ResumeData {
    _id: string;
    resumeUrl: string;
    filename: string;
    uploadDate: string;
}

const ManageResume: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    const fetchResume = async () => {
        try {
            const res = await api.get('/content/resume');
            setResumeData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResume();
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file type (only PDF)
            if (file.type !== 'application/pdf') {
                setStatus({ type: 'error', message: 'Only PDF files are allowed' });
                return;
            }

            // Check file size (e.g. 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setStatus({ type: 'error', message: 'File size should be less than 5MB' });
                return;
            }

            setUploading(true);
            setStatus({ type: null, message: '' });

            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const data = {
                        resumeUrl: reader.result as string,
                        filename: file.name
                    };

                    await api.post('/content/resume', data, {
                        headers: { 'x-auth-token': localStorage.getItem('token') }
                    });

                    setStatus({ type: 'success', message: 'Resume uploaded successfully' });
                    fetchResume();
                } catch (err) {
                    console.error(err);
                    setStatus({ type: 'error', message: 'Failed to upload resume' });
                } finally {
                    setUploading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gradient">Manage Resume</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-12 hover:border-ig-pink/50 transition-all group relative cursor-pointer">
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        disabled={uploading}
                    />
                    
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${uploading ? 'bg-gray-100' : 'bg-ig-pink/5 group-hover:bg-ig-pink/10'}`}>
                        {uploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-pink"></div>
                        ) : (
                            <Upload className="text-ig-pink w-8 h-8" />
                        )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {uploading ? 'Uploading...' : 'Click to Upload Resume'}
                    </h3>
                    <p className="text-gray-500 text-center max-w-xs">
                        Drag and drop your updated PDF resume here or click to browse. Max size 5MB.
                    </p>
                </div>

                {/* Status Message */}
                {status.type && (
                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                        <p className="font-medium text-sm">{status.message}</p>
                    </div>
                )}

                {/* Current Resume Info */}
                <div className="mt-12 pt-8 border-t border-gray-50">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Current Resume</h4>
                    
                    {loading ? (
                        <div className="flex items-center gap-4 animate-pulse">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-48 bg-gray-100 rounded"></div>
                                <div className="h-3 w-24 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    ) : resumeData ? (
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-red-500">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-gray-800">{resumeData.filename}</h5>
                                    <p className="text-xs text-gray-500">Uploaded on {new Date(resumeData.uploadDate).toLocaleDateString()} at {new Date(resumeData.uploadDate).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-8 text-gray-400">
                            <FileText size={48} strokeWidth={1} className="mb-2" />
                            <p>No resume uploaded yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageResume;
