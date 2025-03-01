import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./MemeDetails.css"; // Import the CSS file

const MemeDetails = () => {
  const [memes, setMemes] = useState([]);
  const [loadedMemes, setLoadedMemes] = useState(20);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  // Fetch memes from Imgflip API
  useEffect(() => {
    const fetchMemes = async () => {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setMemes(data.data.memes);
    };
    fetchMemes();
  }, []);

  // Display memes in the gallery
  const displayMemes = () => {
    return memes.slice(0, loadedMemes).map((meme) => (
      <div
        key={meme.id}
        className="relative bg-[#282a36] p-4 rounded-lg backdrop-blur-md hover:scale-105 transition-transform cursor-pointer"
        onClick={() => showMemeDetails(meme)}
      >
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <span className="text-[#FF79C6]">❤️ {getLikes(meme.id)}</span>
          <span className="text-[#FF79C6]">💬 {getComments(meme.id).length}</span>
          <span className="text-[#FF79C6]">🔗 {getShares(meme.id)}</span>
        </div>
      </div>
    ));
  };

  // Show meme details in a popup
  const showMemeDetails = (meme) => {
    setSelectedMeme(meme);
    setLikes(getLikes(meme.id));
    setComments(getComments(meme.id));
    gsap.fromTo("#meme-popup", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  // Close the popup
  const closePopup = () => {
    gsap.to("#meme-popup", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => setSelectedMeme(null),
    });
  };

  // Get likes for a meme (random value for demo)
  const getLikes = (memeId) => {
    return JSON.parse(localStorage.getItem(`likes_${memeId}`)) || Math.floor(Math.random() * 1000);
  };

  // Get comments for a meme
  const getComments = (memeId) => {
    return JSON.parse(localStorage.getItem(`comments_${memeId}`)) || [];
  };

  // Get shares for a meme (random value for demo)
  const getShares = (memeId) => {
    return JSON.parse(localStorage.getItem(`shares_${memeId}`)) || Math.floor(Math.random() * 500);
  };

  // Like functionality
  const handleLike = () => {
    if (!selectedMeme) return;

    const likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    if (likedMemes.includes(selectedMeme.id)) {
      alert("You have already liked this meme!");
      return;
    }

    const newLikes = likes + 1;
    setLikes(newLikes);
    likedMemes.push(selectedMeme.id);
    localStorage.setItem("likedMemes", JSON.stringify(likedMemes));
    localStorage.setItem(`likes_${selectedMeme.id}`, newLikes);
  };

  // Share functionality
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  // Comment functionality
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentInput = e.target.commentInput;
    const commentText = commentInput.value.trim();
    if (commentText) {
      const newComments = [...comments, commentText];
      setComments(newComments);
      localStorage.setItem(`comments_${selectedMeme.id}`, JSON.stringify(newComments));
      commentInput.value = "";
    }
  };

  // Load more memes
  const loadMore = () => {
    setLoadedMemes(loadedMemes + 20);
  };

  return (
    <div className="bg-[#1E1E2E] min-h-screen flex flex-col text-[#FF79C6]">
      {/* Meme Gallery */}
      <main className="container mx-auto px-4 py-20 flex-grow">
        <h1 className="text-4xl font-bold text-[#FF79C6] mb-8">Meme Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayMemes()}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold"
          >
            Load More
          </button>
        </div>
      </main>

      {/* Meme Details Popup */}
      {selectedMeme && (
        <div id="meme-popup" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50">
          <div className="container mx-auto px-4 py-20 h-full flex items-center justify-center">
            <div className="bg-[#282a36] p-8 rounded-lg backdrop-blur-md w-full max-w-3xl relative">
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-[#FF79C6] hover:text-[#8E54E9] transition-all"
              >
                ✕
              </button>

              {/* Meme Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Meme Image */}
                <div>
                  <img
                    src={selectedMeme.url}
                    alt="Meme Image"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>

                {/* Meme Details */}
                <div>
                  <h2 className="text-2xl font-bold text-[#FF79C6] mb-4">{selectedMeme.name}</h2>
                  <p className="text-[#FF79C6] mb-2">ID: {selectedMeme.id}</p>
                  <p className="text-[#FF79C6] mb-4">Tags: {selectedMeme.tags || "No tags available"}</p>

                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className="px-6 py-2 bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold"
                  >
                    <span>{likes}</span> Likes
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="ml-4 px-6 py-2 bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold"
                  >
                    Share
                  </button>

                  {/* Share Options */}
                  {showShareOptions && (
                    <div className="mt-4">
                      <a
                        href={`https://wa.me/?text=Check out this meme: ${selectedMeme.name}%20${selectedMeme.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white px-4 py-2 rounded-lg mb-2 hover:bg-gradient-to-l transition-all duration-300 font-bold"
                      >
                        Share on WhatsApp
                      </a>
                      <a
                        href={`mailto:?subject=Check out this meme: ${selectedMeme.name}&body=${selectedMeme.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white px-4 py-2 rounded-lg mb-2 hover:bg-gradient-to-l transition-all duration-300 font-bold"
                      >
                        Share via Gmail
                      </a>
                      <a
                        href={`https://www.instagram.com/?url=${selectedMeme.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white px-4 py-2 rounded-lg mb-2 hover:bg-gradient-to-l transition-all duration-300 font-bold"
                      >
                        Share on Instagram
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${selectedMeme.url}&text=Check out this meme: ${selectedMeme.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white px-4 py-2 rounded-lg mb-2 hover:bg-gradient-to-l transition-all duration-300 font-bold"
                      >
                        Share on Telegram
                      </a>
                    </div>
                  )}

                  {/* Comments Section */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-[#FF79C6] mb-4">Comments</h3>
                    <ul className="space-y-3 mb-6">
                      {comments.map((comment, index) => (
                        <li key={index} className="bg-[#1E1E2E] p-3 rounded-lg text-[#FF79C6]">
                          {comment}
                        </li>
                      ))}
                    </ul>
                    <form onSubmit={handleCommentSubmit} className="flex gap-2">
                      <input
                        type="text"
                        id="commentInput"
                        placeholder="Add a comment"
                        required
                        className="flex-grow p-2 rounded-lg bg-[#1E1E2E] text-[#FF79C6] placeholder-[#FF79C6] focus:outline-none focus:ring-2 focus:ring-[#FF79C6]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] text-white rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold"
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeDetails;