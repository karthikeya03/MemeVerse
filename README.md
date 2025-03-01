# MemeVerse - A Fun Meme Sharing Platform

MemeVerse is a dynamic and interactive meme-sharing platform where users can explore, create, and engage with trending memes. It features meme uploads, AI-generated captions, user profiles, and a leaderboard for top creators.

## Features & Functionalities

### **Homepage (Landing Page)**
- Displays trending memes dynamically (fetched from an API)
- Interactive animations & transitions
- Dark mode toggle

### **Meme Explorer Page**
- Infinite scrolling or pagination
- Filter memes by categories (Trending, New, Classic, Random)
- Search functionality with debounced API calls
- Sort by likes, date, or comments

### **Meme Upload Page**
- Upload memes (image/gif format)
- Add captions using a text editor
- AI-based meme caption generator (using a meme-related API)
- Preview before uploading

### **Meme Details Page**
- Dynamic routing (`/meme/:id`)
- Display meme details, likes, comments, and sharing options
- Comment system (local storage-based for now)
- Like buttons with animations and local storage persistence

### **User Profile Page**
- Displays user-uploaded memes
- Edit profile info (Name, Bio, Profile Picture)
- View liked memes (stored in local storage or API)

### **Leaderboard Page**
- Shows the top 10 most liked memes
- User rankings based on engagement

### **404 Page (Easter Egg)**
- A fun, meme-based 404 error page for non-existent routes

---

## **Tech Stack**
- **React (Hooks & Components)** - For frontend development
- **Tailwind CSS** - For styling
- **Framer Motion / GSAP** - For animations
- **Redux Toolkit / Context API** - For state management
- **Local Storage / IndexedDB** - For caching data
- **Meme APIs** - For fetching trending memes
- **Cloudinary / Firebase** - For image uploads
- **Lighthouse / React Profiler** - For performance optimization

---

## **Project Setup & Installation**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/memeverse.git
cd memeverse
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the Development Server**
```sh
npm run dev
```

The app will be accessible at `http://localhost:5173/` (or another available port).

---

## **Tailwind CSS Setup**

### **1. Install Tailwind CSS**
```sh
npm install tailwindcss @tailwindcss/vite
```

### **2. Configure Tailwind in `vite.config.js`**
Modify the file as follows:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

### **3. Add Tailwind to `src/index.css`**
```css
@import "tailwindcss";
```

### **4. Restart the Development Server**
```sh
npm run dev
```

---

## **Free APIs Used**
- **Meme APIs**
  - [Imgflip API](https://api.imgflip.com/) - Generate and fetch popular memes
  - [Meme Generator API](https://memegen.link/) - Create memes dynamically
- **Image Upload & Storage APIs**
  - [ImgBB API](https://api.imgbb.com/) - Free image hosting for meme uploads

---

## **Deployment**
MemeVerse is deployed on **Vercel**. You can access it here:
🔗 [MemeVerse Live App](https://meme-verse-sandy.vercel.app/)

To deploy your own version, run:
```sh
vercel
```
Follow the on-screen instructions to link your project.

---

## **Future Enhancements**
- Implement user authentication (Google/Facebook login)
- Enable cloud-based storage for comments and likes
- Add meme template customization
- Enhance AI caption generation

---

For any queries, contact: **saisatyakarthikeya@gmail.com**
