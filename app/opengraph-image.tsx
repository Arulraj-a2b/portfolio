import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';
import { profile } from '@/content/profile';

export const dynamic = 'force-static';
export const alt = profile.siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const logo = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), 'public', 'logo.png')).toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0a0a12 0%, #14122b 60%, #0a0a12 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 80, top: 70, width: 160, height: 160, borderRadius: 40, background: '#312e81', transform: 'rotate(18deg)' }} />
        <div style={{ position: 'absolute', right: 120, top: 60, width: 110, height: 110, borderRadius: 999, background: '#065f46' }} />
        <div style={{ position: 'absolute', right: 70, bottom: 50, width: 150, height: 150, borderRadius: 36, background: '#7c2d12', transform: 'rotate(-14deg)' }} />
        <div
          style={{
            position: 'absolute',
            left: 80,
            right: 80,
            top: 120,
            bottom: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 64px',
            borderRadius: 32,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.22)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={64} height={64} alt="" />
            <div style={{ fontSize: 22, letterSpacing: 6, color: '#a5b4fc', textTransform: 'uppercase' }}>{'Hello, I\'m'}</div>
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 12, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 32, color: '#c7d2fe', marginTop: 16 }}>Senior Frontend Engineer · Frontend Architect</div>
          <div style={{ fontSize: 22, color: '#94a3b8', marginTop: 28 }}>{`Micro-frontends · Design systems · React Native · ${profile.siteUrl.replace('https://', '')}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
