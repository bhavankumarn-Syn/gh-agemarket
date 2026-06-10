
import './App.scss'
import Footer from './CommonComponents/Footer/Footer'
import Header from './CommonComponents/Header/Header'
import Home from './Pages/Home/Home'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

import { useAuth } from "./Context/AuthContext";
import Dashboard from './Pages/Dashboard/Dashboard';
import 'antd/dist/reset.css';
import AgentCheckout from './Pages/AgentCheckout/AgentCheckout';
import SubscribedAgent from './Pages/SubscribedAgent/SubscribedAgent';
import AgentConfig from './Pages/AgentConfig/AgentConfig';
import AgentDetail from './Pages/AgentDetail/AgentDetail';
import ScrollToTop from './CommonComponents/scrollToTop';
import SignupOrLogin from './Pages/SignupOrLogin/SignupOrLogin';
import { useEffect } from 'react';
import Otp from './Pages/Otp/Otp';
import { setPassphrase } from './utils/passphraseStore';
import Register from './Pages/SignupOrLogin/Register';
// import ComingSoon from './Pages/ComingSoon/ComingSoon';
import AgentList from './Pages/AgentList/AgentList';
import { signOut } from './api/auth';
import AssetListing from './Pages/AssetListing/AssetListing';
import mixpanel from "mixpanel-browser";
import { userLogoutTrack } from './utils/mixpanel';
import TermsPage from './Pages/TermsPage/TermsPage';
import CheckoutPage from './Pages/Checkout/ChekoutPage';
import SubscribeStatus from './Pages/SubscribeStatus/SubscribeStatus';


// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

const noHeadFootPath=["/signup", "/auth", "/otp", "/register"];

function App() {
  const location = useLocation(); // Reactively track current route
  const currentPath = location.pathname;
  const { logout, isTokenExpired} = useAuth();
  const isProd = window.location.hostname.includes("agentmarket.synergetics.ai");
  const prodTrackId = 'c07666ab5243cd13e18e3e7df28ad8f1'
  const stgTrackId = '6f7f4409976ef8610b0a3fbb12bc802a'

  let mixPanelTrackId =  isProd ? prodTrackId : stgTrackId

  // Mixpanel
  useEffect(() => {
    mixpanel.init(mixPanelTrackId, {
      autocapture: true,
      record_sessions_percent: 100,
    })
  }, [])
   
  // GTM
  useEffect(() => {
    if (!isProd) return;

    TagManager.initialize({
      gtmId: "GTM-K4XC98VC",
    });

  }, []);

  useEffect(() => {
    if (!isProd) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
    });

  }, [location]);

    useEffect(() => {
        const params = new URLSearchParams(
            location.hash.replace('#', '')
        );
        const state = params.get('state');
        // console.log('State:', state);
        if (state) {
            setPassphrase(state); 
        } 
    }, [location]);

     useEffect(() => {
       
        let token = localStorage.getItem('iam'); 
         if ( token && isTokenExpired(token)) { 
            console.log("Session expired, logging out user.");
          userLogoutTrack();
            signOut()
            logout();
          }
        
    }, []);
  useEffect((): void => {
    // We cast to HTMLElement because 'Element' (returned by querySelector) 
    // does not contain the 'style' property.
    const stripeButton = document.querySelector('stripe-buy-button') as HTMLElement | null;
    
    // getElementById naturally returns HTMLElement | null
    const stripeContainer = document.getElementById('stripe-buy-button-container');

    if (stripeButton) {
      stripeButton.style.display = 'none';
    }

    if (stripeContainer) {
      stripeContainer.style.display = 'none';
    }
  }, []);
  return (
   <> 
     <ScrollToTop />
      {noHeadFootPath.includes(currentPath) ?
        <Routes> 
           <Route path="/auth" element={<SignupOrLogin/>} />
           <Route path="/otp" element={<Otp/>} />
           <Route path="/register" element={<Register/>} />
           
        </Routes>
        :
        <>
          
          <main> 
            <Header />
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="success" element={ <SubscribeStatus status={`success`}/> }/>
              <Route path="failed" element={ <SubscribeStatus status={`failure`}/> }/>
              <Route path="canceled" element={ <SubscribeStatus status={`canceled`}/> }/>
              {/* <Route path="/agent-list" element={<ProtectedRoute><AgentList /></ProtectedRoute>} /> */}
              <Route path="/agent-list" element={<AssetListing />}/>
              {/* <Route path="/agent-list" element={<ProtectedRoute><ComingSoon/></ProtectedRoute>} /> */}
              <Route path="/agent-detail/:id" element={<AgentDetail />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/checkout/:agentId" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}/>
              <Route path="/agent-checkout/:agentId" element={<ProtectedRoute><AgentCheckout /></ProtectedRoute>} />
              <Route path="/subscribed-agent/:agentId" element={<SubscribedAgent />} />
              <Route path="/subscribed-agent/config/:agentId/*" element={<AgentConfig />} />
              <Route path="/terms-and-conditions" element={<TermsPage />}/>
              {/* <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} /> */}
             
            </Routes>
          </main> 
          <Footer />
        </>
      }
    </>
  )
}

export default App
