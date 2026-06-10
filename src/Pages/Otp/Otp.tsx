import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import  "./Otp.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getPassphrase } from "../../utils/passphraseStore";
import { confirmSignIn, confirmSignUp, getSession, getUser, resendSignUpCode, signIn } from "../../api/auth";
import { api, dismissKeyboard } from "../../api/client";
import { userMgmtLogin } from "../../utils/UserManager";
import Alert from "../../Components/Alert/Alert";
import { Images } from "../utils";
import { useAuth } from "../../Context/AuthContext";
import mixpanel from "mixpanel-browser";
import { userLoginTrack } from "../../utils/mixpanel";


function Otp() {
     const { login } = useAuth();
    const [form] = Form.useForm();
    const [otp, setOtp] = useState<string>('')
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const { state } = useLocation();
    

    const email = state?.email || '';
    const registered = state?.registered || false;

    const [acceptedTerms, setAcceptedTerms] = useState(registered ? true : false);
    const [resending, setResending] = useState(false);
    const [isVerifing, setIsVerifing] = useState(false);
    const [alertMessage, setAlertMessage] = useState<any>({severity: 'error', message: ''});
    const [showSuccess, setShowSuccess] = useState(false);

    const paramsRef :any = React.useRef(null);
    const otpInputRef :any = React.useRef(null);
    const passphraseRef  :any = React.useRef(null);

    React.useEffect(() => {
        // Auto focus OTP field on screen open
        otpInputRef.current?.focus?.();
        // Initialize passphrase if it was received before this screen mounted
        try {
            const existing = getPassphrase?.();
            if (existing) passphraseRef.current = existing;
        } catch (_) {
        }
    }, []);

    React.useEffect(() => {
        const onMessage = (event:any) => {
            const data = event?.data || {};
            const type = data?.type || '';
            if (type === 'PASSPHRASE' || type === 'SET_PASSPHRASE') {
                const payload = data?.payload || {};
                const received = payload?.passphrase || data?.passphrase || '';
                if (received) {
                    passphraseRef.current = received;
                }
            }
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

     React.useEffect(() => {
        console.log(' passphraseRef.current --- USEF',  passphraseRef.current)
    }, [passphraseRef]);

    const handleVerifyOtp = async () => {
        if (isVerifing || resending) return;
        const isValid = /^\d{4,8}$/.test(otp.trim());
        if (!isValid) {
            setError('Please enter a valid OTP code.');
            return;
        }
        if (!registered && !acceptedTerms) {
            setError('Please accept the terms & conditions to continue.');
            return;
        }
        setError('');
        dismissKeyboard(otpInputRef); 
        try {
            setIsVerifing(true);
            
            const result :any = registered ? await confirmSignIn(otp) : await confirmSignUp(email, otp);
            console.log('OTP verification result:', result);
            const {isSignedIn, isSignedUp, isSignUpComplete} = result || {};
            if (isSignedUp || isSignUpComplete) {
                setShowSuccess(true);
            } else if (isSignedIn) {
                // Handle sign in case if needed
                const session = await getSession(); 
                const authUser:any = await getUser();
                console.log('Auth User:', session, authUser);
                const {tokens} = session || {};
                const {accessToken} = tokens || {};
                if (accessToken) { 
                    const credentials :any = await api.post('/api/v1/cognito/exchange-token', {
                        token: accessToken.toString(),
                    });
                    console.log('Credentials response:', credentials);
                    const {access_token: iamToken} = credentials || {};
                    if (iamToken) {
                        let openRegister = !registered || isSignUpComplete;
                        const {attributes} = (authUser || {});
                        const {given_name, family_name, nickname} = attributes || {};
                        if (
                            (!given_name && !family_name) || !nickname) {
                            openRegister = true;
                        }
                        paramsRef.current = {
                            email: email,
                            registered: registered,
                            credentials: credentials,
                            user: authUser,
                        };
                        if (openRegister) {
                            setShowSuccess(true);
                        } else {
                            // const walletData = await userMgmtLogin(credentials, {passphrase: passphraseRef.current || getPassphrase?.()});
                            const walletData = await userMgmtLogin(credentials);
                            console.log('Wallet data from UserManager.login:', walletData);
                            if (!walletData) {
                                setAlertMessage({
                                    severity: 'error',
                                    message: 'Failed to load your profile. Please try again.'
                                });
                            } else {
                                console.log('Navigating to success with wallet data:', walletData);
                                let userObject ={
                                    email: paramsRef.current.email,
                                    id: paramsRef.current.user?.userId,
                                    name: paramsRef.current.user?.attributes?.nickname,
                                    protectedPriKey: walletData?.protectedPKey,
                                    protectedAccToken: walletData?.protectedAToken,
                                }
                                if(walletData?.protectedAToken) localStorage.setItem('iam', walletData?.protectedAToken);
                                login(userObject)
                                userLoginTrack({
                                    id: userObject.id,
                                    email: userObject.email,
                                    name: paramsRef.current.user?.attributes?.name,
                                    userName: paramsRef.current.user?.attributes?.nickname,
                                });
                                navigate('/agent-list');
                            }
                        }
                    } else {
                        // Handle case where iamToken is missing
                        console.log('IAM token missing from credentials:', credentials);
                        setAlertMessage({severity: 'error', message: 'Authentication failed. Please try again.'});
                    }
                }
            } else {
                // Unknown result state
                setAlertMessage({severity: 'error', message: 'OTP verification failed. Please try again.'});
            }
        } catch (err) {
            console.error('OTP verification failed:', err);
            const errorDetails = err?.toString() || '';
            if (errorDetails.includes('SignInException') ||
                errorDetails.includes('SignUpException') ||
                errorDetails.includes('CodeMismatchException') ||
                errorDetails.includes('ExpiredCodeException') ||
                errorDetails.includes('NotAuthorizedException')) {
                setAlertMessage({severity: 'error', message: 'Invalid OTP code. Please try again.'});
            } else {
                setAlertMessage({severity: 'error', message: 'OTP verification failed. Please try again.'});
            }
        } finally {
            setIsVerifing(false);
        }
    };

     const handleResendOtp = async () => {
        if (resending || isVerifing) return;
        dismissKeyboard(otpInputRef);
        try {
            setResending(true);
            setError('');
            setOtp('');
            const result = registered ? await signIn(email) : await resendSignUpCode(email); 
            console.log('Resend OTP result:', result);
            setAlertMessage({severity: 'success', message: 'OTP resent successfully!'});
            // Focus back to OTP input after resending
            setTimeout(() => {
                otpInputRef.current?.focus?.();
            }, 1000);
        } catch (err) {
            console.log('Failed to resend OTP:', err);
            setAlertMessage({severity: 'error', message: 'Failed to resend OTP. Please try again.'});
        } finally {
            setResending(false);
        }
    };

    // const onFinish = async (values: any) => {

    // }
    const onFinishFailed = () => {
        // message.error("Please fix the validation errors.");
    };
    // console.log('state', state)

    const handleConfirmProceed = async () => {
        setShowSuccess(false);
        navigate('/register', {state: paramsRef.current});
    };

    // const handleConfirmCancel = () => {
    //     setShowSuccess(false);
    //     navigate('/');
    // };

  return (
    <>

    <div className="signupMain">
        <div className="signupCard agentShopIcon">
            <i className="agentFly"></i>
            <div className="SignupInnerContent">
                <div className="logoDiv">
                    <img src={Images.synergyMarketLogo } />
                </div>

                <div className="loginBox">
                        <h2>Check Your Email</h2>
                        <p>Security Code Sent to { state?.email  }</p>
                    <Form
                        form={form}
                        name="otpForm"
                        layout="vertical"
                        // onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                        //   label="Otp"
                        name="Otp"
                        rules={[
                            {
                            required: true,
                            message: "Otp is required",
                            }
                        
                        ]}
                        >
                        <Input 
                            ref={otpInputRef}
                            placeholder="Enter OTP" 
                            value={otp} 
                            onChange={(e) => { setOtp(e.target.value); }}
                            />
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary" onClick={handleVerifyOtp} block  loading={isVerifing} disabled={isVerifing}>
                            Verify
                        </Button>
                        </Form.Item>


                        {error ? <p className="error-text">{error}</p> : null}
                            {/* <Button onClick={handleVerifyOtp} loading={isVerifing} disabled={isVerifing}>Verify</Button> */}
                            {!registered && (
                                <label className="terms-row">
                                    <input
                                        type="checkbox"
                                        checked={acceptedTerms}
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        disabled={isVerifing}
                                    />
                                    <span>
                                        {' '}Accept the{' '}
                                          <a
                                              href="/terms-and-conditions"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 underline"
                                          >
                                            terms & conditions
                                        </a>
                                    </span>
                                </label>
                            )}

                            <p className="resend-row">
                                Didn't receive the OTP?{' '}
                                <a
                                    href="#"
                                    className={`resend-link${resending ? ' is-loading' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (resending) return;
                                        handleResendOtp();
                                    }}
                                >
                                    {resending ? (
                                        <>
                                            <span className="inline-spinner" aria-hidden="true"/>
                                            Resending...
                                        </>
                                    ) : (
                                        'Resend'
                                    )}
                                </a>
                            </p>

                            {alertMessage?.message ? (
                                <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
                            ) : null}
                            
                           <Modal
                            closable={false}
                            open={showSuccess}
                            onOk={handleConfirmProceed}
                            cancelButtonProps={{ style: { display: "none" } }}
                            >
                            <h2 className="pop_icon_title"><i style={{fontSize:'42px'}}>🎉</i> <span>Your Email has been verified successfully! </span></h2>
                                               
                            <p>We would like to know more about you. Kindly provide your details to proceed.</p>
                            
                            </Modal>
                    </Form>
                    
                    </div>
                
            </div>
        </div>
    </div>
    </>
    



  )
}

export default Otp