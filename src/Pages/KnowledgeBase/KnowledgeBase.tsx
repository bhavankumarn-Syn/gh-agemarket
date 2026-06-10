import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import "./knowledgeBase.scss"
import AddKnowledgebaseModel from "../../Components/AddKnowledgebaseModal/AddKnowledgebaseModel"
import { useEffect, useState } from "react"
import SynergeticsCard from "../../Components/AddedListCard/AddedListCard"
import { getKbList } from "../apis"
import { USER_TOKEN } from "../constants"
import PageLoader from "../../Components/PageLoader/PageLoader"
import { useParams } from "react-router-dom"

const KnowledgeBase = () => {
    const [showAddKnowledgebase, setShowAddKnowledgebase] = useState(false)
    const [loading, setLoading] = useState(false)
    const [knowledgebaseListData, setKnowledgebaseListData] = useState([])
    const {agentId}=useParams()

    const fetchKbData = async () => {
        setLoading(true)
        try {
            const response = await getKbList(USER_TOKEN,agentId)
            setKnowledgebaseListData(response?.data)
        } catch (error) {
            console.error('Failed to fetch agents:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setKnowledgebaseListData([])
        fetchKbData()
    }, [])
    return (
        loading ?
            <PageLoader />
            : <div className="knowledgebaseMain">
                <div className={`${knowledgebaseListData.length ? "showKbList" : ""}`}>
                    <h3 className="pageHeading">KnowledgeBase</h3>
                    <div className="knowledgeBaseContent">
                        <Button onClick={() => setShowAddKnowledgebase(true)}>Add New Knowledge <PlusOutlined /> </Button>
                        {!knowledgebaseListData.length && <p>Train your Agent for context-aware responses to ensure accurate replies</p>}
                    </div>
                </div>

                {knowledgebaseListData.length > 0 &&
                    knowledgebaseListData.map(kbData =>
                        <div className="addedKbList">
                            <SynergeticsCard data={kbData} />
                        </div>
                    )}
                <AddKnowledgebaseModel fetchData={fetchKbData} visible={showAddKnowledgebase} onClose={() => setShowAddKnowledgebase(false)} />
            </div>

    )
}
export default KnowledgeBase