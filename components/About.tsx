import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
      <div className="flex flex-col items-center text-center">

        {/* Heading */}
        <h2 className="text-sm font-bold tracking-widest text-ig-pink uppercase mb-2">
          About Me
        </h2>

        <h3 className="text-4xl font-bold text-ig-dark mb-4">
          Clean design. Scalable code.{' '}
          <span className="text-gradient">Modern web experiences.</span>
        </h3>

        <div className="w-20 h-1.5 bg-instagram rounded-full mx-auto mb-6"></div>

        {/* Content */}
        <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mb-4">
          I’m a BTech IT student and MERN stack developer with a strong focus on frontend engineering, UI/UX design, and product-led digital experiences. I specialize in building clean, modern, and scalable web interfaces that balance aesthetics with performance.
        </p>

        <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mb-4">
          Driven by curiosity and innovation, I actively explore emerging technologies including AI/ML, modern frontend frameworks, and digital product marketing to create solutions that are both technically sound and user-centric.
        </p>

        <p className="text-gray-600 leading-relaxed text-lg max-w-3xl">
          This portfolio represents my journey as a growing tech professional—showcasing my work in full-stack web development, IT solutions, and premium digital products, with a clear vision toward building future-ready digital experiences.
        </p>

        {/* Button */}
        <div className="mt-6">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <button className="text-ig-purple font-semibold border-b-2 border-ig-purple pb-1 hover:text-ig-pink hover:border-ig-pink transition-all duration-300">
              Contact Me
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
