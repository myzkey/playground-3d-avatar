export type AvatarExpression = 'neutral' | 'happy' | 'angry' | 'sad' | 'surprised';

export type AvatarAnimation = 'idle' | 'wave';

export type AvatarControlState = {
  expression: AvatarExpression;
  animation: AvatarAnimation;
  resetToken: number;
};

export const AVATAR_EXPRESSIONS: ReadonlyArray<{
  value: AvatarExpression;
  label: string;
}> = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'happy', label: 'Happy' },
  { value: 'angry', label: 'Angry' },
  { value: 'sad', label: 'Sad' },
  { value: 'surprised', label: 'Surprised' },
];

export const AVATAR_ANIMATIONS: ReadonlyArray<{
  value: AvatarAnimation;
  label: string;
}> = [
  { value: 'idle', label: 'Idle' },
  { value: 'wave', label: 'Wave' },
];
