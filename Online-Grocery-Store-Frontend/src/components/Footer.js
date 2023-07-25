import styles from '../styles/Footer.module.css';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.customerServiceContainer}>
            <h3 className={styles.customerServiceTitle}>Customer Service</h3>

            <ul className={styles.customerServiceList}>
              <li className={styles.customerServiceItem}>Return and Refunds</li>
              <li className={styles.customerServiceItem}>Terms & Conditions</li>
            </ul>
          </div>

          <div className={styles.conpanyInfoContainer}>
            <h3 className={styles.companyInfoTitle}>Company Info</h3>

            <ul className={styles.companyInfoList}>
              <li className={styles.companyInfoItem}>+92 336 7966034</li>
              <li className={styles.companyInfoItem}>info@freshcart.com</li>
              <li className={styles.companyInfoItem}>Privacy Policy</li>
              <li className={styles.companyInfoItem}>About us</li>
            </ul>
          </div>

          <div className={styles.helpAndSupportContainer}>
            <h3 className={styles.helpAndSupportTitle}>Help and Support</h3>

            <ul className={styles.helpAndSupportList}>
              <li className={styles.helpAndSupportItem}>FAQ's</li>
              <li className={styles.helpAndSupportItem}>Careers</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.trademark}>© FreshCart PRIVATE LIMITED</div>

          <ul className={styles.socialLinks}>
            <li className={styles.socialLink}>
                <FacebookIcon className={styles.socialIcons}/>
            </li>
            <li className={styles.socialLink}>
                <InstagramIcon className={styles.socialIcons}/>
            </li>
            <li className={styles.socialLink}>
                <TwitterIcon className={styles.socialIcons}/>
            </li>
            <li className={styles.socialLink}>
                <YouTubeIcon className={styles.socialIcons}/>
            </li>
          </ul>
        </div>
      </>
    );
}

export default Footer;