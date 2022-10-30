// Core
import { FC } from 'react';
// Styles
import styles from './ProductList.module.css';

interface IProps {}

const ProductList: FC<IProps> = props => {
  return <div className={styles.productListWrapper}>ProductList</div>;
};

export default ProductList;
