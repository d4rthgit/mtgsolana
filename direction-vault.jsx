// Direction 2: The Arcane Vault
// Obsidian + arcane purple glow + electric blue + spell-gold. Gothic spellbook
// aesthetic, glowing sigils, hexagonal grids, runic dividers.

const vault = {
  bg: "#080510",
  bgDeep: "#04020a",
  panel: "#120a22",
  panelEdge: "#231640",
  panelGlow: "#1f1438",
  ink: "#e8dcff",
  inkSoft: "#a294c4",
  inkMuted: "#6b5e8a",
  arcane: "#b794f4",
  arcaneDeep: "#6d28d9",
  arcaneGlow: "#c4b5fd",
  spark: "#7dd3fc",
  ember: "#f97373",
  spell: "#fbbf24",
  spellGlow: "#fde68a",
  fontDisplay: '"Cinzel", "Trajan Pro", "Times New Roman", serif',
  fontBody: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  fontMono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace',
  fontLabel: '"IM Fell English SC", "Cinzel", serif',
};

const MANA_V = {
  W: { color: "#fde68a", glow: "rgba(253,230,138,.5)" },
  U: { color: "#7dd3fc", glow: "rgba(125,211,252,.5)" },
  B: { color: "#a78bfa", glow: "rgba(167,139,250,.55)" },
  R: { color: "#f97373", glow: "rgba(249,115,115,.5)" },
  G: { color: "#86efac", glow: "rgba(134,239,172,.5)" },
};
function VManaPip({ kind = "W", size = 22 }) {
  const m = MANA_V[kind] || MANA_V.W;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle at 30% 25%, #fff 0%, ${m.color} 40%, ${vault.bg} 100%)`,
        boxShadow: `inset 0 0 0 1px ${m.color}, 0 0 ${size * 0.6}px ${m.glow}`,
        fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: size * 0.42,
        color: vault.bg, lineHeight: 1, flex: "0 0 auto",
      }}
    >
      {kind}
    </span>
  );
}

// ── Arcane sigil (decorative) ────────────────────────────────────
function Sigil({ size = 80, color = vault.arcane, opacity = 0.5, spin = false, style = {} }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100"
      style={{ opacity, filter: `drop-shadow(0 0 8px ${color})`, animation: spin ? "vault-spin 24s linear infinite" : undefined, ...style }}
    >
      <g fill="none" stroke={color} strokeWidth="0.8">
        <circle cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="38" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="28" />
        <polygon points="50,8 87,71 13,71" />
        <polygon points="50,92 13,29 87,29" />
        <circle cx="50" cy="50" r="6" fill={color} />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <g key={a} transform={`rotate(${a} 50 50)`}>
            <circle cx="50" cy="6" r="2" fill={color} />
            <line x1="50" y1="8" x2="50" y2="14" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// ── Hex tile ─────────────────────────────────────────────────────
function HexBg({ color = vault.arcane, opacity = 0.05 }) {
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity }}>
      <defs>
        <pattern id="hex-pat" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="translate(0,0)">
          <polygon points="30,2 56,17 56,47 30,62 4,47 4,17" fill="none" stroke={color} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pat)" />
    </svg>
  );
}

// ── Glow button ──────────────────────────────────────────────────
function GlowButton({ children, onClick, href, size = "lg", style = {}, variant = "primary" }) {
  const { isMobile } = useViewport();
  const pad = size === "lg" ? (isMobile ? "13px 22px" : "18px 36px") : (isMobile ? "9px 16px" : "11px 22px");
  const fs = size === "lg" ? (isMobile ? 13 : 16) : (isMobile ? 11 : 13);
  const Tag = href ? "a" : "button";
  const primary = variant === "primary";
  return (
    <Tag
      href={href} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, padding: pad,
        background: primary ? `linear-gradient(135deg, ${vault.arcane}, ${vault.arcaneDeep})` : "transparent",
        color: primary ? "#fff" : vault.arcane,
        fontFamily: vault.fontDisplay, fontWeight: 600, fontSize: fs,
        letterSpacing: "0.22em", textTransform: "uppercase",
        border: primary ? `1px solid ${vault.arcaneGlow}` : `1px solid ${vault.arcane}`,
        borderRadius: 4, cursor: "pointer", textDecoration: "none",
        boxShadow: primary
          ? `0 0 24px ${vault.arcane}55, inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 6px rgba(0,0,0,.4)`
          : `inset 0 0 0 1px ${vault.arcane}33`,
        textShadow: primary ? `0 0 12px ${vault.arcaneGlow}` : "none",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ── Panel with corner ticks ──────────────────────────────────────
function VaultPanel({ children, style = {}, glow = false, padding = 28 }) {
  const { isMobile } = useViewport();
  const pad = isMobile ? Math.min(padding, 18) : padding;
  return (
    <div style={{
      position: "relative", padding: pad,
      background: `linear-gradient(180deg, ${vault.panel}, ${vault.bgDeep})`,
      border: `1px solid ${vault.panelEdge}`,
      borderRadius: 6,
      boxShadow: glow
        ? `inset 0 0 0 1px ${vault.arcane}22, inset 0 0 60px rgba(183,148,244,.06), 0 0 30px rgba(109,40,217,.18)`
        : `inset 0 0 0 1px rgba(183,148,244,.05)`,
      ...style,
    }}>
      {/* Corner ticks */}
      {["tl", "tr", "bl", "br"].map((p) => (
        <div key={p} style={{
          position: "absolute", width: 12, height: 12,
          borderColor: vault.arcane, borderStyle: "solid",
          ...(p === "tl" ? { top: -1, left: -1, borderWidth: "1px 0 0 1px" } :
              p === "tr" ? { top: -1, right: -1, borderWidth: "1px 1px 0 0" } :
              p === "bl" ? { bottom: -1, left: -1, borderWidth: "0 0 1px 1px" } :
                            { bottom: -1, right: -1, borderWidth: "0 1px 1px 0" }),
        }} />
      ))}
      {children}
    </div>
  );
}

// ── Real MTG card renderer ─────────────────────────────────────
// Uses card image from Collector Crypt as the art. The frame is drawn in
// the Vault visual language (arcane glow + spell-gold accents).
function RealCard({ card, size = "md", rotate = 0, glow = true, onClick }) {
  // size: sm | md | lg — affects padding + title typography only.
  const isLg = size === "lg";
  const isSm = size === "sm";
  const accent = card.accent || vault.spell;
  const accentDeep = card.accentDeep || vault.arcaneDeep;
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      style={{
        position: "relative", width: "100%", aspectRatio: "63/88",
        background: `linear-gradient(160deg, ${vault.panel}, ${vault.bgDeep})`,
        border: `${isLg ? 2 : 1}px solid ${accent}`,
        borderRadius: isLg ? 16 : 10,
        padding: isLg ? 14 : isSm ? 6 : 10,
        boxShadow: glow
          ? `0 0 0 ${isLg ? 4 : 2}px ${vault.bg}, 0 0 ${isLg ? 60 : 30}px ${accent}55, inset 0 0 0 1px ${accent}55`
          : `inset 0 0 0 1px ${vault.panelEdge}, 0 4px 14px rgba(0,0,0,.6)`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        cursor: onClick ? "pointer" : "default",
        textAlign: "left", color: vault.ink,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
      {/* Title bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: `linear-gradient(${vault.panel}, ${vault.bgDeep})`,
        border: `1px solid ${accent}66`, borderRadius: isLg ? 4 : 3,
        padding: isSm ? "4px 7px" : "8px 10px",
        fontFamily: vault.fontDisplay,
        flex: "0 0 auto",
      }}>
        <span style={{
          fontWeight: 700, fontSize: isLg ? 17 : isSm ? 10 : 13,
          color: vault.spellGlow, textShadow: glow ? `0 0 6px ${accent}66` : "none",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}>
          {card.name}
        </span>
        {card.cost && !isSm && (
          <span style={{
            fontFamily: vault.fontMono, fontSize: isLg ? 13 : 11,
            color: accent, letterSpacing: "0.05em",
          }}>{card.cost}</span>
        )}
      </div>
      {/* Art window — the real Collector Crypt image */}
      <div style={{
        marginTop: isSm ? 4 : 8, position: "relative",
        flex: "1 1 auto", minHeight: 0,
        border: `1px solid ${accent}66`, borderRadius: isLg ? 4 : 3,
        overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 40%, ${accent}33, ${vault.bgDeep})`,
      }}>
        <img
          src={card.image} alt={card.name}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
            display: "block",
            filter: `drop-shadow(0 0 ${isLg ? 16 : 8}px ${accent}66)`,
          }}
        />
        {/* Foil shimmer overlay for textured-foil cards */}
        {card.treatment && card.treatment.toLowerCase().includes("foil") && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(115deg, transparent 30%, rgba(255,255,255,.18) 45%, rgba(255,255,255,.06) 55%, transparent 70%)`,
            mixBlendMode: "screen", opacity: 0.7,
          }} />
        )}
        {/* Grade badge */}
        <div style={{
          position: "absolute", top: isSm ? 4 : 8, right: isSm ? 4 : 8,
          background: `linear-gradient(135deg, ${vault.spell}, ${accentDeep})`,
          color: vault.bgDeep,
          fontFamily: vault.fontMono, fontWeight: 700,
          fontSize: isLg ? 11 : isSm ? 8 : 9,
          letterSpacing: "0.18em",
          padding: isSm ? "2px 5px" : "4px 8px",
          borderRadius: 2,
          boxShadow: `0 2px 8px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.3)`,
          border: `1px solid ${vault.spellGlow}88`,
        }}>
          {card.grade}
        </div>
      </div>
      {/* Type line */}
      {!isSm && (
        <div style={{
          marginTop: 8, flex: "0 0 auto",
          fontFamily: vault.fontDisplay, fontSize: isLg ? 13 : 11, fontWeight: 600,
          background: `linear-gradient(${vault.panel}, ${vault.bgDeep})`,
          border: `1px solid ${accent}66`, borderRadius: isLg ? 4 : 3,
          padding: isLg ? "8px 10px" : "6px 8px",
          color: vault.ink, display: "flex", justifyContent: "space-between",
          letterSpacing: "0.02em",
        }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.type}</span>
          {card.treatment && card.treatment !== "Non-foil" && (
            <span style={{ color: accent, fontStyle: "italic", marginLeft: 8 }}>{card.treatment}</span>
          )}
        </div>
      )}
      {/* Text box — only on large */}
      {isLg && (
        <div style={{
          marginTop: 8, flex: "0 0 auto",
          background: `linear-gradient(${vault.panel}, ${vault.bgDeep})`,
          border: `1px solid ${accent}66`, borderRadius: 4,
          padding: "10px 12px",
          fontFamily: vault.fontBody, fontSize: 14,
          color: vault.inkSoft, lineHeight: 1.4,
        }}>
          <div style={{ color: vault.ink, marginBottom: 6 }}>{card.rules}</div>
          <div style={{
            fontStyle: "italic", color: accent,
            paddingTop: 8, borderTop: `1px solid ${accent}33`,
          }}>{card.flavor}</div>
        </div>
      )}
      {/* Set / number footer (sm/md only) */}
      {!isLg && (
        <div style={{
          marginTop: isSm ? 4 : 8, flex: "0 0 auto",
          fontFamily: vault.fontMono, fontSize: isSm ? 8 : 10,
          color: vault.inkMuted, letterSpacing: "0.18em",
          display: "flex", justifyContent: "space-between", textTransform: "uppercase",
        }}>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.year} · {card.set}</span>
          {card.number && <span style={{ color: accent }}>{card.number}</span>}
        </div>
      )}
    </Tag>
  );
}

function VaultEyebrow({ children, color = vault.arcane }) {
  return (
    <div style={{
      fontFamily: vault.fontMono, fontSize: 12, letterSpacing: "0.42em",
      textTransform: "uppercase", color, display: "inline-flex", alignItems: "center", gap: 10,
    }}>
      <span style={{ display: "inline-block", width: 18, height: 1, background: color }} />
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────
function VaultHero() {
  const [copied, copy] = useCopy();
  const { mtg, loading, error } = useDexScreener(MTG_CA);
  const t = useCountdown(NEXT_DRAW_TS);
  const { isMobile, isTablet } = useViewport();
  return (
    <section style={{
      position: "relative",
      padding: isMobile ? "20px 16px 60px" : isTablet ? "32px 40px 80px" : "44px 80px 110px",
      overflow: "hidden",
      borderBottom: `1px solid ${vault.panelEdge}`,
    }}>
      {/* Background sigils */}
      <Sigil size={760} color={vault.arcane} opacity={0.07} spin
             style={{ position: "absolute", top: -180, right: -180, zIndex: 0 }} />
      <Sigil size={420} color={vault.spark} opacity={0.05}
             style={{ position: "absolute", bottom: -100, left: -100, zIndex: 0 }} />
      <HexBg color={vault.arcane} opacity={0.04} />

      {/* Top bar */}
      <div style={{
        position: "relative", zIndex: 1, display: "flex",
        alignItems: "center", justifyContent: "space-between",
        marginBottom: isMobile ? 40 : 80, gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
          <div style={{
            position: "relative", width: isMobile ? 36 : 46, height: isMobile ? 36 : 46,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Sigil size={isMobile ? 36 : 46} color={vault.arcane} opacity={0.85} spin style={{ position: "absolute", inset: 0 }} />
            <span style={{
              position: "relative", color: vault.spellGlow,
              fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: isMobile ? 14 : 18,
              textShadow: `0 0 8px ${vault.spell}`,
            }}>𝕄</span>
          </div>
          <div>
            <div style={{ fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: isMobile ? 13 : 17, letterSpacing: "0.28em", color: vault.ink }}>
              MTG DISTRI
            </div>
            <div style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 8 : 10, letterSpacing: "0.32em", color: vault.inkMuted }}>
              VAULT.RITE / v0.2.6
            </div>
          </div>
        </div>
        {!isMobile && (
          <nav style={{
            display: "flex", gap: isTablet ? 20 : 36,
            fontFamily: vault.fontMono, fontSize: isTablet ? 11 : 12,
            letterSpacing: "0.3em", textTransform: "uppercase", color: vault.inkSoft,
            flexWrap: "wrap", justifyContent: "center",
          }}>
            <a href="#how"     style={{ color: "inherit", textDecoration: "none" }}>The Rite</a>
            <a href="#token"   style={{ color: "inherit", textDecoration: "none" }}>$MTG</a>
            <a href="#winners" style={{ color: "inherit", textDecoration: "none" }}>Winners</a>
            <a href="#vault"   style={{ color: "inherit", textDecoration: "none" }}>Vault</a>
            <a href="#faq"     style={{ color: "inherit", textDecoration: "none" }}>Codex</a>
          </nav>
        )}
        <GlowButton href={PUMPFUN_URL} size="sm">Buy $MTG ↗</GlowButton>
      </div>

      <div style={{
        position: "relative", zIndex: 1, display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
        gap: isMobile ? 40 : isTablet ? 40 : 80,
        alignItems: "center",
      }}>
        <div>
          <VaultEyebrow>Pump.Fun · Solana · Custody by Collector Crypt</VaultEyebrow>
          <h1 style={{
            fontFamily: vault.fontDisplay, fontWeight: 600,
            fontSize: isMobile ? 48 : isTablet ? 64 : 96,
            lineHeight: 0.95, letterSpacing: "0.005em", margin: "24px 0 16px",
            color: vault.ink, position: "relative",
          }}>
            <span style={{
              background: `linear-gradient(180deg, ${vault.ink} 0%, ${vault.arcane} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Open the<br />vault.
            </span>
            <span style={{
              position: "absolute", left: 0, bottom: -6, color: vault.arcane,
              opacity: 0.18, filter: "blur(24px)",
              fontSize: isMobile ? 48 : isTablet ? 64 : 96,
              pointerEvents: "none", lineHeight: 0.95,
            }}>Open the<br />vault.</span>
          </h1>
          <p style={{
            fontFamily: vault.fontBody, fontSize: isMobile ? 16 : 22, lineHeight: 1.5,
            color: vault.inkSoft, margin: "8px 0 28px", maxWidth: 540,
          }}>
            $MTG is a Pump.Fun memecoin bound to a vault of real, graded Magic: The
            Gathering cards held by <span style={{ color: vault.spellGlow }}>Collector Crypt</span>. Every hour, a
            winner is drawn from holders with <strong style={{ color: vault.spellGlow }}>1M+ $MTG</strong> held for{" "}
            <strong style={{ color: vault.spellGlow }}>1h+</strong>. <em style={{ color: vault.arcaneGlow }}>The cardboard remembers.</em>
          </p>

          <div style={{ display: "flex", gap: isMobile ? 6 : 8, alignItems: "center", marginBottom: isMobile ? 24 : 32, flexWrap: "wrap" }}>
            <VManaPip kind="W" size={isMobile ? 18 : 22} />
            <VManaPip kind="U" size={isMobile ? 18 : 22} />
            <VManaPip kind="B" size={isMobile ? 18 : 22} />
            <VManaPip kind="R" size={isMobile ? 18 : 22} />
            <VManaPip kind="G" size={isMobile ? 18 : 22} />
            <span style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 11, letterSpacing: "0.32em", color: vault.inkMuted, marginLeft: isMobile ? 6 : 14 }}>
              FIVE COLORS · ONE COIN
            </span>
          </div>

          <div style={{ display: "flex", gap: isMobile ? 8 : 12, alignItems: "center", flexWrap: "wrap" }}>
            <GlowButton href={PUMPFUN_URL}>◈ Summon on Pump.Fun</GlowButton>
            <GlowButton href={DEXSCREENER_URL} variant="ghost" style={{
              background: "transparent", color: vault.spark,
              border: `1px solid ${vault.spark}`,
            }}>
              ⤴ Chart on Dexscreener
            </GlowButton>
            <button onClick={() => copy(MTG_CA)} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: isMobile ? "11px 14px" : "16px 20px",
              background: vault.panel, border: `1px dashed ${vault.arcane}66`, borderRadius: 4,
              color: vault.inkSoft, fontFamily: vault.fontMono, fontSize: isMobile ? 10 : 12,
              letterSpacing: "0.18em", cursor: "pointer",
            }}>
              <span style={{ color: vault.spellGlow }}>CA</span>
              <span>{truncCA(MTG_CA, isMobile ? 4 : 5, isMobile ? 4 : 5)}</span>
              <span style={{ color: copied ? vault.arcaneGlow : vault.arcane }}>
                {copied ? "✓" : "⎘"}
              </span>
            </button>
          </div>

          {/* Stats — live from DexScreener */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: 0, marginTop: isMobile ? 36 : 56,
            border: `1px solid ${vault.panelEdge}`, borderRadius: 4,
          }}>
            {[
              { k: "MKT CAP",  v: mtg?.marketCapLabel  || "—", sub: mtg ? mtg.change24hLabel : (loading ? "loading" : "live") },
              { k: "PRICE",    v: mtg?.priceUsdLabel   || "—", sub: mtg?.dexId?.toUpperCase() || (error ? "offline" : "···") },
              { k: "VOL 24H",  v: mtg?.volume24hLabel  || "—", sub: mtg ? `${mtg.txns24h.toLocaleString()} txns` : "—" },
              { k: "DROP 002", v: "III",                       sub: "cards sealed" },
            ].map((s, i) => {
              const last = i === 3;
              const colCount = isMobile ? 2 : 4;
              const isRightCol = ((i + 1) % colCount) === 0;
              const isBottomRow = i >= (4 - colCount);
              return (
                <div key={i} style={{
                  padding: isMobile ? "12px 14px" : "18px 20px", background: vault.panel,
                  borderRight: !isRightCol ? `1px solid ${vault.panelEdge}` : "none",
                  borderBottom: isMobile && !isBottomRow ? `1px solid ${vault.panelEdge}` : "none",
                  minWidth: 0,
                }}>
                  <div style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 10, letterSpacing: "0.3em", color: vault.inkMuted }}>{s.k}</div>
                  <div style={{
                    fontFamily: vault.fontDisplay, fontWeight: 600,
                    fontSize: isMobile ? 20 : 26, color: vault.ink, margin: "6px 0 2px",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{s.v}</div>
                  <div style={{
                    fontFamily: vault.fontBody, fontStyle: "italic", fontSize: isMobile ? 12 : 14,
                    color: i === 0 && mtg
                      ? (mtg.change24hUp ? "#86efac" : vault.ember)
                      : vault.arcaneGlow,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {s.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured card — real */}
        <div style={{ position: "relative" }}>
          <Sigil size={isMobile ? 360 : 620} color={vault.spell} opacity={0.18}
                 style={{ position: "absolute", inset: isMobile ? "-60px -40px auto auto" : "-100px -60px auto auto", zIndex: 0 }} spin />
          <div style={{ position: "relative", maxWidth: isMobile ? 280 : 420, margin: "0 auto", zIndex: 1 }}>
            <RealCard card={DROP_001[0]} size="lg" rotate={2} glow />
          </div>

          {/* Floating badge — Next draw countdown */}
          <div style={{
            position: "absolute", top: isMobile ? -14 : -20, left: isMobile ? 4 : -10, zIndex: 2,
            background: `linear-gradient(135deg, ${vault.ember}, #8b1e1e)`,
            color: "#fff", fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 11,
            letterSpacing: "0.28em", padding: isMobile ? "6px 12px" : "10px 18px",
            textTransform: "uppercase", boxShadow: `0 0 24px ${vault.ember}88`,
            transform: "rotate(-6deg)", borderRadius: 4,
            border: `1px solid ${vault.spellGlow}88`,
            whiteSpace: "nowrap",
          }}>
            ◆ Next draw · {t.h}:{t.m}:{t.s}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TICKER STRIP
// ─────────────────────────────────────────────────────────────────
function VaultTicker() {
  const items = [
    ["SYLVAN LIBRARY · CGC 8.5 · LEGENDS", "#86efac"],
    ["HELM OF CHATZUK · CGC 7 · ALPHA", vault.spellGlow],
    ["GRAY OGRE · CGC 9 · REVISED", vault.ember],
    ["DROP 002 · III CARDS LIVE", vault.spellGlow],
    ["NO TAX · NO TEAM · NO MERCY", vault.ember],
  ];
  return (
    <div style={{
      background: vault.bgDeep, color: vault.ink,
      borderTop: `1px solid ${vault.panelEdge}`, borderBottom: `1px solid ${vault.panelEdge}`,
      overflow: "hidden", padding: "12px 0", position: "relative",
    }}>
      <HexBg color={vault.arcane} opacity={0.03} />
      <div style={{
        display: "flex", gap: 48, fontFamily: vault.fontMono, fontSize: 12,
        letterSpacing: "0.36em", textTransform: "uppercase", whiteSpace: "nowrap",
        animation: "vault-ticker 42s linear infinite", position: "relative",
      }}>
        {[...items, ...items, ...items].map(([s, c], i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 18, color: c }}>
            <span>◈</span>{s}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes vault-ticker { from {transform:translateX(0)} to {transform:translateX(-33.333%)} }
        @keyframes vault-spin { from {transform:rotate(0)} to {transform:rotate(360deg)} }
        @keyframes vault-pulse { 0%, 100% {opacity:.4; transform:scale(1)} 50% {opacity:1; transform:scale(1.05)} }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  HOW
// ─────────────────────────────────────────────────────────────────
function VaultHow() {
  const { isMobile, isTablet } = useViewport();
  return (
    <section id="how" style={{
      padding: isMobile ? "60px 16px 50px" : isTablet ? "80px 40px 70px" : "120px 80px 100px",
      position: "relative",
    }}>
      <HexBg opacity={0.025} />
      <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 64, position: "relative" }}>
        <VaultEyebrow>RITE.001 · DISTRIBUTION_LOOP</VaultEyebrow>
        <h2 style={{
          fontFamily: vault.fontDisplay, fontWeight: 600,
          fontSize: isMobile ? 36 : isTablet ? 48 : 64,
          margin: "16px 0", color: vault.ink, letterSpacing: "0.01em",
        }}>
          The wheel <em style={{
            background: `linear-gradient(135deg, ${vault.arcaneGlow}, ${vault.spell})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: vault.fontBody, fontWeight: 500,
          }}>turns</em>.
        </h2>
        <p style={{
          fontFamily: vault.fontBody, fontSize: isMobile ? 16 : 20,
          color: vault.inkSoft, maxWidth: 580, margin: "0 auto",
        }}>
          Four moves. No keys, no presale, no whitelists. The chain decides.
        </p>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? 14 : 20, position: "relative",
      }}>
        {HOW_STEPS.map((step, i) => (
          <VaultPanel key={i} padding={isMobile ? 20 : 28} glow={i === 0}>
            <div style={{ position: "relative", marginBottom: 16, height: isMobile ? 64 : 90 }}>
              <Sigil size={isMobile ? 64 : 90} color={vault.arcane} opacity={0.4} style={{ position: "absolute", top: -10, right: -10 }} />
              <div style={{
                position: "absolute", left: 0, top: 0,
                fontFamily: vault.fontDisplay, fontWeight: 600,
                fontSize: isMobile ? 44 : 64,
                color: vault.spellGlow, lineHeight: 0.9, letterSpacing: "0.02em",
                textShadow: `0 0 18px ${vault.spell}66`,
              }}>{step.n}</div>
            </div>
            <div style={{
              fontFamily: vault.fontDisplay, fontWeight: 600,
              fontSize: isMobile ? 18 : 22,
              color: vault.ink, letterSpacing: "0.04em", marginBottom: 8,
            }}>{step.title}</div>
            <div style={{ width: 40, height: 1, background: vault.arcane, marginBottom: 14 }} />
            <p style={{ fontFamily: vault.fontBody, fontSize: isMobile ? 15 : 17, lineHeight: 1.5, color: vault.inkSoft, margin: 0 }}>
              {step.body}
            </p>
          </VaultPanel>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  NEXT RAFFLE
// ─────────────────────────────────────────────────────────────────
function VaultRaffle() {
  const prize = DROP_001[0];
  const isGrand = !!prize?.ultra;
  const t = useCountdown(isGrand ? ULTRA_RAFFLE_TS : NEXT_DRAW_TS);
  const { isMobile, isTablet } = useViewport();
  return (
    <section style={{ padding: isMobile ? "30px 12px 30px" : isTablet ? "40px 40px 40px" : "60px 80px 60px" }}>
      <VaultPanel padding={isMobile ? 20 : isTablet ? 36 : 56} glow style={{
        background: `radial-gradient(ellipse at 80% 50%, ${vault.arcaneDeep}66 0%, ${vault.panel} 50%, ${vault.bgDeep} 100%)`,
      }}>
        <Sigil size={isMobile ? 320 : 520} color={vault.spell} opacity={0.12} spin
               style={{ position: "absolute", top: -40, right: isMobile ? -80 : -100 }} />
        <div style={{
          position: "relative", display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
          gap: isMobile ? 32 : 64, alignItems: "center",
        }}>
          <div>
            <VaultEyebrow color={vault.spellGlow}>
              {isGrand ? "FORETELLING · GRAND PRIZE" : "FORETELLING · NEXT DRAW"}
            </VaultEyebrow>
            <h2 style={{
              fontFamily: vault.fontDisplay, fontWeight: 600,
              fontSize: isMobile ? 32 : isTablet ? 42 : 56,
              color: vault.ink, margin: "16px 0 18px", letterSpacing: "0.01em",
            }}>
              {isGrand ? (
                <>The wheel readies its <em style={{
                  background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontFamily: vault.fontBody, fontWeight: 500,
                }}>final turn</em>.</>
              ) : (
                <>The wheel rolls <em style={{
                  background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontFamily: vault.fontBody, fontWeight: 500,
                }}>every hour</em>.</>
              )}
            </h2>
            <p style={{ fontFamily: vault.fontBody, fontSize: isMobile ? 16 : 20, color: vault.inkSoft, lineHeight: 1.5, margin: "0 0 24px", maxWidth: 560 }}>
              {isGrand ? (
                <>Grand Prize: <strong style={{ color: vault.spellGlow }}>{prize.year} {prize.name}</strong>{" — "}
                {prize.set}, graded <strong style={{ color: vault.spellGlow }}>{prize.grade}</strong>,
                worth <strong style={{ color: vault.spellGlow }}>≈ {prize.valueSol} SOL</strong>. The fourth and final draw of Drop 001.</>
              ) : (
                <>Featured prize: <strong style={{ color: vault.spellGlow }}>{prize.year} {prize.name}</strong>{" — "}
                {prize.treatment}, graded <strong style={{ color: vault.spellGlow }}>{prize.grade}</strong>, from{" "}
                <em style={{ color: vault.arcaneGlow }}>{prize.set}</em>.</>
              )}
            </p>

            {/* Mechanics row */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 8 : 12,
              marginBottom: isMobile ? 20 : 28, maxWidth: 520,
            }}>
              {[
                { k: "MINIMUM BAG",  v: "1,000,000 $MTG", s: "to qualify" },
                { k: "HOLD TIME",    v: "≥ 1 HOUR",       s: "before draw" },
              ].map((m) => (
                <div key={m.k} style={{
                  padding: isMobile ? "10px 12px" : "14px 16px",
                  background: `linear-gradient(180deg, ${vault.bgDeep}, ${vault.panel})`,
                  border: `1px solid ${vault.arcane}66`, borderRadius: 4,
                  minWidth: 0,
                }}>
                  <div style={{
                    fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 10, letterSpacing: "0.3em",
                    color: vault.arcaneGlow,
                  }}>{m.k}</div>
                  <div style={{
                    fontFamily: vault.fontDisplay, fontSize: isMobile ? 15 : 20, fontWeight: 700,
                    color: vault.ink, marginTop: 4,
                  }}>{m.v}</div>
                  <div style={{
                    fontFamily: vault.fontBody, fontStyle: "italic", fontSize: isMobile ? 12 : 13,
                    color: vault.inkSoft, marginTop: 2,
                  }}>{m.s}</div>
                </div>
              ))}
            </div>

            <div style={{
              display: "flex", gap: 8, fontFamily: vault.fontMono, fontSize: isMobile ? 10 : 11,
              letterSpacing: "0.2em", color: vault.inkMuted, marginBottom: isMobile ? 20 : 28,
              alignItems: "center", flexWrap: "wrap",
            }}>
              <span>PRIZE MINT</span>
              <a href={`${COLLECTOR_CRYPT_BASE}${prize.mint}`} target="_blank" rel="noopener noreferrer" style={{
                color: vault.spark, textDecoration: "none", borderBottom: `1px dotted ${vault.spark}66`,
              }}>
                {truncCA(prize.mint, 5, 5)} ⤴
              </a>
            </div>

            <div style={{ display: "flex", gap: isMobile ? 8 : 16 }}>
              {[{ k: "HOURS", v: t.h }, { k: "MIN", v: t.m }, { k: "SEC", v: t.s }].map((c) => (
                <div key={c.k} style={{
                  background: `linear-gradient(180deg, ${vault.bgDeep}, ${vault.panel})`,
                  border: `1px solid ${vault.spell}66`,
                  borderRadius: 4,
                  padding: isMobile ? "12px 0" : "20px 28px",
                  minWidth: 0, flex: 1, textAlign: "center",
                  boxShadow: `inset 0 0 20px rgba(251,191,36,.08), 0 0 24px rgba(251,191,36,.18)`,
                }}>
                  <div style={{
                    fontFamily: vault.fontDisplay, fontWeight: 700,
                    fontSize: isMobile ? 32 : 56,
                    color: vault.spellGlow, lineHeight: 1, fontVariantNumeric: "tabular-nums",
                    textShadow: `0 0 16px ${vault.spell}88`,
                  }}>{c.v}</div>
                  <div style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 11, letterSpacing: "0.32em", color: vault.inkSoft, marginTop: isMobile ? 6 : 10 }}>
                    {c.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card */}
          <div style={{ position: "relative", maxWidth: isMobile ? 260 : 360, margin: "0 auto" }}>
            <RealCard card={prize} size="md" rotate={3} glow />
          </div>
        </div>
      </VaultPanel>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TOKEN
// ─────────────────────────────────────────────────────────────────
function VaultCandle({ c, x, w, scale, baseY }) {
  const up = c.c >= c.o;
  const fill = up ? "#86efac" : vault.ember;
  const stroke = up ? "#3b8d50" : "#8b2828";
  const bodyTop = baseY - Math.max(c.o, c.c) * scale;
  const bodyBot = baseY - Math.min(c.o, c.c) * scale;
  const wickTop = baseY - c.h * scale;
  const wickBot = baseY - c.l * scale;
  return (
    <g style={{ filter: `drop-shadow(0 0 4px ${fill}88)` }}>
      <line x1={x + w / 2} y1={wickTop} x2={x + w / 2} y2={wickBot} stroke={stroke} strokeWidth="1" />
      <rect x={x} y={bodyTop} width={w} height={Math.max(2, bodyBot - bodyTop)} fill={fill} stroke={stroke} strokeWidth="1" />
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────
//  WINNERS LEADERBOARD
// ─────────────────────────────────────────────────────────────────
function VaultWinners() {
  const { isMobile, isTablet } = useViewport();
  // Rarity → palette
  const rarityStyle = (r) => {
    const k = (r || "").toLowerCase();
    if (k === "mythic") return { color: vault.spell,    glow: vault.spell    };
    if (k === "rare")   return { color: vault.arcaneGlow, glow: vault.arcane };
    return { color: vault.inkSoft, glow: vault.panelEdge };
  };

  return (
    <section id="winners" style={{
      padding: isMobile ? "60px 16px 60px" : isTablet ? "80px 40px 80px" : "100px 80px 100px",
      position: "relative",
      borderTop: `1px solid ${vault.panelEdge}`,
      background: `linear-gradient(180deg, ${vault.bg}, ${vault.bgDeep})`,
    }}>
      <HexBg opacity={0.035} />
      <Sigil size={isMobile ? 240 : 420} color={vault.spell} opacity={0.08} spin
             style={{ position: "absolute", top: -80, left: -80 }} />

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 32 : 48, gap: isMobile ? 20 : 32, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 620 }}>
          <VaultEyebrow color={vault.spellGlow}>HALL.OF.WINNERS</VaultEyebrow>
          <h2 style={{
            fontFamily: vault.fontDisplay, fontWeight: 600,
            fontSize: isMobile ? 32 : isTablet ? 42 : 56,
            margin: "16px 0 12px", color: vault.ink, letterSpacing: "0.01em",
          }}>
            Wallets <em style={{
              background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontFamily: vault.fontBody, fontWeight: 500,
            }}>summoned</em>.
          </h2>
          <p style={{ fontFamily: vault.fontBody, fontSize: isMobile ? 15 : 19, color: vault.inkSoft, margin: 0, lineHeight: 1.5 }}>
            Every wheel-turn names a new keeper. The vault remembers them here.
          </p>
        </div>
        <div style={{
          display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end",
          fontFamily: vault.fontMono, fontSize: 11, letterSpacing: "0.22em",
          color: vault.inkMuted, textAlign: "right",
        }}>
          <div>CADENCE: 1H</div>
          <div>DRAWS TO DATE: {String(WINNERS.filter(w => w.card && w.card !== "—").length).padStart(3, "0")}</div>
          <div>STATUS: <span style={{ color: "#86efac" }}>{WINNERS.length === 0 ? "● PENDING" : "● ROLLING"}</span></div>
        </div>
      </div>

      <VaultPanel padding={0} style={{ overflow: "hidden" }}>
        {WINNERS.length === 0 ? (
          // ── Empty state: no draws yet ───────────────────────────────
          <div style={{
            padding: isMobile ? "48px 18px" : "72px 32px",
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", position: "relative",
          }}>
            <Sigil size={isMobile ? 110 : 160} color={vault.spell} opacity={0.55} spin />
            <div style={{
              fontFamily: vault.fontDisplay, fontSize: isMobile ? 22 : 28, fontWeight: 600,
              color: vault.ink, margin: "24px 0 8px", letterSpacing: "0.01em",
            }}>
              The wheel awaits its first turn.
            </div>
            <div style={{
              fontFamily: vault.fontBody, fontSize: isMobile ? 15 : 17, fontStyle: "italic",
              color: vault.inkSoft, maxWidth: 480, lineHeight: 1.5,
            }}>
              Winners are summoned every hour. The first keeper will be inscribed here.
            </div>
            <div style={{
              marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: vault.fontMono, fontSize: 11, letterSpacing: "0.3em",
              color: vault.arcaneGlow,
              border: `1px solid ${vault.arcane}66`, borderRadius: 3,
              padding: "8px 16px",
              background: `linear-gradient(180deg, ${vault.panel}, ${vault.bgDeep})`,
            }}>
              <span style={{
                display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                background: "#86efac", boxShadow: "0 0 10px #86efac",
                animation: "vault-pulse 2s ease-in-out infinite",
              }} />
              FIRST DRAW PENDING
            </div>
          </div>
        ) : (
          <>
            {/* Header row — hidden on mobile (stacked cards instead) */}
            {!isMobile && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "80px 1.2fr 1.6fr 1fr 1fr 90px",
                padding: "14px 24px",
                background: vault.bgDeep,
                borderBottom: `1px solid ${vault.panelEdge}`,
                fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.3em",
                color: vault.inkMuted, textTransform: "uppercase",
                alignItems: "center",
              }}>
                <span>№</span>
                <span>Wallet</span>
                <span>Card</span>
                <span>Grade</span>
                <span>When</span>
                <span style={{ textAlign: "right" }}>Proof</span>
              </div>
            )}

            {WINNERS.map((w, i) => {
              const isPending = !w.card || w.card === "—";
              const rs = rarityStyle(w.rarity);
              const isFeatured = i === 0 && !isPending;
              const walletShort = truncCA(w.wallet, isMobile ? 4 : 6, isMobile ? 4 : 6);
              const proofEl = isPending ? (
                <span style={{
                  fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.28em",
                  color: vault.inkMuted,
                }}>—</span>
              ) : w.txUrl ? (
                <a href={w.txUrl} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.28em",
                  color: rs.color, border: `1px solid ${rs.color}66`, borderRadius: 3,
                  padding: "4px 8px", textDecoration: "none",
                  boxShadow: `0 0 12px ${rs.glow}33`,
                  whiteSpace: "nowrap",
                }}>TX ↗</a>
              ) : (
                <span style={{
                  fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.28em",
                  color: rs.color, border: `1px solid ${rs.color}66`, borderRadius: 3,
                  padding: "4px 8px", cursor: "default",
                }}>TX ↗</span>
              );

              if (isMobile) {
                return (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr auto",
                    columnGap: 12, rowGap: 6,
                    padding: "16px 14px",
                    borderBottom: i < WINNERS.length - 1 ? `1px solid ${vault.panelEdge}` : "none",
                    background: isFeatured
                      ? `linear-gradient(90deg, ${vault.spell}11 0%, transparent 60%)`
                      : "transparent",
                    alignItems: "center",
                  }}>
                    <div style={{
                      fontFamily: vault.fontDisplay, fontSize: 20, fontWeight: 700,
                      color: isFeatured ? vault.spellGlow : vault.inkSoft,
                      textShadow: isFeatured ? `0 0 12px ${vault.spell}66` : "none",
                      letterSpacing: "0.02em",
                    }}>
                      {String(WINNERS.length - i).padStart(2, "0")}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", flex: "0 0 auto",
                        background: `linear-gradient(135deg, ${rs.color}, ${vault.arcaneDeep})`,
                        border: `1px solid ${rs.color}88`,
                        boxShadow: `0 0 10px ${rs.glow}66`,
                      }} />
                      <span style={{
                        fontFamily: vault.fontMono, fontSize: 12, color: vault.ink,
                        letterSpacing: "0.04em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{walletShort}</span>
                    </div>
                    <div>{proofEl}</div>

                    <div />
                    <div style={{ gridColumn: "2 / 4" }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
                        fontFamily: vault.fontDisplay, fontSize: 16, fontWeight: 600,
                        color: isPending ? vault.inkMuted : vault.ink, letterSpacing: "0.01em",
                      }}>
                        <span>{isPending ? "Awaiting draw" : w.card}</span>
                        {w.ultra && (
                          <span style={{
                            fontFamily: vault.fontMono, fontSize: 9, fontWeight: 700,
                            letterSpacing: "0.28em", textTransform: "uppercase",
                            background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
                            color: vault.bgDeep,
                            padding: "3px 7px", borderRadius: 3,
                            border: `1px solid ${vault.spellGlow}`,
                            boxShadow: `0 0 12px ${vault.spell}88`,
                            whiteSpace: "nowrap",
                          }}>
                            ◆ Grand{w.valueSol ? ` · ${w.valueSol} SOL` : ""}
                          </span>
                        )}
                      </div>
                      {!isPending && (
                        <div style={{
                          fontFamily: vault.fontBody, fontStyle: "italic", fontSize: 12,
                          color: rs.color, marginTop: 2,
                        }}>{w.rarity}</div>
                      )}
                      <div style={{
                        marginTop: 6, display: "flex", gap: 12, flexWrap: "wrap",
                        fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.18em",
                        color: vault.inkSoft,
                      }}>
                        <span style={{ color: isPending ? vault.inkMuted : vault.spellGlow }}>{w.grade}</span>
                        <span style={{
                          fontFamily: vault.fontBody, fontStyle: "italic", fontSize: 12,
                          letterSpacing: 0, color: isPending ? vault.inkMuted : vault.inkSoft,
                        }}>{w.when}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1.2fr 1.6fr 1fr 1fr 90px",
                  padding: "18px 24px",
                  borderBottom: i < WINNERS.length - 1 ? `1px solid ${vault.panelEdge}` : "none",
                  background: isFeatured
                    ? `linear-gradient(90deg, ${vault.spell}11 0%, transparent 60%)`
                    : "transparent",
                  fontFamily: vault.fontDisplay,
                  alignItems: "center",
                  transition: "background .2s",
                }}>
                  <div style={{
                    fontFamily: vault.fontDisplay, fontSize: 22, fontWeight: 700,
                    color: isFeatured ? vault.spellGlow : vault.inkSoft,
                    textShadow: isFeatured ? `0 0 12px ${vault.spell}66` : "none",
                    letterSpacing: "0.02em",
                  }}>
                    {String(WINNERS.length - i).padStart(2, "0")}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flex: "0 0 auto",
                      background: `linear-gradient(135deg, ${rs.color}, ${vault.arcaneDeep})`,
                      border: `1px solid ${rs.color}88`,
                      boxShadow: `0 0 12px ${rs.glow}66`,
                    }} />
                    <span title={w.wallet} style={{
                      fontFamily: vault.fontMono, fontSize: 14, color: vault.ink,
                      letterSpacing: "0.06em",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{walletShort}</span>
                  </div>
                  <div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                      fontFamily: vault.fontDisplay, fontSize: 17, fontWeight: 600,
                      color: isPending ? vault.inkMuted : vault.ink, letterSpacing: "0.01em",
                    }}>
                      <span>{isPending ? "Awaiting draw" : w.card}</span>
                      {w.ultra && (
                        <span style={{
                          fontFamily: vault.fontMono, fontSize: 10, fontWeight: 700,
                          letterSpacing: "0.3em", textTransform: "uppercase",
                          background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
                          color: vault.bgDeep,
                          padding: "4px 9px", borderRadius: 3,
                          border: `1px solid ${vault.spellGlow}`,
                          boxShadow: `0 0 14px ${vault.spell}88`,
                          whiteSpace: "nowrap",
                        }}>
                          ◆ Grand Prize{w.valueSol ? ` · ${w.valueSol} SOL` : ""}
                        </span>
                      )}
                    </div>
                    {!isPending && (
                      <div style={{
                        fontFamily: vault.fontBody, fontStyle: "italic", fontSize: 13,
                        color: rs.color, marginTop: 2,
                      }}>{w.rarity}{w.set ? ` · ${w.set}` : ""}</div>
                    )}
                  </div>
                  <div style={{
                    fontFamily: vault.fontMono, fontSize: 12, color: isPending ? vault.inkMuted : vault.spellGlow,
                    letterSpacing: "0.18em",
                  }}>
                    {w.grade}
                  </div>
                  <div style={{
                    fontFamily: vault.fontBody, fontStyle: "italic", fontSize: 15,
                    color: isPending ? vault.inkMuted : vault.inkSoft,
                  }}>
                    {w.when}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {proofEl}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </VaultPanel>
    </section>
  );
}

function VaultToken() {
  const [amt, setAmt] = React.useState("0.5");
  const { loading, error, mtg } = useDexScreener(MTG_CA);
  const { isMobile, isTablet } = useViewport();

  const priceUsd = mtg?.priceUsd || 0;
  const usd = parseFloat(amt) || 0;
  const tokens = priceUsd > 0 && usd > 0 ? usd / priceUsd : 0;
  const entries = Math.floor(tokens / 1000);

  const embedUrl = mtg?.pairAddress
    ? `https://dexscreener.com/solana/${mtg.pairAddress}?embed=1&theme=dark&trades=0&info=0`
    : null;

  return (
    <section id="token" style={{
      padding: isMobile ? "60px 16px 60px" : isTablet ? "70px 40px 80px" : "80px 80px 100px",
      position: "relative",
      borderTop: `1px solid ${vault.panelEdge}`, borderBottom: `1px solid ${vault.panelEdge}`,
      background: `linear-gradient(180deg, ${vault.bgDeep}, ${vault.bg})`,
    }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}>
        <VaultEyebrow>RITE.002 · COIN.LEDGER · LIVE</VaultEyebrow>
        <h2 style={{
          fontFamily: vault.fontDisplay, fontWeight: 600,
          fontSize: isMobile ? 32 : isTablet ? 42 : 56,
          margin: "16px 0", color: vault.ink, letterSpacing: "0.01em",
        }}>
          $MTG <em style={{
            background: `linear-gradient(135deg, ${vault.arcaneGlow}, ${vault.spark})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: vault.fontBody, fontWeight: 500,
          }}>on chain</em>
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.55fr 1fr",
        gap: isMobile ? 16 : 24,
      }}>
        <VaultPanel padding={0} style={{ overflow: "hidden" }}>
          {/* Header strip above chart */}
          <div style={{
            padding: "20px 24px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            borderBottom: `1px solid ${vault.panelEdge}`,
            gap: 24, flexWrap: "wrap",
          }}>
            <div>
              <div style={{
                fontFamily: vault.fontMono, fontSize: 11, letterSpacing: "0.32em",
                color: vault.inkMuted, display: "inline-flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                  background: error ? vault.ember : "#86efac",
                  boxShadow: error ? "none" : "0 0 10px #86efac",
                  animation: !error && !loading ? "vault-pulse 2s ease-in-out infinite" : undefined,
                }} />
                {error ? "DEXSCREENER · UNREACHABLE" : loading ? "DEXSCREENER · LOADING…" : `LIVE · ${mtg?.dexId?.toUpperCase() || "PUMP.FUN"}`}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: isMobile ? 26 : 38, color: vault.ink }}>
                  {mtg?.priceUsdLabel || "—"}
                </span>
                {mtg && (
                  <span style={{
                    fontFamily: vault.fontBody, fontStyle: "italic", fontSize: isMobile ? 14 : 18,
                    color: mtg.change24hUp ? "#86efac" : vault.ember,
                  }}>
                    {mtg.change24hUp ? "▲" : "▼"} {mtg.change24hLabel}
                  </span>
                )}
              </div>
            </div>
            <a
              href={DEXSCREENER_URL} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: vault.fontMono, fontSize: 11, letterSpacing: "0.22em",
                color: vault.spark, textDecoration: "none",
                border: `1px solid ${vault.spark}66`, borderRadius: 3,
                padding: "8px 14px",
              }}>
              OPEN ON DEXSCREENER ↗
            </a>
          </div>

          {/* Live chart embed */}
          <div style={{
            position: "relative", width: "100%",
            aspectRatio: isMobile ? "4/3" : "16/9",
            background: vault.bgDeep,
          }}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="DexScreener live chart"
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  border: 0, background: vault.bgDeep,
                }}
                loading="lazy"
                allow="clipboard-write"
              />
            ) : (
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                color: vault.inkMuted, fontFamily: vault.fontMono, fontSize: 12,
                letterSpacing: "0.3em", textAlign: "center", padding: 24,
              }}>
                {error
                  ? `CHART OFFLINE · ${error.toUpperCase()} · OPEN ON DEXSCREENER ↗`
                  : "SUMMONING CHART…"}
              </div>
            )}
          </div>

          {/* Stats footer */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            borderTop: `1px solid ${vault.panelEdge}`,
          }}>
            {[
              ["MKT CAP",   mtg?.marketCapLabel || "—"],
              ["LIQUIDITY", mtg?.liquidityLabel || "—"],
              ["VOL 24H",   mtg?.volume24hLabel || "—"],
              ["TXNS 24H",  mtg ? mtg.txns24h.toLocaleString() : "—"],
            ].map(([k, v], i) => {
              const colCount = isMobile ? 2 : 4;
              const isRightCol = ((i + 1) % colCount) === 0;
              const isBottomRow = i >= (4 - colCount);
              return (
                <div key={k} style={{
                  padding: isMobile ? "12px 14px" : "16px 20px",
                  borderRight: !isRightCol ? `1px solid ${vault.panelEdge}` : "none",
                  borderBottom: isMobile && !isBottomRow ? `1px solid ${vault.panelEdge}` : "none",
                  minWidth: 0,
                }}>
                  <div style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 10, letterSpacing: "0.28em", color: vault.inkMuted }}>{k}</div>
                  <div style={{
                    fontFamily: vault.fontDisplay, fontWeight: 600,
                    fontSize: isMobile ? 17 : 22, color: vault.ink, marginTop: 4,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{v}</div>
                </div>
              );
            })}
          </div>
        </VaultPanel>

        <VaultPanel padding={isMobile ? 18 : 28} glow>
          <VaultEyebrow color={vault.spellGlow}>SUMMON.COIN</VaultEyebrow>
          <div style={{
            fontFamily: vault.fontDisplay, fontWeight: 600, fontSize: isMobile ? 22 : 26,
            margin: "12px 0 20px", color: vault.ink,
          }}>
            Mint thy bag.
          </div>
          <div style={{
            border: `1px solid ${vault.panelEdge}`, borderRadius: 4, padding: "14px 16px",
            background: vault.bgDeep, marginBottom: 6,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.3em", color: vault.inkMuted, marginBottom: 8 }}>
              <span>YOU PAY</span><span>USD</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                value={amt}
                onChange={(e) => setAmt(e.target.value.replace(/[^0-9.]/g, ""))}
                inputMode="decimal"
                style={{
                  flex: 1, minWidth: 0, width: "100%",
                  background: "transparent", border: "none", outline: "none",
                  fontFamily: vault.fontDisplay, fontWeight: 600,
                  fontSize: isMobile ? 24 : 30, color: vault.ink,
                  fontVariantNumeric: "tabular-nums",
                }}
              />
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: vault.panel, padding: "8px 14px", borderRadius: 999,
                border: `1px solid ${vault.panelEdge}`,
              }}>
                <span style={{ fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: 14, color: vault.ink }}>USD</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", margin: "4px 0", color: vault.arcane, fontSize: 18 }}>↓</div>
          <div style={{
            border: `1px solid ${vault.arcane}88`, borderRadius: 4, padding: "14px 16px",
            background: `linear-gradient(180deg, ${vault.bgDeep}, ${vault.panel})`, marginBottom: 16,
            boxShadow: `inset 0 0 20px rgba(183,148,244,.08)`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.3em", color: vault.inkMuted, marginBottom: 8 }}>
              <span style={{ color: vault.arcaneGlow }}>YOU RECEIVE</span>
              <span>{loading ? "FETCHING…" : `@ ${mtg?.priceUsdLabel || "—"}`}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                flex: 1, minWidth: 0,
                fontFamily: vault.fontDisplay, fontWeight: 600,
                fontSize: isMobile ? 22 : 30,
                color: vault.spellGlow, fontVariantNumeric: "tabular-nums",
                textShadow: `0 0 16px ${vault.spell}55`,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {tokens > 0
                  ? tokens.toLocaleString(undefined, { maximumFractionDigits: 0 })
                  : "—"}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: vault.panel, padding: "8px 14px", borderRadius: 999,
                border: `1px solid ${vault.arcane}`,
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: `radial-gradient(circle at 30% 25%, ${vault.spellGlow}, ${vault.spell}, ${vault.arcaneDeep})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: 11, color: vault.bgDeep,
                }}>𝕄</div>
                <span style={{ fontFamily: vault.fontDisplay, fontWeight: 600, fontSize: 14, color: vault.ink }}>MTG</span>
              </div>
            </div>
          </div>
          <div style={{
            background: `linear-gradient(135deg, ${vault.arcaneDeep}, ${vault.panel})`,
            border: `1px solid ${vault.arcane}`,
            color: vault.ink, borderRadius: 4,
            padding: "14px 16px", marginBottom: 18, display: "flex",
            alignItems: "center", justifyContent: "space-between",
            boxShadow: `inset 0 0 20px rgba(183,148,244,.18)`,
          }}>
            <div>
              <div style={{ fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.3em", color: vault.arcaneGlow }}>RAFFLE ENTRIES</div>
              <div style={{ fontFamily: vault.fontDisplay, fontSize: isMobile ? 19 : 24, fontWeight: 700, marginTop: 4 }}>
                {entries.toLocaleString()}{" "}
                <span style={{ fontFamily: vault.fontBody, fontWeight: 400, fontSize: 14, fontStyle: "italic", color: vault.arcaneGlow }}>
                  tickets
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <VManaPip kind="W" size={18} /><VManaPip kind="U" size={18} /><VManaPip kind="B" size={18} />
              <VManaPip kind="R" size={18} /><VManaPip kind="G" size={18} />
            </div>
          </div>
          <GlowButton href={PUMPFUN_URL} style={{ width: "100%", justifyContent: "center" }}>
            ◈ Cast → Pump.Fun
          </GlowButton>
          <div style={{
            fontFamily: vault.fontBody, fontStyle: "italic", fontSize: 13, color: vault.inkMuted,
            textAlign: "center", marginTop: 12,
          }}>
            "Live price from DexScreener · 1,000 $MTG = 1 ticket."
          </div>
        </VaultPanel>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  VAULT GRID — Drop 001 (3 real cards from Collector Crypt)
// ─────────────────────────────────────────────────────────────────
function VaultDropCard({ card, idx }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Index badge */}
      <div style={{
        position: "absolute", top: -14, left: -14, zIndex: 2,
        background: `linear-gradient(135deg, ${vault.arcane}, ${vault.arcaneDeep})`,
        border: `1px solid ${vault.arcaneGlow}`,
        padding: "6px 14px", borderRadius: 4,
        boxShadow: `0 0 16px ${vault.arcane}88`,
        color: "#fff", fontFamily: vault.fontMono, fontSize: 11,
        fontWeight: 700, letterSpacing: "0.28em",
      }}>
        DROP 002 · {String(idx + 1).padStart(2, "0")}
      </div>

      {/* Card */}
      <a href={`${COLLECTOR_CRYPT_BASE}${card.mint}`} target="_blank" rel="noopener noreferrer"
         style={{ textDecoration: "none", display: "block", transition: "transform .2s" }}
         onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; }}
         onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}>
        <RealCard card={card} size="md" glow={false} />
      </a>

      {/* Meta panel below */}
      <div style={{
        padding: "16px 18px",
        background: `linear-gradient(180deg, ${vault.panel}, ${vault.bgDeep})`,
        border: `1px solid ${vault.panelEdge}`, borderRadius: 6,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
          <span style={{
            fontFamily: vault.fontDisplay, fontSize: 18, fontWeight: 700,
            color: vault.ink, letterSpacing: "0.01em",
          }}>{card.name}</span>
          <span style={{
            fontFamily: vault.fontMono, fontSize: 11, color: card.accent,
            letterSpacing: "0.2em",
          }}>{card.grade}</span>
        </div>
        <div style={{
          fontFamily: vault.fontBody, fontSize: 15, fontStyle: "italic",
          color: vault.inkSoft, marginBottom: 12,
        }}>
          {card.year} · {card.set} · {card.treatment}
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 10, borderTop: `1px solid ${vault.panelEdge}`,
        }}>
          <span style={{
            fontFamily: vault.fontMono, fontSize: 10, color: vault.inkMuted,
            letterSpacing: "0.22em",
          }}>
            MINT · {truncCA(card.mint, 4, 4)}
          </span>
          <a href={`${COLLECTOR_CRYPT_BASE}${card.mint}`} target="_blank" rel="noopener noreferrer"
             style={{
               fontFamily: vault.fontMono, fontSize: 11, color: card.accent,
               textDecoration: "none", letterSpacing: "0.22em",
             }}>
            VIEW ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function UltraRaffleSpotlight({ card }) {
  const { isMobile, isTablet } = useViewport();
  const t = useCountdown(ULTRA_RAFFLE_TS);
  return (
    <div style={{
      position: "relative",
      marginBottom: isMobile ? 36 : 56,
      padding: isMobile ? 18 : isTablet ? 32 : 48,
      background: `
        radial-gradient(ellipse at 85% 15%, ${vault.spell}33 0%, transparent 60%),
        radial-gradient(ellipse at 15% 85%, ${vault.arcaneDeep}66 0%, transparent 55%),
        linear-gradient(135deg, ${vault.panel}, ${vault.bgDeep})
      `,
      border: `1px solid ${vault.spell}66`,
      borderRadius: 6,
      boxShadow: `
        inset 0 0 0 1px ${vault.spellGlow}22,
        inset 0 0 80px rgba(251,191,36,.08),
        0 0 40px rgba(251,191,36,.18)
      `,
      overflow: "hidden",
    }}>
      <Sigil size={isMobile ? 360 : 560} color={vault.spell} opacity={0.18} spin
             style={{ position: "absolute", top: -120, right: -160, pointerEvents: "none" }} />
      <Sigil size={isMobile ? 220 : 320} color={vault.spell} opacity={0.1}
             style={{ position: "absolute", bottom: -100, left: -80, pointerEvents: "none" }} />
      {["tl", "tr", "bl", "br"].map((p) => (
        <div key={p} style={{
          position: "absolute", width: 16, height: 16,
          borderColor: vault.spellGlow, borderStyle: "solid",
          ...(p === "tl" ? { top: -1, left: -1, borderWidth: "2px 0 0 2px" } :
              p === "tr" ? { top: -1, right: -1, borderWidth: "2px 2px 0 0" } :
              p === "bl" ? { bottom: -1, left: -1, borderWidth: "0 0 2px 2px" } :
                            { bottom: -1, right: -1, borderWidth: "0 2px 2px 0" }),
        }} />
      ))}
      {/* Floating ULTRA-RAFFLE ribbon */}
      <div style={{
        position: "absolute",
        top: isMobile ? 14 : 22, left: isMobile ? 14 : 22, zIndex: 3,
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: isMobile ? "6px 12px" : "8px 18px",
        background: `linear-gradient(135deg, ${vault.spell}, ${vault.ember})`,
        color: vault.bgDeep,
        fontFamily: vault.fontMono, fontSize: isMobile ? 10 : 12,
        fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase",
        borderRadius: 3,
        border: `1px solid ${vault.spellGlow}`,
        boxShadow: `0 0 24px ${vault.spell}88, inset 0 1px 0 rgba(255,255,255,.4)`,
      }}>
        ◈ Ultra-Raffle · Raffle IV
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 28 : 48,
        alignItems: "center",
        marginTop: isMobile ? 44 : 56,
      }}>
        <div>
          <VaultEyebrow color={vault.spellGlow}>RAFFLE.IV · VINTAGE.UNBROKEN</VaultEyebrow>
          <h3 style={{
            fontFamily: vault.fontDisplay, fontWeight: 600,
            fontSize: isMobile ? 30 : isTablet ? 38 : 46,
            margin: "14px 0 14px", color: vault.ink, letterSpacing: "0.01em",
            lineHeight: 1.05,
          }}>
            The fourth draw <em style={{
              background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontFamily: vault.fontBody, fontWeight: 500,
            }}>shatters the wheel.</em>
          </h3>
          <p style={{
            fontFamily: vault.fontBody, fontSize: isMobile ? 16 : 19,
            color: vault.inkSoft, lineHeight: 1.5, margin: "0 0 22px", maxWidth: 520,
          }}>
            <strong style={{ color: vault.spellGlow }}>{card.year} {card.name}</strong> — {card.set},
            graded <strong style={{ color: vault.spellGlow }}>{card.grade}</strong>. Held by Collector Crypt.
            Worth <strong style={{ color: vault.spellGlow }}>≈ {card.valueSol} SOL</strong> and bound to the{" "}
            <em style={{ color: vault.spell }}>fourth cycle</em> of $MTG — the rarest draw on the wheel.
          </p>

          {/* VALUE band — the headline number */}
          <div style={{
            position: "relative",
            marginBottom: isMobile ? 14 : 18, maxWidth: 520,
            padding: isMobile ? "14px 16px" : "18px 22px",
            background: `linear-gradient(135deg, ${vault.spell}22, ${vault.arcaneDeep}33, ${vault.bgDeep})`,
            border: `1px solid ${vault.spellGlow}`,
            borderRadius: 4,
            boxShadow: `inset 0 0 30px rgba(251,191,36,.15), 0 0 30px rgba(251,191,36,.25)`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 16,
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 10, letterSpacing: "0.34em",
                color: vault.spellGlow, textTransform: "uppercase",
              }}>
                Prize Value · Ultra-Raffle
              </div>
              <div style={{
                fontFamily: vault.fontDisplay, fontWeight: 700,
                fontSize: isMobile ? 32 : 44, lineHeight: 1,
                marginTop: 6,
                background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `0 0 24px ${vault.spell}66`,
                letterSpacing: "0.02em",
              }}>
                ≈ {card.valueSol} SOL
              </div>
            </div>
            <div style={{
              flex: "0 0 auto", textAlign: "right",
              fontFamily: vault.fontBody, fontStyle: "italic",
              fontSize: isMobile ? 12 : 14, color: vault.inkSoft,
              lineHeight: 1.4, maxWidth: 160,
            }}>
              vintage,<br/>encapsulated,<br/>irreplaceable
            </div>
          </div>

          {/* Countdown to the Grand Prize */}
          <div style={{
            display: "flex", gap: isMobile ? 8 : 12,
            marginBottom: isMobile ? 18 : 24, maxWidth: 520,
          }}>
            {[{ k: "HRS", v: t.h }, { k: "MIN", v: t.m }, { k: "SEC", v: t.s }].map((c) => (
              <div key={c.k} style={{
                background: `linear-gradient(180deg, ${vault.bgDeep}, ${vault.panel})`,
                border: `1px solid ${vault.spell}88`,
                borderRadius: 4,
                padding: isMobile ? "10px 0" : "14px 0",
                minWidth: 0, flex: 1, textAlign: "center",
                boxShadow: `inset 0 0 18px rgba(251,191,36,.12), 0 0 22px rgba(251,191,36,.22)`,
              }}>
                <div style={{
                  fontFamily: vault.fontDisplay, fontWeight: 700,
                  fontSize: isMobile ? 28 : 40,
                  color: vault.spellGlow, lineHeight: 1, fontVariantNumeric: "tabular-nums",
                  textShadow: `0 0 16px ${vault.spell}aa`,
                }}>{c.v}</div>
                <div style={{
                  fontFamily: vault.fontMono, fontSize: isMobile ? 8 : 10,
                  letterSpacing: "0.32em", color: vault.spellGlow, marginTop: 6,
                }}>{c.k}</div>
              </div>
            ))}
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 8 : 12,
            marginBottom: isMobile ? 20 : 28, maxWidth: 520,
          }}>
            {[
              { k: "ERA",     v: "VINTAGE",        s: "1993 · CE" },
              { k: "GRADE",   v: card.grade,       s: "encapsulated" },
            ].map((m) => (
              <div key={m.k} style={{
                padding: isMobile ? "10px 12px" : "14px 16px",
                background: `linear-gradient(180deg, ${vault.bgDeep}, ${vault.panel})`,
                border: `1px solid ${vault.spell}66`, borderRadius: 4,
                minWidth: 0,
              }}>
                <div style={{
                  fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 10, letterSpacing: "0.3em",
                  color: vault.spellGlow,
                }}>{m.k}</div>
                <div style={{
                  fontFamily: vault.fontDisplay, fontSize: isMobile ? 15 : 19, fontWeight: 700,
                  color: vault.ink, marginTop: 4,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{m.v}</div>
                <div style={{
                  fontFamily: vault.fontBody, fontStyle: "italic", fontSize: isMobile ? 12 : 13,
                  color: vault.inkSoft, marginTop: 2,
                }}>{m.s}</div>
              </div>
            ))}
          </div>

          <div style={{
            display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap",
            fontFamily: vault.fontMono, fontSize: isMobile ? 10 : 11,
            letterSpacing: "0.2em", color: vault.inkMuted,
          }}>
            <span>PRIZE MINT</span>
            <a href={`${COLLECTOR_CRYPT_BASE}${card.mint}`} target="_blank" rel="noopener noreferrer" style={{
              color: vault.spellGlow, textDecoration: "none",
              borderBottom: `1px dotted ${vault.spellGlow}66`,
            }}>
              {truncCA(card.mint, 5, 5)} ⤴
            </a>
          </div>
        </div>

        <div style={{ position: "relative", maxWidth: isMobile ? 300 : 380, margin: "0 auto", width: "100%" }}>
          <a href={`${COLLECTOR_CRYPT_BASE}${card.mint}`} target="_blank" rel="noopener noreferrer"
             style={{ textDecoration: "none", display: "block" }}>
            <RealCard card={card} size="lg" rotate={-3} glow />
          </a>
          {/* Floating value chip */}
          <div style={{
            position: "absolute",
            top: isMobile ? -14 : -22,
            right: isMobile ? -6 : -14,
            zIndex: 2,
            background: `linear-gradient(135deg, ${vault.spellGlow}, ${vault.spell})`,
            color: vault.bgDeep,
            fontFamily: vault.fontDisplay, fontWeight: 700,
            fontSize: isMobile ? 14 : 18,
            letterSpacing: "0.06em",
            padding: isMobile ? "8px 14px" : "10px 18px",
            borderRadius: 999,
            border: `1px solid ${vault.spellGlow}`,
            boxShadow: `0 0 30px ${vault.spell}aa, inset 0 1px 0 rgba(255,255,255,.5)`,
            transform: "rotate(6deg)",
            whiteSpace: "nowrap",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 9 : 10, letterSpacing: "0.28em" }}>WORTH</span>
            ≈ {card.valueSol} SOL
          </div>
        </div>
      </div>
    </div>
  );
}

function VaultGrid() {
  const { isMobile, isTablet } = useViewport();
  const ultraCards = DROP_001.filter((c) => c.ultra);
  const standardCards = DROP_001.filter((c) => !c.ultra);
  return (
    <section id="vault" style={{
      padding: isMobile ? "60px 16px 60px" : isTablet ? "80px 40px 70px" : "120px 80px 100px",
      position: "relative",
    }}>
      <HexBg opacity={0.03} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 32 : 56, gap: isMobile ? 16 : 32, flexWrap: "wrap" }}>
        <div style={{ maxWidth: 620 }}>
          <VaultEyebrow>RITE.003 · DROP.002 · LIVE</VaultEyebrow>
          <h2 style={{
            fontFamily: vault.fontDisplay, fontWeight: 600,
            fontSize: isMobile ? 32 : isTablet ? 42 : 56,
            margin: "16px 0 12px", color: vault.ink, letterSpacing: "0.01em",
          }}>
            Three cards. <em style={{
              background: `linear-gradient(135deg, ${vault.arcaneGlow}, ${vault.spell})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontFamily: vault.fontBody, fontWeight: 500,
            }}>One wheel.</em>
          </h2>
          <p style={{ fontFamily: vault.fontBody, fontSize: isMobile ? 15 : 19, color: vault.inkSoft, margin: 0, lineHeight: 1.5 }}>
            Drop 002 — sealed in custody by <span style={{ color: vault.spellGlow }}>Collector Crypt</span>, graded, and bound to
            the next three cycles of $MTG. <span style={{ color: vault.spellGlow }}>Sylvan Library</span> draws first. Click any card to inspect the on-chain asset.
          </p>
        </div>
        <div style={{
          display: "flex", flexDirection: "column", gap: 6,
          alignItems: isMobile ? "flex-start" : "flex-end",
          fontFamily: vault.fontMono, fontSize: isMobile ? 10 : 11, letterSpacing: "0.22em",
          color: vault.inkMuted, textAlign: isMobile ? "left" : "right",
        }}>
          <div>CUSTODY: COLLECTOR CRYPT</div>
          <div>CHAIN: SOLANA</div>
          <div>STATUS: <span style={{ color: "#86efac" }}>● SEALED</span></div>
        </div>
      </div>

      {ultraCards.map((c) => <UltraRaffleSpotlight key={c.id} card={c} />)}

      <div style={{
        position: "relative", display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        gap: isMobile ? 28 : 40, paddingTop: 18,
      }}>
        {standardCards.map((c, i) => <VaultDropCard key={c.id} card={c} idx={i} />)}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────────────────────────
function VaultFaq() {
  const [open, setOpen] = React.useState(0);
  const { isMobile, isTablet } = useViewport();
  return (
    <section id="faq" style={{
      padding: isMobile ? "60px 16px 60px" : isTablet ? "80px 40px 80px" : "100px 80px 100px",
      position: "relative",
      background: `linear-gradient(180deg, ${vault.bg} 0%, ${vault.bgDeep} 100%)`,
    }}>
      <div style={{ textAlign: "center", marginBottom: isMobile ? 32 : 56 }}>
        <VaultEyebrow>CODEX.APOCRYPHA</VaultEyebrow>
        <h2 style={{
          fontFamily: vault.fontDisplay, fontWeight: 600,
          fontSize: isMobile ? 32 : isTablet ? 42 : 56,
          margin: "16px 0", color: vault.ink, letterSpacing: "0.01em",
        }}>
          Questions <em style={{
            background: `linear-gradient(135deg, ${vault.arcaneGlow}, ${vault.spell})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: vault.fontBody, fontWeight: 500,
          }}>oft asked</em>
        </h2>
      </div>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              borderTop: `1px solid ${vault.panelEdge}`,
              borderBottom: i === FAQ_ITEMS.length - 1 ? `1px solid ${vault.panelEdge}` : "none",
              background: isOpen ? `linear-gradient(180deg, ${vault.panel}88, transparent)` : "transparent",
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "transparent", border: "none",
                padding: isMobile ? "18px 6px" : "24px 14px",
                cursor: "pointer", textAlign: "left", gap: 12,
              }}>
                <span style={{
                  fontFamily: vault.fontDisplay,
                  fontSize: isMobile ? 16 : 22,
                  fontWeight: 600, color: vault.ink,
                  display: "flex", alignItems: "baseline", gap: isMobile ? 8 : 14, flexWrap: "wrap",
                }}>
                  <span style={{ color: vault.arcane, fontFamily: vault.fontMono, fontSize: isMobile ? 11 : 14, fontWeight: 400 }}>
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <span>{item.q}</span>
                </span>
                <span style={{
                  color: vault.arcane, fontSize: isMobile ? 22 : 26,
                  transition: "transform .25s",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                  flex: "0 0 auto",
                }}>＋</span>
              </button>
              {isOpen && (
                <div style={{
                  padding: isMobile ? "0 6px 18px 26px" : "0 14px 24px 60px",
                  fontFamily: vault.fontBody,
                  fontSize: isMobile ? 15 : 18,
                  color: vault.inkSoft, lineHeight: 1.55,
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
function VaultFooter() {
  const [copied, copy] = useCopy();
  const { isMobile, isTablet } = useViewport();
  return (
    <footer style={{
      background: vault.bgDeep, color: vault.ink,
      padding: isMobile ? "40px 16px 28px" : isTablet ? "56px 40px 32px" : "70px 80px 40px",
      borderTop: `1px solid ${vault.panelEdge}`,
      position: "relative",
    }}>
      <HexBg opacity={0.04} />
      <div style={{
        position: "relative", display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr 1fr" : "1.5fr 1fr 1fr 1fr",
        gap: isMobile ? 24 : 48,
        marginBottom: isMobile ? 32 : 48,
      }}>
        <div style={{ gridColumn: isMobile ? "1 / -1" : isTablet ? "1 / -1" : "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{
              position: "relative", width: 46, height: 46,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sigil size={46} color={vault.arcane} opacity={0.85} style={{ position: "absolute", inset: 0 }} />
              <span style={{
                position: "relative", color: vault.spellGlow,
                fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: 18,
                textShadow: `0 0 8px ${vault.spell}`,
              }}>𝕄</span>
            </div>
            <div>
              <div style={{ fontFamily: vault.fontDisplay, fontWeight: 700, fontSize: 17, letterSpacing: "0.28em", color: vault.ink }}>
                MTG DISTRI
              </div>
              <div style={{ fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.3em", color: vault.inkMuted }}>
                VAULT.RITE / v0.2.6
              </div>
            </div>
          </div>
          <p style={{ fontFamily: vault.fontBody, fontSize: isMobile ? 15 : 17, lineHeight: 1.5, color: vault.inkSoft, maxWidth: 400 }}>
            A community distribution rite for vaulted Magic: The Gathering cards, indexed to the bonding curve of $MTG on Pump.Fun.
          </p>
        </div>
        {[
          { h: "Site", items: ["The Rite", "$MTG", "Vault", "Codex"] },
          { h: "Custody", items: ["Collector Crypt ⤴", "Vault audits", "On-chain mint", "Insurance"] },
          { h: "Markets", items: ["Pump.Fun ⤴", "Dexscreener ⤴", "X / Twitter", "Telegram"] },
        ].map((col) => (
          <div key={col.h}>
            <div style={{ fontFamily: vault.fontMono, fontSize: 11, letterSpacing: "0.32em", color: vault.arcaneGlow, marginBottom: 14 }}>{col.h}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.items.map((it) => {
                const href =
                  it.startsWith("Collector Crypt") ? "https://collectorcrypt.com" :
                  it.startsWith("Pump.Fun")        ? PUMPFUN_URL :
                  it.startsWith("Dexscreener")     ? DEXSCREENER_URL :
                  "#";
                return (
                  <a key={it} href={href} target={href === "#" ? undefined : "_blank"} rel="noopener noreferrer"
                     style={{ color: vault.ink, textDecoration: "none", fontFamily: vault.fontBody, fontSize: isMobile ? 15 : 17 }}>
                    {it}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: "relative",
        border: `1px solid ${vault.arcane}66`, borderRadius: 4,
        padding: isMobile ? "14px 16px" : "16px 22px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "stretch" : "center",
        gap: isMobile ? 12 : 16,
        marginBottom: 24,
        background: `linear-gradient(180deg, ${vault.panel}, transparent)`,
        boxShadow: `inset 0 0 24px rgba(183,148,244,.06)`,
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: vault.fontMono, fontSize: 10, letterSpacing: "0.32em", color: vault.arcaneGlow }}>CONTRACT ADDRESS</div>
          <div style={{ fontFamily: vault.fontMono, fontSize: isMobile ? 12 : 14, color: vault.ink, marginTop: 4, wordBreak: "break-all" }}>
            {MTG_CA}
          </div>
        </div>
        <button onClick={() => copy(MTG_CA)} style={{
          background: `linear-gradient(135deg, ${vault.arcane}, ${vault.arcaneDeep})`,
          color: "#fff", border: `1px solid ${vault.arcaneGlow}`, borderRadius: 3,
          padding: isMobile ? "10px 16px" : "10px 22px",
          fontFamily: vault.fontMono, fontSize: 12, letterSpacing: "0.28em",
          cursor: "pointer", boxShadow: `0 0 16px ${vault.arcane}66`,
          flex: "0 0 auto", alignSelf: isMobile ? "flex-end" : "auto",
        }}>
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>

      <div style={{
        position: "relative", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        paddingTop: 20, borderTop: `1px solid ${vault.panelEdge}`,
        gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ fontFamily: vault.fontBody, fontStyle: "italic", fontSize: isMobile ? 12 : 14, color: vault.inkSoft, flex: "1 1 240px" }}>
          "All cards are real. All raffles are random. May your topdeck be lethal."
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <VManaPip kind="W" size={isMobile ? 16 : 20} />
          <VManaPip kind="U" size={isMobile ? 16 : 20} />
          <VManaPip kind="B" size={isMobile ? 16 : 20} />
          <VManaPip kind="R" size={isMobile ? 16 : 20} />
          <VManaPip kind="G" size={isMobile ? 16 : 20} />
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────
function DirectionVault() {
  return (
    <div style={{
      width: "100%", color: vault.ink, fontFamily: vault.fontBody,
      background: `
        radial-gradient(ellipse at 20% 0%, ${vault.arcaneDeep}44 0%, transparent 50%),
        radial-gradient(ellipse at 80% 30%, #0a3b5e44 0%, transparent 50%),
        ${vault.bg}
      `,
      position: "relative", overflow: "hidden",
    }}>
      {/* film grain */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0 0.6 0 0 0 .12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        mixBlendMode: "screen",
      }} />
      <VaultHero />
      <VaultTicker />
      <VaultHow />
      <VaultRaffle />
      <VaultWinners />
      <VaultToken />
      <VaultGrid />
      <VaultFaq />
      <VaultFooter />
    </div>
  );
}

window.DirectionVault = DirectionVault;
