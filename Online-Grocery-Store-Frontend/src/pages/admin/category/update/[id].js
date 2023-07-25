import styles from "@/styles/Admin/UpdateCategory.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import CustomAlert from "@/components/CustomAlert"; 

export default function UpdateCategory() {
  const [category, setCategory] = useState();

  const router = useRouter();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const {alert, setAlert} = useAppContext();

  const getCategory = async () => {
    if (router.isReady) {
      const { id } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/category/${id}`,
      };

      const response = await axios.request(options);
      setCategory(response.data);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    
    try{
        

        const response = await axios.patch(
          `http://localhost:5000/api/v1/category/${category._id}`,
          {category}
        );
        setAlert({status: true, message: response.data});
    }
        
    
    catch(e){
        console.log(e);
    }
  }


  useEffect(() => {
    getCategory();
  }, [router.isReady]);

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Update Category</h1>

      <div className={styles.containers}>

        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/categories/${category?.image}`}
            width={300}
            height={300}
            alt={category?.name}
          />
        </div>
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={category?.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
      </div>


      <button type="submit" className={styles.btn}>Update</button>
      {alert.status && <CustomAlert />}
    </form>
  );
}
UpdateCategory.NoLayout = true;
