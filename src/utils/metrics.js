const STORAGE_VIEWS_KEY = "kitsune_views";
const STORAGE_WATCHTIME_KEY = "kitsune_watchtime";

function readArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function writeArray(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (_) {}
}

export function recordView({ animeId, title, episodeNumber }) {
  const views = readArray(STORAGE_VIEWS_KEY);
  views.push({
    animeId,
    title,
    episodeNumber,
    ts: Date.now(),
  });
  writeArray(STORAGE_VIEWS_KEY, views);
}

export function recordWatchTime({ animeId, title, episodeNumber, seconds }) {
  if (!seconds || seconds <= 0) return;
  const logs = readArray(STORAGE_WATCHTIME_KEY);
  logs.push({
    animeId,
    title,
    episodeNumber,
    seconds: Math.floor(seconds),
    ts: Date.now(),
  });
  writeArray(STORAGE_WATCHTIME_KEY, logs);
}

export function getStats() {
  const views = readArray(STORAGE_VIEWS_KEY);
  const logs = readArray(STORAGE_WATCHTIME_KEY);

  const totalViews = views.length;
  const totalWatchSeconds = logs.reduce((sum, l) => sum + (l.seconds || 0), 0);

  const perAnime = new Map();
  for (const v of views) {
    const key = v.animeId;
    const cur = perAnime.get(key) || { animeId: v.animeId, title: v.title, views: 0, seconds: 0 };
    cur.views += 1;
    perAnime.set(key, cur);
  }
  for (const l of logs) {
    const key = l.animeId;
    const cur = perAnime.get(key) || { animeId: l.animeId, title: l.title, views: 0, seconds: 0 };
    cur.seconds += l.seconds || 0;
    perAnime.set(key, cur);
  }

  const topAnimes = Array.from(perAnime.values())
    .sort((a, b) => b.seconds - a.seconds)
    .slice(0, 10);

  return { totalViews, totalWatchSeconds, topAnimes, views, logs };
}

export function clearMetrics() {
  localStorage.removeItem(STORAGE_VIEWS_KEY);
  localStorage.removeItem(STORAGE_WATCHTIME_KEY);
}