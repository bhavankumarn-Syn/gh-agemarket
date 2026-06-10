import { Button, Form, Input, Select } from "antd"
import React from "react"

interface Props{
    onSubmitClick:(values:any)=>void;
    onPrevClick:()=>void;
}

const VoiceProvider:React.FC<Props>=({onSubmitClick,onPrevClick})=>{
    const onSubmitForm = (values: any) => {
        console.log(values, "valls")
    }
    return(
        <>
            <h3 className="pageSubHeading">Voice Provider</h3>
            <Form
                onFinish={onSubmitForm}
                autoComplete="off"
                layout="vertical"
            >
            <Form.Item
                label="Voice Provider Name"
                name="provider"
            >
                <Select
                    defaultValue="elevenlabs"
                    options={[
                        { value: 'elevenlabs', label: 'Elevenlabs' },
                    ]}
                />
            </Form.Item>
                <Form.Item
                    label="Voice Provider API Key"
                    name="apiKey"
                >
                    <Input placeholder="Enter Voice Provider API Key" />
                </Form.Item>
                <Form.Item
                    label="Voice ID"
                    name="voiceId"
                >
                    <Input placeholder="Enter Voice" />
                </Form.Item>
                <Form.Item className="copyBtn" label={null}>
                <Button className="prevBtn" onClick={onPrevClick}>
                    Previous
                </Button>
                <Button onClick={onSubmitClick} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
        </>
      
    )
}
export default VoiceProvider