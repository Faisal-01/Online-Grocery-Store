import styles from "@/styles/Admin/UpdateSubcategory.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import CustomAlert from "@/components/CustomAlert"; 

export default function UpdateSubcategory() {
  const [subcategory, setSubcategory] = useState();

  const router = useRouter();

  const PF = process.env.NEXT_PUBLIC_FOLDER;

  const {alert, setAlert} = useAppContext();

  const getSubcategory = async () => {
    if (router.isReady) {
      const { id } = router.query;
      const options = {
        method: "GET",
        url: `http://localhost:5000/api/v1/subcategory/${id}`,
      };

      const response = await axios.request(options);
      setSubcategory(response.data);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    
    try{
        

        const response = await axios.patch(
          `http://localhost:5000/api/v1/subcategory/${subcategory._id}`,
          {subcategory}
        );
        setAlert({status: true, message: response.data});
    }
        
    
    catch(e){
        console.log(e);
    }
  }


  useEffect(() => {
    getSubcategory();
  }, [router.isReady]);

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <h1>Update Subcategory</h1>

      <div className={styles.containers}>
        {/* <label htmlFor="image">Image</label> */}

        <div className={styles.imageContainer}>
          <Image
            src={`${PF}images/subcategories/${subcategory?.image}`}
            width={300}
            height={300}
            alt={subcategory?.name}
          />
        </div>
      </div>
      <div className={styles.containers}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={subcategory?.name}
          onChange={(e) => setSubcategory({ ...subcategory, name: e.target.value })}
        />
      </div>

      <button type="submit" className={styles.btn}>Update</button>
      {alert.status && <CustomAlert />}
    </form>
  );
}

UpdateSubcategory.NoLayout = true;