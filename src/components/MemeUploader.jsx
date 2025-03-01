import React, { useState, useRef } from 'react';

const MemeUploader = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [text, setText] = useState('');
    const [textSize, setTextSize] = useState(24);
    const [textColor, setTextColor] = useState('#ffffff');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
    const [uploadedMemes, setUploadedMemes] = useState([]);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('animals'); // Default category
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null);

    // Predefined categories and captions (30 captions per category)
    const categories = {
        animals: [
            "When your dog judges your life choices...",
            "Cats: The only rulers who sleep on the job.",
            "When you realize your goldfish has a better social life than you.",
            "Birds: The original influencers.",
            "When your pet hamster outlives your plants...",
            "Dogs: Professional tail-waggers since forever.",
            "When your cat brings you a 'gift'...",
            "Why do squirrels always look like they’re plotting something?",
            "When your parrot starts repeating your embarrassing moments...",
            "Rabbits: The original hoppers.",
            "When your lizard stares into your soul...",
            "Why do turtles always look so wise?",
            "When your fish gives you the silent treatment...",
            "Horses: The original gym bros.",
            "When your snake refuses to cooperate...",
            "Why do ducks always look so happy?",
            "When your hamster escapes its cage...",
            "Frogs: The original jumpers.",
            "When your bird mimics your laugh...",
            "Why do cows always look so chill?",
            "When your dog steals your spot on the couch...",
            "Cats: The masters of the 'I don’t care' look.",
            "When your pet rat outsmarts you...",
            "Why do goats always look so mischievous?",
            "When your parrot starts singing your shower songs...",
            "Dogs: The ultimate food detectors.",
            "When your cat ignores you...",
            "Why do pigs always look so content?",
            "When your hamster runs on its wheel at 3 AM...",
            "Birds: The original alarm clocks.",
        ],
        food: [
            "When pizza is life...",
            "Why does ice cream always disappear so fast?",
            "When you eat the last slice of cake...",
            "Pasta: The ultimate comfort food.",
            "When your fries go missing...",
            "Why does chocolate always make everything better?",
            "When you find out pizza is a vegetable...",
            "Coffee: The reason I function.",
            "When your burger is too big to handle...",
            "Why does pizza always taste better at 2 AM?",
            "When you eat all the cookies...",
            "Tacos: The perfect food.",
            "When your ice cream melts before you can eat it...",
            "Why does pizza always win?",
            "When you eat the whole bag of chips...",
            "Pizza: The answer to everything.",
            "When your fries are too salty...",
            "Why does pizza always make you happy?",
            "When you eat all the donuts...",
            "Pizza: The ultimate mood booster.",
            "When your burger falls apart...",
            "Why does pizza always taste better cold?",
            "When you eat all the candy...",
            "Pizza: The only thing you need.",
            "When your fries are too soggy...",
            "Why does pizza always hit the spot?",
            "When you eat all the pizza...",
            "Pizza: The ultimate cheat meal.",
            "When your fries are too crispy...",
            "Why does pizza always make you feel better?",
        ],
        tech: [
            "When your computer updates at the worst time...",
            "Why does my Wi-Fi work everywhere except my room?",
            "When your phone dies at 15%...",
            "Me: I’ll just check one notification. Also me: 3 hours later...",
            "When autocorrect ruins your text...",
            "Why does my laptop sound like a jet engine?",
            "When you forget to save your work...",
            "Me: I’ll just watch one video. YouTube: Here’s 47 recommendations.",
            "When your printer runs out of ink...",
            "Why does my phone always die at the worst moment?",
            "When your app crashes mid-scroll...",
            "Me: I’ll just check my email. Also me: 2 hours later...",
            "When your software update takes forever...",
            "Why does my charger only work at a specific angle?",
            "When your phone autocorrects to something embarrassing...",
            "Me: I’ll just play one game. Also me: 5 hours later...",
            "When your laptop freezes during a presentation...",
            "Why does my phone always ring in silent mode?",
            "When your internet goes out mid-stream...",
            "Me: I’ll just check social media. Also me: 4 hours later...",
            "When your keyboard stops working...",
            "Why does my phone always die at 1%?",
            "When your app updates and everything changes...",
            "Me: I’ll just reply to one message. Also me: 3 hours later...",
            "When your computer crashes before you save...",
            "Why does my phone always lag at the worst time?",
            "When your phone autocorrects to something weird...",
            "Me: I’ll just watch one episode. Also me: 10 episodes later...",
            "When your laptop battery dies unexpectedly...",
            "Why does my phone always die when I need it most?",
        ],
        // Add more categories here...
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    // Handle text input changes
    const handleTextChange = (e) => setText(e.target.value);
    const handleTextSizeChange = (e) => setTextSize(parseInt(e.target.value));
    const handleTextColorChange = (e) => setTextColor(e.target.value);
    const handleFontFamilyChange = (e) => setFontFamily(e.target.value);
    const handleTextPositionChange = (e) => {
        const { name, value } = e.target;
        setTextPosition((prev) => ({ ...prev, [name]: parseInt(value) }));
    };

    // Handle meme upload
    const handleUpload = () => {
        if (!file || !text) return;

        const newMeme = {
            id: Date.now(),
            url: preview,
            text,
            textSize,
            textColor,
            fontFamily,
            textPosition,
        };

        setUploadedMemes((prev) => [...prev, newMeme]);
        setFile(null);
        setPreview(null);
        setText('');
        setTextSize(24);
        setTextColor('#ffffff');
        setFontFamily('Arial');
        setTextPosition({ x: 50, y: 50 });
        fileInputRef.current.value = '';
    };

    // Handle meme download
    const downloadMeme = (meme) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = meme.url;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.font = `${meme.textSize}px ${meme.fontFamily}`;
            ctx.fillStyle = meme.textColor;
            ctx.textAlign = 'center';
            ctx.fillText(meme.text, (meme.textPosition.x / 100) * canvas.width, (meme.textPosition.y / 100) * canvas.height);

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `meme-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    // Generate a random caption based on category
    const generateCaption = () => {
        const categoryCaptions = categories[category];
        const randomCaption = categoryCaptions[Math.floor(Math.random() * categoryCaptions.length)];
        setCaption(randomCaption);
    };

    // Add caption to text input with smooth loading animation
    const addCaptionToText = () => {
        setIsLoading(true); // Start loading animation
        setTimeout(() => {
            setText(caption);
            setIsLoading(false); // Stop loading animation
        }, 1000); // Simulate a 1-second delay
    };

    return (
        <div className="p-6 bg-[#1e1e2e] min-h-screen text-[#f8f8f2] relative overflow-hidden">
            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 mt-8">
                <h1 className="text-5xl font-bold mb-8 text-[#ff79c6] text-center">
                     Meme Caption Generator
                </h1>

                {/* File Upload Section */}
                <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto mb-8 border-2 border-[#8E54E9] hover:border-[#ff79c6] transition-all duration-300">
                    {/* File Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Choose a Meme</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="w-full p-3 border-2 border-[#8E54E9] rounded-lg bg-[#121212] text-white focus:outline-none focus:border-[#ff79c6] transition-all duration-300 hover:border-[#ff79c6]"
                        />
                    </div>

                    {/* Preview Section */}
                    {preview && (
                        <div className="mb-6 relative">
                            <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                            {text && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: `${textPosition.x}%`,
                                        top: `${textPosition.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: `${textSize}px`,
                                        color: textColor,
                                        fontFamily: fontFamily,
                                    }}
                                    className="text-center whitespace-nowrap"
                                >
                                    {text}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Category Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Select Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 border-2 border-[#8E54E9] rounded-lg bg-[#121212] text-white focus:outline-none focus:border-[#ff79c6] transition-all duration-300 hover:border-[#ff79c6]"
                        >
                            <option value="animals">Animals</option>
                            <option value="food">Food</option>
                            <option value="tech">Tech</option>
                            {/* Add more categories here... */}
                        </select>
                    </div>

                    {/* Caption Section */}
                    <div className="mb-6">
                        <button
                            onClick={generateCaption}
                            className="w-full bg-gradient-to-r from-[#8E54E9] to-[#ff79c6] text-white py-3 px-6 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl mb-4"
                        >
                            Generate Caption
                        </button>
                        {caption && (
                            <div className="mt-4 p-4 bg-[#282a36] rounded-lg text-[#f8f8f2]">
                                <p className="text-sm">{caption}</p>
                                <button
                                    onClick={addCaptionToText}
                                    className="mt-2 w-full bg-gradient-to-r from-[#8E54E9] to-[#ff79c6] text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold"
                                >
                                    {isLoading ? "Adding Caption..." : "Add Caption to Text"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Text Input Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Add Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                            className="w-full p-3 border-2 border-[#8E54E9] rounded-lg bg-[#121212] text-white focus:outline-none focus:border-[#ff79c6] transition-all duration-300 hover:border-[#ff79c6]"
                            placeholder="Enter meme text"
                        />
                    </div>

                    {/* Text Size Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Text Size</label>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={textSize}
                            onChange={handleTextSizeChange}
                            className="w-full accent-[#8E54E9]"
                        />
                    </div>

                    {/* Text Color Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Text Color</label>
                        <input
                            type="color"
                            value={textColor}
                            onChange={handleTextColorChange}
                            className="w-full p-1 bg-[#121212] rounded-lg border-2 border-[#8E54E9] hover:border-[#ff79c6]"
                        />
                    </div>

                    {/* Font Family Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Font Family</label>
                        <select
                            value={fontFamily}
                            onChange={handleFontFamilyChange}
                            className="w-full p-3 border-2 border-[#8E54E9] rounded-lg bg-[#121212] text-white focus:outline-none focus:border-[#ff79c6] transition-all duration-300 hover:border-[#ff79c6]"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Comic Sans MS">Comic Sans MS</option>
                        </select>
                    </div>

                    {/* Text Position Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-[#f8f8f2]">Text Position</label>
                        <div className="flex gap-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                name="x"
                                value={textPosition.x}
                                onChange={handleTextPositionChange}
                                className="w-full accent-[#8E54E9]"
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                name="y"
                                value={textPosition.y}
                                onChange={handleTextPositionChange}
                                className="w-full accent-[#8E54E9]"
                            />
                        </div>
                    </div>

                    {/* Upload Button */}
                    {preview && text && (
                        <button
                            onClick={handleUpload}
                            className="w-full bg-gradient-to-r from-[#8E54E9] to-[#ff79c6] text-white py-3 px-6 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
                        >
                            Upload Meme
                        </button>
                    )}
                </div>

                {/* Uploaded Memes Section */}
                {uploadedMemes.length > 0 && (
                    <div className="bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] p-8 rounded-2xl shadow-2xl max-w-6xl mx-auto border-2 border-[#8E54E9] hover:border-[#ff79c6] transition-all duration-300">
                        <h2 className="text-3xl font-bold mb-6 text-[#ff79c6] text-center">Uploaded Memes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 custom-scrollbar">
                            {uploadedMemes.map((meme) => (
                                <div
                                    key={meme.id}
                                    className="bg-[#282a36] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
                                >
                                    <img src={meme.url} alt="Uploaded Meme" className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => downloadMeme(meme)}
                                                className="bg-gradient-to-r from-[#8E54E9] to-[#ff79c6] text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l transition-all duration-300 font-bold"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemeUploader;