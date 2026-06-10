import { CopyOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, Select } from "antd";
import "./chatConfigForm.scss"

const positionOptions=[
    { value: "left", label: 'Left' },
    { value: "right", label: 'Right' },
]

const ChatConfigForm = () => {

    const onSubmitForm = (values: any) => {
        console.log(values, "valls")
    }
    
    return (
        <div className="chatForm">
            <h3 className="formTitle">Add an interactive chatbot popover to your website</h3>
            <Form
                onFinish={onSubmitForm}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Greeting"
                    name="greeting"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Open by Default"
                    name="defaultOpen"
                >
                    <Select
                        defaultValue="openAuto"
                        options={[
                            { value: 'openAuto', label: 'Do not open automatically' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Position"
                    name="position"
                >
                    <Radio.Group options={positionOptions} />
                </Form.Item>
                <Form.Item
                    label="Embed on Your Site"
                    name="embedSite"
                >
                    <Input.TextArea rows={6} />
                </Form.Item>

                <Form.Item className="copyBtn" label={null}>
                    <Button type="primary" htmlType="submit">
                        Copy Code
                        <CopyOutlined style={{color:"#ffff"}} />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ChatConfigForm;
