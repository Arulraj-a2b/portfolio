import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Arulraj Venkadachalam — Senior Software Engineer, Frontend';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#050810';
const TEXT = '#f8fafc';
const GRAY_20 = '#d1d5db';
const GRAY_30 = '#94a3b8';
const BLUE = '#3b82f6';
const BLUE_LIGHT = '#60a5fa';
const GREEN = '#10b981';
const GLASS_BG = 'rgba(17, 24, 39, 0.5)';
const GLASS_BORDER = 'rgba(148, 163, 184, 0.18)';

const TECH = ['React', 'TypeScript', 'Next.js', 'Micro-Frontends'];

export default async function Image() {
  const publicDir = path.join(process.cwd(), 'public');
  const [interBold, interExtra, profile] = await Promise.all([
    readFile(path.join(publicDir, 'fonts/Inter-Bold.ttf')),
    readFile(path.join(publicDir, 'fonts/Inter-ExtraBold.ttf')),
    readFile(path.join(publicDir, 'profile.png')),
  ]);

  const profileSrc = `data:image/png;base64,${profile.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: BG,
          fontFamily: 'Inter',
          color: TEXT,
          position: 'relative',
        }}
      >
        {/* Ambient blue glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: -220,
            width: 780,
            height: 780,
            background:
              'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0) 60%)',
            display: 'flex',
          }}
        />
        {/* Secondary pink glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            right: -180,
            width: 700,
            height: 700,
            background:
              'radial-gradient(circle, rgba(244,114,182,0.18) 0%, rgba(244,114,182,0) 60%)',
            display: 'flex',
          }}
        />
        {/* Subtle grid/noise-free dark overlay via gradient stripe (optional depth) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)',
            display: 'flex',
          }}
        />

        {/* Main content row */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '72px 72px 48px 72px',
            gap: 48,
            zIndex: 1,
          }}
        >
          {/* Left column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 26,
              flex: 1,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 18,
                color: GRAY_30,
                letterSpacing: 6,
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              <span>PORTFOLIO</span>
              <span style={{ color: BLUE_LIGHT }}>•</span>
              <span>2026</span>
            </div>

            {/* Title with gradient */}
            <div
              style={{
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: -2,
                backgroundImage: `linear-gradient(135deg, ${BLUE_LIGHT} 0%, ${BLUE} 70%, #2563eb 100%)`,
                backgroundClip: 'text',
                color: 'transparent',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>Arulraj</span>
              <span>Venkadachalam</span>
            </div>

            {/* Role */}
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: GRAY_20,
                letterSpacing: -0.5,
              }}
            >
              Senior Software Engineer · Frontend
            </div>

            {/* Tech pills */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                marginTop: 6,
                flexWrap: 'wrap',
              }}
            >
              {TECH.map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 18px',
                    borderRadius: 999,
                    background: GLASS_BG,
                    border: `1px solid ${GLASS_BORDER}`,
                    color: TEXT,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Availability chip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 10,
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(16, 185, 129, 0.10)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                alignSelf: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: GREEN,
                  boxShadow: '0 0 12px rgba(16, 185, 129, 0.8)',
                  display: 'flex',
                }}
              />
              <span style={{ fontSize: 22, fontWeight: 700, color: '#d1fae5' }}>
                Open to senior frontend roles
              </span>
            </div>
          </div>

          {/* Right column — profile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Outer glow ring */}
            <div
              style={{
                position: 'absolute',
                width: 360,
                height: 360,
                borderRadius: 999,
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.45) 0%, rgba(59,130,246,0) 70%)',
                display: 'flex',
              }}
            />
            {/* Ring border */}
            <div
              style={{
                position: 'absolute',
                width: 328,
                height: 328,
                borderRadius: 999,
                border: '2px solid rgba(96, 165, 250, 0.35)',
                display: 'flex',
              }}
            />
            {/* Photo */}
            <img
              src={profileSrc}
              width={300}
              height={300}
              style={{
                width: 300,
                height: 300,
                borderRadius: 999,
                objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.08)',
              }}
              alt=""
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 72px 28px 72px',
            borderTop: `1px solid ${GLASS_BORDER}`,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: GRAY_30,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 0.4,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: BLUE,
                display: 'flex',
              }}
            />
            <span>arulraj1997.netlify.app</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: GRAY_30,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            <span>View portfolio</span>
            <span style={{ color: BLUE_LIGHT, fontSize: 24 }}>→</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interExtra, weight: 800, style: 'normal' },
      ],
    }
  );
}
