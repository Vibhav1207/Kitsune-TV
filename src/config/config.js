const config = {
  serverUrl: import.meta.env.VITE_APP_SERVERURL || 
    (import.meta.env.PROD ? "/api/v1" : "https://eren-world.onrender.com/api/v1"),
  localUrl: import.meta.env.VITE_APP_LOCALURL || 
    (import.meta.env.DEV ? "/proxy-api" : "/api/v1"),
  proxyUrl: import.meta.env.VITE_APP_PROXYURL,
  serverUrl2: import.meta.env.VITE_APP_SERVERURL2 || 
    (import.meta.env.PROD ? "/api/v1" : "https://eren-world.onrender.com/api/v1"),
};

export default config;
