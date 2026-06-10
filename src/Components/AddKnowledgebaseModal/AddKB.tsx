import { Button, Form, Input, message } from "antd"
import styles from "./addKnowledgebaseModal.module.scss"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { addKB } from "../../Pages/apis"
import { USER_TOKEN } from "../../Pages/constants"
import { useState } from "react"
import { useParams } from "react-router-dom"

interface Prop {
    onBackClick: () => void;
    onClose: () => void;
    fetchData: () => void;
}

const AddKB: React.FC<Prop> = ({ onBackClick, onClose,fetchData }) => {

    const [loading, setLoading] = useState(false);
    const {agentId}=useParams()

    const onSubmit = async (values: any) => {
        setLoading(true)
        try {
            await addKB(USER_TOKEN, values, agentId)
            message.success("Content Added successfully")
            setLoading(false);
            fetchData()
            onClose()
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className={styles.kbInnerHead}>
                <Button onClick={onBackClick} type="text">
                    <ArrowLeftOutlined /> Back
                </Button>
                <div className={styles.kbHeading}>
                    <h5>Knowledge</h5>
                    <p>Add text-based information to train your Agent</p>
                </div>
            </div>
            <div className={styles.kbFormContent}>
                <h4>Information for Your Agent</h4>
                <p>Enter accurate info your AI can use as answers</p>
                <Form onFinish={onSubmit}>
                    <Form.Item name={"content"}>
                        <Input.TextArea rows={6} placeholder="Company overview, product features, customer FAQs, service guidelines" />
                    </Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">Submit</Button>
                </Form>
            </div>
        </div>

    )
}
export default AddKB