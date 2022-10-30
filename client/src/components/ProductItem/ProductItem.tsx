// Core
import { FC } from 'react';
// Packages
import cn from 'classnames';
// Components
import Button from '../Button';
// Interfaces and types
import { IProduct } from '../../interfaces/product.interfaces';
// Styles
import styles from './ProductItem.module.css';

interface IProps {
  product: IProduct;
  className?: string;
  onAddProduct: (product: IProduct) => void;
}

const ProductItem: FC<IProps> = ({ product, className, onAddProduct }) => {
  const handleOnAddProduct = (): void => onAddProduct(product);

  return (
    <div className={cn(styles.product, className)}>
      <div className={styles.img} />

      <div className={styles.title}>{product.title}</div>

      <div className={styles.description}>{product.description}</div>

      <div className={styles.price}>
        <span>
          Total: <b>{product.price}</b>
        </span>
      </div>

      <Button
        onClick={handleOnAddProduct}
        className={styles.addBtn}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductItem;
