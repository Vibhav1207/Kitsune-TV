# KitsuneTV

**KitsuneTV** is a modern, sleek anime streaming web application built with **React** and styled using **Tailwind CSS**. The app is designed to provide anime enthusiasts with a seamless and enjoyable streaming experience.

---

## Features

- 🌟 **Beautiful UI**: Minimalistic and responsive design powered by Tailwind CSS.
- 🔍 **Search & Discover**: Find your favorite anime with ease.
- 🎥 **Stream Anime**: High-quality streaming for your favorite shows.
- 📋 **Watchlist**: Keep track of the anime you want to watch later.
- 🌙 **Dark Mode**: Enjoy a stunning dark theme for late-night binging.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Demo

Check out a live demo here: [KitsuneTV Live Demo](https://kitsune-tv.vercel.app)

---

## Tech Stack

- **Frontend**: React
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Integration**: Axios with React Query
- **Video Streaming**: External streaming servers

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Vibhav1207/Kitsune-TV.git
   cd Kitsune-TV
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your API configurations:
   ```env
   VITE_APP_SERVERURL=https://eren-world.onrender.com/api/v1
   VITE_APP_LOCALURL=http://localhost:3030/api/v1
   VITE_APP_MODE=development
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Troubleshooting

### Videos Not Loading

If videos are not loading, try these solutions:

1. **Switch Servers**: Use the server selector to switch between VidWish and MegaPlay
2. **Toggle Audio**: Try switching between SUB and DUB options
3. **Check Network**: Ensure you have a stable internet connection
4. **Disable Ad Blockers**: Some ad blockers may interfere with video loading
5. **Browser Issues**: Try a different browser or clear your cache

### API Connection Issues

If you're experiencing API connection problems:

1. **Check Environment Variables**: Ensure your `.env` file is properly configured
2. **Server Status**: The API server may be temporarily down
3. **Network Restrictions**: Your ISP might be blocking certain domains
4. **CORS Issues**: In development, make sure CORS is properly configured

### Common Error Messages

- **"API_BASE_URL is not configured"**: Check your `.env` file
- **"Video Unavailable"**: Try a different server or episode
- **"Episode Not Found"**: The episode might not be available yet

---

## Development

### Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Route components
├── layouts/         # Layout components
├── services/        # API services
├── store/           # State management
├── utils/           # Utility functions
└── assets/          # Static assets
```

### Adding New Features

1. Create components in the appropriate directory
2. Add routes in `App.jsx`
3. Update the API service if needed
4. Test thoroughly across different devices

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Disclaimer

This application is for educational purposes only. It aggregates content from various sources and does not host any content directly. Please respect copyright laws and support official anime distributors when possible.

---

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Look for similar issues in the GitHub issues tab
3. Create a new issue with detailed information about the problem
4. Include browser version, OS, and steps to reproduce

---

## Acknowledgments

- Thanks to the anime community for inspiration
- Built with modern React practices
- Styled with Tailwind CSS
- Icons from React Icons library
