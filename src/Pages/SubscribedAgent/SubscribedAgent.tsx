import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Images, truncateText } from "../utils"
import styles from "./subscribedAgent.module.scss"

interface SubscribedAgentData {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  purchasePrice?: number;
  purchaseType?: string;
}

const SubscribedAgent = () => {
    const navigate = useNavigate()
    const { agentId } = useParams()
    const [agent, setAgent] = useState<SubscribedAgentData | null>(null)

    useEffect(() => {
      if (!agentId) return;

      // Retrieve subscribed agents from localStorage
      const subscribedAgents = JSON.parse(localStorage.getItem('subscribedAgents') || '[]');
      
      // Find the agent matching the current agentId
      const currentAgent = subscribedAgents.find((ag: SubscribedAgentData) => ag._id === agentId);
      
      if (currentAgent) {
        setAgent(currentAgent);
      }
    }, [agentId]);

    return(
        <div className={styles.pageMainDiv}>
            <h3 className={styles.pageHeading}>Subscribed Agents</h3>
            <div className={styles.subscribedAgentDiv}>
                {agent ? (
                    // <div onClick={()=>navigate(`/subscribed-agent/config/${agentId}/agent-config-chat`)} className={styles.agentCard}>
                    <div className={styles.agentCard}>
                        <h4 className={styles.cardHeading}>{agent.title}</h4>
                        <p>{truncateText(agent.description || '', 55)}</p>
                        <div className={styles.subscribedAgentIconDiv}>
                            <img src={agent.imageUrl || Images.SubscribedAgentIcon} alt={agent.title} />
                        </div>
                        <span className={styles.subscribedTag}>Subscribed</span>
                    </div>
                ) : (
                    <div className={styles.agentCard}>
                        <p>No subscribed agent found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SubscribedAgent