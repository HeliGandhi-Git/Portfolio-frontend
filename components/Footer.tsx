import React from 'react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.44-.78-3.5.25-1.2.1-2.42-.56-3.66 0 0-1 0-3 1.5a9.28 9.28 0 0 0-6 0c-2-1.5-3-1.5-3-1.5-.66 1.24-.81 2.46-.56 3.66a4.86 4.86 0 0 0-1 3.5c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
            <span className="text-2xl font-bold tracking-tight text-gradient">Heli's Portfolio</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

        <div className="flex gap-8 md:pr-16">
          <a
            href="https://github.com/HeliGandhi-Git"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-instagram hover:text-white transition-all duration-300 shadow-sm hover:shadow-glow hover:-translate-y-1"
          >
            <GithubIcon size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/heli-gandhi-a42198369"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-instagram hover:text-white transition-all duration-300 shadow-sm hover:shadow-glow hover:-translate-y-1"
          >
            <LinkedinIcon size={24} />
          </a>
          <a
            href="https://www.instagram.com/_4114heli"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-instagram hover:text-white transition-all duration-300 shadow-sm hover:shadow-glow hover:-translate-y-1"
          >
            <InstagramIcon size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;