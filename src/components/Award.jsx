import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- GLOBAL CACHE ---
let achievementsCache = null;

// Helper function to decide color theme based on position text
// (Colors kept vivid for contrast against white cards)
const getAwardTheme = (pos) => {
  const p = pos?.toLowerCase() || "";
  if (p.includes("1st") || p.includes("winner") || p.includes("first")) return { color: "#f59e0b", label: "WINNER" }; // Amber-500
  if (p.includes("2nd") || p.includes("runner") || p.includes("second")) return { color: "#64748b", label: "RUNNER UP" }; // Slate-500
  if (p.includes("3rd") || p.includes("third")) return { color: "#d97706", label: "KEEP IT UP" }; // Amber-600
  return { color: "#8b5cf6", label: "PARTICIPATION" }; // Violet-500
};

const Award = ({ slideIndex = 0 }) => {
  const [achievements, setAchievements] = useState(achievementsCache || []);
  const [loading, setLoading] = useState(!achievementsCache);
  const ITEMS_PER_PAGE = 3; 

  useEffect(() => {
    if (achievementsCache) return;

    const fetchData = async () => {
      try {
        const response = await fetch('/kietdata/filter?year=2');
        const data = await response.json();
        const latestData = data.slice().reverse(); 
        achievementsCache = latestData;
        setAchievements(latestData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); 

  // --- PAGINATION LOGIC ---
  const totalRecords = achievements.length;
  const startIndex = (slideIndex * ITEMS_PER_PAGE) % (totalRecords || 1);
  const currentItems = achievements.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (currentItems.length < ITEMS_PER_PAGE && totalRecords > ITEMS_PER_PAGE) {
    const needed = ITEMS_PER_PAGE - currentItems.length;
    currentItems.push(...achievements.slice(0, needed));
  }

  if (loading) return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F8F9FA]">
      <div className="w-12 h-12 border-4 border-[#E67E22]/20 border-t-[#E67E22] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="relative w-full h-full bg-[#F8F9FA] text-[#2C3E50] pt-24 px-6 md:px-10 pb-20 overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
               // Dark slate grid on light background
               backgroundImage: `linear-gradient(#2C3E50 1px, transparent 1px), linear-gradient(90deg, #2C3E50 1px, transparent 1px)`, 
               backgroundSize: '40px 40px', 
               maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)' 
             }} 
        />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], opacity: [0.1, 0.2, 0.1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E67E22]/30 blur-[120px] rounded-full" 
        />
      </div>

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-16 text-center"
        >
          <h2 className="text-[#E67E22] text-md font-black uppercase tracking-[0.6em] mb-0">Elite Student Recognition</h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#D35400] bg-clip-text text-transparent drop-shadow-sm">Wall of Fame</h1>
          <p className="text-[#2C3E50]/40 text-xs mt-4 uppercase tracking-[0.3em] font-bold">
            Showing Records {startIndex + 1} to {startIndex + currentItems.length} of {totalRecords}
          </p>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <div className="grid w-full max-w-7xl mx-auto gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentItems.map((item, index) => {
            const theme = getAwardTheme(item["Your position /Achievement"]);
            
            return (
              <motion.div
                key={`${slideIndex}-${index}`} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative group bg-white border border-gray-200 rounded-[3rem] p-6 flex flex-col items-center shadow-xl hover:shadow-2xl overflow-hidden cursor-default justify-between"
              >
                
                {/* --- AMBIENT GLOWING BALLS (Subtle on light bg) --- */}
                <div 
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[60px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none"
                  style={{ backgroundColor: theme.color }}
                />
                <div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none"
                  style={{ backgroundColor: theme.color }}
                />

                {/* Ribbon Badge */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none z-20">
                  <div className="absolute top-6 right-[-35px] p-2 rotate-45 text-center w-40 shadow-md" style={{ backgroundColor: theme.color }}>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest drop-shadow-sm">{theme.label}</span>
                  </div>
                </div>

                {/* --- HEADER: Avatar & Name --- */}
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-[#E67E22]/10 blur-xl rounded-full transform scale-110"></div>
                    <img 
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(item["Student Name"])}`} 
                      className="relative w-28 h-28 rounded-3xl border-4 border-white bg-gray-50 p-2 shadow-lg" 
                      alt="Student" 
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-1 line-clamp-1">{item["Student Name"]}</h3>
                  <p className="text-[#E67E22] text-[10px] font-bold uppercase tracking-widest mb-6">
                    {item.year}st Year | CS-{item.section}
                  </p>
                </div>

                {/* --- BODY: Description --- */}
                <div className="relative z-10 w-full px-4 flex-grow flex flex-col justify-center items-center mb-10">
                  <p className="w-full text-[#2C3E50]/80 text-sm font-medium leading-relaxed text-center line-clamp-4">
                    "{item["Short Description about the event"]}"
                  </p>
                </div>

                {/* --- FOOTER: Event Context --- */}
                <div className="relative z-10 w-full mt-auto">
                  <div className="bg-[#F8F9FA] rounded-2xl py-3 px-4 border border-gray-100 transition-colors group-hover:bg-[#E67E22]/5 text-center">
                    <h4 
                      className="text-[9px] font-black uppercase tracking-widest mb-1 truncate"
                      style={{ color: theme.color }} 
                    >
                      {item["Event Name/ Title"]}
                    </h4>
                    <p className="text-sm font-bold text-[#2C3E50] truncate opacity-90">
                        @ {item["Organization \n[Organization in which event happened]"]}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Award;