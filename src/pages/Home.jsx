import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Buildings,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Clock,
  Leaf,
  Lightbulb,
  MapPin,
  Phone,
  Quotes,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  WhatsappLogo,
  Wrench,
} from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import siteData from '../data/siteData';


/* ================================================================
   UTILITY — Icon map for services
   ================================================================ */
const iconMap = {
  Heart: Star, Briefcase: Star, Star, Buildings: Star, Leaf: Star, Lightbulb: Star,
  ShieldCheck: CheckCircle, Target: Star, Wrench: Star, Rocket: Star, Ruler: Star,
};
try { const ph = require('@phosphor-icons/react'); Object.keys(iconMap).forEach(k => { if (ph[k]) iconMap[k] = ph[k]; }); } catch(e) {}


/* ================================================================
   ANIMATED COUNTER
   ================================================================ */
function AnimatedCounter({ target, suffix = '', duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericTarget = parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = numericTarget / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numericTarget, duration]);

  return <span ref={ref}>{inView ? count.toLocaleString() : '0'}{suffix}</span>;
}


/* ================================================================
   NOISE TEXTURE
   ================================================================ */
function NoiseTexture({ opacity = 0.035 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
    }} />
  );
}


/* ================================================================
   HERO
   ================================================================ */

function HeroSection() {
  const { business, hero } = siteData;
  const heroImages = hero.backgroundImages.map(img => img.url);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImg((p) => (p + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden">
      <NoiseTexture opacity={0.025} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-36 pb-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 mb-8">
              <Leaf size={16} weight="fill" className="text-emerald-600" />
              <span className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em]">Eco-Safe Methods</span>
            </div>
            <div className="overflow-hidden">
              {['PROTECT YOUR', 'SPACE.'].map((line, i) => (
                <motion.div key={line} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}>
                  <h1 className="font-heading leading-[0.92] tracking-tight text-gray-900" style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', fontWeight: i === 0 ? 300 : 700 }}>
                    {i === 1 ? <span className="text-emerald-600 italic">{line}</span> : line}
                  </h1>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="text-gray-500 text-sm sm:text-base leading-relaxed mt-6 max-w-md" style={{ fontFamily: 'var(--font-sans)' }}>
              {hero.badge}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="group inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-emerald-700 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
                {hero.ctaPrimary} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${business.phoneRaw}`} className="group inline-flex items-center gap-3 border border-gray-300 text-gray-700 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:border-emerald-500 hover:text-emerald-700 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
                <Phone size={18} /> Call Now
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200">
              {[{ n: business.projectsCompleted, l: 'Properties' }, { n: business.yearsExperience, l: 'Experience' }, { n: business.rating + '★', l: 'Google Rating' }].map((s, i) => (
                <div key={i}>
                  <div className="text-emerald-600 font-heading text-xl sm:text-2xl italic leading-none">{s.n}</div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-[0.15em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="overflow-hidden aspect-[4/5]">
              <AnimatePresence mode="sync">
                <motion.img key={currentImg} src={heroImages[currentImg]} alt="Professional pest control"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }} loading="eager" />
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white p-6 shadow-xl z-10">
              <div className="text-center">
                <div className="font-heading text-3xl italic leading-none">{business.established}</div>
                <div className="text-emerald-200 text-[9px] uppercase tracking-[0.2em] mt-1" style={{ fontFamily: 'var(--font-sans)' }}>Established</div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-emerald-400/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}



function MarqueeTicker() {
  const items = ['PEST CONTROL', 'FUMIGATION', 'TERMITE TREATMENT', 'RODENT CONTROL', 'DISINFECTION', 'WEED CONTROL'];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className="bg-gray-100 border-y border-gray-200 py-5 sm:py-6 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-8 mx-6 sm:mx-8">
            <span className="text-emerald-500 font-heading text-lg sm:text-2xl italic tracking-wider">{item}</span>
            <span className="text-emerald-500/30 text-sm">&diams;</span>
          </span>
        ))}
      </div>
    </section>
  );
}


function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { about, business } = siteData;

  return (
    <section ref={ref} className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
            <div className="w-12 h-[2px] bg-emerald-500 mb-6" />
            <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Story</p>
            <h2 className="font-heading text-gray-900 leading-[0.95] italic mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              The Vibrant<br /><span className="text-emerald-500">Story</span>
            </h2>
            {about.story.map((p, i) => (
              <p key={i} className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 max-w-lg" style={{ fontFamily: 'var(--font-sans)' }}>{p}</p>
            ))}
            <div className="w-full h-px bg-gray-100 my-8" />
            <div className="flex gap-10 sm:gap-16">
              <div>
                <div className="text-emerald-500 font-heading text-3xl sm:text-4xl italic leading-none">{business.established}</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Founded</div>
              </div>
              <div>
                <div className="text-emerald-500 font-heading text-3xl sm:text-4xl italic leading-none">{business.projectsCompleted}</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Completed</div>
              </div>
              <div>
                <div className="text-emerald-500 font-heading text-3xl sm:text-4xl italic leading-none">{business.yearsExperience}</div>
                <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2" style={{ fontFamily: 'var(--font-sans)' }}>Years</div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="overflow-hidden">
              <img src={siteData.hero.backgroundImages[0]?.url} alt="About us" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" />
            </div>
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-emerald-500/30" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-emerald-500/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { servicesPreview, services } = siteData;

  return (
    <section ref={ref} className="bg-gray-50 py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-emerald-500 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Our Services</p>
              <h2 className="font-heading text-gray-900 leading-[0.92] italic" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                What We <span className="text-emerald-500">Offer</span>
              </h2>
            </div>
            <Link to="/services" className="group text-gray-400 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-emerald-500 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              All Services <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {servicesPreview.map((service, i) => {
            const IconComp = iconMap[service.icon] || Star;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 * i }} className={i === 0 ? 'sm:col-span-2' : ''}>
                <Link to={`/services#${services?.items?.[i]?.slug || ''}`}
                  className={`group relative block overflow-hidden ${i === 0 ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
                  <img src={services?.items?.[i]?.image || ''} alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/10 opacity-90" />
                  <div className="absolute top-4 right-5 z-10">
                    <span className="text-emerald-500/15 font-heading text-6xl sm:text-7xl italic leading-none">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute top-5 left-5 z-10 w-10 h-10 border border-emerald-500/30 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm group-hover:bg-emerald-500/20 group-hover:border-emerald-500/60 transition-all duration-500">
                    <IconComp size={18} weight="fill" className="text-emerald-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <h3 className="font-heading text-white text-xl sm:text-2xl italic tracking-wide mb-2">{service.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{service.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-emerald-500 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>Explore</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-emerald-300 z-10" />
                </Link>
              </motion.div>
            );
          }}
        </div>
      </div>
    </section>
  );
}


function PortfolioGallery() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });
  const { projects } = siteData;

  return (
    <section ref={containerRef} className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="w-12 h-[2px] bg-emerald-500 mb-6" />
            <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Selected Works</p>
            <h2 className="font-heading text-gray-900 leading-[0.92] italic" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Our <span className="text-emerald-500">Portfolio</span>
            </h2>
          </div>
          <Link to="/projects" className="group text-gray-400 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-emerald-500 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
            View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.2 }}>
        <div ref={scrollRef} className="flex gap-4 sm:gap-5 overflow-x-auto px-5 sm:px-8 lg:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {projects.items.map((project, i) => (
            <div key={project.slug} className="group relative flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[420px] overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-700" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/40 transition-colors duration-500 z-10" />
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-emerald-500/90 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                <h4 className="text-white font-heading text-lg sm:text-xl italic tracking-wide">{project.title}</h4>
                <p className="text-white/40 text-xs mt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { projects } = siteData;

  return (
    <section ref={ref} className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-emerald-500 mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Recent Work</p>
              <h2 className="font-heading text-gray-900 leading-[0.92] italic" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Featured <span className="text-emerald-500">Projects</span>
              </h2>
            </div>
            <Link to="/projects" className="group text-gray-400 text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-emerald-500 transition-colors" style={{ fontFamily: 'var(--font-sans)' }}>
              All Projects <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {projects.items.slice(0, 6).map((project, i) => (
            <motion.div key={project.slug} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 * i }}
              className={`group relative overflow-hidden ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
              <div className={`overflow-hidden relative ${i === 0 ? 'aspect-square sm:aspect-auto sm:h-full' : 'aspect-[4/3]'}`}>
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 transition-colors duration-500 z-10" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-emerald-500/90 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                    {project.category}
                  </span>
                </div>

                {/* Number watermark */}
                <div className="absolute top-4 right-5 z-10">
                  <span className="text-emerald-500/10 font-heading text-5xl italic leading-none">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <h3 className="text-white font-heading text-lg sm:text-xl italic tracking-wide mb-1">{project.title}</h3>
                  <p className="text-white/50 text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>{project.location}</p>
                  <p className="text-white/40 text-sm leading-relaxed mt-2 line-clamp-2" style={{ fontFamily: 'var(--font-sans)' }}>{project.desc}</p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 z-10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { stats } = siteData;

  return (
    <section ref={ref} className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }} className="text-center relative">
              <div className="font-heading text-emerald-500 leading-none italic" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                <AnimatedCounter target={String(stat.number).replace(/[^0-9]/g, '')} suffix={String(stat.number).replace(/[0-9]/g, '')} duration={2.5} />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.25em] mt-3" style={{ fontFamily: 'var(--font-sans)' }}>{stat.label}</div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/15 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function ValuesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { about } = siteData;

  return (
    <section ref={ref} className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-14 sm:mb-20">
          <div className="w-12 h-[2px] bg-emerald-500 mx-auto mb-6" />
          <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>What Drives Us</p>
          <h2 className="font-heading text-gray-900 leading-[0.95] italic" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            Our <span className="text-emerald-500">Values</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.values.map((value, i) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="relative p-6 sm:p-8 border border-gray-200 hover:border-emerald-500/40 transition-all duration-500 group">

              {/* Number watermark */}
              <span className="absolute top-4 right-4 text-emerald-500/8 font-heading text-6xl italic leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon badge */}
              <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors duration-500">
                <CheckCircle size={22} weight="fill" className="text-emerald-500" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-gray-900 text-lg italic tracking-wide mb-3">
                {value.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                {value.desc}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const points = [
    { title: 'Licensed & Certified', desc: 'Fully licensed operators using approved, eco-safe products. Your family and pets are always protected.' },
    { title: 'Rapid Response', desc: 'Same-day service for emergencies. We understand pest problems cannot wait.' },
    { title: 'Custom Treatment Plans', desc: 'No two infestations are alike. We create tailored solutions for your specific situation.' },
    { title: 'Satisfaction Guarantee', desc: 'If pests return within the warranty period, we re-treat at absolutely no extra cost.' },
  ];

  return (
    <section ref={ref} className="bg-gray-50 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }} className="relative">
            <img src={siteData.hero.backgroundImages[1]?.url || siteData.hero.backgroundImages[0]?.url}
              alt="Why choose us" className="w-full aspect-[4/5] object-cover object-center" loading="lazy" />
            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-emerald-500/40" />
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-emerald-500/40" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="w-12 h-[2px] bg-emerald-500 mb-6" />
            <p className="text-emerald-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>The Difference</p>
            <h2 className="font-heading text-gray-900 leading-[0.95] italic mb-12" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Why Choose <span className="text-emerald-500">Vibrant</span>
            </h2>
            <div className="space-y-8">
              {points.map((point, i) => (
                <motion.div key={point.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} className="flex gap-5">
                  <div className="shrink-0 mt-1">
                    <div className="w-8 h-8 border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5">
                      <CheckCircle size={16} weight="fill" className="text-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading text-gray-900 text-base sm:text-lg italic tracking-wide mb-1">{point.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function HealthCertStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const certs = ['EPA Approved', 'WHO Standards', 'Eco-Safe Products', 'Licensed Operators'];
  return (
    <section ref={ref} className="bg-emerald-600 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {certs.map((cert, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={16} weight="fill" className="text-white/80" />
              <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.1em]" style={{ fontFamily: 'var(--font-sans)' }}>{cert}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const { homeTestimonials } = siteData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const next = useCallback(() => setActive((p) => (p + 1) % homeTestimonials.length), [homeTestimonials.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + homeTestimonials.length) % homeTestimonials.length), [homeTestimonials.length]);
  useEffect(() => { const timer = setInterval(next, 7000); return () => clearInterval(timer); }, [next]);
  const t = homeTestimonials[active];

  return (
    <section ref={ref} className="relative bg-gray-50 py-24 sm:py-32 lg:py-40 overflow-hidden">
      <NoiseTexture opacity={0.02} />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center">
          <Quotes size={48} weight="fill" className="text-emerald-500/15 mx-auto mb-8" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
              <blockquote className="text-gray-900 text-lg sm:text-xl lg:text-2xl leading-relaxed font-heading italic mb-10">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center gap-3">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover object-center border-2 border-emerald-500/30" loading="lazy" />}
                <div className="w-8 h-[2px] bg-emerald-500" />
                <div className="text-gray-900 text-sm uppercase tracking-[0.15em] font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>{t.name}</div>
                <div className="text-gray-400 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>{t.role}</div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} weight="fill" className="text-emerald-500" />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button onClick={prev} className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors" aria-label="Previous">
              <CaretLeft size={16} />
            </button>
            <div className="flex gap-2">
              {homeTestimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-[2px] transition-all duration-500 ${i === active ? 'w-10 bg-emerald-500' : 'w-3 bg-gray-200'}`} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors" aria-label="Next">
              <CaretRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function CTASection() {
  const { business, homeCta } = siteData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-48 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={siteData.hero.backgroundImages[0]?.url} alt="Vibrant Pests control and Fumigation services Harare Zimbabwe" className="w-full h-[130%] object-cover object-center" loading="lazy" />
        <div className="absolute inset-0 bg-gray-900/70" />
      </motion.div>
      <NoiseTexture opacity={0.03} />
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1 }}>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mb-8" />
          <h2 className="font-heading text-white leading-[0.92] italic mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            READY TO<br /><span className="text-emerald-500">GET STARTED?</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base lg:text-lg max-w-lg mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            Contact us today for a free consultation. We are here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="group relative inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:shadow-xl transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
              Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={`https://wa.me/${business.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-green-500/40 text-green-400 px-8 py-4 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-green-500/10 transition-all" style={{ fontFamily: 'var(--font-sans)' }}>
              <WhatsappLogo size={20} weight="fill" /> WhatsApp
            </a>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/25 uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-sans)' }}>
            <a href={`tel:${business.phoneRaw}`} className="flex items-center gap-2 hover:text-emerald-500 transition-colors"><Phone size={14} /> {business.phone}</a>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> {business.address}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ================================================================
   HOME — Assembled
   ================================================================ */
export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <MarqueeTicker />
      <AboutSection />
      <ServicesGrid />
      <PortfolioGallery />
      <FeaturedProjects />
      <StatsBand />
      <ValuesGrid />
      <WhyChooseUs />
      <HealthCertStrip />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}
