import styles from  './ComingSoon.module.scss';
import { Images } from '../utils';

function ComingSoon() {
  return (
    <div className={styles.comingSoon}>
      <img src={Images.agentlistComingSoon}  />
    </div>
  )
}

export default ComingSoon