import React, { useState, useEffect, useCallback } from 'react';

const Explorer = () => {
    const [allMemes, setAllMemes] = useState([]);
    const [filteredMemes, setFilteredMemes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false); // For copy-to-clipboard popup
    const [loading, setLoading] = useState(false); // For loading state
    const [currentCategory, setCurrentCategory] = useState('all'); // For meme categories
    const memesPerPage = 20;

    // Fetch memes from Imgflip API
    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const response = await fetch('https://api.imgflip.com/get_memes');
                const data = await response.json();
                setAllMemes(data.data.memes);
                setFilteredMemes(data.data.memes.slice(0, memesPerPage));
            } catch (error) {
                console.error('Error fetching memes:', error);
            }
        };

        fetchMemes();
    }, []);

    // Load more memes (cycles back to the beginning if no more memes are available)
    const loadMoreMemes = useCallback(() => {
        if (loading) return; // Prevent multiple calls
        setLoading(true);

        const startIndex = (currentPage + 1) * memesPerPage;
        const endIndex = startIndex + memesPerPage;

        // If no more memes are available, cycle back to the beginning
        let newMemes = [];
        if (startIndex >= allMemes.length) {
            newMemes = allMemes.slice(0, memesPerPage);
            setCurrentPage(0); // Reset to the first page
        } else {
            newMemes = allMemes.slice(startIndex, endIndex);
            setCurrentPage((prev) => prev + 1);
        }

        setFilteredMemes((prev) => [...prev, ...newMemes]);
        setLoading(false);
    }, [allMemes, currentPage, loading]);

    // Infinite scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 // Load more when 100px from bottom
            ) {
                loadMoreMemes();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreMemes]);

    // Search memes
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = allMemes.filter((meme) =>
            meme.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMemes(filtered.slice(0, memesPerPage));
        setCurrentPage(0);
    };

    // Filter memes by category
    const filterMemes = (category) => {
        setCurrentCategory(category);
        let filtered = [];

        switch (category) {
            case 'trending':
                filtered = allMemes.filter((meme) => meme.box_count > 2); // Trending memes
                break;
            case 'new':
                filtered = allMemes.sort((a, b) => b.id - a.id); // Newest memes
                break;
            case 'classic':
                filtered = allMemes.filter((meme) => meme.box_count <= 2); // Classic memes
                break;
            case 'random':
                filtered = allMemes.sort(() => Math.random() - 0.5); // Random memes
                break;
            default:
                filtered = allMemes; // All memes
        }

        setFilteredMemes(filtered.slice(0, memesPerPage));
        setCurrentPage(0);
    };

    // Copy meme URL to clipboard
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 5000); // Hide popup after 5 seconds
        });
    };

    // Download meme
    const downloadMeme = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Extract filename from URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-[#1e1e2e] min-h-screen flex flex-col p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-[#ff79c6] mb-8">Explore Memes</h1>

            {/* Search Bar and Categories Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search memes..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="bg-[#282a36] text-[#f8f8f2] rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#8be9fd]"
                    />
                    <button className="absolute right-2 top-2 text-[#f8f8f2] hover:text-[#8be9fd]">
                        🔍
                    </button>
                </div>

                {/* Meme Categories Filter */}
                <div className="flex space-x-4">
                    {['All', 'Trending', 'New', 'Classic', 'Random'].map((category) => (
                        <button
                            key={category}
                            onClick={() => filterMemes(category.toLowerCase())}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-md bg-[#282a36]/50 border border-[#8be9fd]/20 hover:bg-[#8be9fd]/20 hover:border-[#8be9fd]/50 ${
                                currentCategory === category.toLowerCase()
                                    ? 'bg-[#8be9fd]/20 border-[#8be9fd]/50'
                                    : 'bg-[#282a36]/50 border-[#8be9fd]/20'
                            }`}
                        >
                            <span className="text-[#f8f8f2] font-medium">{category}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Meme Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow">
                {filteredMemes.map((meme, index) => (
                    <div
                        key={index}
                        className="bg-[#282a36] rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 relative group"
                    >
                        <a href={meme.url} target="_blank" rel="noopener noreferrer">
                            <img src={meme.url} alt="meme" className="w-full h-64 object-cover" />
                        </a>

                        {/* Meme Name Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white text-lg font-semibold text-center">
                                {meme.name}
                            </p>
                        </div>

                        {/* Download Icon (Bottom Right) */}
                        <div
                            className="absolute bottom-2 right-2 p-2 bg-[#282a36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            onClick={() => downloadMeme(meme.url)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#f8f8f2]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </div>

                        {/* Copy Icon (Bottom Left) */}
                        <div
                            className="absolute bottom-2 left-2 p-2 bg-[#282a36] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            onClick={() => copyToClipboard(meme.url)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#f8f8f2]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8be9fd]"></div>
                </div>
            )}

            {/* Popup Notification */}
            {showPopup && (
                <div className="fixed bottom-4 right-4 bg-[#8be9fd] text-[#282a36] px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                    Link copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default Explorer;