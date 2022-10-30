// Core
import { FC, useCallback, useEffect, useState } from 'react';
// Components
import ProductItem from '../ProductItem';
// Hooks
import { useTelegram } from '../../hooks/useTelegram';
// Data
import { products } from '../../data/products';
// Interfaces and types
import { IProduct } from '../../interfaces/product.interfaces';
// Styles
import styles from './ProductList.module.css';

const getTotalPrice = (items: IProduct[]): number => {
  return items.reduce((acc, item) => (acc += item.price), 0);
};

const ProductList: FC = () => {
  const [addedItems, setAddedItems] = useState<IProduct[]>([]);

  const { tg, queryId } = useTelegram();

  const handleSendData = useCallback(() => {
    const data = {
      queryId,
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
    };

    fetch('https://9a99-212-90-62-167.ngrok.io/web-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }, [addedItems, queryId]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', handleSendData);

    return () => {
      tg.offEvent('mainButtonClicked', handleSendData);
    };
  }, [handleSendData, tg]);

  const handleOnAddProduct = (product: IProduct): void => {
    const alreadyAdded = addedItems.find(item => item.id === product.id);

    const newItems = alreadyAdded
      ? addedItems.filter(item => item.id !== product.id)
      : [...addedItems, product];

    setAddedItems(newItems);

    if (!newItems.length) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddProduct={handleOnAddProduct}
          className={styles.item}
        />
      ))}
    </div>
  );
};

export default ProductList;
