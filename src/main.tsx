import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./Context/AuthContext";
import { App as AppAntNotification } from "antd";
import {Amplify} from 'aws-amplify';
import { authConfig } from './utils/config.ts';
import {clearPassphrase, setPassphrase as setPass} from './utils/passphraseStore';
import { userMgmtLogout } from './utils/UserManager.ts';



// Capture passphrase from native host as soon as the app loads
function handlePassphraseMessage(event:any) {
    // console.log('handlePassphraseMessage event', event)
    try { 
        const data = event?.data || {};
        const type = data?.type || '';
        const allowedOrigin = authConfig.parent_origin || ''; 
        if (allowedOrigin && event.origin !== allowedOrigin) {
            console.log('allowedOrigin IF')
            return; // Ignore messages from unexpected origins
        }
        if (type === 'PASSPHRASE' || type === 'SET_PASSPHRASE') {
            console.log('type PASSPHRASE IF')
            const payload = data?.payload || {};
            const received = payload?.passphrase || data?.passphrase || '';
            if (received) {
                setPass(received);
            }
            return;
        }
        if (type === 'LOGOUT' || type === 'APP_QUIT') {
            console.log('type LOGOUT IF')
            // Best-effort async sign-out triggered by host
            try {
                userMgmtLogout();
            } catch (_) {
            }

        }
        // console.log('END ')
    } catch (_) { 
        // noop
    }
}

window.addEventListener('message', handlePassphraseMessage);

// Passive lifecycle: clear secrets when app goes to background or page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        try {
            clearPassphrase();
        } catch (_) {
        }
    }
});

// On pagehide (including bfcache), clear secrets as well
window.addEventListener('pagehide', () => {
    try {
        clearPassphrase();
    } catch (_) {
    }
});


Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: authConfig.cognito_pool_id,
            userPoolClientId: authConfig.cognito_pool_client_id,
            identityPoolId: authConfig.cognito_identify_pool_id,
        },
    },
});

createRoot(document.getElementById('root')!).render(
//   <StrictMode>
    <Provider store={store}>
    <HashRouter>
    <AuthProvider>
      <AppAntNotification>
        <App />
      </AppAntNotification>
    </AuthProvider>
    </HashRouter>
    </Provider>
//   </StrictMode>,
)
