
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setNotification(null); // Clear previous notifications

        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);

            // Show Success Notification
            setNotification({ type: 'success', message: 'Login Successful! Redirecting...' });

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/admin');
            }, 1500);

        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setNotification({ type: 'error', message: msg });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Notification Popup */}
            {notification && (
                <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 transform transition-all duration-500 animate-[slideIn_0.3s_ease-out] ${notification.type === 'success'
                        ? 'bg-white border-l-4 border-ig-green text-ig-dark'
                        : 'bg-white border-l-4 border-red-500 text-ig-dark'
                    }`}>
                    <div className={`p-1.5 rounded-full ${notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                        {notification.type === 'success' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">{notification.type === 'success' ? 'Success' : 'Error'}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-2xl shadow-hover w-full max-w-md relative z-10 border border-white/50 backdrop-blur-sm">
                <div className="flex flex-col items-center mb-8">
                    <img src="/logo.png" alt="Logo" className="h-20 w-20 object-contain mb-4 drop-shadow-sm" />
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ig-orange via-ig-pink to-ig-purple">Admin Portal</h2>
                    <p className="text-gray-500 mt-2 text-sm">Sign in to manage your portfolio</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-ig-pink focus:ring-2 focus:ring-ig-pink/20 outline-none transition-all duration-200"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-ig-pink focus:ring-2 focus:ring-ig-pink/20 outline-none transition-all duration-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-2 bg-instagram text-white rounded-lg font-bold shadow-glow hover:shadow-glow-hover hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-ig-purple/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-ig-orange/10 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};

export default Login;
