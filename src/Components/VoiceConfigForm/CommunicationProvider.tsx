import { Button, Form, Input, InputNumber, Select } from "antd"
import React from "react";

interface Props{
    onSubmitClick:(values:any)=>void;
}

const CommunicationProvider:React.FC<Props>=({onSubmitClick})=>{

    const onSubmitForm = (values: any) => {
        console.log(values, "valls")
    }

    return(
        <>
        <h3 className="pageSubHeading">Communication Provider</h3>
        <Form
            onFinish={onSubmitForm}
            autoComplete="off"
            layout="vertical"
            >
            <Form.Item
                label="Communication Provider"
                name="provider"
            >
                <Select
                    defaultValue="twilio"
                    options={[
                        { value: 'twilio', label: 'Twilio' },
                    ]}
                />
            </Form.Item>
                <Form.Item
                    label="Account SID"
                    name="ssid"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Auth Token"
                    name="authToken"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="My Twilio Phone Number"
                    name="number"
                >
                    <InputNumber style={{width:"100%"}} />
                </Form.Item>

                
                <Form.Item
                    label="Welcome Message"
                    name="welcomeMessage"
                >
                    <Input.TextArea rows={6} />
                </Form.Item>

                <Form.Item className="copyBtn" label={null}>
                    <Button onClick={onSubmitClick} type="primary" htmlType="submit">
                        Next
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default CommunicationProvider