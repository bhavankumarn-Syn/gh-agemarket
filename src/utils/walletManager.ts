// import WalletSDK, { Wallet } from 'wallet-sdk';
import WalletSDK from 'wallet-sdk';
import { api } from '../api/client';
import { authConfig, walletConfig } from './config';
import { encryptData } from '../api/auth';

let client:any  = null;

// type WalletResponse = {
//     wallets?: Record<string, any>;
//     notFound?: boolean;
//     [key: string]: any;
// };

// type MasterKeyResponse = {
//     keyId?: string;
//     [key: string]: any;
// };

export function getWalletClient(accessToken: string): any {
    const authToken = `Bearer ${accessToken}`;

    // Determine environment from IAM base URL
    let developerMode:'DEV' | 'STAGE' | 'PROD' = 'PROD';
    if (authConfig.iam_base_url?.includes('dev')) {
        developerMode = 'DEV';
    } else if (authConfig.iam_base_url?.includes('stg')) {
        developerMode = 'STAGE';
    }
    

    console.log(`Creating WalletSDK client with developerMode: ${developerMode}`);
    if (!client) {
        client = new WalletSDK({
            authToken,
            // mnemonic: '',
            alchemyKey: walletConfig.wl_alchemy_key,
            verbose: import.meta.env.DEV, 
            developerMode: developerMode,
        });
    }
    client.refreshToken(authToken);
    return client;
}

/**
 * Gets wallet info from IAM service
 */
export async function getWalletInfo(accessToken: string) {
    try {
        const response:any = await api.get('/api/v1/wallets/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('WalletManager => getWalletInfo: ', response);
        return response;
    } catch (error: any) {
        console.log('WalletManager => getWalletInfo error: ', error);
        if (error?.status === 404 || error.data?.toString()?.includes('Wallet not found')) {
            return { notFound: true };
        }
        throw error;
    }
}

/**
 * Gets master key info from IAM service
 */
export async function getMasterKey(accessToken: string) {
    try {
        const response = await api.get('/api/v1/master-keys/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('WalletManager => getMasterKey: ', response);
        return response;
    } catch (error: any) {
        console.log('WalletManager => getMasterKey error: ', error);
        throw error;
    }
}

/**
 * Creates wallet info in IAM service
 */
export async function createWalletInfo(data: Record<string, any>, accessToken: string): Promise<any> {
    try {
        const response = await api.post('/api/v1/wallets', data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log('WalletManager => createWalletInfo: ', response);
        return response;
    } catch (error: any) {
        console.log('WalletManager => createWalletInfo error: ', error);
        throw error;
    }
}

/**
 * Creates a wallet and returns the wallet data
 */
export async function createWallet(accessToken: string) {
    try {
        const walletInfo = await getWalletInfo(accessToken);
        const { notFound } = walletInfo || {};
        console.log('WalletManager => createWallet walletInfo: ', walletInfo);

        if (notFound) {
            const walletClient = getWalletClient(accessToken);
            const wallet :any = await walletClient.createWallet();
            console.log('WalletManager => createWallet wallet: ', wallet);

            if (wallet) {
                const masterKeyInfo:any = await getMasterKey(accessToken);
                const { keyId } = masterKeyInfo || {};

                if (keyId) {
                    let failed = false;
                    const encryptedWallet: Record<string, any> = { ...wallet };

                    // Encrypt sensitive data
                    for (const key of Object.keys(wallet)) {
                        if (['mnemonic', 'privateKey'].includes(key)) {
                            const encryptedText = await encryptData(keyId, wallet[key]); encryptData
                            if (encryptedText) {
                                encryptedWallet[key] = encryptedText;
                            } else {
                                encryptedWallet[key] = '';
                                failed = true;
                                break;
                            }
                        } else if (wallet[key] && typeof wallet[key] === 'object' && Object.keys(wallet[key]).length > 0) {
                            const sub = wallet[key];
                            for (const k of Object.keys(sub)) {
                                if (['mnemonic', 'privateKey'].includes(k)) {
                                    const encryptedText = await encryptData(keyId, sub[k]);
                                    if (encryptedText) {
                                        encryptedWallet[key][k] = encryptedText;
                                    } else {
                                        encryptedWallet[key][k] = '';
                                        failed = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (failed) break;
                    }

                    if (failed) return undefined;

                    console.log('WalletManager => createWallet encryptedWallet: ', encryptedWallet);
                    const createInfo = await createWalletInfo({ wallets: encryptedWallet }, accessToken);
                    console.log('WalletManager => createWallet createInfo: ', createInfo);

                    const { data } = createInfo || {};
                    const { wallets } = data || {};
                    return wallets || createInfo;
                }
            }
        } else {
            // Wallet already exists
            const { data } = walletInfo || {};
            const { wallets } = data || {};
            return wallets || walletInfo;
        }
    } catch (e: any) {
        console.log('WalletManager => createWallet: ', e);
    }
    return undefined;
}

