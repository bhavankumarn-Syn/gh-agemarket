import { Button, Form, Input, Upload, message } from "antd"
import styles from "./addKnowledgebaseModal.module.scss"
import { ArrowLeftOutlined } from "@ant-design/icons"
import type { UploadProps } from 'antd';
import { useState } from "react";
import { USER_TOKEN } from "../../Pages/constants";
import { addKbFile } from "../../Pages/apis";
import { useParams } from "react-router-dom";

interface Prop {
    onBackClick: () => void;
    onClose: () => void;
    fetchData: () => void;
}

const AddFile: React.FC<Prop> = ({ onBackClick, onClose ,fetchData}) => {

    const [loading, setLoading] = useState(false);
    const {agentId}=useParams()

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        accept: ".pdf,.docx,.csv,.txt",
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        beforeUpload(file) {
            const isAllowedType = [
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
                "text/csv",
                "text/plain",
            ].includes(file.type);

            if (!isAllowedType) {
                message.error("You can only upload PDF, DOCX, CSV, or TXT files!");
            }

            return isAllowedType || Upload.LIST_IGNORE;
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const onSubmit = async (values: any) => {
        setLoading(true)
        const formData=new FormData();
        formData.append("pdf",values.pdf.file)
        try {
            await addKbFile(USER_TOKEN, formData,agentId)
            message.success("File Added successfully")
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
                    <h5>File</h5>
                    <p>Upload files to train your Agent</p>
                </div>
            </div>
            <Form onFinish={onSubmit}>
                <div className={styles.kbFormContent}>
                    <div className={styles.inputGrp}>
                        <h4>Upload File</h4>
                        <Form.Item name={"pdf"}>
                            <Upload.Dragger {...props}>
                                <p className="ant-upload-text">Upload a File</p>
                                <p className="ant-upload-hint">
                                    Drag and drope your files here or
                                </p>
                                <Button className={styles.pmryBtn}>Browse Files</Button>
                            </Upload.Dragger>
                        </Form.Item>
                    </div>
                    <div className={styles.inputGrp}>
                        <h4>How should your agent use this file?</h4>
                        <Form.Item>
                            <Input.TextArea rows={7} placeholder="Describe how agent should use the file" />
                        </Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">Submit</Button>
                    </div>
                </div>
            </Form>
        </div>

    )
}
export default AddFile