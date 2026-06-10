import './payment.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Images } from '../utils';

const PaymentPage = () => {
    const navigate = useNavigate()
    const [method, setMethod] = useState<string>("online");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expiry, setExpiry] = useState<string>("");
    const [cvv, setCvv] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handleCardNumberChange = (str: string) => {
        const value = str;

        if (!/^\d*$/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                cardNumber: "Card number must contain only numbers",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                cardNumber: "",
            }));
        }

        setCardNumber(value);
    };

    const handleExpiryChange = (str: string) => {
        let value = str;

        if (value.length < expiry.length) {
            setExpiry(value);
            return;
        }

        let numbers = value.replace(/\D/g, "");

        numbers = numbers.substring(0, 4);

        if (numbers.length >= 2) {
            value = numbers.substring(0, 2) + "/" + numbers.substring(2);
        } else {
            value = numbers;
        }

        setExpiry(value);

        const month = Number(value.substring(0, 2));
        if (month > 12) {
            setErrors((prev) => ({
                ...prev,
                expiry: "Invalid month",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                expiry: "",
            }));
        }
    };



    const handleCvvChange = (str: string) => {
        const value = str;
        let cvv = value.replace(/\D/g, "");

        if (cvv.length > 3) {
            setErrors((prev) => ({
                ...prev,
                cvv: "CVV must be 3 digits only",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                cvv: "",
            }));
        }

        setCvv(cvv);
    };

    const handleSubmit = () => {
        setShowPopup(true)
    }
    const closePopup = () => {
        setShowPopup(false)
        navigate('/dashboard')
        
    }

    return (
        <div className="payment-container">
            <div className='payment-page'>
            <div className="payment-card">
                <h2>Payment Method</h2>
                <div className='radio-btn'>

                    <label className={`radio-label ${method === "online" ? "active" : ""}`}>
                        <input
                            className="radio"
                            type="radio"
                            name="payment"
                            value="online"
                            checked={method === "online"}
                            onChange={(e) => setMethod(e.target.value)}
                        />
                        <span>Online Payment</span>
                    </label>


                    <label className={`radio-label ${method === "offline" ? "active" : ""}`}>
                        <input
                            className="radio"
                            type="radio"
                            name="payment"
                            value="offline"
                            checked={method === "offline"}
                            onChange={(e) => setMethod(e.target.value)}
                        />
                        Offline Payment
                    </label>
                </div>

                <div className="amount-box">
                    <p>Amount to be paid</p>
                    <h1>$79</h1>
                </div>
                <div className='form'>
                    <div className='card-details'>
                        <label>Full Name on Card</label>
                        <input className='input' type="text" placeholder="John Smith" />
                    </div>
                    <div className='card-details'>
                        <label>Card Number</label>
                        <div className='card-input-wrapper'>
                            <input className='input' type="text" placeholder="0000-0000-0000-0000" value={cardNumber} onChange={(e) => handleCardNumberChange(e.target.value)} />
                            {errors.cardNumber && (
                                <p className="error">{errors.cardNumber}</p>
                            )}
                            <div className="card-icons">
                                <span className="visa">VISA</span>

                                <div className="mastercard">
                                    <div className="circle red"></div>
                                    <div className="circle orange"></div>
                                </div>

                                <span className="paypal">P</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className='card-details card-row'>
                            <label>Expiry Date</label>
                            <input className='input' type="text" value={expiry} placeholder="MM/YY" onChange={(e) => handleExpiryChange(e.target.value)} maxLength={5} />
                            {errors.expiry && (
                                <p className="error">{errors.expiry}</p>
                            )}

                        </div>
                        <div className='card-details card-row'>
                            <label>Security Code</label>
                            <input className='input' type="text" placeholder="CVV" value={cvv} onChange={(e) => handleCvvChange(e.target.value)} />
                            {errors.cvv && (
                                <p className="error">{errors.cvv}</p>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <button className="cancel-btn card-row">Cancel</button>
                        <button className="proceed-btn card-row" onClick={handleSubmit}>Proceed</button>
                    </div>
                </div>
            </div>
            {showPopup ? (<div className='popup-overlay'>
                <div className='popup-box'>
                    <img src={Images.successIcon} alt='successIcon'/>
                    <h2>Payment Completed Successfully</h2>
                    <p>Welcome to Dispatch Agent 0.02! Your subscription is now active.</p>
                    <button className='popup-btn' onClick={closePopup}>OK</button>
                </div>
            </div>) : ''}
            </div>
        </div>
    );
};

export default PaymentPage;
