// Core
import { FC } from 'react';
// Components
import Button from '../Button';
// Hooks
import { useTelegram } from '../../hooks/useTelegram';
// Styles
import styles from './Header.module.css';

const Header: FC = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className={styles.header}>
      <Button onClick={onClose}>Close</Button>

      <span className={styles.username}>{user?.username}</span>
    </div>
  );
};

export default Header;
