'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Curl-noise-ish particle flow field.
 * ~2400 points with a custom shader — each particle drifts through a
 * pseudo-curl field and is attracted/repelled by the mouse.
 */
export function ParticleField({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#3b82f6') },
      uColorB: { value: new THREE.Color('#f472b6') },
      uSize: { value: 10 },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    // Smooth the mouse value
    const m = matRef.current.uniforms.uMouse.value as THREE.Vector2;
    m.x += (mouse.x * 3 - m.x) * 0.04;
    m.y += (mouse.y * 1.5 - m.y) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-seed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          attribute float seed;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uSize;
          varying float vAlpha;
          varying float vMix;

          // pseudo-curl
          vec3 curl(vec3 p) {
            float t = uTime * 0.12;
            return vec3(
              sin(p.y * 0.7 + t + seed * 6.28),
              cos(p.x * 0.6 - t * 1.1 + seed * 4.0),
              sin((p.x + p.y) * 0.4 + t * 0.8)
            );
          }

          void main() {
            vec3 pos = position;
            vec3 flow = curl(pos);
            pos += flow * 0.4;
            pos.x += sin(uTime * 0.25 + seed * 20.0) * 0.2;
            pos.y += cos(uTime * 0.3 + seed * 18.0) * 0.15;

            // Mouse attraction
            vec2 toMouse = uMouse - pos.xy;
            float d = length(toMouse);
            float pull = smoothstep(2.5, 0.0, d) * 0.8;
            pos.xy += toMouse * pull * 0.25;

            vMix = seed;
            vAlpha = 0.3 + 0.5 * smoothstep(0.1, 1.0, pull) + 0.1 * sin(uTime + seed * 30.0);

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = uSize * (1.0 / -mv.z) * (0.6 + seed * 0.8);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vAlpha;
          varying float vMix;

          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float a = smoothstep(0.5, 0.0, d);
            vec3 col = mix(uColorA, uColorB, vMix);
            gl_FragColor = vec4(col, a * vAlpha);
            if (gl_FragColor.a < 0.02) discard;
          }
        `}
      />
    </points>
  );
}
