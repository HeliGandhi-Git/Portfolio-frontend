import React, { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import api from '../api';

const Hero: React.FC = () => {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get('/content/resume');
        if (res.data && res.data.resumeUrl) {
          setResumeUrl(res.data.resumeUrl);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };
    fetchResume();
  }, []);

  const handleDownloadResume = () => {
    if (!resumeUrl) {
      alert("Resume not available yet. Please upload it from the admin panel.");
      return;
    }

    try {
      // For data URLs, converting to a Blob is more reliable for new tabs
      const base64Parts = resumeUrl.split(',');
      const byteString = atob(base64Parts[1]);
      const mimeString = base64Parts[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      const blobUrl = URL.createObjectURL(blob);

      // Open resume in new tab
      window.open(blobUrl, '_blank');

      // Trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Heli_Gandhi_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up after a short delay
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    } catch (err) {
      console.error("Error processing resume:", err);
      // Fallback to default behavior
      window.open(resumeUrl, '_blank');
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Heli_Gandhi_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="flex flex-col gap-6 order-2 md:order-1 animate-[slideInLeft_0.8s_ease-out]">
          <span className="inline-block px-4 py-1.5 rounded-full bg-ig-blue/5 text-ig-blue text-sm font-semibold w-fit border border-ig-blue/10">
            MERNSTACK DEVELOPER
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-ig-dark">
            HEY I'M <br />
            <span className="text-gradient">HELI GANDHI</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            I’m a B.Tech IT student and MERN stack developer focused on frontend, UI/UX design, and scalable web solutions,
            passionate about startups, modern web experiences, and an AI/ML enthusiast driven innovation.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-instagram text-white font-semibold shadow-glow hover:shadow-glow-hover hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              View Projects <ArrowRight size={20} />
            </a>

            {/* UPDATED DOWNLOAD BUTTON */}
            <button
              onClick={handleDownloadResume}
              className="px-8 py-4 rounded-full bg-transparent border-2 border-ig-purple text-ig-purple font-semibold hover:bg-ig-purple/5 transition-all duration-300 flex items-center gap-2"
            >
              Download CV <Download size={20} />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="order-1 md:order-2 flex justify-center items-center relative animate-[float_6s_ease-in-out_infinite]">
          <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">

            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ig-blue via-ig-pink to-ig-orange p-[4px] animate-spin-slow">
              <div className="w-full h-full bg-white rounded-full"></div>
            </div>

            <div className="absolute inset-[6px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="/Heli.jpeg"
                alt="Profile"
                className="w-full h-500 object-cover"
              />
            </div>

            <div className="absolute top-10 -left-4 bg-white p-3 rounded-2xl shadow-hover flex items-center gap-3 animate-[bounce_3s_infinite]">
              <div className="w-10 h-10 bg-ig-blue/10 rounded-full flex items-center justify-center text-xl">⚛️</div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Expert In</p>
                <p className="text-sm font-bold text-ig-dark">MERNSTACK</p>
              </div>
            </div>

            <div
              className="absolute bottom-10 -right-4 bg-white p-3 rounded-2xl shadow-hover flex items-center gap-3 animate-[bounce_4s_infinite]"
              style={{ animationDelay: '1s' }}
            >
              <div className="w-10 h-10 bg-ig-pink/10 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div>
                <p className="text-xs text-gray-500 font-medium">TOOLS</p>
                <p className="text-sm font-bold text-ig-dark">AI</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
