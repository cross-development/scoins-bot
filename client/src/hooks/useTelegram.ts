// Global tg var
const tg = window?.Telegram?.WebApp;

interface ITelegram {
  tg: any;
  user?: any;
  onClose: () => void;
  onToggleButton: () => void;
}

export const useTelegram = (): ITelegram => {
  const onClose = (): void => {
    tg.close();
  };

  const onToggleButton = (): void => {
    tg.MainButton.isVisible ? tg.MainButton.show() : tg.MainButton.hide();
  };

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    onClose,
    onToggleButton,
  };
};
