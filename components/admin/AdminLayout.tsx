
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Award, Code, LogOut, FileText } from 'lucide-react';
import api from '../../api';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            try {
                const res = await api.get('/auth/verify', {
                    headers: { 'x-auth-token': token }
                });
                console.log('Token verification result:', res.data);
                if (res.data.isValid) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    navigate('/admin/login');
                }
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/admin/login');
            }
        };

        verifyToken();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    if (!isAuthenticated) return null;

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
        { label: 'Skills', href: '/admin/skills', icon: <Code size={20} /> },
        { label: 'Projects', href: '/admin/projects', icon: <Briefcase size={20} /> },
        { label: 'Experience', href: '/admin/experience', icon: <Award size={20} /> },
        { label: 'Resume', href: '/admin/resume', icon: <FileText size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
                    <span className="font-bold text-lg text-gradient">Admin Panel</span>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.href
                                ? 'bg-instagram text-white shadow-glow'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-ig-pink'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
