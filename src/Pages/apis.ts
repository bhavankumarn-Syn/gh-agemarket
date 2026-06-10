import axios from 'axios';

const BASE_URL = 'http://10.20.16.37:4200'; 
const KB_BASE_URL = 'http://10.20.16.37:3002'; 

export const getAgentList = async (token:string,params:any) => {
  try {
    const response = await axios.get(`${BASE_URL}/agents/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching agent list:', error);
    throw error;
  }
};
export const getAgentDetails = async (token:string,id:any) => {
  try {
    const response = await axios.get(`${BASE_URL}/agents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching agent list:', error);
    throw error;
  }
};
export const getKbList = async (token:string,agentId:any) => {
  try {
    const response = await axios.get(`${KB_BASE_URL}/api/kb/${agentId}/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching agent list:', error);
    throw error;
  }
};
export const addKB = async (token:string,data:any,id:any) => {
  try {
    const response = await axios.post(`${KB_BASE_URL}/api/kb/${id}/knowledge`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching agent list:', error);
    throw error;
  }
};
export const addQnA = async (token:string,data:any,agentId:any) => {
  try {
    const response = await axios.post(`${KB_BASE_URL}/api/kb/${agentId}/qna`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching agent list:', error);
    throw error;
  }
};
export const addKbFile = async (token:string,data:any,agentId:any) => {
  try {
    const response = await axios.post(`${KB_BASE_URL}/api/kb/${agentId}/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching agent list:', error);
    throw error;
  }
};
