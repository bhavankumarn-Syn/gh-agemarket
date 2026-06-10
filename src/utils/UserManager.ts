import CryptoJS from 'crypto-js';

import {api} from '../api/client';
import {decryptData, signOut} from '../api/auth';
import {clearPassphrase} from '../utils/passphraseStore';


export function encryptAES256(plainText:any, passphrase:any) {
    const salt = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.lib.WordArray.random(16);

    const key = CryptoJS.PBKDF2(passphrase, salt, {
        keySize: 256 / 32,
        iterations: 1000,
        hasher: CryptoJS.algo.SHA256,
    });

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return {
        cipherText: encrypted.toString(),
        iv: iv.toString(CryptoJS.enc.Hex),
        salt: salt.toString(CryptoJS.enc.Hex),
    };
}

export async function userMgmtLogin(credentials:any) { 
    try {
        
        const {access_token: accessToken} = credentials || {};
        console.log('Login called with credentials:', {accessToken: accessToken ? '***' : 'null'});
        if (!accessToken) return null;
        const headers = {Authorization: `Bearer ${accessToken}`};
        const result:any = await api.get('/api/v1/wallets/me', {headers});
        const {data, masterKeyId} = result || {};
        const {wallets} = data || {};
        const {mnemonic} = wallets || {};
        console.log('Wallet data:', {data, masterKeyId, mnemonic});
        if (!masterKeyId || !mnemonic) {
            console.log('Missing masterKeyId or mnemonic');
            return null;
        }
        const enc = mnemonic || '';
        const keyId = masterKeyId || '';
        let privateKey = '';
        if (enc && keyId) {
            privateKey = await decryptData(keyId, enc);
            console.log('Wallet loaded successfully with pkey, acctoken', {privateKey, accessToken});
            let protectedPKey = btoa(privateKey);
            let protectedAToken = btoa(accessToken)
            // return {privateKey, accessToken};
            return {protectedPKey, protectedAToken};
        }
        // let encrypted = null;
        // // if (options?.passphrase && privateKey) {
        // if (options?.passphrase && privateKey) {
        //     try {
        //         encrypted = encryptAES256(privateKey, options.passphrase);
        //         // Clear passphrase from memory after successful encryption
        //         clearPassphrase();
        //     } catch (e) {
        //         console.error('AES256 encryption failed:', e);
        //     }
        // }
        // if (encrypted && Object.keys(encrypted).length > 0) {
        //     sendMessage({type: 'WALLET_LOADED', data: {encrypted, accessToken}});
        //     console.log('Wallet loaded successfully', {encrypted});
        //     return {encrypted, accessToken};
        // }
        console.log('Wallet not encrypted');
        return null;
    } catch (e:any) {
        console.error('Login failed:', e);
        if (e?.status === 404 || e?.data?.toString()?.includes('Wallet not found')) {
            return { notFound: true };
        }
        return null;
    }
}

export async function userMgmtLogout() {
    try {
        signOut();
        clearPassphrase();
    } catch (e) {
        console.error('Logout failed:', e);
    }
}

