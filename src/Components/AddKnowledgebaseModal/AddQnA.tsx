import { Button, Form, Input, message } from "antd"
import styles from "./addKnowledgebaseModal.module.scss"
import { ArrowLeftOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import { addQnA } from "../../Pages/apis"
import { USER_TOKEN } from "../../Pages/constants"
import { useParams } from "react-router-dom"

interface Prop {
    onBackClick: () => void;
    onClose: () => void;
    fetchData: () => void;
}

const AddQnA: React.FC<Prop> = ({ onBackClick, onClose,fetchData }) => {

    const [loading, setLoading] = useState(false);
    const { agentId } = useParams()

    const onSubmit = async (values: any) => {
        setLoading(true)
        try {
            await addQnA(USER_TOKEN, values, agentId)
            message.success("QnA Added successfully")
            fetchData()
            onClose()
        } catch (error) {
            console.error('Failed to fetch agents:', error);
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
                    <h5>Questions & Answers</h5>
                    <p>Train AI based on yor questions & answers</p>
                </div>
            </div>
            <Form onFinish={onSubmit}>
                <div className={styles.kbFormContent}>
                    <div className={styles.inputGrp}>
                        <h4>Enter a brief, clear question that you'd like the Agent to answer</h4>
                        <Form.Item name={"question"}>
                            <Input placeholder="Enter question" />
                        </Form.Item>
                    </div>
                    <div className={styles.inputGrp}>
                        <h4>Answer</h4>
                        <Form.Item name={"answer"}>
                            <Input.TextArea rows={7} placeholder="Provide a detailed and informative answer that will help the Agent accurately to the question" />
                        </Form.Item>
                    </div>
                </div>
                <Button loading={loading} type="primary" htmlType="submit">Submit</Button>
            </Form>

        </div>

    )
}
export default AddQnA