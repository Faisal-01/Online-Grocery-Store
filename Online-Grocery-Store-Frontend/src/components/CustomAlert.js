import styles from '../styles/CustomAlert.module.css';
import { useAppContext } from '@/context/AppContext';
import {useState, useEffect} from 'react';

export default function CustomAlert() {
  const {alert, setAlert} = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setAlert({...alert, status: false})
    }, 2000)
  }, [])
  return (
    <div className={styles.container}>{alert.message}</div>
  )
}
