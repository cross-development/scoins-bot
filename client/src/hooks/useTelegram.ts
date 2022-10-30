// Global tg var
const tg = window?.Telegram?.WebApp;

interface ITelegram {
  tg: any;
  user?: {
    username?: string;
  };
  queryId?: string;
  onClose: () => void;
}

export const useTelegram = (): ITelegram => {
  const onClose = (): void => tg.close();

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
    onClose,
  };
};
