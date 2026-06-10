import { useNavigate, useParams } from 'react-router-dom';
import { Images } from '../utils';
import styles from './agentDetail.module.scss';
import { useEffect, useState } from 'react';
import AvatarTryMode from '../../Components/AvatarTryModel/AvatarTryModel';
import VoiceTryItModal from '../../Components/VoiceTryItModal';
// import { USER_TOKEN } from '../constants';
// import { getAgentDetails } from '../apis';
import PageLoader from '../../Components/PageLoader/PageLoader';
import { getAssetDetail } from '../../api/api';
import { useAuth } from '../../Context/AuthContext';

const AgentDetail = () => {
    const { user } = useAuth(); 
    const { id } = useParams()
    const [avatarDetails, setAvatarDetails] = useState<any>(null)
    const [selectedTryAvatar, setSelectedTryAvatar] = useState(null)
    const [voiceTryOpen, setVoiceTryOpen] = useState(false)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const fetchAgentDetails = async () => {
        try {
            const token = user?.protectedAccToken || '';

            const marketPlacePayload = {
                token: atob(token),
                assetId: id
            }

            const response = await getAssetDetail(marketPlacePayload);
            setAvatarDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch agents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // const selectedAvatar = avatarData.find(avatarItem => avatarItem.id == Number(id))
        fetchAgentDetails()
        // setAvatarDetails(selectedAvatar)
    }, [id])

    const onTryBtnClick = () => {
        if (avatarDetails.category === "Voice") {
            setVoiceTryOpen(true)
        }
        else if (avatarDetails.category === "Avatar") {
            setSelectedTryAvatar(avatarDetails)
        }
    }
    function capitalizeFirstLetter(text:string) {
        if(text){
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
        
    }
    function getPricingDetails(avatarDetails:any) {

        const price = avatarDetails?.purchasePrice
        const purchaseType = avatarDetails?.purchaseType
        
        if(price === 0){
            return "Free"
        }

        if(purchaseType === 'purchasing'){
            return (
                <>
                    ${price}
                    <span>/one time + </span>
                </>
            )
        }

        if(purchaseType === 'renting'){
            return (
                <>
                    ${price}
                    <span>/month + </span>
                </>
            )
        }
        return ""
        
    }

    return (
        loading?
            <PageLoader />
            :<div className={styles.agentDetailcontainer}>
            <div className={styles.agentDetailheader}>
                <div className={styles.profileSection}>
                    <div className={styles.temp}>
                                <p className={styles.backButton} onClick={() => navigate(-1)}>
                                    <img src={Images.arrowLeft} alt="arrow" />
                                    Back
                                </p>
                                <img
                                    src={avatarDetails?.imageUrl || Images.avatar2}
                                    alt="Agent"
                                    className={styles.agentProfileImg}
                                />
                            </div>
                    <div className={styles.agentInfo}>
                        <h2 className={styles.agentTitle}>{capitalizeFirstLetter(avatarDetails?.title)}</h2>
                        <p className={styles.category}>Industry: <strong className={styles.categoryName}> {avatarDetails?.industry[0] ? capitalizeFirstLetter(avatarDetails?.industry[0]) : "General"}</strong></p>
                        <p className={styles.description}>
                            {capitalizeFirstLetter(avatarDetails?.description)}
                        </p>
                        <div className={styles.bannerButtons}>
                            <button onClick={() => navigate(`/checkout/${id}`)} className={styles.subscribeBtn}>Subscribe Now</button>
                        </div>
                    </div>
                    <div className={styles.extraDiv}></div>
                </div>
            </div>

            <div className={styles.agentFeatures}>
                <h3>Features & Capabilities</h3>

                <div className={styles.agentFeatureRow}>
                    <span className={styles.featureType}>Listing Type:</span>
                    <div className={styles.featureTypeBadges}>
                        <span>Fine-tuned LLM</span>
                        <span className={styles.plus}>+</span>
                        <span>Rule-Based AI</span>
                    </div>
                </div>

                <div className={styles.agentFeatureRow}>
                    <span className={styles.featureType}>Interfaces:</span>
                    <div className={styles.featureTypeBadges}>
                    {
                        avatarDetails?.supportedInterfaces.map((interfaceType:any) => {
                            return (
                                <span key={interfaceType}><img src={interfaceType === 'chat' ? Images.chatStrokeIcon : interfaceType === 'voice' ? Images.voiceStrokeIcon : Images.iotIcon}/> {capitalizeFirstLetter(interfaceType)}</span>
                            )
                        })
                    }
                    </div>
                </div>

                <div className={styles.agentFeatureRow}>
                    <span className={styles.featureType}>Use Cases:</span>
                    <div className={styles.featureTypeBadges}>
                        <span>Fleet tracking</span>
                        <span>Automated Dispatch</span>
                        <span>Order Routing</span>
                    </div>
                </div>
            </div>

            <div className={styles.howItWorks}>
                <h3>How Dispatch Agent Works</h3>
                <p>
                    A logistics company integrates Dispatch Agent into its fleet tracking system.
                    The AI monitors real-time delivery status, sends automated alerts to customers,
                    and optimizes dispatching based on delivery routes.
                </p>
            </div>

            <div className={styles.pricingBox}>
                <h2>
                    {getPricingDetails(avatarDetails)}{avatarDetails?.purchasePrice ? <span className={styles.freeCreditTag}>Free Credits</span> : ''}
                </h2>
                <button className={styles.subscribeBtn} onClick={(e) => {
                          e.preventDefault();
                          navigate(`/checkout/${id}`);
                        }}>Subscribe Now</button>
            </div>
            <AvatarTryMode
                selectedTryAvatar={selectedTryAvatar} onClose={() => setSelectedTryAvatar(null)}
            />
            <VoiceTryItModal
                open={voiceTryOpen} onClose={() => setVoiceTryOpen(false)}
            />
        </div>
    );
};

export default AgentDetail;
