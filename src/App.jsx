import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import MemeUploader from './components/MemeUploader';

// Lazy load the Trending, Explorer, MemeDetails, and Leaderboard components
const Trending = React.lazy(() => import('./components/Trending'));
const Explorer = React.lazy(() => import('./components/Explorer'));
const MemeDetails = React.lazy(() => import('./components/MemeDetails'));
const Leaderboard = React.lazy(() => import('./components/Leaderboard'));

function App() {
    const [activePage, setActivePage] = useState('trending'); // State to track active page
    const [sidebarOpen, setSidebarOpen] = useState(true); // State to track sidebar open/close

    return (
        <div className="bg-gradient-to-r from-purple-900 to-gray-900 min-h-screen flex flex-col">
            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                setActivePage={setActivePage}
                activePage={activePage} // Pass activePage to Sidebar
            />

            {/* Main Content */}
            <div
                className={`flex-grow transition-all duration-500 ${
                    sidebarOpen ? 'pl-20 md:pl-72' : 'pl-20'
                }`}
            >
                {/* Suspense for lazy loading */}
                <Suspense fallback={<div className="text-center py-8 text-purple-400">Loading...</div>}>
                    {activePage === 'trending' ? <Trending /> : 
                     activePage === 'explorer' ? <Explorer /> : 
                     activePage === 'upload' ? <MemeUploader /> : 
                     activePage === 'details' ? <MemeDetails /> : 
                     activePage === 'leaderboard' ? <Leaderboard /> : null}
                </Suspense>
            </div>
        </div>
    );
}

export default App;