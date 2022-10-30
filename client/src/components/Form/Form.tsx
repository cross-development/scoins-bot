// Core
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
// Hooks
import { useTelegram } from '../../hooks/useTelegram';
// Styles
import styles from './Form.module.css';

enum SubjectEnum {
  PHYSICAL = 'physical',
  LEGAL = 'legal',
}

const Form: FC = () => {
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject, setSubject] = useState(SubjectEnum.PHYSICAL);

  const { tg } = useTelegram();

  const handleSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };

    tg.sendData(JSON.stringify(data));
  }, [country, street, subject, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', handleSendData);

    return () => {
      tg.offEvent('mainButtonClicked', handleSendData);
    };
  }, [handleSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({ text: 'Send data' });
  }, [tg.MainButton]);

  useEffect(() => {
    !street || !country ? tg.MainButton.hide() : tg.MainButton.show();
  }, [country, street, tg.MainButton]);

  const handleChangeCountry = (e: ChangeEvent<HTMLInputElement>): void => {
    setCountry(e.target.value);
  };

  const handleChangeStreet = (e: ChangeEvent<HTMLInputElement>): void => {
    setStreet(e.target.value);
  };

  const handleChangeSubject = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSubject(e.target.value as SubjectEnum);
  };

  return (
    <div className={styles.form}>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={handleChangeCountry}
        className={styles.input}
      />

      <input
        type="text"
        placeholder="Street"
        value={street}
        onChange={handleChangeStreet}
        className={styles.input}
      />

      <select
        value={subject}
        onChange={handleChangeSubject}
        className={styles.select}
      >
        <option value={SubjectEnum.PHYSICAL}>Physical Subject</option>
        <option value={SubjectEnum.LEGAL}>Legal Subject</option>
      </select>
    </div>
  );
};

export default Form;
