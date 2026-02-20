import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- DUMMY DATA ARRAY ---
const INTERNSHIPS = [
  {
    company: "TCS iON",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hk-cCmmtCp1D7LPyaZeJPruelynAA9KP3A&s", 
    role: "Young Professional Internship",
    description: "Join TCS's elite early-career program designed to bridge the gap between academic theory and industry reality. You will work on live cloud infrastructure projects and AI-driven automation tools under the mentorship of senior architects.",
    type: "Remote / Hybrid",
    targetAudience: "CS / IT / AI-DS (1st & 2nd Year)",
    deadline: "Feb 28, 2026",
    stipend: "₹15,000 - ₹25,000 / Month",
    link: "https://www.tcs.com/careers", 
    eligibility: [
      "B.Tech 2027/28 Batch",
      "Min CGPA: 6.0 (No Backlogs)",
      "Skill: Python / Java / C++",
      "Problem Solving"
    ]
  },
  {
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    role: "Software Engineering Intern",
    description: "Develop the next-generation technologies that change how billions of users connect, explore, and interact with information. Work directly with massive distributed systems and highly scalable cloud infrastructure.",
    type: "On-site (Bangalore)",
    targetAudience: "CS / IT (Pre-final Year)",
    deadline: "Mar 15, 2026",
    stipend: "₹80,000 / Month",
    link: "https://careers.google.com/students/",
    eligibility: [
      "B.Tech 2027 Batch",
      "Strong DSA Proficiency",
      "C++ / Java / Go / Python",
      "Excellent OS Concepts"
    ]
  },
  {
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    role: "Data Science Intern",
    description: "Empower every person and organization to achieve more. Dive into petabytes of data to build predictive machine learning models and deliver actionable insights for core Azure cognitive services.",
    type: "Hybrid",
    targetAudience: "AI-DS / CS (3rd Year)",
    deadline: "Mar 10, 2026",
    stipend: "₹75,000 / Month",
    link: "https://careers.microsoft.com/students/",
    eligibility: [
      "B.Tech 2027 Batch",
      "ML / AI Fundamentals",
      "Python / SQL / R",
      "Strong Analytical Skills"
    ]
  }
];

// Global variable to keep track of the cycle across unmounts/remounts
let globalInternshipIndex = 0;

const Opor = () => {
  // Grab the current index on mount, then increment it for the next time this component is rendered
  const [dataIndex] = useState(() => {
    const indexToUse = globalInternshipIndex;
    globalInternshipIndex = (globalInternshipIndex + 1) % INTERNSHIPS.length;
    return indexToUse;
  });

  const DATA = INTERNSHIPS[dataIndex];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 50 } 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen relative overflow-hidden w-full">
      
      {/* --- DOT GRID PATTERN BACKGROUND --- */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      {/* --- DEMO DATA BADGE --- */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#2C3E50] text-white px-4 py-1.5 rounded-full shadow-lg border border-white/20">
         <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse"></span>
         <span className="text-xs font-bold tracking-[0.2em] uppercase">Demo Data Display</span>
      </div>

      <motion.div 
        key={dataIndex} // Forces Framer Motion to replay the entry animation
        className="min-h-[85vh] w-full max-w-7xl px-16 py-12 flex justify-between items-stretch relative z-10 font-sans"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- BACKGROUND WATERMARK --- */}
        <div className="absolute right-[-5%] bottom-[-5%] w-[80vh] h-[80vh] opacity-[0.03] pointer-events-none z-0">
           <img src={DATA.logo} alt="Watermark" className="w-full h-full object-contain grayscale" />
        </div>

        {/* --- LEFT COLUMN: CONTENT (60%) --- */}
        <div className="w-[60%] flex flex-col justify-center gap-8 relative z-10">
          
          {/* 1. Company Identity */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
             <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 flex items-center justify-center w-16 h-16">
                <img src={DATA.logo} alt={`${DATA.company} Logo`} className="max-h-full max-w-full object-contain" />
             </div>
             <span className="text-[#E67E22] font-bold tracking-[0.2em] uppercase text-sm border-l-2 border-[#E67E22] pl-4 bg-white/50 py-1 px-2 rounded-r-md backdrop-blur-sm">
                Official Campus Hiring
             </span>
          </motion.div>

          {/* 2. Main Title (Orange Theme Gradient) */}
          <motion.div variants={itemVariants}>
             <h1 className="text-6xl xl:text-7xl font-black bg-gradient-to-r from-[#d35400] via-[#e67e22] to-[#f39c12] bg-clip-text text-transparent leading-tight tracking-tight mb-4 py-1">
               {DATA.role}
             </h1>
             <div className="flex gap-5 text-[#7f8c8d] font-medium text-xl items-center">
                <span className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-lg shadow-sm">
                  <svg className="w-5 h-5 text-[#2C3E50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  {DATA.type}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22]"></span>
                
                {/* Glowing Stipend */}
                <span className="bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/40 shadow-[0_0_15px_rgba(230,126,34,0.4)] px-4 py-1.5 rounded-lg font-bold">
                  {DATA.stipend}
                </span>
             </div>
          </motion.div>

          {/* 3. Description */}
          <motion.div variants={itemVariants} className="border-l-4 border-[#e67e22]/40 pl-6 h-24">
             <p className="text-xl text-[#2C3E50]/80 leading-relaxed max-w-2xl line-clamp-3 bg-white/40 p-2 rounded-r-lg shadow-sm backdrop-blur-sm">
                {DATA.description}
             </p>
          </motion.div>

          {/* 4. Condensed Eligibility Block */}
          <motion.div variants={itemVariants} className="mt-4">
              <h3 className="text-[#E67E22] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Minimum Requirements
              </h3>
              <div className="bg-white/80 backdrop-blur-md border border-white p-6 rounded-2xl shadow-xl max-w-2xl">
                <div className="flex flex-wrap gap-3">
                   {DATA.eligibility.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-[#f8f9fa] text-[#2C3E50] font-semibold text-sm md:text-base rounded-lg border border-gray-200 shadow-sm"
                      >
                        {item}
                      </span>
                   ))}
                </div>
              </div>
          </motion.div>

        </div>

        {/* --- RIGHT COLUMN: ACTION (35%) --- */}
        <div className="w-[35%] flex flex-col justify-between items-end relative z-10 py-6">
           
           {/* Highlighted Deadline Alert (Pushed to Top Right) */}
           <motion.div 
              variants={itemVariants}
              className="flex flex-col items-end w-full"
           >
              <div className="bg-[#E67E22]/10 text-[#d35400] font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-t-lg border-t border-l border-r border-[#E67E22]/20 shadow-sm">
                 Application Deadline
              </div>
              <div className="bg-white px-8 py-5 rounded-2xl rounded-tr-none shadow-2xl border-2 border-[#E67E22]/30 w-full text-center relative overflow-hidden">
                 {/* Subtle highlight slash in background of card */}
                 <div className="absolute top-0 right-0 w-16 h-16 bg-[#E67E22]/5 rounded-bl-[100px] pointer-events-none"></div>
                 
                 <p className="text-5xl font-mono font-black text-[#2C3E50] tracking-tighter">
                    {DATA.deadline}
                 </p>
              </div>
           </motion.div>

           {/* QR Code Block (Pushed to Bottom Right) */}
           <motion.div 
             variants={itemVariants}
             className="relative bg-white p-5 rounded-[2rem] shadow-2xl border-4 border-white/80 mt-auto"
           >
              <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(DATA.link)}&color=d35400`} 
                 alt={`Scan to Apply for ${DATA.company}`} 
                 className="w-56 h-56 mix-blend-multiply"
              />
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center translate-x-[-50%]">
                 <span className="text-[#d35400] font-bold text-xs uppercase tracking-[0.3em] whitespace-nowrap bg-white/90 px-2 py-1 rounded shadow-sm">
                    Scan to Apply
                 </span>
              </div>
           </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Opor;