import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFormStatus('success');
        requestAnimationFrame(() => {
          form.reset();
        });
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact">
      <div className=" max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Side: Info */}
            <div className="bg-instagram p-10 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-ig-blue opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Let's Chat!</h2>
                <p className="text-white/90 text-lg mb-12">
                  Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Email Me</p>
                      <p className="font-semibold text-lg">heligandhi4114@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Call Me</p>
                      <p className="font-semibold text-lg">+91 9377530775</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Location</p>
                      <p className="font-semibold text-lg">India , Ahmedabad</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-10">
                <p className="text-sm opacity-60">© {new Date().getFullYear()} Heli's Portfolio</p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-10 md:p-16 bg-white">
              <h3 className="text-2xl font-bold text-ig-dark mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="access_key" value="195742ea-2037-4c3a-b339-0c6f6be4dbc8" />
                <input type="hidden" name="subject" value="New Portfolio Contact Message" />
                <input type="hidden" name="from_name" value="Heli Portfolio Website" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name="first_name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-ig-purple focus:ring-2 focus:ring-ig-purple/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="last_name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-ig-purple focus:ring-2 focus:ring-ig-purple/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-ig-purple focus:ring-2 focus:ring-ig-purple/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-ig-purple focus:ring-2 focus:ring-ig-purple/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none" placeholder="Tell me about your project..."></textarea>
                </div>

                <button type="submit" disabled={formStatus === 'submitting'} className="w-full py-4 rounded-full bg-instagram text-white font-bold shadow-glow hover:shadow-glow-hover hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {formStatus === 'submitting' ? <span>Sending...</span> : <>Send Message <Send size={20} /></>}
                </button>

                {formStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-600 rounded-xl text-center font-medium animate-[fadeIn_0.5s_ease-out]">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
