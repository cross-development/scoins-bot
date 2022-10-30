// Packages
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Response } from 'express';
import TelegramBot from 'node-telegram-bot-api';
// Interfaces and types
import { IBotRequest } from './src/interfaces/bot-data.interfaces';

dotenv.config();

const port = process.env.PORT;
const tgToken = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(tgToken, { polling: true });

const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg: TelegramBot.Message) => {
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
});

app.post('/web-data', async (req: IBotRequest, res: Response) => {
  const { queryId, totalPrice } = req.body;

  try {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Successful',
      input_message_content: {
        message_text: `You have bought $${totalPrice} worth of products`,
      },
    });

    return res.status(200).json({});
  } catch (error) {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Failure',
      input_message_content: {
        message_text: 'Failed to purchase products',
      },
    });

    return res.status(400).json({});
  }
});

app.listen(port, (): void => {
  console.log('Server started on port ' + port);
});
