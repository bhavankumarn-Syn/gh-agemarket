import styles from './SubscribeStatus.module.scss';
import React, { useEffect, useState } from 'react';
import successImg from './assets/icon_success.png';
import failImg from './assets/icon_failed.png';
import cancelImg from './assets/icon_canceled.png';

// import { Button, ButtonType } from '@/commoncomponents/Button/Button';
import { useNavigate } from 'react-router-dom';

interface PlanPaymentStatusProps {
    status: "success" | "failure" | "canceled";
}

// Define the content type to match the shape of your data
interface ContentData {
  status: "success" | "failure" | "canceled";
  img: string;
  title: string;
  text: string;
  class: string;
}

const contentData: ContentData[] = [ 
  {
    status: "success",
    img: successImg,
    title: 'Subscription Successful',
    text: 'Your subscription has been activated successfully',
    class: 'success'
  },
  {
    status: "failure",
    img: failImg,
    title: 'Subscription Failed',
    text: "We're unable to process your subscription at this time. Please try again later",
    class: 'fail'
  },
  {
    status: "canceled",
    img: cancelImg,
    title: 'Subscription Cancelled',
    text: 'Your subscription was cancelled. Please try again later.',
    class: 'cancel'
  }
];

{/* This Components Used in 2 places one is /plans & another one is /pricing-lander  */}

const SubscribeStatus = ({ status }: PlanPaymentStatusProps) => {
  // Set the state with the correct type
  const [content, setContent] = useState<ContentData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter the array to find the matching status object
    const matchedContent = contentData.find(item => item.status === status);
    if (matchedContent) {
      setContent(matchedContent);
    }
  }, [status]);
 

  if (!content) {
    return null; // Or return a loading state or an error message
  }
  return (
    <section className={styles.statusBoxOuter}> 
      <div className={`${styles.statusBox} ${styles[content.class]}`}>
        <div className={styles.statusBoxInner}>
          <img src={content.img} alt={content.title} />
          <h3>{content.title}</h3>
          <p>{content.text}</p>
          {/* <Button buttonType={ButtonType.PRIMARY} onClick={() => { window.location.href = '/plans'; }} className={styles.addFundBtn}>Close</Button> */}
        </div>
      </div>
    </section>
  );
};

export default SubscribeStatus;
