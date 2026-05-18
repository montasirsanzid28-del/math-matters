import React, { useState } from 'react';
import { 
  BookOpen, Calculator, GraduationCap, MapPin, 
  Phone, Mail, ArrowRight, CheckCircle2, Menu, X, Star, Quote, Plus, Minus
} from 'lucide-react';
import ConstellationBackground from './components/ConstellationBackground';
import CourseIcon3D from './components/CourseIcons3D';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    grade: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setStatus('loading');
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to send inquiry');
      setStatus('success');
      setFormData({ name: '', phone: '', subject: '', grade: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 selection:bg-amber-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-900" />
            <span className="font-serif text-2xl font-bold text-indigo-950 tracking-tight">Math Matters</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#about" className="hover:text-amber-600 transition-colors">Methodology</a>
            <a href="#curriculum" className="hover:text-amber-600 transition-colors">Curriculum</a>
            <a href="#results" className="hover:text-amber-600 transition-colors">Results</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
            <a href="#contact" className="bg-indigo-950 text-white px-5 py-2.5 rounded-full hover:bg-indigo-900 transition-all font-semibold hover:shadow-lg hover:-translate-y-0.5">
              Enroll Now
            </a>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 shadow-xl">
            <a href="#about" onClick={toggleMenu} className="text-slate-600 font-medium">Methodology</a>
            <a href="#curriculum" onClick={toggleMenu} className="text-slate-600 font-medium">Curriculum</a>
            <a href="#results" onClick={toggleMenu} className="text-slate-600 font-medium">Results</a>
            <a href="#contact" onClick={toggleMenu} className="text-slate-600 font-medium">Contact</a>
            <a href="#contact" onClick={toggleMenu} className="bg-indigo-950 text-white px-5 py-3 rounded-lg text-center font-semibold mt-2">
              Enroll Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 bg-indigo-950 text-white overflow-hidden relative">
        <ConstellationBackground />
        
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none translate-x-1/3 -translate-y-1/4">
           {/* Big decorative math symbol */}
           <Calculator className="w-96 h-96 text-indigo-400" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/80 border border-indigo-700 text-amber-400 text-sm font-bold w-fit shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span className="tracking-wide">PREMIUM EDEXCEL COACHING IN DHAKA</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight">
                Master Math.<br/>Engineer Your <span className="text-amber-400 italic">Future.</span>
              </h1>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-4">
                <div className="border-l-2 border-amber-400 pl-4">
                  <p className="text-lg text-indigo-100 leading-relaxed font-medium">
                    Led by <strong className="text-white">Soumitra Saha</strong>, a veteran educator with 20+ years of experience transforming students.
                  </p>
                </div>
                <div className="border-l-2 border-indigo-700 pl-4">
                  <p className="text-base text-indigo-200 leading-relaxed">
                    Specializing in Edexcel A Math, B Math, and Further Pure Math for Grades 6-9, O Level, and A Level.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a href="#contact" className="bg-amber-400 text-indigo-950 px-8 py-4 rounded-full font-bold text-center hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-400/20 active:scale-95 flex items-center justify-center gap-2 group">
                  Enroll for 2024 Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#about" className="px-8 py-4 rounded-full font-bold text-center border-2 border-indigo-700 hover:border-indigo-400 hover:bg-indigo-900/50 transition-all active:scale-95 text-indigo-100">
                  Discover Our Methodology
                </a>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm font-medium text-indigo-300">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-indigo-800 border-2 border-indigo-950 flex items-center justify-center z-10 relative">
                      <Star className="w-4 h-4 text-indigo-400" />
                    </div>
                  ))}
                </div>
                <p>Trusted by 70+ ambitious students at Ceragram this year.</p>
              </div>
            </div>
            
            {/* Right Column: Placeholders in a bento-grid style collage */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4 pt-12">
                   <div className="aspect-[4/5] rounded-3xl bg-indigo-900/80 border border-indigo-700 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative shadow-2xl group">
                     <GraduationCap className="w-10 h-10 text-indigo-400/50 mb-3 relative z-10 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 relative z-10">Picture Placeholder</p>
                     <p className="text-[10px] text-indigo-400 mt-1 relative z-10">Add Student Photo</p>
                   </div>
                   <div className="aspect-square rounded-3xl bg-indigo-800/80 border border-indigo-600 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative shadow-xl group">
                     <MapPin className="w-10 h-10 text-indigo-400/50 mb-3 relative z-10 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 relative z-10">Picture Placeholder</p>
                     <p className="text-[10px] text-indigo-400 mt-1 relative z-10">Add Classroom Photo</p>
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div className="aspect-square rounded-3xl bg-amber-900/20 border border-amber-700/30 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative shadow-xl group">
                     <Calculator className="w-10 h-10 text-amber-500/50 mb-3 relative z-10 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 relative z-10">Picture Placeholder</p>
                     <p className="text-[10px] text-amber-500 mt-1 relative z-10">Add Action Photo</p>
                   </div>
                   <div className="aspect-[4/5] rounded-3xl bg-indigo-900/80 border border-indigo-700 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative shadow-2xl group">
                     <BookOpen className="w-10 h-10 text-indigo-400/50 mb-3 relative z-10 group-hover:scale-110 transition-transform" />
                     <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 relative z-10">Picture Placeholder</p>
                     <p className="text-[10px] text-indigo-400 mt-1 relative z-10">Add Sir Soumitra Photo</p>
                   </div>
                 </div>
               </div>
               
               {/* Floating badge */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-indigo-950 px-6 py-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-100 flex items-center gap-4 z-20">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                    <Star className="w-6 h-6 fill-amber-500 stroke-amber-500" />
                  </div>
                  <div>
                    <p className="font-extrabold text-2xl leading-none">20+</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Years Teaching</p>
                  </div>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-serif font-bold text-indigo-950 mb-2">Edexcel</span>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">Curriculum Focus</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-serif font-bold text-indigo-950 mb-2">Grades 6-12</span>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">O & A Levels</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-serif font-bold text-indigo-950 mb-2">100s</span>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">A* Students</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-serif font-bold text-indigo-950 mb-2">Dhaka</span>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">Dhanmondi</span>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="about" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-3">Our Methodology</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-indigo-950 leading-tight mb-8">
              Academic Excellence Driven by Logic & Precision
            </h3>
            
            <div className="space-y-6 text-slate-600 text-lg">
              <p>
                Mathematics is not just about memorizing formulas; it's about developing a structured way of thinking. Our methodology is built on the belief that every student can master complex mathematical concepts when they are broken down logically.
              </p>
              <p>
                With over two decades of experience, Soumitra Saha has refined an approach that demystifies the Edexcel syllabus. We focus on identifying knowledge gaps early and rebuilding foundations, ensuring students aren't just exam-ready, but truly understand the subject matter.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-indigo-200 pl-4">
                <p className="font-serif text-3xl font-bold text-indigo-950">100s</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">A* Students</p>
              </div>
              <div className="border-l-2 border-amber-200 pl-4">
                <p className="font-serif text-3xl font-bold text-indigo-950">20+</p>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mt-1">Years Experience</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                   <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-indigo-950 mb-3">Structured Learning</h4>
                  <p className="text-slate-600 leading-relaxed">
                    We distill complex Edexcel curriculums into clear, actionable frameworks. Concepts are introduced sequentially, building a robust mathematical foundation step-by-step.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                   <Calculator className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-indigo-950 mb-3">Rigorous Practice</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Extensive past-paper analysis and targeted problem-solving sessions prepare students to tackle even the most challenging exam questions with absolute confidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                   <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-indigo-950 mb-3">Individual Attention</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Continuous assessment allows us to pinpoint weaknesses and transform them into strengths through personalized guidance and constructive feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-24 px-6 bg-indigo-950 text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-900 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-amber-400 font-bold tracking-wider uppercase text-sm mb-3">The Curriculum</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
                Pathways <br className="hidden lg:block"/>to Edexcel Mastery
              </h3>
              <div className="space-y-6 text-indigo-200 text-lg mb-8">
                <p>
                  Our curriculum is specifically tailored to the rigorous demands of the Edexcel examination board. 
                </p>
                <p>
                  From building intuitive number sense in earlier grades to navigating complex matrices at the A Levels, every course is designed to maximize scoring potential and conceptual clarity.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 text-indigo-950 bg-amber-400 px-6 py-3 rounded-full font-bold hover:bg-amber-300 transition-colors group w-fit">
                Discuss placement <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "A Math",
                  desc: "Foundational mastery focusing on algebraic manipulation, calculus, and geometry. Prepares students rigorously for O Level.",
                  tags: ["O Level", "Grades 9-10"],
                  syllabus: ["Algebraic Manipulation", "Trigonometric Identities", "Differentiation & Integration", "Coordinate Geometry"],
                  objectives: "Master foundational algebraic manipulation and develop strong calculus skills necessary for O Level success.",
                  sample: "Find the coordinates of the stationary points on the curve y = x³ - 3x² - 9x + 5 and determine their nature."
                },
                {
                  title: "B Math",
                  desc: "Intermediate application developing problem-solving strategies, statistical analysis, and mathematical modeling.",
                  tags: ["O Level", "Grades 9-10"],
                  syllabus: ["Vectors & Matrices", "Probability & Statistics", "Kinematics", "Mathematical Modeling"],
                  objectives: "Apply strategic problem-solving to construct models and analyze complex statistical data.",
                  sample: "Given matrix A and B, determine the inverse of A and use it to solve the given set of simultaneous equations."
                },
                {
                  title: "Further Pure Math",
                  desc: "Advanced theoretical concepts including complex numbers, matrices, and rigorous proofs for top-tier university prep.",
                  tags: ["A Level", "Grades 11-12"],
                  syllabus: ["Complex Numbers", "Roots of Polynomials", "Differential Equations", "Maclaurin Series"],
                  objectives: "Rigorous proof construction, abstract reasoning, and mastery of theoretical concepts for university entrance.",
                  sample: "Prove by mathematical induction that Σ r(r+1) = n(n+1)(n+2)/3 for all positive integers n."
                },
                {
                  title: "Foundation Level",
                  desc: "Building confidence and strong fundamental skills to set the stage for future complexities required at O Level.",
                  tags: ["Preparation", "Grades 6-8"],
                  syllabus: ["Number Theory", "Basic Algebra", "Area & Perimeter", "Data Handling"],
                  objectives: "Build absolute confidence in basic arithmetic and algebraic operations to prepare for upper-middle grade complexities.",
                  sample: "Solve for x: 3(x + 4) - 2(2x - 1) = 15."
                }
              ].map((course, idx) => {
                const isExpanded = expandedCourse === idx;
                return (
                <div key={idx} onClick={() => setExpandedCourse(isExpanded ? null : idx)} className={`relative bg-white/5 border rounded-3xl p-8 transition-all duration-300 flex flex-col h-full backdrop-blur-sm group cursor-pointer overflow-hidden ${isExpanded ? 'border-amber-400/50 sm:col-span-2 bg-white/10 shadow-2xl shadow-indigo-900/50' : 'border-white/10 hover:border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/50'}`}>
                  
                  {/* 3D Icon Background */}
                  <div className="absolute -right-12 -top-12 w-48 h-48 opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-0">
                     <CourseIcon3D type={course.title} />
                  </div>

                  <div className="relative z-10 flex gap-2 flex-wrap mb-8">
                    {course.tags.map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-indigo-900/80 text-indigo-200 rounded text-center">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <h4 className={`text-3xl font-serif font-bold transition-colors duration-300 ${isExpanded ? 'text-amber-400' : 'group-hover:text-amber-400'}`}>{course.title}</h4>
                    <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'text-amber-400 bg-amber-400/20' : 'text-indigo-300 bg-indigo-900/50 group-hover:text-amber-400 group-hover:bg-amber-400/10'}`}>
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                  <p className={`relative z-10 text-indigo-200 leading-relaxed text-base transition-all duration-300 ${isExpanded ? 'mb-6' : 'mb-8'}`}>
                    {course.desc}
                  </p>
                  
                  {isExpanded && (
                    <div className="relative z-10 mb-8 grid sm:grid-cols-2 gap-8 border-t border-indigo-800/50 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div>
                            <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">Syllabus Highlights</h5>
                            <ul className="space-y-2">
                                {course.syllabus.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-indigo-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h5 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Learning Objectives</h5>
                                <p className="text-sm text-indigo-100 leading-relaxed">{course.objectives}</p>
                            </div>
                            <div className="bg-indigo-950/50 border border-indigo-800 rounded-xl p-4">
                                <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Sample Problem</h5>
                                <p className="text-sm text-indigo-200 font-mono italic">"{course.sample}"</p>
                            </div>
                        </div>
                    </div>
                  )}

                  <div className="relative z-10 mt-auto border-t border-white/10 pt-6 flex justify-between items-center">
                    <a href="#contact" onClick={(e) => { e.stopPropagation(); }} className="text-sm font-semibold flex items-center gap-2 hover:text-amber-400 transition-colors cursor-pointer w-fit group/btn">
                      Apply for enrollment <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest sm:hidden group-hover:text-amber-400/70 transition-colors">{isExpanded ? 'Close' : 'View details'}</span>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest hidden sm:block group-hover:text-amber-400/70 transition-colors">{isExpanded ? 'Close details' : 'Click to view details'}</span>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </section>

      {/* Results & Classrooms */}
      <section id="results" className="py-24 px-6 bg-white shrink-0">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Testimonials */}
          <div>
            <div className="mb-12">
              <h2 className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-3">Proven Results</h2>
              <h3 className="text-4xl font-serif font-bold text-indigo-950 leading-tight mb-6">
                Student Success Stories
              </h3>
              <p className="text-lg text-slate-600">
                A legacy of A* grades. Our students consistently secure top marks and proceed to prestigious universities worldwide, equipped with unparalleled analytical skills.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { quote: "Sir's meticulous breakdown of Further Pure Math concepts turned my biggest weakness into my strongest subject. His logical approach is unmatched.", author: "Ayan R.", role: "A Level Student" },
                { quote: "We saw a tremendous improvement in our daughter's confidence and grades in B Math within just a few months of joining his classes.", author: "Mrs. Chowdhury", role: "Parent" },
              ].map((testi, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col hover:border-amber-200 transition-colors group">
                  <Quote className="w-8 h-8 text-indigo-900/10 mb-4 group-hover:text-amber-400 transition-colors" />
                  <p className="text-slate-700 italic leading-relaxed mb-6 text-lg">
                    "{testi.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-bold">
                      {testi.author[0]}
                    </div>
                    <div>
                      <p className="font-bold text-indigo-950">{testi.author}</p>
                      <p className="text-sm text-slate-500">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div className="lg:pt-24">
            <div className="bg-indigo-950 rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-900 text-white relative overflow-hidden h-full flex flex-col">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-[80px] -mr-32 -mt-32"></div>
               <div className="relative z-10 space-y-8 flex-grow flex flex-col justify-center">
                  <div>
                    <h3 className="text-3xl font-serif font-bold mb-4">Teaching Hub</h3>
                    <p className="text-indigo-200 text-lg leading-relaxed">
                      Classes are conducted in focused, well-equipped learning environments engineered for concentration and collaborative learning.
                    </p>
                  </div>
                  
                  <a href="https://share.google/SRq3lpgbaysSWP7DY" target="_blank" rel="noopener noreferrer" className="w-full aspect-[16/10] bg-indigo-900/80 rounded-2xl border border-indigo-700 flex flex-col items-center justify-center relative overflow-hidden group my-8 hover:border-amber-400/50 transition-colors">
                     <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Dhanmondi,Dhaka&zoom=15&size=600x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:administrative.country|element:geometry.stroke|color:0x4b6878&style=feature:administrative.land_parcel|element:labels.text.fill|color:0x64779e&style=feature:landscape.man_made|element:geometry.stroke|color:0x334e87&style=feature:landscape.natural|element:geometry|color:0x023e58&style=feature:poi|element:geometry|color:0x283d6a&style=feature:poi|element:labels.text.fill|color:0x6f9ba5&style=feature:poi|element:labels.text.stroke|color:0x1d2c4d&style=feature:road|element:geometry|color:0x304a7d&style=feature:road|element:labels.text.fill|color:0x98a5be&style=feature:road|element:labels.text.stroke|color:0x1d2c4d&style=feature:road.highway|element:geometry|color:0x2c6675&style=feature:road.highway|element:geometry.stroke|color:0x255763&style=feature:road.highway|element:labels.text.fill|color:0xb0d5ce&style=feature:road.highway|element:labels.text.stroke|color:0x023e58&style=feature:transit|element:labels.text.fill|color:0x98a5be&style=feature:transit|element:labels.text.stroke|color:0x1d2c4d&style=feature:transit.line|element:geometry.fill|color:0x283d6a&style=feature:transit.station|element:geometry|color:0x3a4762&style=feature:water|element:geometry|color:0x0e1626&style=feature:water|element:labels.text.fill|color:0x4e6d70')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                     <MapPin className="w-10 h-10 text-amber-400 mb-3 relative z-10 group-hover:-translate-y-1 transition-transform" />
                     <p className="text-xs font-bold uppercase tracking-widest text-white relative z-10">Ceragram Location</p>
                     <p className="text-xs text-indigo-300 mt-1 relative z-10 underline underline-offset-2">Open in Google Maps</p>
                  </a>

                  <div className="space-y-6 pt-4 border-t border-indigo-800">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-400/10 p-3 rounded-xl text-amber-400 shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <a href="https://share.google/SRq3lpgbaysSWP7DY" target="_blank" rel="noopener noreferrer" className="font-bold text-lg hover:text-amber-400 transition-colors">Ceragram (Primary)</a>
                        <p className="text-indigo-200">Dhanmondi, Dhaka</p>
                        <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest text-amber-950 bg-amber-400 px-2 py-1 rounded">Current Hub</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 opacity-75">
                      <div className="bg-indigo-900/0 p-3 rounded-xl text-indigo-400 shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-indigo-300">Stanford / Sunnydale</h4>
                        <p className="text-indigo-400">Past Teaching Affiliations</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-indigo-950 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-5 p-2">
              {/* Info Panel */}
              <div className="lg:col-span-2 bg-indigo-900 rounded-2xl p-8 md:p-12 text-white">
                <h3 className="text-3xl font-serif font-bold mb-4">Start Your Journey.</h3>
                <p className="text-indigo-200 mb-12">Enrollments are currently open for the upcoming academic session. Reach out to discuss availability and curriculum alignment.</p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-amber-400 mt-1" />
                    <div>
                      <p className="text-sm text-indigo-300 font-medium mb-1">Phone</p>
                      <a href="tel:01716406534" className="text-xl font-medium hover:text-amber-400 transition-colors">01716 406534</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-amber-400 mt-1" />
                    <div>
                      <p className="text-sm text-indigo-300 font-medium mb-1">Location</p>
                      <a href="https://share.google/SRq3lpgbaysSWP7DY" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-amber-400 transition-colors">Ceragram<br/>Dhanmondi, Dhaka</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-amber-400 mt-1" />
                    <div>
                      <p className="text-sm text-indigo-300 font-medium mb-1">Email</p>
                      <a href="mailto:contact@mathmatters.example.com" className="text-lg hover:text-amber-400 transition-colors">Contact via phone preferred</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Panel */}
              <div className="lg:col-span-3 p-8 md:p-12 bg-white rounded-r-2xl lg:rounded-l-none rounded-b-2xl lg:rounded-tr-2xl lg:rounded-br-2xl text-slate-800">
                 <h4 className="text-2xl font-bold mb-8 text-indigo-950">Enrollment Inquiry</h4>
                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 block">Full Name *</label>
                        <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Student or Parent Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 block">Phone Number *</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="e.g., 017..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 block">Subject of Interest</label>
                        <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all appearance-none text-slate-700">
                          <option value="">Select subject...</option>
                          <option value="A Math">A Math</option>
                          <option value="B Math">B Math</option>
                          <option value="Further Pure Math">Further Pure Math</option>
                          <option value="Grade 6-9 Foundation">Grade 6-9 Foundation</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-600 block">Current Grade/Level</label>
                        <input name="grade" value={formData.grade} onChange={handleInputChange} type="text" placeholder="e.g., 9, 10, O Level" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all placeholder:text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-600 block">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Tell us about the student's current academic standing and goals..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 outline-none transition-all resize-none placeholder:text-slate-400"></textarea>
                    </div>

                    <button disabled={status === 'loading'} type="submit" className="bg-indigo-950 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-900 transition-all hover:shadow-lg w-full md:w-auto active:scale-95 disabled:opacity-75 disabled:active:scale-100 flex items-center justify-center gap-2">
                      {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                    {status === 'success' && <p className="text-emerald-600 text-sm font-medium">Inquiry sent successfully! We will contact you soon.</p>}
                    {status === 'error' && <p className="text-red-600 text-sm font-medium">Failed to send inquiry. Please try again or call us.</p>}
                    {status === 'idle' && <p className="text-xs text-slate-500 text-center md:text-left mt-4">* We will get back to you via phone shortly.</p>}
                 </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 px-6 border-t border-slate-200 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-950" />
            <span className="font-serif font-bold text-indigo-950 text-lg">Math Matters</span>
          </div>
          <p>© {new Date().getFullYear()} Math Matters | Instructor: Soumitra Saha. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-indigo-950 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-950 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
