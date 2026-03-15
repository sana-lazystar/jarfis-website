/**
 * HeroSolarSystem — Server Component
 * Inline SVG, CSS-only animations, GPU-accelerated (transform/opacity).
 * Security: no <script>, no <foreignObject>, no event handlers.
 *
 * Props:
 *   ariaLabel — accessible description for the SVG (from i18n a11y.solar_system key).
 *               Defaults to the English fallback if omitted.
 */
interface HeroSolarSystemProps {
  ariaLabel?: string;
}

export default function HeroSolarSystem({ ariaLabel }: HeroSolarSystemProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>
      {/* Background blobs — positioned outside SVG as divs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(13, 148, 136, 0.12)',
          filter: 'blur(80px)',
          top: '10%',
          left: '5%',
          animation: 'blob-float 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(251, 113, 133, 0.1)',
          filter: 'blur(80px)',
          bottom: '15%',
          right: '5%',
          animation: 'blob-float 25s ease-in-out infinite 4s',
          willChange: 'transform',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(94, 234, 212, 0.08)',
          filter: 'blur(80px)',
          top: '60%',
          left: '20%',
          animation: 'blob-float 18s ease-in-out infinite 8s',
          willChange: 'transform',
        }}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 440 440"
        fill="none"
        role="img"
        aria-labelledby="solar-system-title"
        style={{ width: '100%', height: 'auto' }}
      >
        <title id="solar-system-title">{ariaLabel ?? 'JARFIS AI agent ecosystem — 11 agents orbiting the central JARFIS core'}</title>
        <defs>
          {/* Sun glow */}
          <radialGradient id="ss-sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.35"/>
            <stop offset="50%" stopColor="#0D9488" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0"/>
          </radialGradient>

          {/* Sun body */}
          <radialGradient id="ss-sunBody" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#5EEAD4"/>
            <stop offset="60%" stopColor="#0D9488"/>
            <stop offset="100%" stopColor="#0A7A6F"/>
          </radialGradient>

          {/* Corona glow */}
          <radialGradient id="ss-coronaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.3"/>
            <stop offset="40%" stopColor="#0D9488" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#0D9488" stopOpacity="0"/>
          </radialGradient>

          {/* Teal planet */}
          <radialGradient id="ss-tealPlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#5EEAD4"/>
            <stop offset="50%" stopColor="#0D9488"/>
            <stop offset="100%" stopColor="#065F56"/>
          </radialGradient>

          {/* Coral planet (PO) */}
          <radialGradient id="ss-coralPlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FDA4AF"/>
            <stop offset="50%" stopColor="#FB7185"/>
            <stop offset="100%" stopColor="#BE3A56"/>
          </radialGradient>

          {/* Coral-alt planet (SE) */}
          <radialGradient id="ss-coralAltPlanet" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FCA5A5"/>
            <stop offset="50%" stopColor="#F87171"/>
            <stop offset="100%" stopColor="#B91C1C"/>
          </radialGradient>

          {/* Planet shadow */}
          <radialGradient id="ss-planetShadow" cx="70%" cy="70%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <style>{`
          /* Sun corona */
          #ss-corona { transform-origin: 220px 220px; animation: corona-pulse 5s ease-in-out infinite; }

          /* Orbit groups */
          #orbit-po { transform-origin: 220px 220px; animation: orbitInner1 25s linear infinite; will-change: transform; }
          #orbit-ar { transform-origin: 220px 220px; animation: orbitInner2 22s linear infinite; will-change: transform; }
          #orbit-tl { transform-origin: 220px 220px; animation: orbitInner3 28s linear infinite; will-change: transform; }
          #orbit-be { transform-origin: 220px 220px; animation: orbitMid1 35s linear infinite; will-change: transform; }
          #orbit-fe { transform-origin: 220px 220px; animation: orbitMid2 30s linear infinite; will-change: transform; }
          #orbit-qa { transform-origin: 220px 220px; animation: orbitMid3 38s linear infinite; will-change: transform; }
          #orbit-do { transform-origin: 220px 220px; animation: orbitOuter1 18s linear infinite; will-change: transform; }
          #orbit-se { transform-origin: 220px 220px; animation: orbitOuter2 22s linear infinite; will-change: transform; }
          #orbit-ux { transform-origin: 220px 220px; animation: orbitOuter3 16s linear infinite; will-change: transform; }

          /* Counter-rotation inner groups */
          #planet-po-inner { transform-origin: 320px 220px; animation: counterInner1 25s linear infinite; }
          #planet-ar-inner { transform-origin: 120px 220px; animation: counterInner2 22s linear infinite; }
          #planet-tl-inner { transform-origin: 320px 220px; animation: counterInner3 28s linear infinite; }
          #planet-be-inner { transform-origin: 372px 220px; animation: counterMid1 35s linear infinite; }
          #planet-fe-inner { transform-origin: 372px 220px; animation: counterMid2 30s linear infinite; }
          #planet-qa-inner { transform-origin: 372px 220px; animation: counterMid3 38s linear infinite; }
          #planet-do-inner { transform-origin: 415px 220px; animation: counterOuter1 18s linear infinite; }
          #planet-se-inner { transform-origin: 415px 220px; animation: counterOuter2 22s linear infinite; }
          #planet-ux-inner { transform-origin: 415px 220px; animation: counterOuter3 16s linear infinite; }

          /* Particle twinkle */
          #ss-particles circle:nth-child(odd) { animation: twinkle 3s ease-in-out infinite; }
          #ss-particles circle:nth-child(even) { animation: twinkle 4s ease-in-out infinite 1.5s; }
        `}</style>

        {/* Background glow */}
        <circle cx="220" cy="220" r="200" fill="url(#ss-sunGlow)"/>

        {/* Orbit rings */}
        <g opacity="0.3">
          <circle cx="220" cy="220" r="100" stroke="#0D9488" strokeWidth="1" strokeDasharray="6 4" fill="none"/>
          <circle cx="220" cy="220" r="152" stroke="#0D9488" strokeWidth="0.8" strokeDasharray="4 6" fill="none"/>
          <circle cx="220" cy="220" r="195" stroke="#0D9488" strokeWidth="0.6" strokeDasharray="3 7" fill="none"/>
        </g>

        {/* Central Sun */}
        <g>
          <circle id="ss-corona" cx="220" cy="220" r="58" fill="url(#ss-coronaGlow)"/>
          <circle cx="220" cy="220" r="50" fill="#0D9488" opacity="0.08"/>
          <circle cx="220" cy="220" r="44" fill="#0D9488" opacity="0.12"/>
          <circle cx="220" cy="220" r="38" fill="url(#ss-sunBody)"/>
          <ellipse cx="210" cy="208" rx="16" ry="12" fill="white" opacity="0.15"/>
          <text x="220" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="700" fontSize="11" fill="#F0FDF4" letterSpacing="1">JARFIS</text>
        </g>

        {/* ===== INNER ORBIT PLANETS (r=100) ===== */}
        {/* PO — coral, r=22 */}
        <g id="orbit-po">
          <g id="planet-po-inner">
            <circle cx="320" cy="220" r="22" fill="url(#ss-coralPlanet)"/>
            <circle cx="320" cy="220" r="22" fill="url(#ss-planetShadow)"/>
            <ellipse cx="320" cy="220" rx="22" ry="6" stroke="#FDA4AF" strokeWidth="0.8" fill="none" opacity="0.4" transform="rotate(-15, 320, 220)"/>
            <ellipse cx="315" cy="213" rx="7" ry="5" fill="white" opacity="0.2"/>
            <text x="320" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="700" fontSize="11" fill="#F0FDF4">PO</text>
          </g>
        </g>

        {/* AR — teal, r=18 */}
        <g id="orbit-ar">
          <g id="planet-ar-inner">
            <circle cx="120" cy="220" r="18" fill="url(#ss-tealPlanet)"/>
            <circle cx="120" cy="220" r="18" fill="url(#ss-planetShadow)"/>
            <ellipse cx="120" cy="220" rx="18" ry="5" stroke="#5EEAD4" strokeWidth="0.6" fill="none" opacity="0.3" transform="rotate(10, 120, 220)"/>
            <ellipse cx="116" cy="215" rx="6" ry="4" fill="white" opacity="0.18"/>
            <text x="120" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="700" fontSize="10" fill="#F0FDF4">AR</text>
          </g>
        </g>

        {/* TL — teal, r=18 */}
        <g id="orbit-tl">
          <g id="planet-tl-inner">
            <circle cx="320" cy="220" r="18" fill="url(#ss-tealPlanet)"/>
            <circle cx="320" cy="220" r="18" fill="url(#ss-planetShadow)"/>
            <ellipse cx="320" cy="220" rx="18" ry="5" stroke="#5EEAD4" strokeWidth="0.6" fill="none" opacity="0.3" transform="rotate(-20, 320, 220)"/>
            <ellipse cx="315" cy="214" rx="6" ry="4" fill="white" opacity="0.18"/>
            <text x="320" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="700" fontSize="10" fill="#F0FDF4">TL</text>
          </g>
        </g>

        {/* ===== MID ORBIT PLANETS (r=152) ===== */}
        {/* BE — teal, r=16 */}
        <g id="orbit-be">
          <g id="planet-be-inner">
            <circle cx="372" cy="220" r="16" fill="url(#ss-tealPlanet)"/>
            <circle cx="372" cy="220" r="16" fill="url(#ss-planetShadow)"/>
            <ellipse cx="372" cy="220" rx="16" ry="4.5" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.25" transform="rotate(25, 372, 220)"/>
            <ellipse cx="367" cy="215" rx="5" ry="3.5" fill="white" opacity="0.16"/>
            <text x="372" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="9.5" fill="#F0FDF4">BE</text>
          </g>
        </g>

        {/* FE — teal, r=16 */}
        <g id="orbit-fe">
          <g id="planet-fe-inner">
            <circle cx="372" cy="220" r="16" fill="url(#ss-tealPlanet)"/>
            <circle cx="372" cy="220" r="16" fill="url(#ss-planetShadow)"/>
            <ellipse cx="372" cy="220" rx="16" ry="4.5" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.25" transform="rotate(-5, 372, 220)"/>
            <ellipse cx="367" cy="215" rx="5" ry="3.5" fill="white" opacity="0.16"/>
            <text x="372" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="9.5" fill="#F0FDF4">FE</text>
          </g>
        </g>

        {/* QA — teal, r=16 */}
        <g id="orbit-qa">
          <g id="planet-qa-inner">
            <circle cx="372" cy="220" r="16" fill="url(#ss-tealPlanet)"/>
            <circle cx="372" cy="220" r="16" fill="url(#ss-planetShadow)"/>
            <ellipse cx="372" cy="220" rx="16" ry="4.5" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.25" transform="rotate(15, 372, 220)"/>
            <ellipse cx="367" cy="215" rx="5" ry="3.5" fill="white" opacity="0.16"/>
            <text x="372" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="9.5" fill="#F0FDF4">QA</text>
          </g>
        </g>

        {/* ===== OUTER ORBIT PLANETS (r=195) ===== */}
        {/* DO — teal, r=14 */}
        <g id="orbit-do">
          <g id="planet-do-inner">
            <circle cx="415" cy="220" r="14" fill="url(#ss-tealPlanet)"/>
            <circle cx="415" cy="220" r="14" fill="url(#ss-planetShadow)"/>
            <ellipse cx="415" cy="220" rx="14" ry="4" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.2" transform="rotate(-10, 415, 220)"/>
            <ellipse cx="411" cy="215.5" rx="4.5" ry="3" fill="white" opacity="0.14"/>
            <text x="415" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="9" fill="#F0FDF4">DO</text>
          </g>
        </g>

        {/* SE — coral-alt, r=14 */}
        <g id="orbit-se">
          <g id="planet-se-inner">
            <circle cx="415" cy="220" r="14" fill="url(#ss-coralAltPlanet)"/>
            <circle cx="415" cy="220" r="14" fill="url(#ss-planetShadow)"/>
            <ellipse cx="415" cy="220" rx="14" ry="4" stroke="#FCA5A5" strokeWidth="0.5" fill="none" opacity="0.25" transform="rotate(12, 415, 220)"/>
            <ellipse cx="411" cy="215.5" rx="4.5" ry="3" fill="white" opacity="0.14"/>
            <text x="415" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="9" fill="#F0FDF4">SE</text>
          </g>
        </g>

        {/* UX — teal, r=14 */}
        <g id="orbit-ux">
          <g id="planet-ux-inner">
            <circle cx="415" cy="220" r="14" fill="url(#ss-tealPlanet)"/>
            <circle cx="415" cy="220" r="14" fill="url(#ss-planetShadow)"/>
            <ellipse cx="415" cy="220" rx="14" ry="4" stroke="#5EEAD4" strokeWidth="0.5" fill="none" opacity="0.2" transform="rotate(-8, 415, 220)"/>
            <ellipse cx="411" cy="215.5" rx="4.5" ry="3" fill="white" opacity="0.14"/>
            <text x="415" y="224" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="9" fill="#F0FDF4">UX</text>
          </g>
        </g>

        {/* ===== BACKGROUND PARTICLES (12 stars) ===== */}
        <g id="ss-particles" opacity="0.4">
          <circle cx="60" cy="50" r="1" fill="#5EEAD4"/>
          <circle cx="380" cy="40" r="0.8" fill="#5EEAD4"/>
          <circle cx="410" cy="200" r="1.2" fill="#5EEAD4"/>
          <circle cx="30" cy="300" r="0.7" fill="#5EEAD4"/>
          <circle cx="400" cy="380" r="1" fill="#5EEAD4"/>
          <circle cx="100" cy="420" r="0.8" fill="#5EEAD4"/>
          <circle cx="340" cy="30" r="0.6" fill="#94A3B8"/>
          <circle cx="20" cy="180" r="0.9" fill="#94A3B8"/>
          <circle cx="420" cy="300" r="0.7" fill="#94A3B8"/>
          <circle cx="180" cy="430" r="0.5" fill="#94A3B8"/>
          <circle cx="310" cy="410" r="0.8" fill="#5EEAD4"/>
          <circle cx="70" cy="380" r="0.6" fill="#94A3B8"/>
        </g>
      </svg>
    </div>
  );
}
