import { Images } from '../../Pages/utils';
import styles from './whatsappConfig.module.scss';

const WhatsappConfig = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Whatsapp Agent</h1>

      <div className={styles.whatsappCard}>
        <img
          src={Images.whatsappIcon}
          alt="WhatsApp Business"
          className={styles.whatsappLogo}
        />
        <p className={styles.description}>
         Enable yourAI Agent to respond to messages sent to your WahtsApp Business account
        </p>
      </div>

      <p className={styles.loginLabel}>Login with</p>
      <div className={styles.loginOptions}>
        <div className={styles.loginIconDiv}>
            <img src={Images.googleIcon} alt="Login with Google" />
        </div>
        <div className={styles.loginIconDiv}>
            <img src={Images.facebookIcon} alt="Login with Facebook" />
        </div>
      </div>
    </div>
  );
};

export default WhatsappConfig;
