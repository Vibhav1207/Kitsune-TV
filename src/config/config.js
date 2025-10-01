const config = {
  serverUrl: import.meta.env.VITE_APP_SERVERURL || "https://eren-world.onrender.com/api/v1",
  localUrl: import.meta.env.VITE_APP_LOCALURL || "/proxy-api", // Use proxy in development
  proxyUrl: import.meta.env.VITE_APP_PROXYURL,
  serverUrl2: import.meta.env.VITE_APP_SERVERURL2 || import.meta.env.VITE_APP_SERVERURL || "https://eren-world.onrender.com/api/v1",
};

export default config;
