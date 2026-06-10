import './AgentList.scss';
import { Avatar, Button, Pagination, Table, Tag, Dropdown, Checkbox } from 'antd';
import { MoreOutlined } from "@ant-design/icons";
import type { GetProps } from 'antd';
import { Input } from 'antd';
import { Images, truncateText } from '../utils';
import { useEffect, useRef, useState } from 'react';
import VoiceTryItModal from '../../Components/VoiceTryItModal';
import AvatarTryMode from '../../Components/AvatarTryModel/AvatarTryModel';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import { getAgentList } from '../apis';
// import { USER_TOKEN } from '../constants';
import PageLoader from '../../Components/PageLoader/PageLoader';
import { useAuth } from '../../Context/AuthContext';
import { Empty } from "antd";
import { assetTypeOptions, industryOptions, PAGE_SIZE } from '../../utils/commonData';
import StripePaymentModal from '../../Components/StripePaymentModal/StripePaymentModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchAgents,
  setCurrentPage,
  setSearchText,
  setIndustryCheckedList,
  setAssetTypeCheckedList,
} from '../../store/slices/agentListSlice'; 


type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

// supportive component
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Main component of the agent list
function AgentList() {
  const { user, environment } = useAuth();
  const param = new URLSearchParams(window.location.search);

  const dispatch = useAppDispatch();
  const {
    agents,
    total,
    loading,
    currentPage,
    searchText,
    industryCheckedList,
    assetTypeCheckedList,
    industryTag,
    assetTypeTag,
    error,
  } = useAppSelector((state) => state.agentList);

  console.log('Loading ---->>>> ', loading)
  console.log('Loading ERR ---->>>> ', error)

  const [selectedTryAvatar, setSelectedTryAvatar] = useState(null)
  const [voiceTryOpen, setVoiceTryOpen] = useState(false)
  const [stripePaymentModal, setStripePaymentModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const navigate = useNavigate()
  const debouncedSearchText = useDebounce(searchText, 500);
  const [listView, setListView] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLUListElement | null>(null);


  const onChangeSearch: SearchProps['onChange'] = (e) => {
    dispatch(setSearchText(e.target.value)); // also resets pagination to page 1
  };

  const token = user?.protectedAccToken || '';

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      const type = param.get("type") || ""; // First Load check
      const urlQueryType = type ? type.split(',') : [];
      // First load may carry asset types from the URL; persist them to state and
      // use them for this fetch. Subsequent fetches read from the store.
      if (urlQueryType.length > 0) {
        dispatch(setAssetTypeCheckedList(urlQueryType));
      }
      dispatch(fetchAgents({ token, environment, assetTypeOverride: urlQueryType }));
    } else {
      dispatch(fetchAgents({ token, environment }));
    }
    firstLoad.current = false;
  }, [currentPage, debouncedSearchText]);



  const onChangeIndustryFilter = (checkedValues: any) => {
    dispatch(setIndustryCheckedList(checkedValues));
  };

  const onChangeTypeFilter = (checkedValues: any) => {
    dispatch(setAssetTypeCheckedList(checkedValues));
  };

  const onApplyFilter = () => {
    dispatch(setCurrentPage(1));
    dispatch(fetchAgents({ token, environment }));
  };

  useEffect(() => {
    const handleClickOutside = (evt:any) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(evt.target)
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const columns = [
    {
      title: "Agent",
      dataIndex: "title",
      key: "title",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar
            size={48}
            src={record?.imageUrl || Images.unknownAvatar}
          />
          <Link to={`/agent-detail/${record?.id}`}>
            <b>{record?.title}</b>
          </Link>
        </div>
      ),
    },
    {
      title: "Interfaces",
      dataIndex: "supportedInterfaces",
      key: "supportedInterfaces",
      render: (interfaces: string[]) => 
        interfaces?.length
          ? interfaces.map((iface) => (
              <Tag color="purple" key={iface}>
                {iface}
              </Tag>
            ))
          : "-",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text: string) => truncateText(text, 120),
    },
    {
    title: "",
    key: "action",
    width: 60,
    // align: "center",
    render: (_: any, record: any) => (
      <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
        <Button
          type="text"
          icon={<MoreOutlined style={{ fontSize: 18 }} />}
        />
      </Dropdown>
    ),
  },
  ];

  const isAgentSubscribed = (agentId: string): boolean => {
    const subscribedAgents = JSON.parse(localStorage.getItem('subscribedAgents') || '[]');
    return subscribedAgents.some((agent: any) => agent._id === agentId);
  };

  const getActionMenu = (record: any) => {
    const isSubscribed = isAgentSubscribed(record._id);
    return {
      items: [
        {
          key: "view",
          label: "View Details",
          // onClick: () => navigate(`/agent-detail/${record.id}`),
        },
        {
          key: "subscribe",
          label: isSubscribed ? "Subscribed" : "Subscribe",
          onClick: () => {
            if (!isSubscribed) {
              navigate(`/agent-checkout/${record._id}`);
            }
          },
          disabled: isSubscribed,
          style: isSubscribed ? {
            backgroundColor: '#66BA5E',
            color: '#ffffff',
          } : {},
        },
      ],
    };
  };

  // Inside render component
  
  const RenderAgentList = () => {
    if (loading) {
      return (
        <span className="agentListLoaderParent"> <PageLoader className="agentListLoader" /> </span>
      );
    } 
   
    return (
      <>
        {listView === false ? (
          <div className="thumb_agents">
              {agents && agents.length === 0 ? ( <Empty description="No data found" /> ) : (
              <ul>
                {agents?.map((itm: any) => (
                  <li key={itm.id} className="agentCardLink">
                    {/* <Link to={`/agent-detail/${itm?._id}`}> */}
                    <Link to="#" onClick={(e) => {e.preventDefault()}}>
                      <b>{itm?.title}</b>

                      <div>
                        <small>
                          Interface Type:{" "}
                          <span style={{ color: "#9747FF" }}>
                            {itm?.supportedInterfaces?.length
                              ? itm.supportedInterfaces.join(", ")
                              : ""}
                          </span>
                        </small>
                      </div>

                      <span className="imgBox">
                        <img
                          src={itm?.imageUrl || Images.unknownAvatar}
                          alt={itm?.title}
                        />
                      </span>

                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          const isSubscribed = isAgentSubscribed(itm._id);
                          if (!isSubscribed) {
                            // navigate(`/agent-checkout/${itm._id}`);
                            navigate(`/checkout/${itm._id}`);
                          }
                        }}
                        disabled={isAgentSubscribed(itm._id)}
                        style={isAgentSubscribed(itm._id) ? {
                          backgroundColor: '#66BA5E',
                          color: '#ffffff',
                          borderColor: '#288220',
                        } : {}}
                      >
                        {isAgentSubscribed(itm._id) ? 'Subscribed' : 'Subscribe'}
                      </Button>

                      <p>{truncateText(itm?.description, 50)}</p>
                    </Link>
                  </li>
                ))}
              </ul> )}
          </div>
        ) : (
          <div className="list_agents">
            <Table
              columns={columns}
              dataSource={agents}
              rowKey="id"
              pagination={false}
            />
          </div>
        )}

        <Pagination
          className="agentList_pagination"
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={total}
          onChange={(page) => dispatch(setCurrentPage(page))}
          showSizeChanger={false}
        />
      </>
    );
  };


  // Main agent list return
  return <>
  
      <div className='agentList_header'>
        <h2>Discover & Subscribe to AI Agents Instantly </h2>
        <p>Browse AI agents by category, select based on tools, model, and interface, and start using them right away.</p>
      </div>
      <div className='centerBox agentList'>
        <div className='top_action_bar'>
          <div className='btnsBox'>
            
            {industryTag && industryTag.map((itm) => (
              <Tag className='industryTag' color="purple" key={itm}> {itm} </Tag>))}
            {assetTypeTag && assetTypeTag.map((itm) => (
              <Tag className='assetTypeTag' color="blue" key={itm}> {itm} </Tag>))}
          </div>
          <div className="actionBarRight">
            <Search
              className="search"
              placeholder="Search"
              value={searchText}
              onChange={onChangeSearch}
              style={{ width: 200 }}
              allowClear
            />

            <ul className='industryFilterBox' ref={wrapperRef}>
              <li className={ `filterIcon ${filterOpen == true ? 'activeIcon' : '' }`} onClick={()=> setFilterOpen(!filterOpen)}>
               
              </li>
              {filterOpen &&  <article>
                <aside>
                  <h3>Industry</h3>
                  <Checkbox.Group options={industryOptions} value={industryCheckedList} onChange={onChangeIndustryFilter} />
                  {/* <Button className='industry_apply_btn' onClick={()=> fetchAgents(1, debouncedSearchText || '') }>Apply</Button> */}
                </aside>
                <aside>
                  <h3>Type</h3>
                  <Checkbox.Group options={assetTypeOptions} value={assetTypeCheckedList} onChange={onChangeTypeFilter} />
                  <Button className='industry_apply_btn' onClick={onApplyFilter}>Filter</Button>
                </aside>
               
                </article>}
            </ul>
            
            <ul className='viewSwitch'>
              <li className={ `thumbIcon ${listView == false ? 'activeIcon' : '' }`} onClick={()=> setListView(false)}></li>
              <li className={ `listIcon ${listView ? 'activeIcon' : '' }`} onClick={()=> setListView(true)}></li>
            </ul>
          </div>
        </div>
        <RenderAgentList />
      </div>

      <VoiceTryItModal
        open={voiceTryOpen} onClose={() => setVoiceTryOpen(false)}
      />
      <AvatarTryMode
        selectedTryAvatar={selectedTryAvatar} onClose={() => setSelectedTryAvatar(null)}
      />
      
      <StripePaymentModal
        open={stripePaymentModal}
        onCancel={() => {
          setStripePaymentModal(false);
          setSelectedAgent(null);
        }}
        onSuccess={(result) => {
          console.log('Payment successful:', result);
          // Handle successful payment - you can navigate to a success page or update user subscription
        }}
        agentId={selectedAgent?._id}
        agentTitle={selectedAgent?.title}
        amount={selectedAgent?.purchasePrice||0}
        currency={selectedAgent?.availableCurrencies[0]?.code || 'USD'}
      />

      

  </>
}

export default AgentList