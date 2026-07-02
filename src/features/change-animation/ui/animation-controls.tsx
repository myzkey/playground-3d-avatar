import { Button } from '../../../shared/ui/button';
import {
  AVATAR_ANIMATIONS,
  type AvatarAnimation,
} from '../../../entities/avatar/model/avatar-types';

type AnimationControlsProps = {
  value: AvatarAnimation;
  onChange: (value: AvatarAnimation) => void;
};

export const AnimationControls = ({ value, onChange }: AnimationControlsProps) => (
  <section className="control-group" aria-labelledby="animation-controls-title">
    <h2 id="animation-controls-title" className="control-group__title">
      Animation
    </h2>
    <div className="control-group__grid">
      {AVATAR_ANIMATIONS.map((animation) => (
        <Button
          isActive={value === animation.value}
          key={animation.value}
          onClick={() => onChange(animation.value)}
        >
          {animation.label}
        </Button>
      ))}
    </div>
  </section>
);
