const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const webAppUrl = '/';

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
      reply_markup: {
        keyboard: [[{ text: 'Заполни форму' }]],
      },
    });

    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Сделать заказ', web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  bot.sendMessage(
    chatId,
    `${msg.from.first_name} ${msg.from.last_name} sent you: ${msg.text}`,
  );
});
