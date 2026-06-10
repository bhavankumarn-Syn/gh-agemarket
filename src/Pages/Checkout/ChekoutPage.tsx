import { Button, message } from "antd";
import { Images } from "../utils";
import "./checkout.scss"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { signOut } from "../../api/auth";
import { assetSubscription } from "../../api/api";
import { getAssetDetail } from "../../api/api";
import axios from "axios";
import { getPlanDisplayName } from "../../utils/commonData";


interface PlanType {
    id: number,
    name: string,
    price: number | string,
    // purchaseType: string,
    type: string,
    typeFromBackend: string,
    value: string,
    recommended?: boolean,
}
interface Agent {
  _id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  supportedInterfaces?: string[];
  category?: string;
  purchasePrice?: number;
  purchaseTypes?: {}[];
  availableCurrencies?: Array<{ code: string }>;
  damId: string;
  itemId: string;
  industry: string;
}



const CheckoutPage = () => {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const [activeCardType, setActiveCardType] = useState<string>("")
    const [agent, setAgent] = useState<Agent | null>(null)
    const [btnLoading, setBtnLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<PlanType[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const [onlyFree, setOnlyFree] = useState<boolean>(false);
    

    const navigate=useNavigate()
    const {agentId}=useParams()
    

    useEffect(() => {
        
        const fetchAssetDetail = async () => {
            const token = user?.protectedAccToken || '';
            const assetPayload = {
                token: atob(token),
                assetId: agentId
            }
            const response = await getAssetDetail(assetPayload)

            if (response?.success && response?.data) {
                const assetData = response.data;


                const availablePlans = [...assetData.purchaseOptions]

                const mappedPlans :{[key: string]: any}[] = availablePlans.map((option: any, index: number) => {
                    let price: number | string = assetData.purchasePrice || 0;
                    let typeTraveller =  option?.purchaseType?.purchaseType ;
                    let type = typeTraveller === "renting" ? "MONTHLY" :  typeTraveller === "purchasing" ? "ONE_TIME" :  typeTraveller === "freemium" ? "FREE" : ''
                    
                    return {
                        id: index + 1,
                        name: getPlanDisplayName(option?.purchaseType?.purchaseType), 
                        type: type,
                        typeFromBackend: option?.purchaseType?.purchaseType,
                        price: option?.displayPrice,
                        value: type === "MONTHLY" ? "SUBSCRIPTION" : type
                       
                    }
                })
                if(mappedPlans.length === 1) {
                    setActiveCardType(mappedPlans[0].typeFromBackend)
                    if(mappedPlans[0].typeFromBackend.toLowerCase().includes("free")) {
                       
                        setOnlyFree(true)
                    }
                } 
  
                setAgent({
                    _id: assetData._id,
                    title: assetData.title,
                    imageUrl: assetData.imageUrl,
                    description: assetData.description,
                    supportedInterfaces: assetData.supportedInterfaces || [],
                    category: assetData.category,
                    purchasePrice: assetData.purchasePrice,
                    purchaseTypes: mappedPlans.length > 0 ? mappedPlans : [],
                    availableCurrencies: assetData.availableCurrencies || [{ code: 'usd' }],
                    damId: assetData.damId,
                    itemId: assetData._id,
                    industry: assetData.industry[0],
                });
            } else {
                message.error('Failed to load agent details');
            }
        }
        if (agentId && user?.protectedAccToken) {
            fetchAssetDetail();
        }
        
    },[])

    const toggleProfile = (): void => {
        setIsProfileOpen(!isProfileOpen);
    };
    function capitalizeFirstLetter(text:string | undefined) {
        if(text){
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
        
    }

    const handleActiveCard =  (plan:PlanType) => {
        
        setActiveCardType(plan.typeFromBackend)
    }

    const handleCheckout = async () => {
        if(activeCardType === "") {
            messageApi.error("Please select a plan to proceed")
            return;
        }
        setBtnLoading(true)
        try {
            let approvalUrl = "";
            let isFreeFlagFromBackend :boolean;
            const token = user?.protectedAccToken || '';
            const baseUrl = window.location.origin; // gets current host
            const payload = {
                token: atob(token),
                itemId: agent?.itemId,
                // itemId: "69c67cf2eb1e7496ca8ae5c1",
                purchaseType: activeCardType,
                returnUrl: `${baseUrl}/success`,
                cancelUrl: `${baseUrl}/failed`,
                assetName: agent?.title
            }
            // return
            const response = await assetSubscription(payload)
            console.log("checkout response is ", response)

            approvalUrl =  response?.approvalUrl; 
            isFreeFlagFromBackend = response?.freemium ?? false;

            if (response?.success === false) {
                messageApi.error(response?.message)
                setBtnLoading(false)
                return;
            }
            if (isFreeFlagFromBackend === true) {
                setBtnLoading(false)
                navigate("/success")
                return;
            }
            // Only free plan doesn't requires paypal redirection, so we navigate user to success page directly
            // if (onlyFree && approvalUrl == '') {
            //     setBtnLoading(false)
            //     navigate("/success")
            // }
            // Redirect to the paypal URL 
            if (approvalUrl) {
                setBtnLoading(false) 
                window.location.href = approvalUrl;
                
            } else {
                // Handle unexpected cases where the payment URL is missing
                setBtnLoading(false)
                navigate("/failure")
                console.error("Payment URL not found in the response.");
                message.error("Unable to proceed to payment. Please try again later.");
            }
        }
        catch(err) {
            message.error("Failed to get payment")
        }
    }

    return (
        <>
            <div className="checkout-container">
                <div className="checkout-page">
                <div>
                    <span className="back-to-mkt" onClick={() => navigate(-1)}>
                        <img src={Images.backIcon} />
                        <span>Back to Marketplace</span>
                    </span>
                </div>
                
                <div className="checkout-main">
                    <div className="checkout-content">
                    <img className="profile-img" src={agent?.imageUrl} alt='avatar'/>
                    <h1 className="checkout-title">{capitalizeFirstLetter(agent?.title)}</h1>
                    <p>Industry: <span>{agent?.industry ? capitalizeFirstLetter(agent?.industry) : "General"}</span></p>
                    <p className="subtitle">
                       {capitalizeFirstLetter(agent?.description)}
                    </p>

                    <h2 className="choose-plan">Choose Your Plan</h2>
                    <div className="checkout-section">
                    <div className="checkout-plans">
                        

                        {agent?.purchaseTypes && agent?.purchaseTypes.map((plan: any) => { 
                            // console.log("plan is ", plan)
                            return (
                                <div
                                    key={plan.id}
                                    className={`card ${activeCardType === plan.typeFromBackend ? "active-card" : ""}`}
                                    onClick={() => handleActiveCard(plan)}
                                >
                                    <h3>{plan?.name}</h3>

                                    <p className="price">
                                        <span className="amount">${plan.price} {plan.name.toLowerCase().includes("monthly") && (<span className="duration">/ month </span>)}</span>
                                    </p>
                                </div>
                            );
                        })}
                        
                    </div>
                    {contextHolder}
                     <Button type="primary" loading={btnLoading} className="checkout-btn" onClick={handleCheckout}>Subscribe</Button>
                    </div>
                    </div>
                    
                    <div className="info-section">
                        {/* <div className="info-item">
                            <p className="info-title">Tools Integration</p>
                            <p className="info-value">HubSpot, Jira, QuickBooks</p>
                        </div> */}
                        <div className="info-item">
                            <p className="info-title">Industry</p>
                            <p className="info-value">{agent?.industry ? capitalizeFirstLetter(agent?.industry) : "General"}</p>
                        </div>
                        <div className="info-item">
                            <p className="info-title">Model Type</p>
                            <p className="info-value">Fine-tuned LLM | RAG</p>
                        </div>
                        <div className="info-item">
                            <p className="info-title">Interface</p>
                            <p className="info-value">
                            {
                                (agent?.supportedInterfaces ?? []).map((iFace, index, arr) => {
                                    return <>
                                        <span key={index}>
                                            {iFace}
                                            {index < arr.length - 1 && ", "}
                                        </span>
                                        
                                    </>
                                })
                            }
                            </p>
                        </div>
                        <div className="info-item">
                            <p className="info-title">Agent Type</p>
                            <p className="info-value">Avatar</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
  );
};

export default CheckoutPage;