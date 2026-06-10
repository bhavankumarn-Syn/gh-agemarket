import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import './dashboard.scss'
import { Images } from "../utils";
import { getBuyerDashboardData } from "../../api/api";
import PageLoader from "../../Components/PageLoader/PageLoader";
import APICallsChart from "../../Components/Charts/APICallsChart";
import VoiceInteractionsChart from "../../Components/Charts/VoiceInteractionsChart";
import { getPlanDisplayName } from "../../utils/commonData";

interface AssetType {
  purchaseType: string,
  purchasePrice: number,
  title: string,
  description: string,
  imageUrl: string,
  supportedInterfaces: string[],
  totalSupply?: number,
  assetType?: string,
  approvedStatus?: {
    currentStatus?: string
  }
}

interface AgentType {
  _id: string,
  assetId: AssetType
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAllAgents, setShowAllAgents] = useState<boolean>(false)
  const [agentList, setAgentList] = useState<AgentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null)
  const [approvedAgents, setApprovedAgents] = useState<number>(0)

  const accToken = user?.protectedAccToken || '';
  const token = accToken ? atob(accToken) : ''

  useEffect(() => {
    const fetchBuyerDashboardDetails = async() => {
      const response = await getBuyerDashboardData(token)
      setAgentList(response.data)
      if (response.data.length > 0) {
        setSelectedAgent(response.data[0])
      }
      setLoading(false)
    }
    fetchBuyerDashboardDetails()
    const approvedAgentList = agentList.filter((agent:any) => agent.assetId.approvedStatus.currentStatus !== 'pending')
    setApprovedAgents(approvedAgentList.length)
  },[])
  
  const visibleAgents = showAllAgents ? agentList : agentList.slice(0,10);
  
  const handleSelect = (index:number) => {
    setSelectedAgent(agentList[index])
  }

  const capitalizeFirstLetter = (text: string) => {
    if(text){
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  };

  if (loading) {
    return (
      <span className="agent-list-loader-parent"> <PageLoader className="agent-list-loader" /> </span>
    );
  } 

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-main">

      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Manage your subscribed agents and monitor usage</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
          <div className="stat-card">
            <img src={Images.totalAgentIcon} alt='agentIcon' className="stat-icon" style={{ backgroundColor: "#DBEAFE" }} />
            <div className="stat-details">
              <p className="stat-title">Total Subscribed Agents</p>
              <span><h2>{agentList.length}</h2></span>
            </div>
          </div>
      </div>

      {/* Agents Section */}
      <div className="agents-section">
        <div className="agents-section-top">
          <h2>My Subscribed Agents</h2>
        <div className="view-agent">
          <span>{visibleAgents.length}{"/"}{agentList.length}</span>
          {agentList.length > 4 && (
            <button
              onClick={() => setShowAllAgents(!showAllAgents)}
              className="view-btn"
            >
              {showAllAgents ? "Hide Agents" : "View More Agents"}
            </button>
          )}
          </div>
        </div>
        

        { agentList.length ? <div className="agents-grid">
          {visibleAgents.map((agent:any,index:number) => {
            return (
            <div key={agent._id} className={`agent-card ${selectedAgent?._id===agent._id ? "active-agent" : ""}`} onClick={() => handleSelect(index)}>

              <div className="agent-header agent-card-details">
                <div className="header-left">
                  <img className='asset-image' src={agent?.assetId?.imageUrl} alt='asset_image'/>
                  <h2>{capitalizeFirstLetter(agent?.assetId?.title)}</h2>
                </div>
                <span><img src={Images.agentSettingIcon} alt='setting' /></span>
              </div>
              <div className="agent-label agent-card-details">
                <p className="label">Description</p>
                <p className="agent-description">{capitalizeFirstLetter(agent?.assetId?.description)}</p>
              </div>
              {  agent?.assetId?.supportedInterfaces.length > 0 && <div className="agent-label agent-card-details">
                <p className="label">Supported Interfaces</p>
                <div className="supported-interfaces">
                  {
                    agent?.assetId?.supportedInterfaces.map((iFace:string, index:number) => {
                      return (
                        <div key={index} className="interface-badge">{capitalizeFirstLetter(iFace)}</div>
                      )
                    })
                  }
                </div>
              </div>}
              {/* <div className="agent-status agent-card-details">
                <p className="label">Status</p>
                <span
                  className={
                    agent?.assetId?.approvedStatus?.currentStatus === "pending"
                      ? "status-expired"
                      : "status-active"
                  }
                >
                  <span>{capitalizeFirstLetter(agent?.assetId?.approvedStatus?.currentStatus)}</span>
                </span>
              </div> */}
              <div className="agent-label agent-card-details">
                <p className="label">Purchase Type</p>
                <p className="purchase-type">{getPlanDisplayName(agent?.purchaseType)}</p>
              </div>
              <div className="agent-purchase-price agent-card-details">
                <p className="label">Price</p>
                <p className="purchase-price">${agent?.price}</p>
              </div>

            </div>
          )})}
        </div> : <div>No Agents Available</div>}
      </div>
      <div className="usage-section">
          <div className="usage-header">
            <div className="usage-title">
              <h2>Usage Statistics</h2>
              <p>{selectedAgent?.assetId?.title}</p>
            </div>
            <div className="usage-token-balance">
              <p>Token Balance</p>
              <div><h2>5,000</h2><span>tokens</span></div>
            </div>
          </div>
          <div className="usage-card-section">
            <div className="usage-card" style={{
              backgroundImage: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)"
            }}>
              <div className="usage-card-img">
                <img src={Images.apiCallImg} />
              </div>
              <div className="usage-card-detail">
                <p>Total API Calls</p>
                <div>
                  <h2>500</h2><span>calls</span>
                </div>
              </div>
            </div>
            <div className="usage-card" style={{
              backgroundImage: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)"
            }}>
              <div className="usage-card-img">
                <img src={Images.voiceInteraction} />
              </div>
              <div className="usage-card-detail">
                <p>Voice Interactions</p>
                <div>
                  <h2>3,240</h2><span>calls</span>
                </div>
              </div>
            </div>
            <div className="usage-card" style={{
              backgroundImage: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)"
            }}>
              <div className="usage-card-img">
                <img src={Images.avgDailyUsage} />
              </div>
              <div className="usage-card-detail">
                <p>Avg Daily Usage</p>
                <div>
                  <h2>2,500</h2><span>calls</span>
                </div>
              </div>
            </div>
            
          </div>
          <div className="graphs-wrapper">
            <div className="graph-card">
              <h2 className="api-title">API Calls Over Time</h2>
              <APICallsChart />
            </div>
            <div className="graph-card">
              <h2 className="voice-title">Voice Interactions Over Time</h2>
              <VoiceInteractionsChart />
            </div>
          </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
