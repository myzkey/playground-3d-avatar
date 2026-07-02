import { useCallback, useState } from 'react';
import { AnimationControls } from '../../../features/change-animation/ui/animation-controls';
import { ExpressionControls } from '../../../features/change-expression/ui/expression-controls';
import { ResetAvatarButton } from '../../../features/reset-avatar/ui/reset-avatar-button';
import { AvatarViewer } from '../../../widgets/avatar-viewer/ui/avatar-viewer';
import type {
  AvatarAnimation,
  AvatarExpression,
} from '../../../entities/avatar/model/avatar-types';
import './avatar-page.css';

export const AvatarPage = () => {
  const [expression, setExpression] = useState<AvatarExpression>('neutral');
  const [animation, setAnimation] = useState<AvatarAnimation>('idle');
  const [resetToken, setResetToken] = useState(0);

  const handleReset = useCallback(() => {
    setExpression('neutral');
    setAnimation('idle');
    setResetToken((current) => current + 1);
  }, []);

  return (
    <main className="avatar-page">
      <div className="avatar-page__viewer">
        <AvatarViewer animation={animation} expression={expression} resetToken={resetToken} />
      </div>
      <aside className="avatar-page__panel" aria-label="Avatar controls">
        <div>
          <h1 className="avatar-page__title">3D Avatar Playground</h1>
          <p className="avatar-page__status">public/avatar.vrm</p>
        </div>
        <ExpressionControls onChange={setExpression} value={expression} />
        <AnimationControls onChange={setAnimation} value={animation} />
        <ResetAvatarButton onReset={handleReset} />
      </aside>
    </main>
  );
};
