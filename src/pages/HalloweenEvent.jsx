import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logoGif from "../assets/logo.gif";
import "./halloween.css";
import music from "../assets/musicv.mp3";

const rarityColors = {
  Legendary: "text-yellow-300",
  Epic: "text-purple-300",
  Rare: "text-blue-300",
  Uncommon: "text-green-300",
  Common: "text-gray-300",
  "Ultra Rare": "text-pink-300",
  "Super Rare": "text-indigo-300",
};

const HalloweenNavbar = () => {
  const links = [
    { name: "Home", href: "/home" },
    { name: "Movies", href: "/animes/movie" },
    { name: "TV Series", href: "/animes/tv" },
    { name: "Most Popular", href: "/animes/most-popular" },
    { name: "Top Airing", href: "/animes/top-airing" },
    { name: "Halloween Event", href: "/halloweenevent" },
  ];
  return (
    <nav className="halloween-nav px-4 py-3 flex justify-center items-center">
      <ul className="flex flex-wrap gap-6 text-sm md:text-base">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="halloween-link px-2 py-1 rounded-md"
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 halloween-fog" onClick={onClose} />
      <div className="relative w-11/12 max-w-2xl bg-[#111016] border border-orange-500/40 rounded-xl p-5 halloween-modal">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-orange-300 hover:text-orange-400"
          aria-label="Close"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

const rarityEmoji = {
  Epic: "https://cdn.discordapp.com/emojis/1136989536627474462.png?size=64&quality=lossless",
  "Super Rare": "https://cdn.discordapp.com/emojis/1122010177579794485.png?size=64&quality=lossless",
  "Ultra Rare": "https://cdn.discordapp.com/emojis/1122010197238501427.png?size=64&quality=lossless",
};

const rarityIcon = (rarity) => {
  const url = rarityEmoji[rarity];
  return (
    <span className="inline-flex items-center gap-2">
      {url ? (
        <img src={url} alt={`${rarity} emoji`} className="w-5 h-5 rounded" />
      ) : (
        <span className="inline-block w-5 h-5 halloween-rarity-icon" />
      )}
      <span className={`${rarityColors[rarity] || "text-white"}`}>{rarity}</span>
    </span>
  );
};

const GhostSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6c-12 0-20 9-20 20v22c0 3 3 4 5 2s5-2 7 0 5 2 7 0 5-2 7 0 5 2 7 0 5-2 5-5V26c0-11-8-20-18-20z" fill="#f2f2f2" />
    <circle cx="26" cy="26" r="3" fill="#000" />
    <circle cx="38" cy="26" r="3" fill="#000" />
    <path d="M24 36c3 2 13 2 16 0" stroke="#000" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BatSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 34c6-8 14-10 26-10s20 2 26 10c-8-2-12-2-16 2-6-4-14-4-20 0-4-4-8-4-16-2z" fill="#2b2b2b" />
    <circle cx="32" cy="30" r="3" fill="#ff6a00" />
  </svg>
);

const PumpkinSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="36" rx="20" ry="14" fill="#ff7f11" />
    <rect x="30" y="18" width="4" height="8" fill="#2b7a0b" />
    <path d="M18 36c2 4 8 8 14 8s12-4 14-8" stroke="#a34a00" strokeWidth="2" fill="none" />
  </svg>
);

const crateItems = [
  {
    name: "Elizabeth Liones (⭐⭐)",
    rarity: "Super Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_elizabeth_liones.png",
  },
  {
    name: "Madara Uchiha (⭐⭐)",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_madara_uchiha.png",
  },
  {
    name: "Meliodas (⭐⭐⭐)",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_meliodas.png",
  },
  {
    name: "Naruto Uzumaki (⭐⭐⭐)",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_naruto_uzumaki.png",
  },
  {
    name: "Reze",
    rarity: "Epic",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_reze.png",
  },
  {
    name: "Rias Gremory",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_rias_gremory.png",
  },
  {
    name: "Sasuke Uchiha (⭐⭐)",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_sasuke.png",
  },
  {
    name: "Sung Jinwoo",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_sung_jinwoo.png",
  },
  {
    name: "Tatsumaki",
    rarity: "Super Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_tatsumaki.png",
  },
  {
    name: "Yhwach",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_yhwach.png",
  },
  {
    name: "Yoruichi Shihouin",
    rarity: "Super Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_yoruichi_shihouin.png",
  },
  {
    name: "Whis",
    rarity: "Ultra Rare",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_chibi_whis.png",
  },
];

const specialItems = [
  {
    name: "Phoebe",
    rarity: "Epic",
    rarityAfterEvent: "Halloween",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_phoebe.png",
    stats: { HP: 105, Attack: 110, Defense: 105, Speed: 110 },
    moves: ["Delicious Treat", "Cursed Chocolate", "Death Trick"],
  },
  {
    name: "Mina Midnight",
    rarity: "Epic",
    rarityAfterEvent: "Halloween",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_mina_midnight.png",
    stats: { HP: 115, Attack: 105, Defense: 115, Speed: 105 },
    moves: ["Delicious Treat", "Cursed Chocolate", "Death Trick"],
  },
  {
    name: "Valentine",
    rarity: "Epic",
    rarityAfterEvent: "Halloween",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_valentine.png",
    stats: { HP: 105, Attack: 110, Defense: 105, Speed: 110 },
    moves: ["Delicious Treat", "Cursed Chocolate", "Death Trick"],
  },
  {
    name: "Stella",
    rarity: "Epic",
    rarityAfterEvent: "Halloween",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_stella.png",
    stats: { HP: 115, Attack: 105, Defense: 115, Speed: 105 },
    moves: ["Delicious Treat", "Cursed Chocolate", "Death Trick"],
  },
  {
    name: "Luna",
    rarity: "Epic",
    rarityAfterEvent: "Halloween",
    img: "https://raw.githubusercontent.com/reef-bot/random/main/Event/halloween_event_2025_luna.png",
    stats: { HP: 105, Attack: 110, Defense: 105, Speed: 110 },
    moves: ["Delicious Treat", "Cursed Chocolate", "Death Trick"],
  },
];

const CharacterImage = ({ type }) => {
  const baseClass = "w-full h-40 md:h-48 flex items-center justify-center";
  if (type === "ghost") return <GhostSVG className={`${baseClass}`} />;
  if (type === "bat") return <BatSVG className={`${baseClass}`} />;
  return <PumpkinSVG className={`${baseClass}`} />;
};

const Card = ({ item, onView }) => {
  return (
    <div className="halloween-card bg-[#121018] border border-purple-500/30 rounded-xl overflow-hidden">
      <div className="bg-[#0c0a12] p-2 flex items-center justify-center">
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            crossOrigin="anonymous"
            className="w-full h-40 md:h-48 object-contain"
          />
        ) : (
          <CharacterImage type={item.imgType} />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold text-center mb-2">{item.name}</h3>
        <div className="flex justify-center mb-4">{rarityIcon(item.rarity)}</div>
        <div className="flex justify-center">
          <button
            className="halloween-btn px-4 py-2 rounded-md"
            onClick={() => onView(item)}
          >
            View Stats
          </button>
        </div>
        {item.rarityAfterEvent && (
          <div className="text-center text-xs text-neutral-300 mt-2">
            Rarity After Event: <span className="text-purple-300">{item.rarityAfterEvent}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const HalloweenEvent = () => {
  const [selected, setSelected] = useState(null);
  const audioRef = useRef(null);
  const [soundOn, setSoundOn] = useState(true); // default playing
  const [countdown, setCountdown] = useState({ days: 15, hours: 0, minutes: 0, seconds: 0 });
  const [endTs, setEndTs] = useState(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.3;
    const start = async () => {
      try {
        await el.play();
        setSoundOn(true);
      } catch (err) {
        // Autoplay might be blocked; keep control visible to enable on click
        setSoundOn(false);
      }
    };
    start();
  }, []);

  // Initialize 15-day countdown and update every second
  useEffect(() => {
    let stored = localStorage.getItem("halloweenEventEndTs");
    let end = stored ? parseInt(stored, 10) : Date.now() + 15 * 24 * 60 * 60 * 1000;
    if (!stored) localStorage.setItem("halloweenEventEndTs", String(end));
    setEndTs(end);

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, end - now);
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((diff % (60 * 1000)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);


  const toggleSound = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (soundOn) {
      el.pause();
      setSoundOn(false);
    } else {
      try {
        await el.play();
        setSoundOn(true);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-[100dvh] halloween-bg relative overflow-hidden">
  <Helmet>
    <title>ReeF Bot Halloween Event 2025</title>
    <meta property="og:title" content="ReeF Bot Halloween Event 2025" />
    <meta property="og:description" content="Join the spookiest Discord event of the year! Collect pumpkins, open crates, and summon rare Halloween characters before the spirits fade!" />
    <link rel="preconnect" href="https://raw.githubusercontent.com" />
    <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
    <link rel="preconnect" href="https://cdn.discordapp.com" />
    <link rel="dns-prefetch" href="https://cdn.discordapp.com" />
  </Helmet>

      {/* Floating ambient elements */}
      <div className="pointer-events-none">
        <GhostSVG className="floating-ghost ghost-1" />
        <GhostSVG className="floating-ghost ghost-2" />
        <BatSVG className="floating-bat bat-1" />
        <BatSVG className="floating-bat bat-2" />
        <BatSVG className="floating-bat bat-3" />
      </div>

      <HalloweenNavbar />
      <audio ref={audioRef} src={music} autoPlay loop className="hidden" />

      {/* Header Section */}
      <header className="px-4 md:px-6 mt-4">
        <div className="flex justify-center items-center">
          <div className="halloween-logo-ring">
            <div className="halloween-logo">
              <img src={logoGif} alt="Kitsune logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        <h1 className="mt-4 text-center text-3xl md:text-4xl halloween-title">
          ReeF Bot Halloween Event 2025
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-center text-neutral-300">
          Join the spookiest Discord event of the year! Collect pumpkins, open crates, and summon rare Halloween characters before the spirits fade!
        </p>
        <div className="mt-4 flex justify-center">
          <button onClick={toggleSound} className="halloween-btn px-4 py-2 rounded-md">
            {soundOn ? "Mute Halloween Music" : "Enable Halloween Music"}
          </button>
        </div>
      </header>

      {/* Event Countdown */}
      <section className="px-4 md:px-6 mt-8">
        <div className="bg-[#121018] border border-orange-500/30 rounded-xl p-4 text-center">
          <h2 className="section-title">⏳ Event Countdown</h2>
          <div className="mt-3 flex justify-center gap-6" aria-live="polite">
            <div>
              <div className="text-white text-3xl font-bold">{countdown.days}</div>
              <div className="text-neutral-400 text-xs">Days</div>
            </div>
            <div>
              <div className="text-white text-3xl font-bold">{String(countdown.hours).padStart(2, "0")}</div>
              <div className="text-neutral-400 text-xs">Hours</div>
            </div>
            <div>
              <div className="text-white text-3xl font-bold">{String(countdown.minutes).padStart(2, "0")}</div>
              <div className="text-neutral-400 text-xs">Minutes</div>
            </div>
            <div>
              <div className="text-white text-3xl font-bold">{String(countdown.seconds).padStart(2, "0")}</div>
              <div className="text-neutral-400 text-xs">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Event Details */}
      <section className="px-4 md:px-6 mt-10">
        <h2 className="section-title">🎃 Event Details</h2>
        <div className="mt-4 bg-[#121018] border border-orange-500/30 rounded-xl p-4">
          <h3 className="text-white font-semibold text-lg mb-2">Obtainable Items</h3>
          <div className="flex items-start gap-4">
            <img
              src="https://cdn.discordapp.com/emojis/1300748493970870323.gif?size=64&quality=lossless"
              alt="Discord pumpkin emoji"
              className="w-20 h-20 rounded-md shadow-md"
            />
            <div>
              <h4 className="text-orange-300 font-bold">Pumpkin</h4>
              <p className="text-neutral-300 mt-2">
              A pumpkin can be obtained randomly within 150 claims with a random pack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discord emojis section removed per request */}

      {/* Section 2: Event Crate */}
      <section className="px-4 md:px-6 mt-10">
        <h2 className="section-title">🧰 Halloween Event Crate</h2>
        <p className="text-neutral-300 mt-2">
          Exchange 10 Pumpkins for a Halloween Crate.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {crateItems.map((item) => (
            <Card key={item.name} item={item} onView={setSelected} />
          ))}
        </div>
      </section>

      {/* Section 3: Special Cards */}
      <section className="px-4 md:px-6 mt-10 mb-16">
        <h2 className="section-title">🌟 Special Halloween Cards</h2>
        <p className="text-neutral-300 mt-2">
          Obtain these via claiming — complete event missions or streak rewards.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {specialItems.map((item) => (
            <Card key={item.name} item={item} onView={setSelected} />
          ))}
        </div>
      </section>

      <footer className="px-4 md:px-6 pb-8 text-center text-neutral-400">
        <p>
          Need to get back? <Link to="/home" className="underline hover:text-orange-300">Go Home</Link>
        </p>
      </footer>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 text-center">
              {selected.name}
            </h3>
            <div className="flex justify-center mb-3">{rarityIcon(selected.rarity)}</div>

            {selected.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mb-4">
                {Object.entries(selected.stats).map(([k, v]) => (
                  <div key={k} className="bg-[#0c0a12] rounded-md p-3 border border-orange-500/20">
                    <div className="text-neutral-400 text-xs">{k}</div>
                    <div className="text-white text-lg font-semibold">{v}</div>
                  </div>
                ))}
              </div>
            )}

            {selected.moves?.length ? (
              <div className="mb-3">
                <h4 className="text-white font-semibold mb-2">Moves</h4>
                <ul className="list-disc list-inside text-neutral-300">
                  {selected.moves.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-neutral-300 text-sm text-center">
                No detailed stats available for this character.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HalloweenEvent;