import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { classNames } from '../lib/class-names';
import './button.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isActive?: boolean;
  variant?: ButtonVariant;
};

export const Button = ({
  children,
  className,
  isActive = false,
  variant = 'secondary',
  ...props
}: ButtonProps) => (
  <button
    className={classNames('button', `button--${variant}`, isActive && 'button--active', className)}
    type="button"
    {...props}
  >
    {children}
  </button>
);
