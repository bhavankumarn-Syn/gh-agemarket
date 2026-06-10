import { Modal } from "antd"
import React, { useState } from "react"
import styles from "./addKnowledgebaseModal.module.scss"
import { FILE, KNOWLEDGEBASE, QNA } from "../../Pages/constants";
import AddKB from "./AddKB";
import AddQnA from "./AddQnA";
import AddFile from "./AddFile";

interface PropsTypes{
    visible:boolean;
    onClose:()=>void;
    fetchData:()=>void;
}

const AddKnowledgebaseModel:React.FC<PropsTypes>=({visible,onClose,fetchData})=>{

 const [selectedKbType,setSelectedKbType]=useState("")

 const onBackClick=()=>{
    setSelectedKbType("")
 }

 const getSelectedForm=()=>{
  switch(selectedKbType){
    case KNOWLEDGEBASE:
        return <AddKB onClose={onClose} fetchData={fetchData} onBackClick={onBackClick} />
    case FILE:
        return <AddFile onClose={onClose} fetchData={fetchData} onBackClick={onBackClick} />
    case QNA:
        return <AddQnA onClose={onClose} fetchData={fetchData} onBackClick={onBackClick} />
  }
 }
 return(
     <Modal
        title="Add Knowledge Base"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={visible}
        onCancel={onClose}
        cancelText={null}
        className={styles.addKbModel}
        footer={null}
      >
       {!selectedKbType?<div className={styles.kbList}>
          <div onClick={()=>setSelectedKbType(KNOWLEDGEBASE)} className={styles.kbAddItem}>
              <h5>Knowledge</h5>
              <p>Add text-based information to train your Agent</p>
          </div>
          <div onClick={()=>setSelectedKbType(FILE)} className={styles.kbAddItem}>
              <h5>File</h5>
              <p>Upload files to train your Agent.</p>
          </div>
          <div onClick={()=>setSelectedKbType(QNA)} className={styles.kbAddItem}>
              <h5>Questions & Answers</h5>
              <p>Provide a question-and-answer pairing your Agent can in conversations.</p>
          </div>
       </div>
       :<div>
         {getSelectedForm()}
       </div>}
      </Modal>
 )
}
export default AddKnowledgebaseModel