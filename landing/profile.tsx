import React, { useState, useEffect, Suspense, lazy } from 'react';

// Lazy load content components
const WorkContent = lazy(() => Promise.resolve({ default: WorkSection }));
const AboutContent = lazy(() => Promise.resolve({ default: AboutSection }));
const ResumeContent = lazy(() => Promise.resolve({ default: ResumeSection }));
const ContactContent = lazy(() => Promise.resolve({ default: ContactSection }));

// Loading component
const ContentLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-white/10 border-t-white/30 animate-spin"
           style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
  </div>
);

// Animated text component
const AnimatedText: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <span 
      className={`inline-block transition-all duration-700 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {text}
    </span>
  );
};

// Work Section Component
function WorkSection() {
  const projects = [
    {
      id: 1,
      title: 'Nebula UI',
      category: 'Design System',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 2,
      title: 'Flux Mobile',
      category: 'iOS App',
      image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 3,
      title: 'Echo Dashboard',
      category: 'Web Platform',
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80'
    }
  ];

  return (
    <section className="animate-fadeIn">
      <header className="mb-10">
        <h2 className="text-3xl font-light text-white mb-2">
          <AnimatedText text="Selected Work" />
        </h2>
        <p className="text-sm text-white/50">
          <AnimatedText text="Recent design projects" delay={100} />
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02] cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-square overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-light text-white mb-1">{project.title}</h3>
              <p className="text-xs text-white/50 uppercase tracking-wider">{project.category}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h10v10"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  return (
    <section className="animate-fadeIn">
      <header className="mb-10">
        <h2 className="text-3xl font-light text-white mb-2">
          <AnimatedText text="About Me" />
        </h2>
      </header>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
        <p className="text-lg font-light leading-relaxed text-white/80 mb-6">
          <AnimatedText 
            text="I'm a product designer with 8+ years of experience creating digital experiences that are both beautiful and functional. My approach combines strategic thinking with a keen eye for aesthetics and a deep understanding of user needs."
            delay={100}
          />
        </p>
        
        <p className="text-lg font-light leading-relaxed text-white/80 mb-8">
          <AnimatedText 
            text="My design philosophy centers around simplicity, accessibility, and purpose. I believe that great design should feel intuitive and enhance the user's experience without calling attention to itself."
            delay={200}
          />
        </p>
        
        <div className="pt-8 border-t border-white/10">
          <h3 className="text-xl font-light text-white mb-6">
            <AnimatedText text="Areas of Expertise" delay={300} />
          </h3>
          <div className="flex flex-wrap gap-3">
            {['UI/UX Design', 'Design Systems', 'Product Strategy', 'Prototyping', 'User Research', 'Brand Identity'].map((skill, index) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                style={{ 
                  animation: 'slideUp 0.5s ease-out forwards',
                  animationDelay: `${400 + index * 50}ms`,
                  opacity: 0
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Resume Section Component
function ResumeSection() {
  const experiences = [
    {
      position: 'Senior Product Designer',
      company: 'Nebula Technologies',
      period: '2020—Present',
      description: 'Led design for flagship SaaS product, increasing user engagement by 43% and reducing churn by 25%.'
    },
    {
      position: 'Product Designer',
      company: 'Flux Digital',
      period: '2017—2020',
      description: 'Designed mobile applications for Fortune 500 clients, managing end-to-end design process.'
    },
    {
      position: 'UI/UX Designer',
      company: 'Echo Labs',
      period: '2015—2017',
      description: 'Created user interfaces for web platforms, focusing on accessibility and performance.'
    }
  ];

  return (
    <section className="animate-fadeIn">
      <header className="mb-10">
        <h2 className="text-3xl font-light text-white mb-2">
          <AnimatedText text="Resume" />
        </h2>
      </header>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 mb-6">
        <h3 className="text-xl font-light text-white mb-8">
          <AnimatedText text="Work Experience" delay={100} />
        </h3>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className="pb-6 border-b border-white/10 last:border-0"
              style={{ 
                animation: 'slideUp 0.5s ease-out forwards',
                animationDelay: `${200 + index * 100}ms`,
                opacity: 0
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-light text-white">{exp.position}</h4>
                  <p className="text-sm text-white/50">{exp.company}</p>
                </div>
                <span className="text-sm text-white/50">{exp.period}</span>
              </div>
              <p className="text-sm text-white/70 mt-3">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
        <h3 className="text-xl font-light text-white mb-6">
          <AnimatedText text="Education" delay={500} />
        </h3>
        
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-light text-white">MFA, Interaction Design</h4>
            <p className="text-sm text-white/50">California Institute of the Arts</p>
          </div>
          <span className="text-sm text-white/50">2013—2015</span>
        </div>
        
        <button className="mt-8 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-all duration-300 flex items-center group">
          Download CV
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <section className="animate-fadeIn">
      <header className="mb-10">
        <h2 className="text-3xl font-light text-white mb-2">
          <AnimatedText text="Get in Touch" />
        </h2>
      </header>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8">
        <p className="text-lg font-light text-white/80 mb-8">
          <AnimatedText text="I'm always interested in hearing about new projects and opportunities." delay={100} />
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center group">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Email</p>
              <a href="mailto:alex@example.com" className="text-lg text-white hover:text-white/80 transition-colors">
                alex@example.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center group">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Location</p>
              <p className="text-lg text-white">San Francisco, CA</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs text-white/50 uppercase tracking-wider mb-4">Connect</p>
          <div className="flex space-x-4">
            {[
              { name: 'LinkedIn', icon: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z' },
              { name: 'GitHub', icon: 'M12 2A10 10 0 002 12a10 10 0 006.839 9.49c.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10 10 0 0022 12 10 10 0 0012 2z' },
              { name: 'Dribbble', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Component
const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'work' | 'about' | 'resume' | 'contact'>('work');

  const renderContent = () => {
    switch (activeSection) {
      case 'work':
        return <WorkContent />;
      case 'about':
        return <AboutContent />;
      case 'resume':
        return <ResumeContent />;
      case 'contact':
        return <ContactContent />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 p-8 flex flex-col">
          <div className="mb-12">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-2 ring-white/20 ring-offset-4 ring-offset-black">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=160&h=160&q=80" 
                alt="Alex Morgan"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-light text-white mb-2">Alex Morgan</h1>
            <p className="text-sm text-white/50">Product Designer</p>
          </div>
          
          <nav className="space-y-2">
            {(['work', 'about', 'resume', 'contact'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left py-3 px-4 rounded-lg text-sm font-light transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          
          <div className="mt-auto">
            <div className="flex space-x-3 mb-6">
              {['linkedin', 'github', 'dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-white/30 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={
                      social === 'linkedin' 
                        ? "M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                        : social === 'github'
                        ? "M12 2A10 10 0 002 12a10 10 0 006.839 9.49c.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10 10 0 0022 12 10 10 0 0012 2z"
                        : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    } />
                  </svg>
                </a>
              ))}
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <p className="text-xs text-white/30">© 2023 Alex Morgan</p>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-12 overflow-y-auto">
          <Suspense fallback={<ContentLoader />}>
            {renderContent()}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Home;
