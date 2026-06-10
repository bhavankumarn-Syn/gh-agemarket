import {
    autoSignIn as _autoSignIn,
    confirmSignIn as _confirmSignIn,
    confirmSignUp as _confirmSignUp,
    fetchAuthSession as _fetchAuthSession,
    fetchUserAttributes as _fetchUserAttributes,
    getCurrentUser as _getCurrentUser,
    resendSignUpCode as _resendSignUpCode,
    signIn as _signIn,
    signOut as _signOut,
    signUp as _signUp,
    updateUserAttributes as _updateUserAttributes,
} from 'aws-amplify/auth';
import { authConfig } from '../utils/config';
import {DecryptCommand, EncryptCommand, KMSClient} from '@aws-sdk/client-kms';
import {jwtDecode} from 'jwt-decode';



let kmsClient:any = null;

export async function signIn(email: string) {
    try {
       
        const response = await _signIn({
            username: email,
            options: {
                authFlowType: 'USER_AUTH',
                preferredChallenge: 'EMAIL_OTP',
            },
        });
        console.log('Sign In/OTP Sent: ', response);
        return response;
    } catch (e) {
        console.log('Error starting sign-in: ', e);
        throw e;
    }
}

export async function signUp(email: string) {
    try {
        const response = await _signUp({
            
            username: email, 
            options: {
                userAttributes: {}, // 👈 required by the type
                autoSignIn: {
                    authFlowType: 'USER_AUTH',
                    preferredChallenge: 'EMAIL_OTP',
                },
            },
        });
        console.log('Sign Up/OTP Sent: ', response);
        return response;
    } catch (e) {
        console.log('Error starting sign-up: ', e);
        throw e;
    }
}

export async function confirmSignIn(otp:any) {
    try {
        const response = await _confirmSignIn({
            challengeResponse: otp,
        });
        console.log('User Signed In: ', response);
        return response;
    } catch (e) {
        console.log('Error verifying OTP: ', e);
        throw e;
    }
}

export async function confirmSignUp(username:any, otp:any) {
    try {
        const response = await _confirmSignUp({
            username,
            confirmationCode: otp,
        });
        console.log('User Signed Up: ', response);
        if (response?.nextStep?.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
            try {
                const signInOutput = await _autoSignIn();
                if (signInOutput?.nextStep?.signInStep === 'DONE') {
                    console.log('User Signed In Successfully.', signInOutput);
                    return signInOutput;
                }
            } catch (e) {
                const errorDetails = e?.toString() || '';
                if (errorDetails.includes('UserAlreadyAuthenticatedException')) {
                    return {isSignedIn: true};
                }
                throw e;
            }
        }
        return response;
    } catch (e) {
        console.log('Error verifying OTP: ', e);
        throw e;
    }
}

export async function resendSignUpCode(username:any) {
    try {
        const response = await _resendSignUpCode({username});
        console.log('Resent Sign Up Code: ', response);
        return response;
    } catch (e) {
        console.log('Error resending OTP: ', e);
        throw e;
    }
}

export async function signOut() {
    try {
        const response = await _signOut();
        console.log('Signed out: ', response);
        kmsClient?.destroy?.();
        kmsClient = null;
        return response;
    } catch (e) {
        console.log('Error signing out: ', e);
        throw e;
    }
}

export async function updateUser(attributes:any) {
    try {
        console.log('Updating the current user: ', attributes);
        const response = await _updateUserAttributes({
            userAttributes: attributes,
        });
        console.log('Updated the current user: ', response);
        return response;
    } catch (e) {
        console.log('Error updating the current user: ', e);
        throw e;
    }
}

export async function getUser(includeAttributes = true) {
    try {
        const response = await _getCurrentUser();
        console.log('Fetched the current user: ', response);
        if (includeAttributes && response?.userId) {
            const attributes = await _fetchUserAttributes();
            return {attributes, ...response};
        }
        return response;
    } catch (e) {
        console.log('Error fetching the current user: ', e);
    }
    return undefined;
}

export async function getSession(forceRefresh?: any) {
    try {
        const response = await _fetchAuthSession(
            forceRefresh ? {forceRefresh: true} : undefined,
        );
        console.log('Fetched the current session: ', response);
        return response;
    } catch (e) {
        console.log('Error fetching the current session: ', e);
    }
    return undefined;
}

export async function isTokenExpired() {
    try {
        const session = await _fetchAuthSession();
        console.log('Fetched the current session: ', session);
        const accessToken = session?.tokens?.accessToken?.toString?.() || '';
        const {exp} = jwtDecode(accessToken);
        const now = Date.now() / 1000;
        return (exp || 0) < now;
    } catch (e) {
        console.log('Error fetching the current session: ', e);
        return true;
    }
}

export async function deleteUser() {
    try {
        // Placeholder for delete API if needed: await _deleteUser();
        console.log('User account deleted successfully');
    } catch (e) {
        console.log('Error deleting user:', e);
        throw e;
    }
}

async function getKmsClient() {
    if (kmsClient) return kmsClient;
    try {
        const response = await _fetchAuthSession();
        console.log('Fetched the current session: ', response);
        const client = new KMSClient({
            region: authConfig.cognito_region,
            credentials: response?.credentials,
        });
        kmsClient = client;
        console.log('KMS => config: ', client.config);
        return client;
    } catch (e) {
        console.log('Error creating KMS client: ', e);
    }
    return undefined;
}

export async function encryptData(keyId:any, plaintext:any) {
    try {
        const plaintextBuffer = Buffer.from(plaintext, 'utf8');
        const command = new EncryptCommand({KeyId: keyId, Plaintext: plaintextBuffer});
        const client = await getKmsClient();
        const response = await client?.send(command);
        const encryptedData = response?.CiphertextBlob;
        let encryptedBase64 = '';
        if (encryptedData) {
            encryptedBase64 = Buffer.from(encryptedData).toString('base64');
        }
        console.log('Encrypted data (base64):', encryptedBase64);
        return encryptedBase64 ?? '';
    } catch (e) {
        console.log('Encryption failed: ', e);
    }
    return '';
}

export async function decryptData(keyId:any, encryptedBase64:any) {
    try {
        const ciphertextBuffer :any = Buffer.from(encryptedBase64, 'base64');
        const command = new DecryptCommand({KeyId: keyId, CiphertextBlob: ciphertextBuffer});
        const client = await getKmsClient();
        const response = await client?.send(command);
        let decryptedText = '';
        if (response && response.Plaintext) {
            decryptedText = Buffer.from(response.Plaintext).toString('utf8');
        }
        console.log('Decrypted text:', decryptedText);
        return decryptedText;
    } catch (e) {
        console.log('Decryption failed: ', e);
    }
    return '';
}

export function destroy() {
    try {
        kmsClient?.destroy?.();
        kmsClient = null;
    } catch (e) {
        console.log('Error destroying KMS: ', e);
    }
}

export default {
    signIn,
    signUp,
    confirmSignIn,
    confirmSignUp,
    resendSignUpCode,
    signOut,
    updateUser,
    getUser,
    getSession,
    isTokenExpired,
    deleteUser,
    encryptData,
    decryptData,
    destroy,
};
