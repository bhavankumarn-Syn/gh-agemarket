import { Menu, MenuProps } from "antd"
import "./agentConfigSidebar.scss"
import { useNavigate, useParams } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const AgentConfigSidebar=()=>{
    const navigate=useNavigate()
    const {agentId}=useParams()
    const items: MenuItem[]=[
        {
            key: 'interface',
            label: 'Interface',
            children: [
              { key: 'chat', label: 'Chat', onClick:()=>navigate(`/subscribed-agent/config/${agentId}/agent-config-chat`) },
              { key: 'voice', label: 'Voice', onClick:()=>navigate(`/subscribed-agent/config/${agentId}/agent-config-voice`) },
              { key: 'whatsapp', label: 'Whatsapp',onClick:()=>navigate(`/subscribed-agent/config/${agentId}/agent-config-whatsapp`) },
              { key: 'avatar', label: 'Avatar' },
            ],
          },
          {
            key: 'knowledgeBase',
            label: 'Knowledge Base',
            onClick:()=>navigate(`/subscribed-agent/config/${agentId}/knowledgebase`)
          },
          {
            key: 'tools',
            label: 'Tools',
          }
    ]
  
    return(
        <div className="configSidebarDiv">
            <Menu
            style={{ width: "100%" }}
            defaultSelectedKeys={['chat']}
            defaultOpenKeys={['interface']}
            mode="inline"
            items={items}
            className="agentConfigMenu"
            />
        </div>
    )
}
export default AgentConfigSidebar