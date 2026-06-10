import { Route, Routes } from "react-router-dom"
import AgentConfigSidebar from "../../Components/AgentConfigSidebar/AgentConfigSidebar"
import ChatConfigForm from "../../Components/ChatConfigForm/ChatConfigForm"
import "./agentConfig.scss"
import VoiceConfigForm from "../../Components/VoiceConfigForm/VoiceConfigForm"
import KnowledgeBase from "../KnowledgeBase/KnowledgeBase"
import WhatsappConfig from "../../Components/WhatsappConfig/WhatsappConfig"

const AgentConfig=()=>{

    return(
        <div className="pageMainDiv">
            <div className="configSidebarMain">
                <AgentConfigSidebar />
            </div>
            <div className="agentConfigFormsMain">
                <Routes>
                    <Route path="agent-config-chat" element={<ChatConfigForm />} />
                    <Route path="agent-config-voice" element={<VoiceConfigForm />} />
                    <Route path="agent-config-whatsapp" element={<WhatsappConfig />} />
                    <Route path="knowledgebase" element={<KnowledgeBase />} />
                </Routes>
            </div>
        </div>
    )
}
export default AgentConfig