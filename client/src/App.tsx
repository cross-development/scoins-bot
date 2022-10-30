// Core
import { useEffect } from 'react';

// Global tg var
const tg = window?.Telegram?.WebApp;

const App = () => {
  useEffect(() => {
    tg.ready();
  }, []);

  const handleClose = (): void => {
    tg.close();
  };

  return (
    <div>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default App;
