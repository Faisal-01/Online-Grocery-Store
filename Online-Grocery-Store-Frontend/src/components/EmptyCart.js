import styles from '../styles/EmptyCart.module.css';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function EmptyCart() {
  return (
    <div className={styles.container}>
        <AddShoppingCartIcon className={styles.icon}/>
        <h1>No Item in the cart</h1>
    </div>
  )
}
