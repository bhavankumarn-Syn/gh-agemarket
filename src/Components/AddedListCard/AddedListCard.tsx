import React from 'react';
import styles from './addedKbListCard.module.scss';
import { EditOutlined } from '@ant-design/icons';
import { Images } from '../../Pages/utils';

interface SynergeticsCardProps {
  data:any
}
const SynergeticsCard: React.FC<SynergeticsCardProps> = ({data}) => {

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconContainer}>
        <img src={Images.AddChatIcon} />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>Synergetics AI Company</div>
        <div className={styles.subtitle}>{data?.content}</div>

        <div className={styles.divider}></div>

        <div className={styles.kbCardfooter}>
          <span className={styles.learnAt}>Agent learned on Apr 25, 2025 3:21 AM</span>
          <button className={styles.editButton}>
            Edit
            <span className={styles.editIcon}><EditOutlined style={{ color: "#ffffff !important" }} className={styles.editIconComp} /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SynergeticsCard;
