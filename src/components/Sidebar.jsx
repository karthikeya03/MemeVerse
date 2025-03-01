import React, { useEffect, useRef } from 'react';
import { MdMenuOpen } from "react-icons/md";
import { FaFire, FaCompass, FaUpload, FaInfoCircle, FaTrophy, FaUserCircle } from "react-icons/fa";
import { gsap } from 'gsap';

const Sidebar = ({ open, setOpen, setActivePage, activePage }) => {
    const logoRef = useRef(null);

    // Logo Animation
    useEffect(() => {
        if (open && logoRef.current) {
            const letters = logoRef.current.textContent.split('');
            logoRef.current.textContent = ''; // Clear the text

            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.opacity = 0;
                logoRef.current.appendChild(span);

                gsap.to(span, {
                    opacity: 1,
                    duration: 0.3,
                    delay: index * 0.1, // Staggered animation
                });
            });
        }
    }, [open]);

    // Menu Items Array
    const menuItems = [
        { icon: <FaFire />, label: 'Trending', page: 'trending' },
        { icon: <FaCompass />, label: 'Explorer', page: 'explorer' },
        { icon: <FaUpload />, label: 'Upload', page: 'upload' },
        { icon: <FaInfoCircle />, label: 'Details', page: 'details' },
        { icon: <FaTrophy />, label: 'Leaderboard', page: 'leaderboard' } // Added Leaderboard menu item
    ];

    return (
        <nav
            className={`fixed top-0 left-0 h-screen flex flex-col duration-500 bg-[#121212] text-[#F5F5F5] ${
                open ? 'w-72' : 'w-20'
            } shadow-xl transition-all ease-in-out border-r border-[#2A2A2A] z-50`}
        >
            {/* Header */}
            <div className='px-5 py-4 flex items-center justify-between border-b border-[#2A2A2A]'>
                <span
                    ref={logoRef}
                    className={`text-2xl font-extrabold bg-gradient-to-r from-[#8E54E9] to-[#4776E6] text-transparent bg-clip-text transition-all duration-500 ${
                        !open && 'hidden'
                    }`}
                >
                    MemeVerse
                </span>
                <MdMenuOpen
                    size={28}
                    className="cursor-pointer text-[#F5F5F5] hover:text-[#8E54E9] transition-all duration-300 hover:rotate-180"
                    onClick={() => setOpen(!open)}
                />
            </div>

            {/* Menu Items */}
            <ul className='flex-1 mt-6 space-y-2'>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-4 px-5 py-3 rounded-md text-[#F5F5F5] hover:bg-[#8E54E9] hover:text-white transition-all duration-300 cursor-pointer ${
                            activePage === item.page ? 'bg-[#8E54E9]' : 'bg-transparent'
                        }`}
                        onClick={() => item.page && setActivePage(item.page)} // Switch pages when clicked
                    >
                        {React.cloneElement(item.icon, {
                            size: 24,
                            className: "text-[#F5F5F5] hover:scale-110 transition-all duration-300"
                        })}
                        <span
                            className={`text-lg font-medium transition-all duration-300 ${
                                !open && 'hidden'
                            }`}
                        >
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Footer (Profile) */}
            <div className='flex items-center gap-4 px-5 py-4 border-t border-[#2A2A2A] transition-all duration-300 cursor-pointer hover:bg-[#1E1E1E]'>
                <FaUserCircle
                    size={38}
                    className="text-[#F5F5F5] hover:text-[#8E54E9] transition-all duration-300 transform hover:scale-110"
                />
                {open && (
                    <div className='transition-all duration-300'>
                        <p className="text-sm font-semibold">SSK</p>
                        <span className="text-xs text-gray-400">saisatyakarthikeya@gmail.com</span>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Sidebar;