import { useState } from "react";
import "./voiceConfigForm.scss"
import CommunicationProvider from "./CommunicationProvider";
import VoiceProvider from "./VoiceProvider";

const VoiceConfigForm = () => {

    const [step, setStep]=useState(1)
    const [formVals, setFormVals]=useState({})

    const onSubmitClick=(values:any)=>{
        if(step===1){
            setStep(2)
        }
        console.log(values)
        setFormVals({...formVals,...values})
    }

    return (
        <div className="chatForm">
            <h3 className="formTitle">Voice</h3>
          {step===1&&<CommunicationProvider onSubmitClick={onSubmitClick} />}
          {step===2&&<VoiceProvider onPrevClick={()=>setStep(1)} onSubmitClick={onSubmitClick} />}
        </div>
    )
}
export default VoiceConfigForm;
