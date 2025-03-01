import React, { useState, useEffect } from 'react';

const Trending = () => {
    const [trendingMemes, setTrendingMemes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    // Simulate loading trending memes
    useEffect(() => {
        const trendingGifs = [
            { url: "./public/one.gif" },
            { url: "./public/two.gif" },
            { url: "./public/threee.gif" },
            { url: "./public/four.gif" },
            { url: "./public/five.gif" },
            { url: "./public/six.gif" },
            { url: "./public/seven.gif" },
            { url: "./public/eight.gif" },
            { url: "./public/nine.gif" },
            { url: "./public/ten.gif" },
            { url: "./public/elevem.mp4" },
            { url: "./public/twelve.mp4" },
        ];
        setTrendingMemes(trendingGifs);
    }, []);

    // Function to handle copying link to clipboard
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 5000); // Hide popup after 5 seconds
        });
    };

    // Function to handle downloading the meme
    const downloadMeme = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Extract filename from URL
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to display memes
    const displayMemes = (memes) => {
        if (!memes || memes.length === 0) {
            return <p className="text-[#f8f8f2] text-xl">No memes found. Please try again later.</p>;
        }

        return memes.map((meme, index) => {
            if (!meme.url) {
                console.error('Invalid meme:', meme);
                return null;
            }

            return (
                <div
                    key={index}
                    className="bg-[#282a36] rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 relative group"
                >
                    {/* Meme Content */}
                    <a href={meme.url} target="_blank" rel="noopener noreferrer">
                        {meme.url.endsWith('.mp4') ? (
                            <video src={meme.url} autoPlay loop muted className="w-full h-64 object-cover" />
                        ) : (
                            <img src={meme.url} alt="meme" className="w-full h-64 object-cover" />
                        )}
                    </a>

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
            );
        });
    };

    return (
        <main id="trending-page" className="container mx-auto px-4 pt-12 pb-12 flex flex-col flex-grow bg-[#1e1e2e]">
            <h1 className="text-3xl font-bold text-[#ff79c6] mb-8">Trending Memes</h1>
            <div id="trending-meme-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 overflow-y-auto flex-grow bg-[#282a36] rounded-lg">
                {displayMemes(trendingMemes)}
            </div>

            {/* Popup Notification */}
            {showPopup && (
                <div className="fixed bottom-4 right-4 bg-[#8be9fd] text-[#282a36] px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                    Link copied to clipboard!
                </div>
            )}
        </main>
    );
};

export default Trending;