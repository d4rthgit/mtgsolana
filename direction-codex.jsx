// Direction 1: The Illuminated Codex
// Warm parchment + ink + wax-seal red + gold leaf. Manuscript styling,
// ornamental dividers, roman-numeral chapter headings, illuminated drop caps.

// Palette + tokens
const codex = {
  parchment: "#f1e6cb",
  parchmentDeep: "#e7d8b3",
  ink: "#1d160d",
  inkSoft: "#3a2e1c",
  wax: "#8b1e1e",
  waxDeep: "#5e1212",
  gold: "#b08d57",
  goldDeep: "#8a6a3a",
  goldGlow: "#d8b86a",
  cream: "#faf2dc",
  fontDisplay: '"Cinzel", "Trajan Pro", "Times New Roman", serif',
  fontBody: '"Cormorant Garamond", "EB Garamond", "Iowan Old Style", Georgia, serif',
  fontLabel: '"IM Fell English SC", "Cinzel", serif',
};

// ── Mana pip (small medallion for W/U/B/R/G) ──────────────────────
const MANA = {
  W: { bg: "#f8efc8", ring: "#c7a544", glyph: "☼", color: "#7a5d18" },
  U: { bg: "#a9c5e6", ring: "#3d6a99", glyph: "💧", color: "#1d3957" },
  B: { bg: "#3a3530", ring: "#1d160d", glyph: "☠",  color: "#0a0805" },
  R: { bg: "#e8a07a", ring: "#8b1e1e", glyph: "🔥", color: "#5e1212" },
  G: { bg: "#bbd1a3", ring: "#3d6a32", glyph: "🌳", color: "#1f3917" },
};
function ManaPip({ kind = "W", size = 22 }) {
  const m = MANA[kind] || MANA.W;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 25%, ${codex.cream} 0%, ${m.bg} 55%, ${m.ring} 100%)`,
        boxShadow: `inset 0 0 0 1.5px ${m.ring}, inset 0 -2px 4px rgba(0,0,0,.18), 0 1px 2px rgba(0,0,0,.15)`,
        fontSize: size * 0.5,
        color: m.color,
        lineHeight: 1,
        flex: "0 0 auto",
      }}
    >
      <span style={{ filter: "grayscale(.2) saturate(.8)", textShadow: "0 1px 0 rgba(255,255,255,.4)" }}>{m.glyph}</span>
    </span>
  );
}

// ── Ornamental divider (fleuron) ─────────────────────────────────
function Fleuron({ width = 360, color = codex.gold }) {
  return (
    <svg viewBox="0 0 360 24" width={width} height={24 * (width / 360)} style={{ display: "block" }}>
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <line x1="10" y1="12" x2="140" y2="12" />
        <line x1="220" y1="12" x2="350" y2="12" />
        <path d="M150 12 q 6 -8 15 0 q -6 8 -15 0 Z" fill={color} stroke="none" />
        <path d="M210 12 q -6 -8 -15 0 q 6 8 15 0 Z" fill={color} stroke="none" />
        <circle cx="180" cy="12" r="3" fill={color} stroke="none" />
        <path d="M168 12 q 6 -6 12 -6 M192 12 q -6 -6 -12 -6 M168 12 q 6 6 12 6 M192 12 q -6 6 -12 6" />
      </g>
    </svg>
  );
}

// ── Corner flourish for cards/frames ─────────────────────────────
function Corner({ pos = "tl", color = codex.gold, size = 28 }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const offset = { tl: { top: -2, left: -2 }, tr: { top: -2, right: -2 }, br: { bottom: -2, right: -2 }, bl: { bottom: -2, left: -2 } }[pos];
  return (
    <svg
      width={size} height={size} viewBox="0 0 28 28"
      style={{ position: "absolute", ...offset, transform: `rotate(${rot}deg)`, pointerEvents: "none" }}
    >
      <g fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d="M2 14 Q 2 2 14 2" />
        <path d="M5 14 Q 5 5 14 5" opacity=".6" />
        <circle cx="14" cy="14" r="1.5" fill={color} stroke="none" />
        <path d="M14 5 q 3 0 5 2 q -2 3 -5 2 z" fill={color} stroke="none" opacity=".8" />
      </g>
    </svg>
  );
}

// ── Wax-seal button ──────────────────────────────────────────────
function WaxButton({ children, onClick, href, size = "lg", style = {} }) {
  const pad = size === "lg" ? "18px 38px" : "11px 24px";
  const fs = size === "lg" ? 18 : 14;
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: pad,
        background: `radial-gradient(ellipse at 35% 30%, #b53030 0%, ${codex.wax} 55%, ${codex.waxDeep} 100%)`,
        color: codex.cream,
        fontFamily: codex.fontDisplay,
        fontWeight: 600,
        fontSize: fs,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        border: `1.5px solid ${codex.waxDeep}`,
        borderRadius: 999,
        cursor: "pointer",
        textDecoration: "none",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.18), inset 0 -2px 4px rgba(0,0,0,.4), 0 4px 14px rgba(94,18,18,.35), 0 1px 0 ${codex.gold}`,
        textShadow: "0 1px 1px rgba(0,0,0,.4)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ── Parchment frame wrapper ──────────────────────────────────────
function Parchment({ children, style = {}, padding = 32, corners = true }) {
  return (
    <div style={{ position: "relative", padding, ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px solid ${codex.gold}`,
          outline: `1px solid ${codex.gold}`,
          outlineOffset: 4,
          pointerEvents: "none",
        }}
      />
      {corners && (
        <>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
        </>
      )}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

// ── Label (overline) ─────────────────────────────────────────────
function CodexEyebrow({ children, color = codex.wax }) {
  return (
    <div style={{
      fontFamily: codex.fontLabel,
      fontSize: 13,
      letterSpacing: "0.42em",
      textTransform: "uppercase",
      color,
    }}>
      {children}
    </div>
  );
}

// ── Roman numeral display ────────────────────────────────────────
function ChapterNum({ n }) {
  return (
    <div style={{
      fontFamily: codex.fontDisplay,
      fontSize: 110,
      fontWeight: 500,
      color: codex.gold,
      lineHeight: 0.85,
      letterSpacing: "0.02em",
      textShadow: `1px 1px 0 ${codex.parchment}, 2px 2px 0 rgba(176,141,87,.25)`,
    }}>
      {n}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────
function CodexHero() {
  const [copied, copy] = useCopy();
  return (
    <section style={{
      position: "relative",
      padding: "72px 96px 96px",
      borderBottom: `1px solid ${codex.gold}55`,
    }}>
      {/* Top nav bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 64,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: `radial-gradient(circle at 30% 25%, ${codex.goldGlow}, ${codex.gold} 50%, ${codex.goldDeep} 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: codex.ink, fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 22,
            boxShadow: `inset 0 -2px 3px rgba(0,0,0,.3), 0 2px 6px rgba(0,0,0,.2)`,
          }}>𝕄</div>
          <div>
            <div style={{ fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 18, letterSpacing: "0.22em", color: codex.ink }}>
              MTG DISTRI
            </div>
            <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.3em", color: codex.inkSoft }}>
              CODEX EDITION · MMXXVI
            </div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 36, fontFamily: codex.fontLabel, fontSize: 13, letterSpacing: "0.28em", textTransform: "uppercase", color: codex.inkSoft }}>
          <a href="#how"     style={{ color: "inherit", textDecoration: "none" }}>The Rite</a>
          <a href="#token"   style={{ color: "inherit", textDecoration: "none" }}>The Coin</a>
          <a href="#vault"   style={{ color: "inherit", textDecoration: "none" }}>The Vault</a>
          <a href="#faq"     style={{ color: "inherit", textDecoration: "none" }}>Apocrypha</a>
        </nav>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Left column */}
        <div>
          <CodexEyebrow>An Illuminated Memecoin · Vaulted by Collector Crypt</CodexEyebrow>
          <h1 style={{
            fontFamily: codex.fontDisplay,
            fontWeight: 600,
            fontSize: 88,
            lineHeight: 0.96,
            letterSpacing: "0.005em",
            margin: "20px 0 14px",
            color: codex.ink,
          }}>
            The Vault is<br />
            <span style={{ fontStyle: "italic", color: codex.wax, fontFamily: codex.fontBody, fontWeight: 500, fontSize: 96 }}>
              opened
            </span>
            <span style={{ color: codex.gold }}>.</span>
          </h1>
          <p style={{
            fontFamily: codex.fontBody, fontSize: 22, lineHeight: 1.45, color: codex.inkSoft,
            maxWidth: 560, margin: "10px 0 32px", fontWeight: 500,
          }}>
            <span style={{
              float: "left", fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 58,
              lineHeight: 0.85, color: codex.wax, padding: "6px 10px 0 0", marginTop: 4,
            }}>H</span>
            old $MTG. Be summoned to the raffles. Win <em>real</em>, vaulted Magic: The
            Gathering cards — Black Lotus, Moxes, Power Nine — drawn from the Collector
            Crypt sanctum. No burn. No tax. No mercy.
          </p>

          {/* Mana row */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 30 }}>
            <ManaPip kind="W" /><ManaPip kind="U" /><ManaPip kind="B" /><ManaPip kind="R" /><ManaPip kind="G" />
            <span style={{ fontFamily: codex.fontLabel, fontSize: 11, letterSpacing: "0.32em", color: codex.inkSoft, marginLeft: 12 }}>
              ALL FIVE COLORS REPRESENTED
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <WaxButton href={PUMPFUN_URL}>
              ⌬ Buy $MTG on Pump.Fun
            </WaxButton>
            <button
              onClick={() => copy(MTG_CA)}
              style={{
                fontFamily: codex.fontLabel, fontSize: 13, letterSpacing: "0.24em",
                textTransform: "uppercase", color: codex.inkSoft, background: "transparent",
                border: `1px dashed ${codex.gold}`, borderRadius: 999, padding: "16px 22px",
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
              }}>
              {copied ? "✓ Sealed to clipboard" : `${truncCA(MTG_CA, 6, 6)} · Copy CA`}
            </button>
          </div>

          {/* Stat strip */}
          <div style={{ display: "flex", gap: 48, marginTop: 56 }}>
            {[
              { k: "MARKET CAP",    v: "$2.4M",   sub: "+128% / 7d" },
              { k: "HOLDERS",       v: "3,841",   sub: "+312 today" },
              { k: "VAULT VALUE",   v: "$118,300", sub: "12 cards live" },
              { k: "RAFFLES WON",   v: "VII",     sub: "since launch" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.3em", color: codex.inkSoft }}>{s.k}</div>
                <div style={{ fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 28, color: codex.ink, margin: "4px 0 2px" }}>{s.v}</div>
                <div style={{ fontFamily: codex.fontBody, fontStyle: "italic", fontSize: 14, color: codex.wax }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — the featured card frame */}
        <div style={{ position: "relative" }}>
          <Parchment padding={26} style={{ background: codex.cream, boxShadow: `0 24px 60px rgba(40,28,10,.18)`, transform: "rotate(1.2deg)" }}>
            {/* MTG-card-shaped frame */}
            <div style={{
              aspectRatio: "63/88",
              background: `linear-gradient(160deg, ${codex.parchmentDeep}, ${codex.cream})`,
              border: `2px solid ${codex.goldDeep}`,
              borderRadius: 14,
              padding: 14,
              position: "relative",
              boxShadow: `inset 0 0 0 1px ${codex.gold}, inset 0 0 40px rgba(176,141,87,.25)`,
            }}>
              {/* Title bar */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: `linear-gradient(${codex.parchmentDeep}, ${codex.parchment})`,
                border: `1.5px solid ${codex.goldDeep}`, borderRadius: 6, padding: "8px 12px",
                fontFamily: codex.fontDisplay,
              }}>
                <span style={{ fontWeight: 700, fontSize: 18, color: codex.ink }}>The Power Nine</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <ManaPip kind="B" size={18} /><ManaPip kind="B" size={18} />
                </div>
              </div>
              {/* Art window */}
              <div style={{
                marginTop: 10, height: "48%",
                background: `repeating-linear-gradient(135deg, ${codex.parchmentDeep} 0 12px, ${codex.parchment} 12px 24px)`,
                border: `1.5px solid ${codex.goldDeep}`, borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  width: 110, height: 110, borderRadius: "50%",
                  background: `radial-gradient(circle, ${codex.cream}, ${codex.gold} 60%, ${codex.goldDeep} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: codex.fontDisplay, fontSize: 56, color: codex.ink,
                  boxShadow: `inset 0 -4px 8px rgba(0,0,0,.3), 0 4px 14px rgba(0,0,0,.2)`,
                }}>❦</div>
                <div style={{ position: "absolute", bottom: 6, right: 8, fontFamily: codex.fontLabel, fontSize: 10, color: codex.inkSoft, opacity: .7 }}>illus. anon.</div>
              </div>
              {/* Type line */}
              <div style={{
                marginTop: 8, fontFamily: codex.fontDisplay, fontSize: 13, fontWeight: 600,
                background: `linear-gradient(${codex.parchmentDeep}, ${codex.parchment})`,
                border: `1.5px solid ${codex.goldDeep}`, borderRadius: 4, padding: "6px 10px",
                color: codex.ink, display: "flex", justifyContent: "space-between",
              }}>
                <span>Artifact — Mythic Drop</span>
                <span style={{ fontStyle: "italic", color: codex.wax }}>Featured</span>
              </div>
              {/* Text box */}
              <div style={{
                marginTop: 8, height: "26%", background: `linear-gradient(${codex.cream}, ${codex.parchment})`,
                border: `1.5px solid ${codex.goldDeep}`, borderRadius: 4, padding: "10px 12px",
                fontFamily: codex.fontBody, fontSize: 14, color: codex.ink, lineHeight: 1.35,
              }}>
                <p style={{ margin: "0 0 6px" }}>
                  <strong>Hold:</strong> ≥ 1 $MTG to qualify.
                </p>
                <p style={{ margin: "0 0 6px" }}>
                  <strong>Snapshot:</strong> entries weighted by bag.
                </p>
                <p style={{ fontStyle: "italic", color: codex.inkSoft, margin: "10px 0 0", borderTop: `1px solid ${codex.gold}66`, paddingTop: 8 }}>
                  "The wheel turns. Cardboard falls."
                </p>
              </div>
              {/* PT box */}
              <div style={{
                position: "absolute", right: 16, bottom: 16,
                background: `linear-gradient(${codex.parchmentDeep}, ${codex.parchment})`,
                border: `1.5px solid ${codex.goldDeep}`, borderRadius: 4,
                padding: "4px 10px", fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 18,
                color: codex.wax,
              }}>9/9</div>
            </div>
          </Parchment>

          {/* Ribbon */}
          <div style={{
            position: "absolute", top: -18, left: -28,
            background: `linear-gradient(${codex.wax}, ${codex.waxDeep})`,
            color: codex.cream, fontFamily: codex.fontLabel,
            fontSize: 12, letterSpacing: "0.3em", padding: "10px 26px",
            textTransform: "uppercase", boxShadow: "0 4px 10px rgba(0,0,0,.2)",
            transform: "rotate(-4deg)",
            clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
          }}>
            Next Raffle · 3d 14h
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MARQUEE
// ─────────────────────────────────────────────────────────────────
function CodexMarquee() {
  const phrases = [
    "Black Lotus drawn at block 286,441,002",
    "Vault stewards: Collector Crypt",
    "No tax · No team allocation · No mercy",
    "The wheel turns each fortnight",
    "Power Nine. Power Nine. Power Nine.",
  ];
  return (
    <div style={{
      background: codex.ink, color: codex.cream,
      borderTop: `1px solid ${codex.gold}`, borderBottom: `1px solid ${codex.gold}`,
      overflow: "hidden", padding: "14px 0",
    }}>
      <div style={{
        display: "flex", gap: 48, fontFamily: codex.fontLabel, fontSize: 13,
        letterSpacing: "0.32em", textTransform: "uppercase", whiteSpace: "nowrap",
        animation: "codex-marquee 38s linear infinite",
      }}>
        {[...phrases, ...phrases, ...phrases].map((p, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24 }}>
            <span style={{ color: codex.gold }}>✦</span>{p}
          </span>
        ))}
      </div>
      <style>{`@keyframes codex-marquee { from {transform:translateX(0)} to {transform:translateX(-33.333%)} }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  HOW IT WORKS
// ─────────────────────────────────────────────────────────────────
function CodexHow() {
  return (
    <section id="how" style={{ padding: "120px 96px 100px", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <CodexEyebrow>Chapter I · The Rite of Distribution</CodexEyebrow>
        <h2 style={{
          fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 64,
          margin: "12px 0 18px", color: codex.ink, letterSpacing: "0.01em",
        }}>
          How the Wheel <em style={{ color: codex.wax, fontFamily: codex.fontBody, fontWeight: 500 }}>turns</em>
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Fleuron width={420} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {HOW_STEPS.map((step, i) => (
          <div key={i} style={{ position: "relative" }}>
            <Parchment padding={28} style={{ background: codex.cream, height: "100%" }}>
              <ChapterNum n={step.n} />
              <div style={{
                fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 22,
                margin: "12px 0 12px", color: codex.ink, letterSpacing: "0.02em",
              }}>
                {step.title}
              </div>
              <div style={{ width: 40, height: 2, background: codex.wax, marginBottom: 14 }} />
              <p style={{
                fontFamily: codex.fontBody, fontSize: 17, lineHeight: 1.45,
                color: codex.inkSoft, margin: 0,
              }}>
                {step.body}
              </p>
            </Parchment>
            {i < HOW_STEPS.length - 1 && (
              <div style={{
                position: "absolute", top: 70, right: -16, color: codex.gold,
                fontSize: 24, fontFamily: codex.fontDisplay,
              }}>→</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  NEXT RAFFLE
// ─────────────────────────────────────────────────────────────────
function CodexRaffle() {
  const t = useCountdown(NEXT_RAFFLE_TS);
  return (
    <section style={{ padding: "60px 96px 60px" }}>
      <Parchment padding={48} style={{
        background: `linear-gradient(135deg, ${codex.ink} 0%, #2b1f10 60%, ${codex.waxDeep} 100%)`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <CodexEyebrow color={codex.goldGlow}>Foretelling · Raffle № VIII</CodexEyebrow>
            <h2 style={{
              fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 56,
              color: codex.cream, margin: "12px 0 16px", letterSpacing: "0.01em",
            }}>
              The next prize is <em style={{ color: codex.goldGlow, fontFamily: codex.fontBody, fontWeight: 500 }}>unsealed</em>.
            </h2>
            <p style={{ fontFamily: codex.fontBody, fontSize: 20, color: "#e7d8b3", lineHeight: 1.45, margin: "0 0 28px", maxWidth: 520 }}>
              A <strong style={{ color: codex.cream }}>Mox Sapphire · Alpha</strong> has been drawn from the
              Collector Crypt vault and bound to the next snapshot. Hold $MTG when the bell tolls to earn your entries.
            </p>
            <div style={{ display: "flex", gap: 18 }}>
              {[
                { k: "DAYS", v: t.d }, { k: "HOURS", v: t.h }, { k: "MINUTES", v: t.m }, { k: "SECONDS", v: t.s },
              ].map((c) => (
                <div key={c.k} style={{
                  background: `linear-gradient(${codex.ink}, #0e0a05)`,
                  border: `1.5px solid ${codex.gold}`,
                  borderRadius: 8, padding: "16px 22px", minWidth: 100, textAlign: "center",
                  boxShadow: `inset 0 0 0 1px ${codex.goldDeep}, 0 4px 12px rgba(0,0,0,.3)`,
                }}>
                  <div style={{
                    fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 44,
                    color: codex.goldGlow, lineHeight: 1, fontVariantNumeric: "tabular-nums",
                  }}>
                    {c.v}
                  </div>
                  <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.32em", color: "#c7a544", marginTop: 6 }}>
                    {c.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card preview */}
          <div style={{
            aspectRatio: "63/88",
            background: `linear-gradient(160deg, #c7d9f0, #6f96c8)`,
            border: `3px solid ${codex.goldGlow}`, borderRadius: 16, padding: 14,
            position: "relative", boxShadow: `0 0 0 4px ${codex.ink}, 0 20px 50px rgba(0,0,0,.5), 0 0 60px rgba(216,184,106,.25)`,
            transform: "rotate(2.2deg)",
          }}>
            <Corner pos="tl" color={codex.goldGlow} /><Corner pos="tr" color={codex.goldGlow} />
            <Corner pos="bl" color={codex.goldGlow} /><Corner pos="br" color={codex.goldGlow} />
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "rgba(255,255,255,.6)", border: `1.5px solid ${codex.goldDeep}`,
              borderRadius: 6, padding: "8px 12px", fontFamily: codex.fontDisplay,
            }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: codex.ink }}>Mox Sapphire</span>
              <ManaPip kind="U" size={20} />
            </div>
            <div style={{
              marginTop: 10, aspectRatio: "1/.75",
              background: `radial-gradient(circle at 50% 40%, #a9c5e6, #3d6a99 70%, #1d3957 100%)`,
              border: `1.5px solid ${codex.goldDeep}`, borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              <div style={{
                width: 140, height: 100,
                background: `linear-gradient(45deg, #9bbedc, #c6d9ee 30%, #6c8fbf 60%, #2c4a72)`,
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                boxShadow: "0 0 40px rgba(169,197,230,.6)",
              }} />
            </div>
            <div style={{
              marginTop: 8, fontFamily: codex.fontDisplay, fontSize: 12, fontWeight: 600,
              background: "rgba(255,255,255,.6)", border: `1.5px solid ${codex.goldDeep}`,
              borderRadius: 4, padding: "6px 10px", color: codex.ink,
            }}>
              Artifact — Power Nine
            </div>
            <div style={{
              marginTop: 8, background: "rgba(255,255,255,.55)", border: `1.5px solid ${codex.goldDeep}`,
              borderRadius: 4, padding: "10px 12px", fontFamily: codex.fontBody, fontSize: 13,
              color: codex.ink, lineHeight: 1.35,
            }}>
              <p style={{ margin: "0 0 4px" }}><strong>{'{T}: Add {U}.'}</strong></p>
              <p style={{ fontStyle: "italic", color: codex.inkSoft, margin: "8px 0 0", borderTop: `1px solid ${codex.gold}66`, paddingTop: 6 }}>
                "Cold. Blue. Lethal in the right hand."
              </p>
            </div>
            <div style={{
              position: "absolute", left: 16, bottom: 14,
              fontFamily: codex.fontLabel, fontSize: 10, color: codex.inkSoft,
            }}>
              ALPHA · PSA 8 · est. $22,500
            </div>
          </div>
        </div>
      </Parchment>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TOKEN CHART + BUY WIDGET
// ─────────────────────────────────────────────────────────────────
function CodexCandle({ c, x, w, scale, baseY }) {
  // Each candle: vertical wick + body. green if c>=o, red else.
  const up = c.c >= c.o;
  const fill = up ? "#3d6a32" : codex.wax;
  const stroke = up ? "#1f3917" : codex.waxDeep;
  const bodyTop = baseY - Math.max(c.o, c.c) * scale;
  const bodyBot = baseY - Math.min(c.o, c.c) * scale;
  const wickTop = baseY - c.h * scale;
  const wickBot = baseY - c.l * scale;
  return (
    <g>
      <line x1={x + w / 2} y1={wickTop} x2={x + w / 2} y2={wickBot} stroke={stroke} strokeWidth="1.2" />
      <rect x={x} y={bodyTop} width={w} height={Math.max(2, bodyBot - bodyTop)} fill={fill} stroke={stroke} strokeWidth="1" rx="1.5" />
    </g>
  );
}

function CodexToken() {
  const [amt, setAmt] = React.useState("0.5");
  const sol = parseFloat(amt) || 0;
  const pricePerMtg = 0.0000412; // SOL
  const tokens = sol > 0 ? sol / pricePerMtg : 0;
  const entries = Math.floor(tokens / 1000);

  const W = 540, H = 260, pad = { l: 30, r: 30, t: 16, b: 24 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const cw = innerW / CANDLES.length;
  const max = Math.max(...CANDLES.map(c => c.h));
  const scale = innerH / (max * 1.1);
  const baseY = H - pad.b;

  return (
    <section id="token" style={{
      padding: "80px 96px 100px",
      borderTop: `1px solid ${codex.gold}55`,
      borderBottom: `1px solid ${codex.gold}55`,
      background: `radial-gradient(ellipse at 80% 0%, ${codex.parchmentDeep} 0%, transparent 60%)`,
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <CodexEyebrow>Chapter II · The Coin</CodexEyebrow>
        <h2 style={{
          fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 56,
          margin: "12px 0", color: codex.ink, letterSpacing: "0.01em",
        }}>
          $MTG <em style={{ color: codex.wax, fontFamily: codex.fontBody, fontWeight: 500 }}>on the market</em>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        {/* Chart */}
        <Parchment padding={28} style={{ background: codex.cream }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: codex.fontLabel, fontSize: 11, letterSpacing: "0.32em", color: codex.inkSoft }}>
                $MTG / SOL · LAST 24 HRS
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 6 }}>
                <span style={{ fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 38, color: codex.ink }}>0.0000412</span>
                <span style={{ fontFamily: codex.fontBody, fontStyle: "italic", fontSize: 18, color: "#3d6a32" }}>▲ 38.2%</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["1H", "6H", "24H", "7D", "ALL"].map((t, i) => (
                <button key={t} style={{
                  background: i === 2 ? codex.ink : "transparent", color: i === 2 ? codex.cream : codex.inkSoft,
                  fontFamily: codex.fontLabel, fontSize: 11, letterSpacing: "0.2em",
                  border: `1px solid ${codex.goldDeep}`, padding: "6px 12px", borderRadius: 4, cursor: "pointer",
                }}>{t}</button>
              ))}
            </div>
          </div>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
            {/* Gridlines */}
            {[0.25, 0.5, 0.75].map((p, i) => (
              <line key={i} x1={pad.l} x2={W - pad.r} y1={pad.t + innerH * p} y2={pad.t + innerH * p}
                    stroke={codex.gold} strokeOpacity="0.25" strokeDasharray="2 3" />
            ))}
            {CANDLES.map((c, i) => (
              <CodexCandle key={i} c={c} x={pad.l + i * cw + 1} w={cw - 2} scale={scale} baseY={baseY} />
            ))}
            {/* axis */}
            <line x1={pad.l} x2={W - pad.r} y1={baseY} y2={baseY} stroke={codex.gold} strokeOpacity="0.5" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {["00:00", "06:00", "12:00", "18:00", "Now"].map(t => (
              <span key={t} style={{ fontFamily: codex.fontLabel, fontSize: 10, color: codex.inkSoft, letterSpacing: "0.2em" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${codex.gold}66` }}>
            {[
              ["LIQUIDITY", "412 SOL"], ["VOLUME 24H", "1,184 SOL"],
              ["HOLDERS", "3,841"], ["BONDING", "67%"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.28em", color: codex.inkSoft }}>{k}</div>
                <div style={{ fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 22, color: codex.ink, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </Parchment>

        {/* Buy widget */}
        <Parchment padding={28} style={{ background: codex.cream }}>
          <CodexEyebrow>Acquire the Coin</CodexEyebrow>
          <div style={{
            fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 26,
            margin: "10px 0 18px", color: codex.ink,
          }}>
            Mint thy bag.
          </div>
          {/* From */}
          <div style={{
            border: `1.5px solid ${codex.goldDeep}`, borderRadius: 8, padding: "14px 16px",
            background: codex.parchment, marginBottom: 8,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.3em", color: codex.inkSoft, marginBottom: 6 }}>
              <span>YOU PAY</span><span>BALANCE: 2.41 SOL</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                value={amt}
                onChange={(e) => setAmt(e.target.value.replace(/[^0-9.]/g, ""))}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 30, color: codex.ink,
                  fontVariantNumeric: "tabular-nums",
                }}
              />
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: codex.cream, padding: "8px 14px", borderRadius: 999,
                border: `1px solid ${codex.gold}`,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "linear-gradient(135deg, #9945ff, #14f195)",
                }} />
                <span style={{ fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 14, color: codex.ink }}>SOL</span>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div style={{ textAlign: "center", margin: "6px 0", color: codex.gold, fontSize: 18 }}>↓</div>
          {/* To */}
          <div style={{
            border: `1.5px solid ${codex.goldDeep}`, borderRadius: 8, padding: "14px 16px",
            background: codex.parchment, marginBottom: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.3em", color: codex.inkSoft, marginBottom: 6 }}>
              <span>YOU RECEIVE</span><span>EST.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                flex: 1, fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 30, color: codex.ink,
                fontVariantNumeric: "tabular-nums",
              }}>
                {tokens.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: codex.cream, padding: "8px 14px", borderRadius: 999,
                border: `1px solid ${codex.gold}`,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: `radial-gradient(circle at 30% 25%, ${codex.goldGlow}, ${codex.gold}, ${codex.goldDeep})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 11, color: codex.ink,
                }}>𝕄</div>
                <span style={{ fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 14, color: codex.ink }}>MTG</span>
              </div>
            </div>
          </div>
          {/* Entries */}
          <div style={{
            background: codex.ink, color: codex.cream, borderRadius: 8,
            padding: "12px 14px", marginBottom: 16, display: "flex",
            alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.3em", color: codex.goldGlow }}>RAFFLE ENTRIES EARNED</div>
              <div style={{ fontFamily: codex.fontDisplay, fontSize: 22, fontWeight: 700, marginTop: 4 }}>
                {entries.toLocaleString()} <span style={{ fontFamily: codex.fontBody, fontWeight: 400, fontSize: 14, fontStyle: "italic", color: "#c7a544" }}>tickets</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <ManaPip kind="W" size={18} /><ManaPip kind="U" size={18} /><ManaPip kind="B" size={18} />
              <ManaPip kind="R" size={18} /><ManaPip kind="G" size={18} />
            </div>
          </div>

          <WaxButton href={PUMPFUN_URL} style={{ width: "100%", justifyContent: "center" }}>
            Cast → Pump.Fun
          </WaxButton>
          <div style={{
            fontFamily: codex.fontBody, fontStyle: "italic", fontSize: 13, color: codex.inkSoft,
            textAlign: "center", marginTop: 10,
          }}>
            "All trades route through the sacred bonding curve."
          </div>
        </Parchment>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  VAULT
// ─────────────────────────────────────────────────────────────────
function VaultCard({ card, onClick, idx }) {
  const pip = card.color === "art" ? null : card.color.split("");
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left", background: "transparent", border: "none", padding: 0, cursor: "pointer",
        position: "relative", transition: "transform .2s",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px) rotate(-0.4deg)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) rotate(0)"}
    >
      <div style={{
        aspectRatio: "63/88",
        background: `linear-gradient(160deg, ${codex.parchmentDeep}, ${codex.cream})`,
        border: `2px solid ${codex.goldDeep}`, borderRadius: 10, padding: 8,
        boxShadow: `inset 0 0 0 1px ${codex.gold}, 0 6px 16px rgba(40,28,10,.18)`,
        display: "flex", flexDirection: "column", position: "relative",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: codex.parchment, border: `1px solid ${codex.goldDeep}`, borderRadius: 4,
          padding: "5px 8px", fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 11, color: codex.ink,
        }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.name}</span>
          {pip && (
            <div style={{ display: "flex", gap: 2 }}>
              {pip.map((p, i) => <ManaPip key={i} kind={p} size={12} />)}
            </div>
          )}
        </div>
        {/* Art slot — placeholder */}
        <div style={{
          margin: "6px 0", flex: 1,
          background: `repeating-linear-gradient(135deg, ${codex.parchmentDeep} 0 8px, ${codex.parchment} 8px 16px)`,
          border: `1px solid ${codex.goldDeep}`, borderRadius: 3,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: codex.inkSoft, fontFamily: codex.fontLabel, fontSize: 9, letterSpacing: "0.3em",
        }}>
          [ ART · {card.set.toUpperCase()} ]
        </div>
        <div style={{
          background: codex.parchment, border: `1px solid ${codex.goldDeep}`, borderRadius: 4,
          padding: "4px 8px", fontFamily: codex.fontBody, fontSize: 11, fontStyle: "italic",
          color: codex.inkSoft, display: "flex", justifyContent: "space-between",
        }}>
          <span>{card.rarity}</span>
          <span style={{ color: codex.wax, fontStyle: "normal", fontFamily: codex.fontDisplay, fontWeight: 700 }}>{card.value}</span>
        </div>
      </div>
      <div style={{
        position: "absolute", top: -10, left: -10,
        background: codex.ink, color: codex.goldGlow,
        width: 22, height: 22, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: codex.fontDisplay, fontSize: 11, fontWeight: 700,
        border: `1px solid ${codex.gold}`,
      }}>{idx + 1}</div>
    </button>
  );
}

function CodexVault() {
  const [filter, setFilter] = React.useState("ALL");
  const filters = ["ALL", "MYTHIC", "RARE", "UNCOMMON"];
  const filtered = filter === "ALL" ? VAULT_CARDS : VAULT_CARDS.filter(c => c.rarity.toUpperCase() === filter);

  return (
    <section id="vault" style={{ padding: "100px 96px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
        <div>
          <CodexEyebrow>Chapter III · The Vault</CodexEyebrow>
          <h2 style={{
            fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 56,
            margin: "12px 0 8px", color: codex.ink, letterSpacing: "0.01em",
          }}>
            Cards in <em style={{ color: codex.wax, fontFamily: codex.fontBody, fontWeight: 500 }}>custody</em>
          </h2>
          <p style={{ fontFamily: codex.fontBody, fontSize: 18, color: codex.inkSoft, margin: 0, maxWidth: 540 }}>
            Each piece is held by Collector Crypt — graded, insured, photographed, and bound by raffle to the next snapshot.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? codex.ink : "transparent",
              color: filter === f ? codex.cream : codex.inkSoft,
              fontFamily: codex.fontLabel, fontSize: 11, letterSpacing: "0.28em",
              border: `1px solid ${codex.goldDeep}`, padding: "8px 16px",
              borderRadius: 999, cursor: "pointer",
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 22 }}>
        {filtered.map((c, i) => (<VaultCard key={c.name} card={c} idx={i} />))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────────────────────────
function CodexFaq() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{
      padding: "100px 96px 100px",
      background: `linear-gradient(${codex.parchmentDeep}00, ${codex.parchmentDeep}88)`,
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <CodexEyebrow>Apocrypha</CodexEyebrow>
        <h2 style={{
          fontFamily: codex.fontDisplay, fontWeight: 600, fontSize: 56,
          margin: "12px 0", color: codex.ink, letterSpacing: "0.01em",
        }}>
          Questions <em style={{ color: codex.wax, fontFamily: codex.fontBody, fontWeight: 500 }}>oft asked</em>
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}><Fleuron width={360} /></div>
      </div>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              borderTop: `1px solid ${codex.gold}`,
              borderBottom: i === FAQ_ITEMS.length - 1 ? `1px solid ${codex.gold}` : "none",
            }}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "transparent", border: "none", padding: "24px 8px", cursor: "pointer",
                  textAlign: "left",
                }}>
                <span style={{
                  fontFamily: codex.fontDisplay, fontSize: 22, fontWeight: 600, color: codex.ink,
                }}>
                  <span style={{ color: codex.wax, marginRight: 14, fontStyle: "italic", fontFamily: codex.fontBody }}>
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {item.q}
                </span>
                <span style={{ color: codex.gold, fontSize: 26, fontFamily: codex.fontDisplay, transition: "transform .25s", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>✦</span>
              </button>
              {isOpen && (
                <div style={{
                  padding: "0 8px 24px 50px",
                  fontFamily: codex.fontBody, fontSize: 18, color: codex.inkSoft, lineHeight: 1.55,
                }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────────────────────────
function CodexFooter() {
  const [copied, copy] = useCopy();
  return (
    <footer style={{
      background: codex.ink, color: codex.cream,
      padding: "70px 96px 40px",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: `radial-gradient(circle at 30% 25%, ${codex.goldGlow}, ${codex.gold}, ${codex.goldDeep})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: codex.ink, fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 22,
            }}>𝕄</div>
            <div>
              <div style={{ fontFamily: codex.fontDisplay, fontWeight: 700, fontSize: 18, letterSpacing: "0.22em" }}>MTG DISTRI</div>
              <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.3em", color: codex.goldGlow }}>CODEX EDITION · MMXXVI</div>
            </div>
          </div>
          <p style={{ fontFamily: codex.fontBody, fontSize: 17, lineHeight: 1.5, color: "#d7c79e", maxWidth: 400 }}>
            A community distribution rite for vaulted Magic: The Gathering cards, indexed to the bonding curve of $MTG on Pump.Fun.
          </p>
        </div>
        {[
          { h: "Pages", items: ["The Rite", "The Coin", "The Vault", "Apocrypha"] },
          { h: "Custody", items: ["Collector Crypt", "Vault audits", "PSA grading", "Insurance"] },
          { h: "Council", items: ["X / Twitter", "Telegram", "Discord", "GitHub"] },
        ].map((col) => (
          <div key={col.h}>
            <div style={{ fontFamily: codex.fontLabel, fontSize: 11, letterSpacing: "0.32em", color: codex.goldGlow, marginBottom: 14 }}>{col.h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.items.map(it => (
                <a key={it} href="#" style={{
                  color: codex.cream, textDecoration: "none",
                  fontFamily: codex.fontBody, fontSize: 17,
                }}>{it}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        border: `1px solid ${codex.gold}`, borderRadius: 8, padding: "16px 22px",
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24,
      }}>
        <div>
          <div style={{ fontFamily: codex.fontLabel, fontSize: 10, letterSpacing: "0.32em", color: codex.goldGlow }}>CONTRACT ADDRESS</div>
          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 15, color: codex.cream, marginTop: 4, wordBreak: "break-all" }}>
            {MTG_CA}
          </div>
        </div>
        <button onClick={() => copy(MTG_CA)} style={{
          background: codex.gold, color: codex.ink, border: "none", borderRadius: 999,
          padding: "10px 22px", fontFamily: codex.fontLabel, fontSize: 12, letterSpacing: "0.28em",
          cursor: "pointer",
        }}>
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: `1px solid ${codex.gold}44` }}>
        <div style={{ fontFamily: codex.fontBody, fontStyle: "italic", fontSize: 14, color: "#d7c79e" }}>
          "All cards are real. All raffles are random. May your topdeck be lethal."
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <ManaPip kind="W" size={20} /><ManaPip kind="U" size={20} /><ManaPip kind="B" size={20} /><ManaPip kind="R" size={20} /><ManaPip kind="G" size={20} />
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────
function DirectionCodex() {
  return (
    <div style={{
      width: "100%",
      background: codex.parchment,
      backgroundImage: `
        radial-gradient(ellipse at 10% 10%, rgba(176,141,87,.18), transparent 50%),
        radial-gradient(ellipse at 90% 60%, rgba(139,30,30,.08), transparent 50%),
        radial-gradient(circle at 20% 80%, rgba(176,141,87,.12), transparent 40%)
      `,
      color: codex.ink,
      fontFamily: codex.fontBody,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* paper noise overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0 0.15 0 0 0 .15 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        opacity: 0.5, mixBlendMode: "multiply",
      }} />
      <CodexHero />
      <CodexMarquee />
      <CodexHow />
      <CodexRaffle />
      <CodexToken />
      <CodexVault />
      <CodexFaq />
      <CodexFooter />
    </div>
  );
}

window.DirectionCodex = DirectionCodex;
