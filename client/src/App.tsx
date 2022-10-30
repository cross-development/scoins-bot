// Core
import { useEffect } from 'react';
// Packages
import { Route, Routes } from 'react-router-dom';
// Components
import Form from './components/Form';
import Header from './components/Header';
import ProductList from './components/ProductList';
// Hooks
import { useTelegram } from './hooks/useTelegram';

const App = () => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div>
      <Header />

      <Routes>
        <Route
          index
          element={<ProductList />}
        />

        <Route
          path="form"
          element={<Form />}
        />
      </Routes>
    </div>
  );
};

export default App;
