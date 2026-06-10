import { useState } from "react";
import { Button, Input, Form, Divider } from "antd";
import "./signup.scss"
import { Images } from "../utils";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const navigate=useNavigate()

    const handleContinue = () => {
        // e.preventDefault();
        navigate('/agent-list')
    };

    const handleSocialSignup = (provider: string) => {
        console.log("sdsd",provider)
    };

    return (
        <div className="signupMain">
            <div className="signupCard">
                <div className="SignupInnerContent">
                    <div className="logoDiv">
                        <img src={Images.synergyMarketLogo} />
                    </div>
                    <h3>Sign Up</h3>
                    <div className="socialSection">
                        <span className="socialText">Sign up with</span>
                        <div className="socialButtons">
                            <button
                                className="social-button"
                                onClick={() => handleSocialSignup("Google")}
                            >
                                <img src={Images.googleIcon} />
                            </button>
                            <button
                                className="social-button"
                                onClick={() => handleSocialSignup("Facebook")}
                            >
                                <img src={Images.facebookIcon} />
                            </button>
                        </div>
                    </div>

                    {/* <div className="divider">
                        <span className="divider-text">Or</span>
                    </div> */}
                    <Divider className="dividerSignup">Or</Divider>

                    <Form className="signUpForm" layout="vertical" onFinish={handleContinue}>
                        <Form.Item
                            label="Email"
                            name="email"
                            // rules={[
                            //     { required: true, message: 'Please enter your email' },
                            //     { type: 'email', message: 'Please enter a valid email' }
                            // ]}
                        >
                            <Input
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="submitBtn"
                                type="primary"
                                htmlType="submit"
                            >
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="loginTextSection">
                        <span>Already have an account?</span>
                        <a href="#" >Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;