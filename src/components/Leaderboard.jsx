import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [userRankings, setUserRankings] = useState([]);

  // Fetch top memes from Imgflip API
  const fetchMemes = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    setTopMemes(data.data.memes.slice(0, 10)); // Get top 10 memes
  };

  // Generate fake user rankings
  const generateFakeRankings = () => {
    const users = [
      "ShadowPhoenix",
      "NeonBlaze",
      "CodeMaster",
      "InfernoKing",
      "StormBreaker",
      "NightRaven",
      "VoidSlayer",
      "CyberNinja",
      "DarkSpecter",
      "PixelDemon",
    ];
    return users.map((user) => ({
      name: user,
      score: Math.floor(Math.random() * 1000) + 100,
    }));
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMemes();
    setUserRankings(generateFakeRankings());
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#2b0a3d] to-[#0a0a0a] min-h-screen text-white font-poppins">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        {/* Top Memes Section */}
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] bg-clip-text text-transparent">
          🔥 Top 10 Memes 🔥
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topMemes.map((meme) => (
            <div
              key={meme.id}
              className="meme-card bg-[#1E1E2E] rounded-xl overflow-hidden shadow-2xl hover:shadow-[#8E54E9]/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#FF79C6]">
                  {meme.name}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-400">❤️ 1.2k</span>
                  <span className="text-sm text-gray-400">💬 45</span>
                  <span className="text-sm text-gray-400">🔗 12</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Rankings Section */}
        <h2 className="text-4xl font-bold text-center mt-20 mb-12 bg-gradient-to-r from-[#8E54E9] to-[#FF79C6] bg-clip-text text-transparent">
          🏆 User Rankings 🏆
        </h2>
        <div className="glass bg-[#1E1E2E] rounded-xl p-8 shadow-2xl">
          <ul className="space-y-4">
            {userRankings
              .sort((a, b) => b.score - a.score)
              .map((user, index) => (
                <li
                  key={user.name}
                  className="user-rank bg-gradient-to-r from-[#6a0dad] to-[#ff007f] rounded-xl p-4 flex justify-between items-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">
                      #{index + 1}
                    </span>
                    <span className="text-xl font-semibold text-white">
                      {user.name}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    {user.score} pts
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;