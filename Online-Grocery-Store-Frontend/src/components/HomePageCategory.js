import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/HomePageCategory.module.css'

export default function Categories({category}) {
  const PF = process.env.NEXT_PUBLIC_FOLDER;
  return (
    <li className={styles.category}>
      <Link className={styles.categoryLink} href={`/categories/${category._id}`}>
        <Image
          src={`${PF}images/categories/${category.image}`}
          width={100}
          height={100}
          alt={category.name}
        />

        <p className={styles.categoryName}>{category.name}</p>
      </Link>
    </li>
  );
}
