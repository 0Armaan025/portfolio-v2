"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './page.css';

// Helper component for hover-reveal text
const HiddenText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <span className="bg-gray-700 text-gray-700 hover:bg-transparent hover:text-gray-100 transition-colors duration-300 cursor-pointer px-1 rounded">
            {children}
        </span>
    );
};


const FBIPortfolioPage: React.FC = () => {
    // Sample data - replace with your actual information
    const personalInfo = {
        name: "Armaan",
        role: "The Eternal overlord of the great code realms",
        clearanceLevel: "Top Secret/SCI",
        id: "FSD-42069",
        dob: "25/01/yyyy",
        location: "North India",
        photo: "https://pbs.twimg.com/profile_images/1896604333002706944/s1beiDXf_400x400.jpg" // Replace with your actual photo URL
    };

    const projects = [
        {
            id: "CASE-01",
            title: "Rinkuu",
            description: "Developed a linktree knockoff but with better analytics, and more customization options (25+ in total), + unlimited fields + 5+ analytics options including realtime logs",
            technologies: ["Next.js", "Typescript", "Tailwind", "Javascript", "MongoDB", "Framer motion", "Gsap", "Radix UI", "Express", "Helmet", "Morgan", "and more!"],
            status: "COMPLETED",
            classification: "TOP SECRET",
            link: "https://rinkuu.vercel.app"
        },
        {
            id: "CASE-0284",
            title: "Firewall Initiative",
            description: "Architected next-gen security system protecting federal databases",
            technologies: ["Node.js", "Blockchain", "Advanced Encryption"],
            status: "ACTIVE",
            classification: "TOP SECRET/SCI"
        },
        {
            id: "CASE-0351",
            title: "Interface Overhaul",
            description: "Modernized federal intelligence dashboard with enhanced security patterns",
            technologies: ["React", "Biometric Auth", "Zero-Trust Architecture"],
            status: "COMPLETED",
            classification: "CLASSIFIED"
        }
    ];

    const skills = [
        { category: "Frontend", items: ["Tailwind CSS", "Bootstrap", "well i'll just a library or smthing", "will vibe code maybe", "framer"] },
        { category: "Backend", items: ["Node.js", "Express", "GraphQL", "MongoDB", "PostgreSQL", "Python flask/django/fastapi i'll figure it out"] },
        { category: "Framework or smthing", items: ["Flutter/Dart", "Next.js", "FLAME", "SFML/SDL"] },
        { category: "Others", items: ["any tool, will take a while to get familiar with", "Github", "Git"] }
    ];

    // State management
    const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
    const [folderOpen, setFolderOpen] = useState(false);
    const [stampVisible, setStampVisible] = useState(false);
    const [documentLoading, setDocumentLoading] = useState(false);
    const [scanlineEffect, setScanlineEffect] = useState(false);

    // Document type definitions - Added 'about'
    const documents = [
        { id: "personal", name: "PERSONNEL FILE" },
        { id: "projects", name: "CASE DOSSIERS" },
        { id: "skills", name: "CAPABILITY ASSESSMENT" },
        { id: "about", name: "ABOUT ME / HEAR ME YAP" }, // New Document
        { id: "contact", name: "SECURE COMMS PROTOCOL" }
    ];

    // Handle document selection with loading effect
    const handleDocumentSelect = (docId: string) => {
        setDocumentLoading(true);
        setScanlineEffect(true);
        setStampVisible(false); // Reset stamp immediately

        // Simulate document loading
        setTimeout(() => {
            setSelectedDoc(docId);
            setDocumentLoading(false);

            // Show stamp after document loads
            setTimeout(() => {
                setStampVisible(true);
            }, 500); // Stamp appears slightly after content

            // Remove scanline effect after a delay
            setTimeout(() => {
                setScanlineEffect(false);
            }, 1200);
        }, 800);
    };

    // Open folder on initial load
    useEffect(() => {
        setTimeout(() => {
            setFolderOpen(true);
        }, 1000);
    }, []);

    // Reset stamp when changing documents (redundant due to reset in handleDocumentSelect, but safe)
    useEffect(() => {
        if (!documentLoading) { // Only reset if not currently loading
            setStampVisible(false);
            // Trigger stamp visibility after a short delay if a document is selected
            if (selectedDoc) {
                const timer = setTimeout(() => setStampVisible(true), 500);
                return () => clearTimeout(timer);
            }
        }
    }, [selectedDoc, documentLoading]);


    // Current date in FBI format
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).replace(/\//g, '-');

    // Current time
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // Placeholder essay content
    const aboutMeEssay = `
        Alright, buckle up. They call me Armaan, but you can refer to me as the <HiddenText>Overlord of Code Realms</HiddenText>, at least in my head.
        Born and raised under the vast skies of <HiddenText>North India</HiddenText>, I found my calling not in dusty archives or chasing shadows, but in the elegant dance of logic and syntax.
        My journey started like many others, with a flickering cursor on a black screen, a gateway to infinite possibilities. <HiddenText>I was hooked instantly</HiddenText>.
        The thrill of building something from nothing, solving complex puzzles, and bending technology to my will – it's an addiction, a good one, I think.

        My toolkit? It's less about specific languages or frameworks, though I'm comfortable with many (<HiddenText>check the skills assessment, it's mostly accurate</HiddenText>), and more about the mindset.
        I believe in <HiddenText>adaptability, continuous learning, and the power of a well-placed semicolon</HiddenText>. Whether it's crafting sleek frontends with Tailwind and React/Next.js, architecting robust backends with Node.js and Express, or diving into the mobile world with Flutter, the goal remains the same: <HiddenText>create something functional, efficient, and maybe even a little beautiful</HiddenText>.

        They say I have a knack for <HiddenText>over-engineering personal projects</HiddenText> (like this very portfolio) and a slightly unhealthy obsession with <HiddenText>optimizing build times</HiddenText>.
        Maybe it's the pursuit of perfection, or maybe I just like seeing those green checkmarks in the CI/CD pipeline.
        Beyond the code, I'm fueled by <HiddenText>strong coffee, obscure sci-fi novels, and the occasional existential crisis about JavaScript frameworks</HiddenText>.
        I find inspiration in <HiddenText>minimalist design, complex game mechanics, and the sheer audacity of open-source contributors</HiddenText>.

        This "FBI" theme? It's a bit of fun, a nod to the <HiddenText>structured chaos</HiddenText> I sometimes feel while debugging.
        But beneath the classified stamps and dossier formats lies a genuine passion for technology and a drive to <HiddenText>build cool stuff</HiddenText>.
        So, if you're looking for someone who can navigate the digital landscape, isn't afraid to get their hands dirty with code, and occasionally <HiddenText>talks to their rubber duck</HiddenText>, you might have found your agent.
        Just don't ask about <HiddenText>Case File #CLASSIFIED</HiddenText>... some things are better left undocumented. Or are they? <HiddenText>Maybe it's hidden in the source code</HiddenText>.
    `;

    // Function to parse the essay and replace <HiddenText> tags
    const renderEssayWithHiddenText = (text: string) => {
        const parts = text.split(/(<HiddenText>.*?<\/HiddenText>)/g);
        return parts.map((part, index) => {
            const match = part.match(/<HiddenText>(.*?)<\/HiddenText>/);
            if (match) {
                return <HiddenText key={index}>{match[1]}</HiddenText>;
            }
            // Render paragraphs correctly
            return part.split('\n').map((line, lineIndex) => (
                <React.Fragment key={`${index}-${lineIndex}`}>
                    {line}
                    {lineIndex < part.split('\n').length - 1 && <br />}
                </React.Fragment>
            ));
        });
    };


    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 md:p-8 font-mono relative overflow-hidden">
            {/* Scanline effect */}
            {scanlineEffect && (
                <div className="fixed inset-0 bg-scanline pointer-events-none z-50 opacity-20"></div>
            )}

            {/* CRT screen overlay */}
            <div className="fixed inset-0 pointer-events-none bg-crt-overlay opacity-10"></div>

            {/* Header */}
            <motion.header
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-700 flex items-center justify-center rounded-full mr-4 relative">
                        <motion.span
                            className="text-white text-2xl font-bold"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >A</motion.span>
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-blue-500"
                            animate={{
                                boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)']
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-blue-500">ARMAAN'S BUREAU OF INVESTIGATION</h1>
                        <h2 className="text-xl text-blue-400">CYBER DIVISION - SPECIAL TALENT UNIT</h2>
                    </div>
                </div>
                <div className="bg-blue-800 p-2 text-center relative overflow-hidden">
                    <p className="text-yellow-300 font-bold z-10 relative">CONFIDENTIAL: PERSONNEL FILE</p>

                    {/* Animated border effect */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-yellow-400"
                        animate={{
                            left: ['-100%', '100%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Status bar */}
                <div className="mt-2 flex justify-between items-center text-xs text-gray-400 border-b border-gray-700 pb-1">
                    <div>SESSION ID: A-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</div>
                    <div className="flex items-center space-x-4">
                        <div>DATE: {currentDate}</div>
                        <motion.div
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            TIME: {formattedTime}
                        </motion.div>
                        <div className="flex items-center">
                            <span className="mr-1">STATUS:</span>
                            <motion.div
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="ml-1">SECURE</span>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="flex flex-col lg:flex-row gap-8">
                {/* Folder with documents */}
                <motion.div
                    className={`lg:w-1/3 relative ${folderOpen ? 'pb-8' : ''}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {/* Folder tab */}
                    <div className="absolute top-0 left-4 -mt-6 bg-yellow-700 px-8 py-2 rounded-t-md z-10 shadow-lg">
                        <motion.span
                            className="font-bold flex items-center"
                            animate={{ x: [0, 2, 0, -2, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            <svg className="w-4 h-4 mr-1 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            CASE FILE #CY-2025
                        </motion.span>
                    </div>

                    {/* Folder body */}
                    <motion.div
                        className="bg-yellow-800 rounded-md shadow-2xl overflow-hidden"
                        animate={{
                            height: folderOpen ? 'auto' : '80px',
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Folder top */}
                        <div className="h-8 bg-yellow-700 border-b border-yellow-900"></div>

                        {/* Folder contents */}
                        <motion.div
                            className="bg-gray-800 mx-1 p-4 rounded-b-md shadow-inner"
                            animate={{ opacity: folderOpen ? 1 : 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <h3 className="text-xl text-blue-400 border-b border-blue-400 pb-2 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                DOCUMENTS
                            </h3>
                            <div className="space-y-3">
                                {documents.map((doc) => (
                                    <motion.div
                                        key={doc.id}
                                        className={`bg-gray-700 p-3 cursor-pointer border-l-4 transition-all ${hoveredDoc === doc.id ? 'border-yellow-500' :
                                            selectedDoc === doc.id ? 'border-green-500' : 'border-gray-600'
                                            }`}
                                        whileHover={{ x: 10, backgroundColor: "#374151" }}
                                        onMouseEnter={() => setHoveredDoc(doc.id)}
                                        onMouseLeave={() => setHoveredDoc(null)}
                                        onClick={() => handleDocumentSelect(doc.id)}
                                    >
                                        <div className="flex items-center">
                                            <svg className={`w-5 h-5 mr-2 ${selectedDoc === doc.id ? 'text-green-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>{doc.name}</span>
                                            {selectedDoc === doc.id && (
                                                <motion.div
                                                    className="ml-2 w-2 h-2 rounded-full bg-green-500"
                                                    animate={{ opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* File directory info */}
                            <div className="mt-6 pt-3 border-t border-gray-700 text-xs text-gray-500">
                                <div className="flex justify-between">
                                    <span>FILES: {documents.length}</span>
                                    <span>ACCESSED: {currentDate}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Document preview area */}
                <motion.div
                    className="lg:w-2/3 bg-gray-800 p-4 rounded-md min-h-96 relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    {documentLoading && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-10"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <div className="text-center">
                                <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                <p className="text-blue-400">LOADING DOCUMENT...</p>
                                <p className="text-xs text-gray-500 mt-1">CLEARANCE VERIFICATION IN PROGRESS</p>
                            </div>
                        </motion.div>
                    )}

                    {!selectedDoc && !documentLoading && (
                        <div className="h-full flex items-center justify-center">
                            <motion.div
                                className="text-gray-500 text-center"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <p className="text-lg">SELECT A DOCUMENT TO VIEW DETAILS</p>
                                <p className="text-sm mt-2">[CLEARANCE LEVEL ALPHA REQUIRED]</p>
                                <motion.div
                                    className="mt-4 h-1 w-48 bg-gray-700 mx-auto overflow-hidden"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="h-full bg-blue-500 w-12"></div>
                                </motion.div>
                            </motion.div>
                        </div>
                    )}

                    {/* Personal Info Card */}
                    {selectedDoc === 'personal' && !documentLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="bg-blue-900 p-4 rounded-md border-2 border-blue-700 max-w-md mx-auto relative overflow-hidden">
                                {/* FBI watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <span className="text-9xl font-bold">A</span>
                                </div>

                                <div className="text-center mb-4 relative">
                                    <h3 className="text-xl text-yellow-400 font-bold">AGENT IDENTIFICATION</h3>
                                    <p className="text-xs text-gray-400">FEDERAL BUREAU OF INVESTIGATION</p>
                                    <div className="absolute top-0 right-0 w-24 h-24 -mt-2 -mr-2">
                                        {stampVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, rotate: -20, scale: 1.5 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className="w-full h-full relative"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center transform rotate-12">
                                                        <span className="text-red-600 font-bold text-xs text-center">CLASSIFIED</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mr-4 relative">
                                        <img src={personalInfo.photo} alt="Agent Photo" className="border-2 border-gray-600 h-28 w-50 object-cover" />
                                        <div className="mt-2 bg-blue-800 p-1 text-center">
                                            <span className="text-xs">ID: {personalInfo.id}</span>
                                        </div>
                                        <div className="absolute -bottom-2 right-0 transform rotate-6">
                                            <div className="w-10 h-10">
                                                <svg className="w-full h-full text-blue-500 opacity-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="currentColor" />
                                                    <path d="M6 8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8Z" fill="currentColor" />
                                                    <path d="M2 12C2 9.79086 3.79086 8 6 8V16C3.79086 16 2 14.2091 2 12Z" fill="currentColor" />
                                                    <path d="M18 8C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16V8Z" fill="currentColor" />
                                                    <path d="M8 18C8 20.2091 9.79086 22 12 22C14.2091 22 16 20.2091 16 18H8Z" fill="currentColor" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-gray-400">NAME:</div>
                                            <div className="text-white font-bold">{personalInfo.name}</div>

                                            <div className="text-gray-400">ROLE:</div>
                                            <div className="text-white">{personalInfo.role}</div>

                                            <div className="text-gray-400">CLEARANCE:</div>
                                            <motion.div
                                                className="text-green-500 font-bold"
                                                animate={{ textShadow: ['0 0 0px #10b981', '0 0 8px #10b981', '0 0 0px #10b981'] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                {personalInfo.clearanceLevel}
                                            </motion.div>

                                            <div className="text-gray-400">DOB:</div>
                                            <div className="text-white">{personalInfo.dob}</div>

                                            <div className="text-gray-400">LOCATION:</div>
                                            <div className="text-white">{personalInfo.location}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-2 border-t border-blue-700">
                                    <div className="text-xs text-center text-gray-400">
                                        THIS ID CARD MUST BE WORN AT ALL TIMES WITHIN RESTRICTED AREAS
                                    </div>
                                </div>

                                {/* Barcode and other elements */}
                                <div className="mt-3 flex justify-between items-center">
                                    <div className="w-32 h-8 bg-white rounded-sm flex items-center justify-center overflow-hidden">
                                        <div className="flex h-full">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-full w-1"
                                                    style={{
                                                        backgroundColor: Math.random() > 0.5 ? 'black' : 'white',
                                                        marginRight: '1px'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-xs text-right">
                                        <div>ISSUED: 25-01-yyyy</div>
                                        <div>EXPIRES: never</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Projects Info */}
                    {selectedDoc === 'projects' && !documentLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="bg-gray-100 text-gray-900 p-4 rounded-md shadow-lg max-w-lg mx-auto relative">
                                {/* Background watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <span className="text-9xl font-bold tracking-widest">A</span>
                                </div>

                                <div className="flex justify-between items-center mb-4 relative">
                                    <h3 className="text-xl font-bold flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        CASE DOSSIERS
                                    </h3>
                                    <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">TOP SECRET</div>

                                    {/* Stamp */}
                                    <div className="absolute top-0 right-0 w-24 h-24 -mt-6 -mr-6">
                                        {stampVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, rotate: -20, scale: 1.5 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className="w-full h-full relative"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center transform rotate-12">
                                                        <span className="text-red-600 font-bold text-xs text-center">TOP SECRET</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            className="border-l-4 border-gray-800 pl-3 py-1 bg-gray-50 shadow-sm"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <div className="flex justify-between">
                                                <h4 className="font-bold">{project.title}</h4>
                                                <span className={`text-xs px-2 py-1 rounded ${project.status === 'COMPLETED' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                                                    }`}>{project.status}</span>
                                            </div>
                                            <p className="text-sm my-1">{project.description}</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <motion.span
                                                        key={tech}
                                                        className="bg-gray-300 text-gray-800 px-2 py-0.5 text-xs rounded"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.2, delay: 0.3 + (techIndex * 0.05) }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            {project.link && (
                                                <div className="text-left mt-1">
                                                    <span className="text-xs text-gray-800">TRY: <a className='underline text-purple-500 hover:text-purple-700' href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></span>
                                                </div>
                                            )}
                                            <div className="text-right mt-1">
                                                <span className="text-xs text-gray-500">CODE: {project.id}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-2 border-t border-gray-300 text-center text-xs text-gray-500">
                                    <div className="flex justify-between">
                                        <span>INTERNAL USE ONLY</span>
                                        <span>AUTHORIZED PERSONNEL ONLY</span>
                                    </div>
                                </div>

                                {/* File info */}
                                <div className="mt-3 flex justify-between text-xs text-gray-500">
                                    <div>FILE REF: FD-302-CY</div>
                                    <div>DATE: {currentDate}</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Skills Assessment */}
                    {selectedDoc === 'skills' && !documentLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >

                            <div className="bg-gray-100 text-gray-900 p-4 rounded-md shadow-lg max-w-lg mx-auto relative">
                                {/* Background watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                    <span className="text-9xl font-bold tracking-widest">A</span>
                                </div>

                                <div className="flex justify-between items-center mb-4 relative">
                                    <h3 className="text-xl font-bold flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        CAPABILITY ASSESSMENT
                                    </h3>
                                    <div className="bg-yellow-600 text-white px-2 py-1 text-xs font-bold rounded">CLASSIFIED</div>

                                    {/* Stamp */}
                                    <div className="absolute top-0 right-0 w-24 h-24 -mt-6 -mr-6">
                                        {stampVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, rotate: -20, scale: 1.5 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className="w-full h-full relative"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 border-4 border-yellow-600 rounded-full flex items-center justify-center transform rotate-12">
                                                        <span className="text-yellow-600 font-bold text-xs text-center">CLASSIFIED</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {skills.map((skillCategory, index) => (
                                        <motion.div
                                            key={skillCategory.category}
                                            className="bg-gray-50 p-3 shadow-sm"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <h4 className="font-bold border-b border-gray-300 pb-1 mb-2">{skillCategory.category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skillCategory.items.map((skill, skillIndex) => (
                                                    <motion.span
                                                        key={skill}
                                                        className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full flex items-center"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.2, delay: 0.3 + (skillIndex * 0.05) }}
                                                    >
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-2 border-t border-gray-300 text-center text-xs text-gray-500">
                                    <div className="flex justify-between">
                                        <span>ASSESSMENT DATE: 01-15-2025</span>
                                        <span>EVALUATOR: REDACTED</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* About Me / Hear Me Yap Section */}
                    {selectedDoc === 'about' && !documentLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="bg-orange-50 text-gray-800 p-6 rounded-md shadow-lg max-w-2xl mx-auto relative border-2 border-orange-700">
                                {/* Ashoka Chakra Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                                    <svg className="w-64 h-64 text-blue-900" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
                                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                        {[...Array(24)].map((_, i) => (
                                            <line
                                                key={i}
                                                x1="12"
                                                y1="12"
                                                x2="12"
                                                y2="2"
                                                stroke="currentColor"
                                                strokeWidth="0.5"
                                                transform={`rotate(${i * 15}, 12, 12)`}
                                            />
                                        ))}
                                    </svg>
                                </div>

                                <div className="flex justify-between items-start mb-4 relative">
                                    <div>
                                        <h3 className="text-2xl font-bold text-orange-800 flex items-center">
                                            <svg className="w-6 h-6 mr-2 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            PERSONAL LOG / FIELD NOTES
                                        </h3>
                                        <p className="text-sm text-orange-600 ml-8">Entry Date: {currentDate}</p>
                                    </div>

                                    {/* Fake Indian Government Stamp */}
                                    <div className="absolute top-0 right-0 w-28 h-28 -mt-4 -mr-4">
                                        {stampVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, rotate: 30, scale: 1.5 }}
                                                animate={{ opacity: 1, rotate: 10, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 250, damping: 12 }}
                                                className="w-full h-full relative"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-24 h-24 border-4 border-green-700 rounded-full flex flex-col items-center justify-center transform rotate-10 bg-white bg-opacity-80 p-1">
                                                        <span className="text-green-800 font-bold text-[10px] leading-tight text-center">भारत सरकार</span>
                                                        <span className="text-green-800 font-bold text-[8px] leading-tight text-center">GOVT. OF INDIA</span>
                                                        <div className="w-10 h-10 my-0.5">
                                                            {/* Simplified Ashoka Emblem */}
                                                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#FF9933">
                                                                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
                                                                <circle cx="50" cy="50" r="15" fill="#000080" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-red-700 font-bold text-[9px] leading-tight text-center tracking-tighter">गोपनीय / CONFIDENTIAL</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed relative z-10">
                                    {renderEssayWithHiddenText(aboutMeEssay)}
                                </div>

                                <div className="mt-6 pt-3 border-t border-orange-300 text-xs text-orange-700">
                                    <div className="flex justify-between">
                                        <span>LOG REF: PERS-{personalInfo.id.substring(4)}</span>
                                        <span>VERIFIED: {formattedTime}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}


                    {/* Contact Info */}
                    {selectedDoc === 'contact' && !documentLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="bg-gray-800 text-gray-100 p-4 rounded-md border border-blue-500 max-w-lg mx-auto relative">
                                {/* Background pattern */}
                                <div className="absolute inset-0 opacity-5 pointer-events-none">
                                    <div className="w-full h-full" style={{
                                        backgroundImage: 'repeating-linear-gradient(45deg, #4b5563 0, #4b5563 1px, transparent 0, transparent 50%)',
                                        backgroundSize: '10px 10px'
                                    }}></div>
                                </div>

                                <div className="flex justify-between items-center mb-4 relative">
                                    <h3 className="text-xl font-bold text-blue-400 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        SECURE COMMS PROTOCOL
                                    </h3>

                                    {/* Stamp */}
                                    <div className="absolute top-0 right-0 w-24 h-24 -mt-6 -mr-6">
                                        {stampVisible && (
                                            <motion.div
                                                initial={{ opacity: 0, rotate: -20, scale: 1.5 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                className="w-full h-full relative"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 border-4 border-blue-600 rounded-full flex items-center justify-center transform rotate-12">
                                                        <span className="text-blue-600 font-bold text-xs text-center">ENCRYPTED</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-900 p-4 rounded-md border border-gray-700 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-green-400 font-mono text-sm">SECURE CHANNEL STATUS</h4>
                                        <motion.div
                                            className="flex items-center"
                                            animate={{ opacity: [1, 0.7, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                            <span className="text-green-500 text-xs">ACTIVE</span>
                                        </motion.div>
                                    </div>

                                    <div className="font-mono text-xs text-gray-400 bg-gray-800 p-2 rounded">
                                        <div>ENCRYPTION: AES-256</div>
                                        <div>PROTOCOL: TLS 1.3</div>
                                        <div>CHANNEL ID: SC-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</div>
                                        <div>LAST VERIFIED: {formattedTime}</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <motion.div
                                        className="bg-gray-700 p-3 rounded-md"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 className="font-bold text-blue-300 mb-2">SECURE EMAIL</h4>
                                        <div className="flex items-center bg-gray-800 p-2 rounded">
                                            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {/* Make sure email is not wrapped in HiddenText unless intended */}
                                            <span className="font-mono">armaan33000@gmail.com</span>
                                        </div>
                                    </motion.div>



                                    <motion.div
                                        className="bg-gray-700 p-3 rounded-md"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        <h4 className="font-bold text-blue-300 mb-2">FIELD OFFICE</h4>
                                        <div className="flex items-center bg-gray-800 p-2 rounded">
                                            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="font-mono">{personalInfo.location}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="mt-4 pt-2 border-t border-gray-600 text-xs text-gray-400">
                                    <div className="flex justify-between">
                                        <span>COMMS PROTOCOL VERSION: 3.5.2</span>
                                        <span>UPDATED: 01-15-2025</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </main>

            {/* Footer */}
            <motion.footer
                className="mt-8 text-center text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <div className="border-t border-gray-800 pt-4">
                    <p>FEDERAL BUREAU OF INVESTIGATION - CYBER DIVISION</p>
                    <p className="mt-1">CLASSIFIED INFORMATION SYSTEM - AUTHORIZED ACCESS ONLY</p>
                    <motion.div
                        className="w-full h-1 bg-blue-900 mt-2 relative overflow-hidden"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-blue-500"
                            animate={{
                                left: ["-20%", "100%"],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{ width: "20%" }}
                        />
                    </motion.div>
                </div>
            </motion.footer>
        </div>
    );
};

export default FBIPortfolioPage;

