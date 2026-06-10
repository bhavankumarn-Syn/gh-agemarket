// src/api/checkEmail.ts
import axios from "axios";
import { apiConfig, authConfig } from "../utils/config";


 interface marketPlacePayload {
    token: string, 
    limit: number,
    offset: number,
    searchString?: string,
    industry?: string[]
    assetType?: string[]
}
interface assetDetailPayload {
  token: string,
  assetId: string | undefined
}
interface paymentDetailPayload {
  token: string,
  itemId: string | undefined,
  purchaseType: string,
  returnUrl: string,
  cancelUrl: string,
  assetName: string | undefined
}
export interface CheckEmailResponse {
  // exists: boolean;
  message?: string;
  status?: any
}

export const checkEmail = async (email: string): Promise<CheckEmailResponse> => {

  let IAM_Url = authConfig.iam_base_url;
  
  try{

    const response = await axios.post(
      `${IAM_Url}/api/v2/b2c/check-email`, 
      { email: email },
      { headers: { "Content-Type": "application/json"},  },
      
    );

    return response.data;

  }catch (error: any) {
        // return  error.response
        return {
          status : error.response.status,
          message : error.response.data.message
        }
        
    }
};


export const marketPlaceAssetListing = async ( payloadData: marketPlacePayload) => {
  const { token, limit, offset, searchString, industry, assetType } = payloadData;
  const MarketPlace_Url = authConfig.marke_place_url;
  try {
    const filter = {
      // assetType: 'ea0dc317-cb33-49d5-94e6-dd46c7434c8a',
      // search: "test",
      industry: industry && industry.length > 0 ? industry : undefined,
      assetType: assetType && assetType.length > 0 ? assetType : undefined,
      published: true
    };
    let search = searchString ? `?search=${searchString.trim()}` : '';

    const response = await axios.get(
      `${MarketPlace_Url}/api/v1/assets${search && search}`,
      {
        params: {
          filter: JSON.stringify(filter),
          limit,
          offset,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};

export const publicMarketPlaceAssetListing = async ( payloadData: marketPlacePayload) => {
  const { token, limit, offset, searchString, industry, assetType } = payloadData;
  const MarketPlace_Url = authConfig.marke_place_url;
  try {
    const filter = {
      industry: industry && industry.length > 0 ? industry : undefined,
      assetType: assetType && assetType.length > 0 ? assetType : undefined,
      published: true
    };
    let search = searchString ? `?search=${searchString.trim()}` : '';

    const response = await axios.get(
      `${MarketPlace_Url}/api/v1/assets/public${search && search}`,
      {
        params: {
          filter: JSON.stringify(filter),
          limit,
          offset,
        },
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // Not Required for public endpoint
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};




export async function getDigitalAssetTypes( token: string) {

  try {
    const response = await axios.get(
      `${authConfig.dam_base_url}/api/v1/digital-asset-types`,
      {
        params: {
          filter: JSON.stringify({
            where: [
              { name: "Agent" },
              { name: "Brain" },
              { name: "Avatar" },
              { name: "BrandingInfo" },
              { name: "Workflow Template" },
              { name: "RAG" },
              { name: "Simli" },
            ],
          }),
        },
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      }
    );

    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching digital asset types:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getBuyerDashboardData( token: string) {
  const MarketPlace_Url = authConfig.marke_place_url;
  try {
    const response = await axios.get(
      `${MarketPlace_Url}/api/v1/asset-downloads`,
      {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
      }
    );

    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching digital asset types:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export const getAssetDetail = async (payloadData:assetDetailPayload) => {
  const { token, assetId } = payloadData;
  const MarketPlace_Url = authConfig.marke_place_url;
  try {

    const response = await axios.get(
      `${MarketPlace_Url}/api/v1/assets/${assetId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};
export const assetSubscription = async (payloadData:paymentDetailPayload) => {
  const { itemId, purchaseType, returnUrl, cancelUrl, assetName, token } = payloadData;
  const creditURL = apiConfig.credit_service_url;
  const paymentUrl = `${creditURL}/marketplace/init-payment`;
  try {

    const response = await axios.post(
      paymentUrl,
      { 
        itemId: itemId,
        purchaseType: purchaseType,
        returnUrl: returnUrl,
        cancelUrl: cancelUrl,
        assetName: assetName
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message,
    };
  }
};
// async function request(path, {method = 'GET', headers = {}, body} = {}) {
//     const url = `${BASE_URL}${path}`;
//     const init = {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             ...headers,
//         },
//         body: body ? JSON.stringify(body) : undefined,
//     };

//     const res = await fetch(url, init);
//     const contentType = res.headers.get('content-type') || '';
//     const isJson = contentType.includes('application/json');
//     const data = isJson ? await res.json().catch(() => null) : await res.text();

//     if (!res.ok) {
//         const err = new Error('Request failed');
//         err.status = res.status;
//         err.data = data;
//         throw err;
//     }
//     return data;
// }



