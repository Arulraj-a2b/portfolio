import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';
import { profile } from '@/content/profile';

export const dynamic = 'force-static';
export const alt = profile.siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const read = (file: string) => `data:image/${file.endsWith('.png') ? 'png' : 'jpeg'};base64,${fs.readFileSync(path.join(process.cwd(), 'public', file)).toString('base64')}`;

export default function OpenGraphImage() {
  const avatar = read('avatar-3d.jpg');
  const lockup = read('lockup-dark.png');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a12 0%, #14122b 60%, #0a0a12 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', left: 40, top: 40, width: 120, height: 120, borderRadius: 32, background: '#312e81', transform: 'rotate(18deg)', opacity: 0.9 }} />
        <div style={{ position: 'absolute', right: 70, top: 50, width: 90, height: 90, borderRadius: 999, background: '#065f46', opacity: 0.9 }} />
        <div style={{ position: 'absolute', right: 150, bottom: 40, width: 110, height: 110, borderRadius: 28, background: '#7c2d12', transform: 'rotate(-14deg)', opacity: 0.9 }} />

        {/* Portrait sits in the centre-left so square crops (Slack, Teams, WhatsApp) still show the face. */}
        <div style={{ display: 'flex', marginLeft: 150, width: 360, height: 360, borderRadius: 48, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.28)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} width={360} height={360} alt="" style={{ objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 56, width: 600 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lockup} width={196} height={50} alt="" />
          <div style={{ fontSize: 56, fontWeight: 700, marginTop: 26, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 26, color: '#c7d2fe', marginTop: 14 }}>Senior Frontend Engineer · Frontend Architect</div>
          <div style={{ fontSize: 20, color: '#94a3b8', marginTop: 22, lineHeight: 1.4 }}>Micro-frontends · Design systems · React Native</div>
          <div style={{ fontSize: 18, color: '#818cf8', marginTop: 18 }}>{profile.siteUrl.replace('https://', '')}</div>
        </div>
      </div>
    ),
    size,
  );
}
