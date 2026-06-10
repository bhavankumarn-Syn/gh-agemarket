

export const authConfig = {
  cognito_region: import.meta.env.VITE_COGNITO_REGION,
  cognito_pool_id: import.meta.env.VITE_COGNITO_POOL_ID,
  cognito_pool_client_id: import.meta.env.VITE_COGNITO_POOL_CLIENT_ID,
  cognito_identify_pool_id: import.meta.env.VITE_COGNITO_IDENTIFY_POOL_ID,
  iam_base_url: import.meta.env.VITE_IAM_BASE_URL,
  parent_origin: import.meta.env.VITE_PARENT_ORIGIN || '',
  marke_place_url: import.meta.env.VITE_MARKETPLACE_URL,
  vaultCheck: import.meta.env.VITE_COGNITO_POOL_CLIENT_ID || ' Hardcode printing --> Valut values are not set',
  dam_base_url: import.meta.env.VITE_DAM_API_URL,
  
};
export const apiConfig = {
  credit_service_url: import.meta.env.VITE_CREDIT_SERVICE_URL,
};
export const walletConfig = {
  wl_alchemy_key: import.meta.env.VITE_WL_ALCHEMY_KEY,
};
export const assetTypeIdConfig = {
  dev : {
    avatar : '',
    skill : '',
    agent : '',
    model : '',
    data : '',
    wearable : '',
    workflow: ''
  },
  stg : {
    avatar : '69b6f8cceb1e7496ca8acdbb',
    skill : '6a01d59ba214eba45a7ecffe',
    agent : '69b93996eb1e7496ca8ad26f',
    model : '',
    data : '',
    wearable : '69b934aaeb1e7496ca8ad201',
    workflow: '6a059d1ea214eba45a7edb0b'
  },
  prod : {
    avatar : '69e0a8fb596291c639da1e1d',
    skill : '6a16da91eb497be3af8bd0a1',
    agent : '69e08288596291c639da1dc3',
    model : '',
    data : '',
    wearable : '69e083a6596291c639da1dd4',
    workflow: '6a17c8fbeb497be3af8bd1b7'
  }

}


