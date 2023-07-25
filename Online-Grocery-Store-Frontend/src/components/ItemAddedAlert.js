import styles from '../styles/ItemAddedAlert.module.css';
import { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function ItemAddedAlert() {

  const alertRef = useRef(null);
  const {isCartAlert, setIsCartAlert} = useAppContext();

  useEffect(() => {
     const timeout = setTimeout(() => {
      setIsCartAlert({status: false, message: ""});
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <div ref={alertRef} className={styles.container}>
        <p>{isCartAlert.message}</p>
      </div>
    </>
  );
}
