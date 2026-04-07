
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import { ArrowUp } from 'lucide-react';

const Home: React.FC = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="font-sans antialiased text-ig-dark bg-ig-light min-h-screen relative">
            {/* Navbar */}
            <Navbar />

            {/* Main Content Sections */}
            <main className="flex flex-col gap-0">
                <section id="hero">
                    <Hero />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="skills">
                    <Skills />
                </section>

                <section id="projects">
                    <Projects />
                </section>

                <section id="experience">
                    <Experience />
                </section>

                <section id="contact">
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <Footer />

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-instagram text-white shadow-glow transition-all duration-300 transform hover:scale-110 hover:shadow-glow-hover ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    }`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
};

export default Home;
