import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { Images } from "../utils";
import { getSession, updateUser } from "../../api/auth";
import { api } from "../../api/client";
import { createWallet } from "../../utils/walletManager";
import Alert from "../../Components/Alert/Alert";
import { userMgmtLogin } from "../../utils/UserManager";
import { useLocation, useNavigate } from "react-router-dom";
import  "./SignupOrLogin.scss";
import mixpanel from "mixpanel-browser";
import { userSignupTrack } from "../../utils/mixpanel";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
}

const Register: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [isRegistering, setIsRegistering] = useState(false); 
  const [alertMessage, setAlertMessage] = useState({severity: 'error', message: ''});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate(); 
  const {state} = useLocation();

  const {credentials} = state || {};
    React.useEffect(() => {
        if (!state || !state.credentials) {
            navigate("/auth", { replace: true });
        }
    }, [state, navigate]);

  const onFinish = async (values: RegisterFormValues) => {
    console.log("Register form values:", values);
    // TODO: call register API here

     
    try {
        setIsRegistering(true);
        const {firstName, lastName, username} = values || {};
        const givenName = (firstName || '').trim().replace(/[’]/g, "'");
        const familyName = (lastName || '').trim().replace(/[’]/g, "'");
        const nickname = (username || '').trim().replace(/[’]/g, "'");
        const name = [givenName, familyName].filter(s => s !== '').join(' ').trim();
        const body = {
            given_name: givenName,
            family_name: familyName,
            nickname: nickname,
        };
        const response = await updateUser({
            ...body,
            name: name,
        });
        console.log('Register => updateUser: ', response);
        const {given_name} = response || {};
        if (given_name) {
            const session = await getSession(); 
            const accessToken = session?.tokens?.accessToken.toString() || '';
            const {access_token: iamToken} = credentials || {};
            const syncResponse:any = await api.post('/api/v1/cognito/sync-user', {token: accessToken}); 
            console.log('Register => syncUser: ', accessToken, syncResponse);
            const {error: syncError} = syncResponse || {};
            if (!syncError) {
                // Create wallet
                const walletData = await createWallet(iamToken); 
                if (walletData) {
                    console.log('Register => createWallet success: ', walletData);
                    // const loginData = await userMgmtLogin(credentials, {passphrase: getPassphrase?.()}); 
                    const loginData = await userMgmtLogin(credentials); 
                    console.log('Register => login success: ', loginData);
                    if (!loginData) {
                        setAlertMessage({
                            severity: 'error',
                            message: 'Failed to load your profile. Please try again.'
                        });
                    } else {
                        console.log('Navigating to success with wallet data:', walletData);
                        userSignupTrack({
                            id: state?.user?.userId,
                            email: state?.email,
                            name: name,
                            userName: nickname,
                        });
                        setRegisterSuccess(true);
                        // navigate('/agent-list');
                    }
                } else {
                    console.error('Register => createWallet failed: ', walletData);
                    setAlertMessage({
                        severity: 'error',
                        message: 'Your wallet was not created successfully. Please try again.'
                    });
                }
            } else {
                console.error('Register => syncUser failed: ', syncResponse);
                setAlertMessage({
                    severity: 'error',
                    message: 'Your information was not updated successfully. Please try again.'
                });
            }
        } else {
            console.error('Register => syncUser failed: ', response);
            setAlertMessage({
                severity: 'error',
                message: 'Your information was not updated successfully. Please try again.'
            });
        }
    } catch (err:any) {
        console.error('Registration failed:', err);
        const message = err?.message || '';
        if (
            message &&
            message.includes('User needs to be authenticated to call this API')
        ) {
            // setDialogOpen(true);
        } else {
            setAlertMessage({
                severity: 'error',
                message: 'Registration failed. Please try again.'
            });
        }
    } finally {
        setIsRegistering(false);
    }
  };



  return (
    
    <div className="signupMain ">
            
            <div className="signupCard agentShopIcon">
                <i className="agentFly"></i>
                <div className="SignupInnerContent">
                    <div className="logoDiv">
                        <img src={Images.synergyMarketLogo } />
                    </div>
                    <h1 className="create_acc_title">Create Account</h1>
                    <div  className="loginBox">
                         <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ maxWidth: 400, margin: "0 auto" }}
                            >
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: "Please enter your first name" }]}
                            >
                                <Input placeholder="Enter first name" />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: "Please enter your last name" }]}
                            >
                                <Input placeholder="Enter last name" />
                            </Form.Item>

                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                { required: true, message: "Please enter a username" },
                                { min: 3, message: "Username must be at least 3 characters" },
                                ]}
                            >
                                <Input placeholder="Enter username" />
                          </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block loading={isRegistering} disabled={isRegistering}>
                                Register
                                </Button>
                            </Form.Item>
                            {alertMessage?.message ? (
                                <Alert severity={'error'}>{alertMessage.message}</Alert>
                            ) : null} 
                        </Form>
                    

                        
                      </div>
                    
                </div>
            </div>
            <Modal
                // title="IMPORTANT"
                closable={false}
                open={registerSuccess}
                onOk={()=> navigate('/auth')} 
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <h2 className="pop_icon_title"><img src={Images.infoIcon} /> <span>Registration Successful! 🎉</span></h2>
                <p>Please log in again to continue</p>
            
            </Modal>
    </div>
   
  );
};

export default Register;
