import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import  "./SignupOrLogin.scss";
import { checkEmail } from "../../api/api";
import { signIn, signOut, signUp } from "../../api/auth";
import Alert from "../../Components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { Images } from "../utils";
import { useAuth } from "../../Context/AuthContext";
import { authConfig } from "../../utils/config";

interface LoginFormValues {
  email: string;
}

const SignupOrLogin: React.FC = () => {

  const { user } = useAuth(); 
  const [form] = Form.useForm<LoginFormValues>();
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [signupConfirmModal, setSignupConfirmModal] = useState<boolean>(false)
  const [signupConfirmLoading, setSignupConfirmLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>('')
  const navigate = useNavigate()
  // const [messageApi, contextHolder] = message.useMessage();


   const handleEmailSignIn = async () => {
        try {
            // This is a placeholder for actual login logic
            // Currently just signing out for demonstration
            await signOut(); 
        } catch (err) {
            console.log('Login error:', err);
        }

        try {
            // Add actual login logic here
            
            const response = await signIn(email); 
            console.log('Login response:', response);
            navigate('/otp', {
                state: {
                    email,
                    registered: true
                }
            });
        } catch (err) {
            console.log('Login execution error:', err);
            // Show alert for login failure
            // setAlertMessage(err?.message || 'Login failed. Please try again.');
        }
    };

  const onFinish = async (values: LoginFormValues) => {
    console.log("Email submitted:", values.email);
    message.success("Email submitted successfully!");
    if(values.email){
        setEmail(values.email)
        console.log('values.email', values.email)
        
    }

    try {
      setLoading(true);
      const checkEmailResp :any = await checkEmail(email); 
      console.log('checkEmailnresult', checkEmailResp)
      const {status, message} = checkEmailResp || {};      

            if (['PENDING_DELETED', 'BLOCKED'].includes(status)) {
                // Account is suspended, show error page
                // navigate('/error', {
                //     state: {
                //         title: 'Account Suspended',
                //         message: 'Your account has been temporarily suspended. Please contact support for more information.',
                //         buttonTitle: 'Contact Support',
                //         buttonLink: 'https://synergetics.ai/contact/'
                //     }
                // });
            } else if (['NOT_REGISTERED'].includes(status)) {
                // Email does not exist, show error or redirect to signup
                console.log('NOT_REGISTERED')
                setSignupConfirmModal(true);
            } else {
                const isInvalidEmail = `${message || ''}`.includes('Invalid email');
                if (isInvalidEmail) { 
                   
                    setErrMsg('Invalid email address. Disposable email addresses are not allowed. Please use a valid personal or work email to continue.');
                } else {
                    // Handle other cases - maybe log or show a generic message
                    await handleEmailSignIn();
                }
            }
      
    } catch (error) {
      ;
    } finally {
      setLoading(false);
    }
    
  };

   const handleEmailSignUp = async () => {
        console.log('Register clicked with email:', email);
        try {
            setSignupConfirmLoading(true);
            // Add register logic here
            const result = await signUp(email); 
            console.log('Signup result:', result);
            // After successful signup, navigate to OTP page
            navigate('/otp', {
                state: {
                    email,
                    registered: false
                }
            });
        } catch (err) {
            console.error('Register error:', err);
            if (err?.toString()?.includes('UsernameExistsException')) {
                await handleEmailSignIn();
            } else {
                // setAlertMessage(err?.message || 'Registration failed. Please try again.');
            }
        } finally {
            setSignupConfirmLoading(false);
        }
    };

  const onFinishFailed = () => {
    message.error("Please fix the validation errors.");
  };
  // const handleConfirmModalOk = async () =>{
  //   await handleEmailSignIn()
  // }

  const handleConfirmModalOk = async () => {
    try {
      setSignupConfirmLoading(true);      
      await handleEmailSignUp();  
    } catch (error) {
      console.error(error);
    } finally {
      setSignupConfirmLoading(false);    
    }
  };

  const checkUserStatus = async () => { 
     if(user){
      // User is logged in, redirect to dashboard
      navigate('/agent-list');
       
     }

  }
  useEffect(() => {
    checkUserStatus();
  }, []);

  console.log('Vault', authConfig)

  return (
    <>
    <div className="signupMain ">
            
            <div className="signupCard agentShopIcon">
                <i className="agentFly"></i>
                <div className="SignupInnerContent">
                    <div className="logoDiv">
                        <img src={Images.synergyMarketLogo } />
                    </div>
                    <div  className="loginBox">
                        <Form
                          form={form}
                          name="login"
                          layout="vertical"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                        >
                          <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Email is required",
                              },
                              {
                                type: "email",
                                message: "Please enter a valid email address",
                              },
                            ]}
                          >
                            <Input placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); }}/>
                          </Form.Item>

                          <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                              Continue
                            </Button>
                          </Form.Item>
                          {errMsg ? (
                                <Alert severity={'error'}>{errMsg}</Alert>
                            ) : null}
                        </Form>
                    

                        <Modal
                          // title="IMPORTANT"
                          closable={{ 'aria-label': 'Custom Close Button' }}
                          open={signupConfirmModal}
                          onOk={handleConfirmModalOk}
                          onCancel={()=> setSignupConfirmModal(false)}
                          confirmLoading={signupConfirmLoading}
                        >
                          <h2 className="pop_icon_title"><img src={Images.infoIcon} /> <span>Join Agent Marketplace</span></h2>
                          <p>Hello there, looks like this is your first use of Agent Marketplace. You need to <i className="highlight_color">Sign Up</i> to proceed.</p>
                        
                        </Modal>
                      </div>
                    
                </div>
            </div>
    </div>
    </>
    
  );
};

export default SignupOrLogin;
