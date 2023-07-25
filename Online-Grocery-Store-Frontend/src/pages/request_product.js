import styles from '../styles/RequestProduct.module.css';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';
import CustomAlert from '@/components/CustomAlert';
import { useRouter } from 'next/navigation';

export default function RequestProduct() {

  const [product, setProduct] = useState({
    name: "",
    manufacturerName: "",
    image: null
  });

  const [user, setUser] = useState("");

  const {alert, setAlert} = useAppContext();

  const {push} = useRouter();

  const handleFileChange = (event) => {
    setProduct({...product, image: event.target.files[0]});
  };

  const handleUpload = async (e) => {
    
    e.preventDefault();

    const token = localStorage.getItem("token");
    let response;

    try {
      response = await axios.get(
        "http://localhost:5000/api/v1/user/token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


    } catch (error) {
      console.log(error)
    }
    
    const formData = new FormData();
    formData.append("file", product.image);
    formData.append("name", product.name);
    formData.append("manufacturerName", product.manufacturerName);
    formData.append("requestedBy", response.data.id);

    axios
      .post("http://localhost:5000/api/v1/request", formData)
      .then((response) => {
        setAlert({status: true, message: response.data})
        setProduct({name: "", manufacturerName: "", image: null})
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem("token");
    if(!user){
      push("/login")
    }
  }, [])

  return (
    <form className={styles.container} onSubmit={handleUpload}>
      <h1 className={styles.title}>Request Product</h1>
      <div className={styles.productDetails}>
        <div className={styles.nameContainer}>
          <label htmlFor="productName">Product Name*</label>

          <input
            type="text"
            id="productName"
            name="productName"
            className={styles.inputs}
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>

        <div className={styles.manufacturerContainer}>
          <label htmlFor="manufacturerName">Manufacturer Name*</label>

          <input
            type="text"
            id="manufacturerName"
            className={styles.inputs}
            value={product.manufacturerName}
            onChange={(e) =>
              setProduct({ ...product, manufacturerName: e.target.value })
            }
          />
        </div>

        <div className={styles.imageContainer}>
          <label htmlFor="image" className={styles.textLabel}>
            Upload Image
          </label>

          <input
            type="file"
            id="image"
            className={styles.image}
            onChange={handleFileChange}
          />

          <label htmlFor="image" className={styles.imageLabel}>
            <AddPhotoAlternateIcon className={styles.imageIcon} />

            {product.image ? product.image.name : "click on the icon"}
          </label>
        </div>
      </div>

      <div className={styles.processContainer}>
        <p className={styles.processTitle}>Process of request acceptance</p>

        <ol className={styles.conditions}>
          <li>
            Our team will review the product and then if it is feasible and meet
            our plateform criteria then we will make the product available on
            our platform.
          </li>
          <li>
            The request will take 3-4 business days to process. We will
            appreciate your patience.
          </li>
          <li>
            If our agent doesn't respond to you in given days then please
            contact support to check your request status
          </li>
        </ol>

        <button type="submit" className={styles.button}>
          Submit to Review
        </button>
      </div>
      {alert.status && <CustomAlert />}
    </form>
  );
}
