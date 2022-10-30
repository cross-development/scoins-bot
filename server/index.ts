import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const webAppUrl = 'https://resplendent-gingersnap-5d2d3c.netlify.app';

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Please, fill in the form below.', {
      reply_markup: {
        keyboard: [
          [{ text: 'Fill in the form', web_app: { url: webAppUrl + '/form' } }],
        ],
      },
    });

    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Make an order', web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);

      await bot.sendMessage(chatId, 'Thanks for your feedback');
      await bot.sendMessage(chatId, `Your country is ${data?.country}`);
    } catch (error) {
      console.log(error);
    }
  }

  bot.sendMessage(
    chatId,
    `${msg.from.first_name} ${msg.from.last_name} sent you: ${msg.text}`,
  );
});
