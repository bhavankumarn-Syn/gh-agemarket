import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Agent } from 'node:http'
import AgentList from '../AgentList/AgentList'
import PublicAgentList from '../PublicAgentList/PublicAgentList'

function AssetListing() {
    const { user } = useAuth()
    
    return user ? <AgentList/> : <PublicAgentList/>
}

export default AssetListing