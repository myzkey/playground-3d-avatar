import { Button } from '../../../shared/ui/button';

type ResetAvatarButtonProps = {
  onReset: () => void;
};

export const ResetAvatarButton = ({ onReset }: ResetAvatarButtonProps) => (
  <Button className="reset-avatar-button" onClick={onReset} variant="danger">
    Reset Avatar
  </Button>
);
