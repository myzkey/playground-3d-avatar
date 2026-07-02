import { Canvas } from '@react-three/fiber';
import { Environment, Grid, Html, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { VrmAvatar } from '../../../entities/avatar/ui/vrm-avatar';
import type {
  AvatarAnimation,
  AvatarExpression,
} from '../../../entities/avatar/model/avatar-types';
import './avatar-viewer.css';

type AvatarViewerProps = {
  expression: AvatarExpression;
  animation: AvatarAnimation;
  resetToken: number;
};

export const AvatarViewer = ({ expression, animation, resetToken }: AvatarViewerProps) => (
  <div className="avatar-viewer">
    <Canvas
      camera={{ position: [0, 1.25, 4.4], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#eef1f4']} />
      <ambientLight intensity={1.1} />
      <directionalLight intensity={2.2} position={[2.5, 4, 3]} />
      <Suspense
        fallback={
          <Html center className="avatar-viewer__loading">
            Loading VRM
          </Html>
        }
      >
        <VrmAvatar expression={expression} animation={animation} resetToken={resetToken} />
        <Environment preset="city" />
      </Suspense>
      <Grid
        args={[7, 7]}
        cellColor="#c7cfd8"
        cellSize={0.5}
        fadeDistance={8}
        fadeStrength={1.7}
        position={[0, -1.06, 0]}
        sectionColor="#9ca9b8"
        sectionSize={1}
      />
      <OrbitControls
        enableDamping
        makeDefault
        maxDistance={6}
        maxPolarAngle={Math.PI * 0.82}
        minDistance={1.4}
        target={[0, 0.45, 0]}
      />
    </Canvas>
  </div>
);
