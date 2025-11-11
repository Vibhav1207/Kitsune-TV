import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import { getStats, clearMetrics } from "../utils/metrics";

const AdminGate = ({ children }) => {
  const location = useLocation();
  const [inputKey, setInputKey] = useState("");
  const envKey = import.meta.env.VITE_ADMIN_KEY || "";

  const authorized = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const qk = params.get("key");
    const saved = localStorage.getItem("admin_key");
    if (qk && envKey && qk === envKey) {
      localStorage.setItem("admin_key", qk);
      return true;
    }
    return Boolean(envKey && saved && saved === envKey);
  }, [location.search, envKey]);

  if (authorized) return children;

  return (
    <div className="pt-20 max-w-screen-md mx-auto px-4">
      <SEO title="Admin Info" description="Private analytics dashboard" noIndex={true} />
      <div className="bg-btnbg p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">Restricted Access</h2>
        <p className="text-gray-300 mb-4">Enter admin key to access /info</p>
        <input
          type="password"
          className="w-full mb-3 p-2 text-black"
          placeholder="Admin key"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button
          className="bg-primary text-black px-4 py-2 rounded"
          onClick={() => {
            if (envKey && inputKey === envKey) {
              localStorage.setItem("admin_key", inputKey);
              window.location.reload();
            } else {
              alert("Invalid key");
            }
          }}
        >
          Submit
        </button>
      </div>
      <p className="text-sm text-gray-400 mt-3">Tip: You can also access via /info?key=YOUR_KEY</p>
    </div>
  );
};

const InfoPage = () => {
  const RECENT_COUNT = 2;
  const stats = getStats();
  const totalHours = (stats.totalWatchSeconds / 3600).toFixed(2);

  return (
    <AdminGate>
      <div className="pt-16 max-w-screen-xl mx-auto px-4">
        <SEO title="Analytics" description="Viewer watchtime and views" noIndex={true} />
        <h1 className="text-2xl font-extrabold mb-4">Site Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-btnbg p-4 rounded-md">
            <h3 className="text-lg">Total Views</h3>
            <p className="text-3xl font-bold">{stats.totalViews}</p>
          </div>
          <div className="bg-btnbg p-4 rounded-md">
            <h3 className="text-lg">Total Watch Time</h3>
            <p className="text-3xl font-bold">{totalHours} h</p>
            <p className="text-sm text-gray-400">({stats.totalWatchSeconds} s)</p>
          </div>
          <div className="bg-btnbg p-4 rounded-md">
            <h3 className="text-lg">Avg Session</h3>
            <p className="text-3xl font-bold">{(stats.totalViews ? (stats.totalWatchSeconds / stats.totalViews) : 0).toFixed(0)} s</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-btnbg p-4 rounded-md">
            <h3 className="text-lg mb-2">Recent Views (last 2)</h3>
            <ul className="text-sm divide-y divide-gray-700">
              {[...stats.views].slice(-RECENT_COUNT).reverse().map((v, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span>{v.title} • Ep {v.episodeNumber}</span>
                  <span className="text-gray-400">{new Date(v.ts).toLocaleString()}</span>
                </li>
              ))}
              {stats.views.length === 0 && (
                <li className="py-2 text-gray-400">No views recorded</li>
              )}
            </ul>
          </div>
          <div className="bg-btnbg p-4 rounded-md">
            <h3 className="text-lg mb-2">Recent Watch Logs (last 2)</h3>
            <ul className="text-sm divide-y divide-gray-700">
              {[...stats.logs].slice(-RECENT_COUNT).reverse().map((l, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <span>{l.title} • Ep {l.episodeNumber}</span>
                  <span className="text-gray-400">{Math.floor(l.seconds)}s • {new Date(l.ts).toLocaleString()}</span>
                </li>
              ))}
              {stats.logs.length === 0 && (
                <li className="py-2 text-gray-400">No watch logs recorded</li>
              )}
            </ul>
          </div>
        </div>
        <div className="bg-btnbg p-4 rounded-md mb-6">
          <h3 className="text-lg mb-2">Top Watched Anime</h3>
          <ul className="divide-y divide-gray-700">
            {stats.topAnimes.map((a) => (
              <li key={a.animeId} className="py-2 flex justify-between">
                <span className="font-bold">{a.title}</span>
                <span className="text-gray-300">{(a.seconds / 3600).toFixed(2)} h • {a.views} views</span>
              </li>
            ))}
            {stats.topAnimes.length === 0 && (
              <li className="py-2 text-gray-400">No data yet</li>
            )}
          </ul>
        </div>
        <div className="flex gap-2">
          <button className="bg-red-500 text-black px-4 py-2 rounded" onClick={() => { if (confirm("Clear local metrics?")) { clearMetrics(); window.location.reload(); } }}>Clear Local Metrics</button>
        </div>
      </div>
    </AdminGate>
  );
};

export default InfoPage;