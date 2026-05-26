// Shared data + tiny utilities for both MTG Distri directions.

const MTG_CA = "yNoMVX7EiTuWa9wUn7EEGWwvuUVXxW5WwCwPwKxpump";
const MTG_PAIR = "8eEoHCHpd5phQ7z2TLpuLhuqfUefxzwT4wrnSAf3i7AH";
const PUMPFUN_URL = `https://pump.fun/coin/${MTG_CA}`;
const DEXSCREENER_URL = `https://dexscreener.com/solana/${MTG_PAIR}`;
const COLLECTOR_CRYPT_BASE = "https://collectorcrypt.com/assets/solana/";

// Drop 001 — three real, vaulted cards from Collector Crypt.
// Sourced 2026-05 via og:image meta tags.
const DROP_001 = [
  {
    id: "mindslaver",
    name: "Mindslaver",
    set: "Breaking News",
    year: 2024,
    number: "#80",
    treatment: "Textured Foil",
    type: "Legendary Artifact",
    rarity: "Mythic",
    grade: "CGC 10",
    mana: "BB",
    color: "art",
    accent: "#c8a553",
    accentDeep: "#7a5d18",
    image: "https://d1xpxki1g4htqu.cloudfront.net/5agpCjFEs0cXQSQYPXCDf-xlubBcHk8Z1K09pjAlhUU",
    mint: "95DAtnwXDsX7LMiLYGJYMUTbWsqJoNHys7tghqdEpDBK",
    cost: "{4}",
    rules: "{4}, {T}, Sacrifice Mindslaver: You control target player during that player's next turn.",
    flavor: "\"Their will is yours, for one fleeting eternity.\"",
    valueLabel: "Mythic · Textured Foil",
    featured: true,
  },
  {
    id: "elvish-piper",
    name: "Elvish Piper",
    set: "Urza's Destiny",
    year: 1999,
    number: "#104",
    treatment: "Foil",
    type: "Creature — Elf",
    rarity: "Rare",
    grade: "PSA 7",
    mana: "1G",
    color: "G",
    accent: "#86efac",
    accentDeep: "#3b8d50",
    image: "https://d1xpxki1g4htqu.cloudfront.net/LStHggzGHqLCq5x8Ng4fINRSXcNqle2aHYaIxbaRiEI",
    mint: "8hwnNi8V9kdc3R2XoUNQ7aosteAGuTjgSwJPh9c57maK",
    cost: "{1}{G}",
    rules: "{G}, {T}: Put a creature card from your hand onto the battlefield.",
    flavor: "\"The right notes call the right beasts.\"",
    valueLabel: "Foil · 1999",
  },
  {
    id: "sheltered-valley",
    name: "Sheltered Valley",
    set: "Alliances",
    year: 1996,
    number: "—",
    treatment: "Non-foil",
    type: "Land",
    rarity: "Rare",
    grade: "CGC 8.5",
    mana: "",
    color: "art",
    accent: "#7dd3fc",
    accentDeep: "#0a3b5e",
    image: "https://d1xpxki1g4htqu.cloudfront.net/aFQHhbFoZRnVg5ImTeM8G80VCZnTxZHx1vidC8nDoRc",
    mint: "9845etDTZiwBUXMUNbMoFdrM912vXbbEp6KDQbqBPiLf",
    cost: "",
    rules: "Sheltered Valley enters tapped. {T}: Add {C}. At the beginning of your upkeep, if you control three or more lands named Sheltered Valley, you lose the game.",
    flavor: "\"Even peace has its price.\"",
    valueLabel: "CGC 8.5 · Alliances",
  },
  {
    id: "gauntlet-of-might",
    name: "Gauntlet of Might",
    set: "Collectors' Edition",
    year: 1993,
    number: "—",
    treatment: "Non-foil",
    type: "Artifact",
    rarity: "Rare",
    grade: "CGC 8 NM-MT",
    mana: "4",
    color: "art",
    accent: "#fde68a",
    accentDeep: "#7a5d18",
    image: "https://collectorcrypt-prod.s3.us-west-2.amazonaws.com/cards/34351ab7-f323-442c-a64e-936565d6479b",
    mint: "28j7CwBNKro4AoyMxg7QCnRG4PMd3Lq1bbez6yJmxiER",
    cost: "{4}",
    rules: "Red creatures get +1/+1. Whenever a Mountain is tapped for mana, its controller adds {R} to their mana pool (in addition to any other mana that land produces).",
    flavor: "\"Some relics outlive the world that forged them.\"",
    valueLabel: "Vintage · 1993 · CE",
    ultra: true,
  },
];

const FAQ_ITEMS = [
  {
    q: "What is $MTG?",
    a: "A Pump.Fun token whose holders are summoned to a raffle every hour for real, vaulted Magic: The Gathering cards held in custody by Collector Crypt. One token does not summon. One million does."
  },
  {
    q: "How do I qualify?",
    a: "Hold at least 1,000,000 $MTG for at least one hour before the draw. That's it. No KYC, no whitelist, no presale spot. Sit in the position; the chain sees you."
  },
  {
    q: "How often is a card drawn?",
    a: "Every hour, on the dot. The countdown on this page is the clock the team uses. Winners are announced when the wheel stops."
  },
  {
    q: "How are winners chosen?",
    a: "A winner is drawn every hour from the pool of qualified wallets — those holding 1,000,000+ $MTG for at least one hour before the draw. The result is broadcast across the coven."
  },
  {
    q: "Are the cards real?",
    a: "Yes. Each card in the vault is a genuine MTG card held by Collector Crypt, professionally graded and insured. Winners may take physical delivery or keep the card vaulted as a digital twin."
  },
  {
    q: "What if I lose?",
    a: "Your $MTG is not consumed by raffles — it does not burn, fade, or vanish. Hold through the next snapshot and re-enter. The wheel rolls every hour."
  },
  {
    q: "Why Pump.Fun?",
    a: "Fair launch, no presale, no team allocation. The bonding curve is the kingmaker. We could not have built it differently if we tried."
  },
  {
    q: "Is this financial advice?",
    a: "Counterspell. This is a memecoin attached to a card game older than most of its holders. Trade what you can afford to lose, and may your topdeck be lethal."
  },
];

const VAULT_CARDS = [
  { name: "Black Lotus",         set: "Alpha",         rarity: "Mythic",   value: "$48,000", color: "art" },
  { name: "Mox Sapphire",        set: "Alpha",         rarity: "Rare",     value: "$22,500", color: "U"   },
  { name: "Mox Ruby",            set: "Beta",          rarity: "Rare",     value: "$18,200", color: "R"   },
  { name: "Mox Pearl",           set: "Unlimited",     rarity: "Rare",     value: "$9,400",  color: "W"   },
  { name: "Ancestral Recall",    set: "Beta",          rarity: "Rare",     value: "$7,800",  color: "U"   },
  { name: "Time Walk",           set: "Unlimited",     rarity: "Rare",     value: "$6,200",  color: "U"   },
  { name: "Timetwister",         set: "Beta",          rarity: "Rare",     value: "$5,900",  color: "U"   },
  { name: "Bazaar of Baghdad",   set: "Arabian N.",    rarity: "Uncommon", value: "$3,400",  color: "art" },
  { name: "Underground Sea",     set: "Revised",       rarity: "Rare",     value: "$1,950",  color: "UB"  },
  { name: "Tropical Island",     set: "Revised",       rarity: "Rare",     value: "$1,700",  color: "UG"  },
  { name: "Volcanic Island",     set: "Revised",       rarity: "Rare",     value: "$1,650",  color: "UR"  },
  { name: "Tarmogoyf",           set: "Future Sight",  rarity: "Rare",     value: "$310",    color: "G"   },
];

const HOW_STEPS = [
  {
    n: "I",
    title: "Hold 1M+ $MTG",
    body: "Acquire at least one million tokens on Pump.Fun. Below the threshold the wheel does not see you."
  },
  {
    n: "II",
    title: "Wait an Hour",
    body: "You must hold the threshold for at least one hour before the draw. The vault does not reward flips of the wrist."
  },
  {
    n: "III",
    title: "The Drawing",
    body: "Every hour a card is unsealed from the Collector Crypt vault and a winner is summoned from the qualified wallets."
  },
  {
    n: "IV",
    title: "Claim Your Card",
    body: "The winner is announced and the card sent. Take physical delivery, or keep the card vaulted as a digital twin you can trade on-chain."
  },
];

// Mock candle data — vaguely upward, with one rug-and-recover bit.
const CANDLES = [
  { o: 12, c: 14, l: 11, h: 15 },
  { o: 14, c: 17, l: 13, h: 18 },
  { o: 17, c: 16, l: 15, h: 19 },
  { o: 16, c: 19, l: 16, h: 21 },
  { o: 19, c: 23, l: 18, h: 24 },
  { o: 23, c: 21, l: 20, h: 24 },
  { o: 21, c: 26, l: 20, h: 27 },
  { o: 26, c: 30, l: 24, h: 31 },
  { o: 30, c: 28, l: 27, h: 33 },
  { o: 28, c: 34, l: 27, h: 35 },
  { o: 34, c: 38, l: 33, h: 40 },
  { o: 38, c: 35, l: 33, h: 39 },
  { o: 35, c: 41, l: 34, h: 42 },
  { o: 41, c: 46, l: 40, h: 47 },
  { o: 46, c: 44, l: 42, h: 48 },
  { o: 44, c: 50, l: 43, h: 52 },
  { o: 50, c: 55, l: 49, h: 57 },
  { o: 55, c: 53, l: 51, h: 58 },
  { o: 53, c: 60, l: 52, h: 62 },
  { o: 60, c: 64, l: 58, h: 66 },
  { o: 64, c: 62, l: 60, h: 67 },
  { o: 62, c: 69, l: 61, h: 71 },
  { o: 69, c: 73, l: 67, h: 75 },
  { o: 73, c: 78, l: 72, h: 80 },
];

// Hook: viewport breakpoint. Returns {isMobile, isTablet} that update on resize.
// Mobile <= 640px, tablet 641–960px.
function useViewport() {
  const get = () => {
    if (typeof window === "undefined") return { isMobile: false, isTablet: false, w: 1200 };
    const w = window.innerWidth;
    return { isMobile: w <= 640, isTablet: w > 640 && w <= 960, w };
  };
  const [vp, setVp] = React.useState(get);
  React.useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVp(get()));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return vp;
}

// Hook: countdown to next raffle. Returns {d,h,m,s} string parts.
// targetTs may be a number or a function that returns a number (for self-rolling timers).
function useCountdown(targetTs) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = typeof targetTs === "function" ? targetTs() : targetTs;
  const ms = Math.max(0, target - now);
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const m = Math.floor((ms / (1000 * 60)) % 60);
  const s = Math.floor((ms / 1000) % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s), msRemaining: ms };
}

// Next raffle: rolls every hour, epoch-aligned so all viewers see the
// same countdown.
const RAFFLE_INTERVAL_MS = 60 * 60 * 1000;
function nextRaffleTs() {
  return Math.ceil(Date.now() / RAFFLE_INTERVAL_MS) * RAFFLE_INTERVAL_MS;
}
const NEXT_RAFFLE_TS = nextRaffleTs(); // legacy export — kept for shape compat

// Copy CA helper with tiny toast state.
function useCopy() {
  const [copied, setCopied] = React.useState(false);
  const copy = React.useCallback((text) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) { /* no-op */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, []);
  return [copied, copy];
}

// Truncate CA middle.
function truncCA(ca, head = 5, tail = 5) {
  if (!ca || ca.length <= head + tail + 1) return ca;
  return `${ca.slice(0, head)}…${ca.slice(-tail)}`;
}

// ─── Live DexScreener data ─────────────────────────────────────────
// Prefers /pairs/solana/<MTG_PAIR> (curated pair). Falls back to
// /tokens/<tokenAddress> + most-liquid pair.
// Returns { loading, error, pair, mtg }.
//   pair: raw pair object (priceUsd, marketCap, fdv, volume.h24, liquidity.usd, pairAddress)
//   mtg:  formatted strings ready to render
function useDexScreener(tokenAddress) {
  const [state, setState] = React.useState({ loading: true, error: null, pair: null });

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let pair = null;
        if (typeof MTG_PAIR === "string" && MTG_PAIR) {
          const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${MTG_PAIR}`);
          if (res.ok) {
            const data = await res.json();
            pair = data.pair || (data.pairs && data.pairs[0]);
          }
        }
        if (!pair) {
          const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const pairs = (data.pairs || []).filter(p => p.chainId === "solana");
          pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
          pair = pairs[0];
        }
        if (!pair) throw new Error("No pair found");
        if (!cancelled) setState({ loading: false, error: null, pair });
      } catch (e) {
        if (!cancelled) setState({ loading: false, error: e.message, pair: null });
      }
    }
    load();
    const id = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(id); };
  }, [tokenAddress]);

  const pair = state.pair;
  const mtg = React.useMemo(() => {
    if (!pair) return null;
    const usd = (n, opts = {}) => {
      if (n == null || !isFinite(n)) return "—";
      if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
      if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
      if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
      return `$${n.toFixed(opts.dp ?? 2)}`;
    };
    const num = (n) => (n == null || !isFinite(n)) ? "—" : n.toLocaleString();
    const pct = (n) => {
      if (n == null || !isFinite(n)) return "—";
      const sign = n >= 0 ? "+" : "";
      return `${sign}${n.toFixed(1)}%`;
    };
    const priceUsd = parseFloat(pair.priceUsd);
    return {
      priceUsd,
      priceUsdLabel: priceUsd ? `$${priceUsd < 0.01 ? priceUsd.toFixed(8) : priceUsd.toFixed(4)}` : "—",
      priceNative: pair.priceNative,
      change24h: pair.priceChange?.h24,
      change24hLabel: pct(pair.priceChange?.h24),
      change24hUp: (pair.priceChange?.h24 ?? 0) >= 0,
      marketCap: pair.marketCap ?? pair.fdv,
      marketCapLabel: usd(pair.marketCap ?? pair.fdv),
      fdvLabel: usd(pair.fdv),
      volume24hLabel: usd(pair.volume?.h24),
      liquidityLabel: usd(pair.liquidity?.usd),
      pairAddress: pair.pairAddress,
      dexId: pair.dexId,
      url: pair.url,
      txns24h: (pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0),
      buys24h: pair.txns?.h24?.buys || 0,
      sells24h: pair.txns?.h24?.sells || 0,
    };
  }, [pair]);

  return { ...state, mtg };
}

// Winners leaderboard — most recent first. Add entries here as draws roll.
// Leave the array empty to display the "awaiting first draw" empty state.
const WINNERS = [
  {
    wallet: "9XMM8mQtSP1PVkyVY7naJiJxNUcXhT96isQqnTobkR1r",
    card: "Elvish Piper",
    rarity: "Rare",
    grade: "PSA 7",
    set: "Urza's Destiny",
    year: 1999,
    when: "2026-05-26",
  },
  {
    wallet: "qKpZbAeu97Ba4sgpRqEehXD7dSwxWW59pNQkWSxsySJ",
    card: "Sheltered Valley",
    rarity: "Rare",
    grade: "CGC 8.5",
    set: "Alliances",
    year: 1996,
    when: "2026-05-26",
    txUrl: "https://solscan.io/tx/5ta64TTHufEHDZpbvQ26DSZhs9Hk8LStMxpUPbank6BniShjushQJKokpfKnhPDxRHfH1g4m8uozx2wVXMKaeaw9?cluster=mainnet-beta",
  },
];

Object.assign(window, {
  MTG_CA,
  MTG_PAIR,
  PUMPFUN_URL,
  DEXSCREENER_URL,
  COLLECTOR_CRYPT_BASE,
  DROP_001,
  WINNERS,
  FAQ_ITEMS,
  VAULT_CARDS,
  HOW_STEPS,
  CANDLES,
  NEXT_RAFFLE_TS,
  RAFFLE_INTERVAL_MS,
  nextRaffleTs,
  useCountdown,
  useCopy,
  useDexScreener,
  useViewport,
  truncCA,
});
