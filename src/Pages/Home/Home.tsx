import './Home.scss'

import ImageSlider from './ImageSlider'
import Accordion from './Accordion'
import { Images } from '../utils'
import LogoSlider from './LogoSlider'
import { useNavigate } from 'react-router-dom'



function Home() {
   const navigate=useNavigate()

  const avatarSliderPictures = [Images.avatar1, Images.avatar2, Images.avatar3, Images.avatar4, Images.avatar5];
   const assetTypes = [
    {
      id: 'agent',
      title: 'Agents',
      description: 'AI-powered agents trained to handle specific business tasks with precision and reliability.',
      icon: '🤖',
      img: Images.featuredAgents,
      color: '#A14CFF'
    },
    {
      id: 'avatar',
      title: 'Avatars',
      description: 'Interactive avatar interfaces for enhanced customer engagement and personalized interactions.',
      icon: '👤',
      img: Images.featuredAvatar,
      color: '#0169EF'
    },
    {
      id: 'skill',
      title: 'Skills',
      description: 'Modular capabilities to extend and customize your AI agents for specialized functions.',
      icon: '⚙️',
      img: Images.featuredSkill,
      color: '#FF6B6B'
    },
    {
      id: 'workflow',
      title: 'Workflows',
      description: 'Orchestrate complex processes by chaining multiple agents and skills together seamlessly.',
      icon: '🔗',
      img: Images.featuredWorkflow,
      color: '#FFB800'
    }
  ];
  const handleViewMore = (assetId: string) => {
    // Navigate to the asset listing page with the selected asset type as a query parameter
    navigate(`/agent-list?type=${assetId}`);
  }
  return (
    <>
    <section className='banner fullWidth'>
        <article className='centerBox'>
            <div className='banner_left'>
                
                <ImageSlider images={avatarSliderPictures} interval={3000} /> 
            </div>
            <div className='banner_right'>
                <h1>Power Your Business with <b>AI Agent</b></h1>
                <p>Subscribe to AI Agents tailored for your business. Upload your data, integrate with your tools, and start using AI instantly.</p>
                <div><span style={{cursor:'pointer'}} onClick={()=>navigate('/agent-list')} className="btn btn-primary">Explore AI Agents</span></div>
            </div>
        </article>
        <i className='bottom_wave'></i>
    </section>
    <section className='AssetTypesSection fullWidth'>
        <div className='centerBox'>
          <h2>Discover Our Asset Types</h2>
          <p>Explore the full range of AI-powered assets available on Synergetics AgentMarket</p>
          <div className='assetTypesGrid'>
            {assetTypes.map((asset) => (
              <article key={asset.id} className='assetTypeCard'>
                <div className='assetTypeIcon' style={{ borderColor: asset.color }}>
                  {/* <span>{asset.icon}</span> */}
                  <img src={asset.img} /> 
                </div>
                <h3 style={{ color: asset.color }}>{asset.title}</h3>
                <p>{asset.description}</p>
                <button
                  onClick={() => handleViewMore(asset.id)}
                  className='viewMoreBtn'
                  style={{ color: asset.color, borderColor: asset.color }}
                >
                  View More →
                </button>
              </article>
            ))}
          </div>
        </div>
    </section>

    {/* <main> */}
        
        <section className='HowManageSection'>
            <div className='centerBox'>
                <h2>How Synergetics Manages AI Data & Models Securely</h2>
                <p>
                Fine-tuning + real-time retrieval ensures accurate, context-aware AI with minimal hallucination.
                </p> 
                <div className='fineTune_boxes'>
                    <div className='box_one_and_two'>
                        <article>
                            <div>
                                <h3>1. Fine-Tuning </h3>
                                <p>(Structured and Reliable)</p>
                            </div>
                           
                            <img src={Images.AI_data1} alt='avatar' />
                            <div className='botm_info'>
                                <small>Core Insight:</small>
                                <i>"Delivers consistent, domain-specific accuracy by eliminating hallucinations through structured training."</i>
                            </div>
                           
                        </article>
                        <article>
                            <div>
                                <h3>2. Fine-Tuning + RAG </h3>
                                <p>(Best of Both Worlds)</p>
                            </div>
                           
                            <img src={Images.AI_data2} alt='avatar' />
                            <div className='botm_info'>
                                <small>Core Insight:</small>
                                <i>“Combines the reliability of fine-tuning with the adaptability of real-time data retrieval.”</i>
                            </div>
                            
                        </article>
                    </div>
                    <div className='box_third'>
                        <article>
                            <div>
                                <h3>3. Out-of-the-Box LLM + RAG</h3>
                                <p>(Dynamic but Dependent)</p>
                            </div>
                            
                            <img src={Images.AI_data3} alt='avatar' />
                            <div className='botm_info'>
                                <small>Core Insight:</small>
                                <i>"Grounds generic models in real-time data but lacks the precision of domain-specific fine-tuning."</i>
                            </div>
                           
                        </article>
                    </div>
                </div>
            </div>
        </section> 
        <section className='OurSuiteSection fullWidth'>
            <div className='centerBox'>
                <h2>Our Suite of Rapid AI Agent Development Tools and Process </h2>
                <p>
                End-to-end tools to train, test, orchestrate, and deploy AI agents at scale—fast and seamlessly.
                </p> 
                <div className='suite_icons'>
                    <div className='each_icon'>
                        <img src={Images.icon_LangTest} />
                        <h4>Lang<b>Train</b></h4>
                        <small>Train the model</small>
                    </div>
                    <div className='each_icon'>
                        <img src={Images.icon_LangTrain} />
                        <h4>Lang<b>Test</b></h4>
                        <small>Test the model</small>
                    </div>
                    <div className='each_icon'>
                        <img src={Images.icon_LangCertify} />
                        <h4>Lang<b>Certify</b></h4>
                        <small>Certify the model (optional)</small>
                    </div>
                    <div className='each_icon'>
                        <img src={Images.icon_AgentFlow} />
                        <h4>Agent<b>Flow</b></h4>
                        <small>Canvas for agent interaction and orchestration </small>
                    </div>
                    <div className='each_icon'>
                        <img src={Images.icon_AgentVM} />
                        <h4>Agent<b>VM</b></h4>
                        <small>Deploy agents for cloud or edge</small>
                    </div>
                    
                </div>
            </div>
        </section>   
        <section className='centerBox whySection'>
            <h2>Why Synergetics AgentMarket?</h2>
            <p>Your AI, Your Way – Scalable, Easy-to-Use, and Secure</p>

            <article className=''>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>Multi-Interface AI Agents</h3>
                        <p>Our AI agents are available in multiple formats – <b>Chat, Voice, Avatar, and IoT</b>, enabling businesses to integrate AI seamlessly into customer support, automation, and operational workflows.</p>
                    </div>
                    
                    <div className='iconsBox'>
                        <img src={Images.whyIcon1} />
                        <img src={Images.whyIcon2} />
                        <img src={Images.whyIcon3} /> 
                        <img src={Images.whyIcon4} /> 
                    </div>
                </div>
                <div className='imgBlock'>
                    <img src={Images.why_multiface} />
                </div>
            </article>
            <article className='alternate'>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>Easy Subscription & Management Portal</h3>
                        <p>No technical complexity! Subscribe to AI agents with <b>one click</b> and manage everything <b>directly in the Synergetics portal</b> – from uploading data to configuring integrations.  </p>
                    </div>
                    
                    <div className='iconsBox'>
                        <div className='easyConnectedIcons'>
                            <img src={Images.easyIcon1} />
                            <img src={Images.easyIcon2} />
                            <img src={Images.easyIcon3} /> 
                            <img src={Images.easyIcon4} /> 
                        </div>
                    </div>
                </div>
                <div className='imgBlock'>
                    <img src={Images.whyBanner2} />
                </div>
            </article>
            <article className=''>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>Plug & Play with Your Business Tools</h3>
                        <p>Connect AI agents with your existing  <b>CRM, ERP, communication tools, and databases</b>. No coding required—just a simple integration process. </p>
                    </div>
                    
                    <div className='iconsBox'>
                        <img src={Images.plugIcon1} />
                        <img src={Images.plugIcon2} />
                    </div>
                </div>
                <div className='imgBlock'>
                    <img src={Images.why_plugPlay} />
                </div>
            </article>
            <article className='alternate'>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>Secure & Transparent with Blockchain & Smart Contracts</h3>
                        <p>Every AI agent transaction is  <b>protected with blockchain-backed verification and smart contracts, ensuring secure and tamper-proof AI services</b>. </p>
                    </div>
                    
                    <div className='iconsBox'>
                        <img src={Images.secureIcon1} />    
                    </div>
                </div>
                <div className='imgBlock'>
                    <img src={Images.whyBanner4} />
                </div>
            </article>
            <article className=''>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>Decentralized Agent-Agent Protocol</h3>
                        <p>Synergetics is the first AI agent marketplace powered by a USPTO-patented protocol, enabling secure, decentralized AI agent collaboration without centralized control.</p>
                    </div>
                    
                  
                </div>
                <div className='imgBlock'>
                    <img src={Images.why_decentralized} />
                </div>
            </article>
            <article className='alternate'>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>AI Agents Designed for Enterprise-Scale Operations</h3>
                        <p>Our AI agents are deployed, tested, and optimized for real-world applications handling millions of interactions daily across healthcare, finance, logistics, and more..</p>
                    </div>
                    
                  
                </div>
                <div className='imgBlock'>
                    <img src={Images.why_aiAgents} />
                </div>
            </article>
            <article className=''>
                <div className='textBlock'>
                    <div className='topText'>
                        <h3>Enterprise-Grade Protection</h3>
                        <p>Built with industry-leading security, our AI agents operate in a secure private cloud with SOC2 & HIPAA compliance, ensuring privacy, transparency, and data integrity.</p>
                    </div>
                    
                  
                </div>
                <div className='imgBlock'>
                    <img src={Images.why_enterprise} />
                </div>
            </article>
        </section>  
        <section className='HowItWorksSection fullWidth'>
            <div className='centerBox'>
                <h2>How It Works – Simple, Fast & Seamless</h2>
                <p>
                Subscribe, Personalize & Start Using AI – All in One Portal!
                </p> 
                <Accordion/>
            </div>
        </section>     
        <section className='SimplePriceSection'>
            <div className='centerBox'>
                <h2>How It Works – Simple, Fast & Seamless</h2>
                <p>
                Subscribe, Personalize & Start Using AI – All in One Portal!
                </p> 
                <div className='Three_Boxes'>
                    <article>
                        <img src={Images.simplePrice1} />
                        <h3>Free Monthly Credits</h3>
                        <p>Enjoy free usage every month with your subscription.</p>
                    </article>
                    <article>
                        <img src={Images.simplePrice2} />
                        <h3>Fixed Monthly Subscription</h3>
                        <p>
                        Subscribe once, get continuous AI agent access.</p>
                    </article>
                    <article>
                        <img src={Images.simplePrice3} />
                        <h3>Pay-As-You-Go Scaling</h3>
                        <p>Need more? Buy additional credits anytime. </p>
                    </article>
                </div>
            </div>
        </section> 

        <LogoSlider/>
        <section className='ReadyToElevateSection fullWidth'>
            <div className='centerBox'>
                <h2>Ready to Elevate Your Business with AI?</h2>
                <p>
                Subscribe now and start using AI agents effortlessly!
                </p> 
                <span className="btn btn-primary">Explore AI Agents</span>
            </div>
        </section>   
        
    {/* </main> */}
    
    </>
  )
}

export default Home


