// Core
import { FC, ReactNode } from 'react';
// Packages
import cn from 'classnames';
// Styles
import styles from './Button.module.css';

interface IProps {
  className?: string;
  children?: ReactNode;
  onClick: () => void;
}

const Button: FC<IProps> = ({ className, children, onClick }) => (
  <button
    onClick={onClick}
    className={cn(styles.button, className)}
  >
    {children}
  </button>
);

export default Button;
