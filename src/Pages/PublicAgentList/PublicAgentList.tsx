import './PublicAgentList.scss';
import { Avatar, Button, Pagination, Table, Tag, Dropdown, Checkbox, Modal } from 'antd';
import { MoreOutlined } from "@ant-design/icons";
import type { GetProps } from 'antd';
import { Input } from 'antd';
import { Images, truncateText } from '../utils';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLoader from '../../Components/PageLoader/PageLoader';
import { publicMarketPlaceAssetListing } from '../../api/api';
import { useAuth } from '../../Context/AuthContext';
import { Empty } from "antd";
import { assetTypeOptions, industryOptions, PAGE_SIZE } from '../../utils/commonData';
import { assetTypeIdConfig } from '../../utils/config';
import StripePaymentModal from '../../Components/StripePaymentModal/StripePaymentModal';


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
function PublicAgentList() {
  const { user, environment } = useAuth(); 
  const param = new URLSearchParams(window.location.search);

  const [subscribeModal, setSubscribeModal] = useState(false)
  const [stripePaymentModal, setStripePaymentModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate()
  const debouncedSearchText = useDebounce(searchText, 500);
  const [listView, setListView] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [industryCheckedList, setIndustryCheckedList] = useState<string[]>([]);
  const [assetTypeCheckedList, setAssetTypeCheckedList] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLUListElement | null>(null);; 
  const [industryTag, setIndustryTag] = useState<string[]>([]);
  const [assetTypeTag, setAssetTypeTag] = useState<string[]>([]);
  const isFirstLoad = useRef(true);
  
  
  
  const onChangeSearch: SearchProps['onChange'] = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setCurrentPage(1); // reset pagination when search changes
  };


  

   const fetchAgents = async (page = 1, searchData? : string, urlQueryType?: string[]) => {
      try {
        setLoading(true);
  
        const envConfig = assetTypeIdConfig[environment as 'dev' | 'stg' | 'prod'];  
        const updatedAssetTypeCheckedList = urlQueryType ? urlQueryType : assetTypeCheckedList;
        const mappedAssetTypeIds =  updatedAssetTypeCheckedList.map(type => envConfig[type as keyof typeof envConfig]).filter(Boolean);
        
  
        const token = user?.protectedAccToken || '';
        const offset = (page - 1) * PAGE_SIZE; 
  
        const marketPlacePayload = {
          token: atob(token), 
          limit: PAGE_SIZE,
          offset: offset,
          searchString: searchData && searchData,
          industry: industryCheckedList.length > 0 ? industryCheckedList : undefined,
          assetType: mappedAssetTypeIds,
        }
        setIndustryTag(industryCheckedList.length > 0 ? industryCheckedList : []);
        setAssetTypeTag(assetTypeCheckedList.length > 0 ? assetTypeCheckedList : []);
        
        if(urlQueryType){
          onChangeTypeFilter(updatedAssetTypeCheckedList)
          setAssetTypeTag(updatedAssetTypeCheckedList.length > 0 ? updatedAssetTypeCheckedList : []);
        }
  
        const marketPlaceResp = await publicMarketPlaceAssetListing( marketPlacePayload );
  
        if (marketPlaceResp?.success) {
          setAgents(marketPlaceResp.data);
          setTotal(marketPlaceResp.pagination.total);
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      } finally {
        setLoading(false);
      }
    };

  
  
  const firstLoad = useRef(true);
  useEffect(() => {
    if(firstLoad.current){
          const type =  param.get("type") || "" ; // First Load check    
          const urlQueryType = type ? type.split(',') : []; 
          fetchAgents(currentPage, debouncedSearchText || '',  urlQueryType || []); // First time only has the type from URL, subsequent calls will use the state of assetTypeCheckedList
          
    } else{
       fetchAgents(currentPage, debouncedSearchText || ''); 
    }
    firstLoad.current = false;
     
  }, [currentPage, debouncedSearchText]);


  const onChangeIndustryFilter = (checkedValues:any) => { 
    setIndustryCheckedList(checkedValues)
  };

  const onChangeTypeFilter = (checkedValues:any) => { 
    setAssetTypeCheckedList(checkedValues)
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
  const getActionMenu = (record: any) => ({
    items: [
      // {
      //   key: "view",
      //   label: "View Details",
      //   // onClick: () => navigate(`/agent-detail/${record.id}`),
      // },
      {
        key: "subscribe",
        label: "Subscribe",
        onClick: () => {
          setSubscribeModal(true);
        },
      },
    ],
  });

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
                {agents?.map((itm: any) => {
                  return (
                  <li 
                    key={itm.id} 
                    className="agentCardLink"
                    onClick={() => console.log('=== LI CLICKED ===')}
                  >
                    {/* <Link to={`/agent-detail/${itm?.id}`}> */}
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
                          e.stopPropagation();
                          setSubscribeModal(true);
                        }}
                      >
                        Subscribe
                      </Button>

                      <p>{truncateText(itm?.description, 50)}</p>
                    {/* </Link> */}
                  </li>
                  );
                })}
              </ul>
              )}
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
          onChange={(page) => setCurrentPage(page)}
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
                  <Button className='industry_apply_btn' onClick={()=> fetchAgents(1, debouncedSearchText || '') }>Filter</Button>
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

     <Modal
        // title="IMPORTANT"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={subscribeModal}
        okText="Continue"
        onOk={() => navigate('/auth')}
        onCancel={()=> setSubscribeModal(false)}
        // confirmLoading={signupConfirmLoading}
      >
        <h2 className="pop_icon_title"><img src={Images.infoIcon} /> <span>Subscribe to Continue</span></h2>
        <p>To subscribe to this product, please enter your email address to continue. We’ll send you a one-time password if you already have an account — or help you get started if you’re new.</p>
      
      </Modal>
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
        agentId={selectedAgent?.id}
        agentTitle={selectedAgent?.title}
        amount={9.99}
        currency="usd"
      />
      

  </>
}

export default PublicAgentList