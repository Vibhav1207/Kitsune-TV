const config = {
  serverUrl: import.meta.env.VITE_APP_SERVERURL || 
    (import.meta.env.PROD ? "" : "https://eren-world.onrender.com/api/v1"), // Use relative URLs in production
  localUrl: import.meta.env.VITE_APP_LOCALURL || 
    (import.meta.env.DEV ? "/proxy-api" : ""), // Use relative URLs in production
  proxyUrl: import.meta.env.VITE_APP_PROXYURL,
  serverUrl2: import.meta.env.VITE_APP_SERVERURL2 || 
    (import.meta.env.PROD ? "" : "https://eren-world.onrender.com/api/v1"),
};

export default config;
