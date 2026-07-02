import type { VRMExpressionManager } from '@pixiv/three-vrm';
import type { AvatarExpression } from '../model/avatar-types';

const EXPRESSION_PRESETS: Record<AvatarExpression, ReadonlyArray<string>> = {
  neutral: ['neutral'],
  happy: ['happy', 'relaxed'],
  angry: ['angry'],
  sad: ['sad'],
  surprised: ['surprised', 'aa'],
};

const KNOWN_EXPRESSIONS = ['happy', 'relaxed', 'angry', 'sad', 'surprised', 'aa', 'neutral'] as const;

export const applyAvatarExpression = (
  manager: VRMExpressionManager | undefined,
  expression: AvatarExpression,
) => {
  if (!manager) {
    return;
  }

  KNOWN_EXPRESSIONS.forEach((name) => {
    manager.setValue(name, 0);
  });

  EXPRESSION_PRESETS[expression].forEach((name) => {
    manager.setValue(name, expression === 'neutral' ? 0 : 1);
  });
};
