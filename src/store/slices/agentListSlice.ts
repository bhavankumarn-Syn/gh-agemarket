import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { marketPlaceAssetListing } from '../../api/api';
import { assetTypeIdConfig } from '../../utils/config';
import { PAGE_SIZE } from '../../utils/commonData';
import type { RootState } from '../store';

interface FetchAgentsArgs {
  token: string;
  environment: string;
  /** When provided (e.g. from the URL `type` query param) this overrides the
   *  asset types currently held in state for this single fetch. */
  assetTypeOverride?: string[];
}

interface FetchAgentsResult {
  agents: any[];
  total: number;
  appliedIndustry: string[];
  appliedAssetType: string[];
}

interface AgentListState {
  agents: any[];
  total: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchText: string;
  industryCheckedList: string[];
  assetTypeCheckedList: string[];
  // Tags reflect the filters that were actually applied on the last fetch.
  industryTag: string[];
  assetTypeTag: string[];
}

const initialState: AgentListState = {
  agents: [],
  total: 0,
  loading: true,
  error: null,
  currentPage: 1,
  searchText: '',
  industryCheckedList: [],
  assetTypeCheckedList: [],
  industryTag: [],
  assetTypeTag: [],
};

export const fetchAgents = createAsyncThunk<FetchAgentsResult, FetchAgentsArgs>(
  'agentList/fetchAgents',
  async ({ token, environment, assetTypeOverride }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { currentPage, searchText, industryCheckedList } = state.agentList;

    const assetTypeCheckedList = assetTypeOverride ?? state.agentList.assetTypeCheckedList;

    const envConfig = assetTypeIdConfig[environment as 'dev' | 'stg' | 'prod'];
    const mappedAssetTypeIds = assetTypeCheckedList
      .map((type) => envConfig?.[type as keyof typeof envConfig])
      .filter(Boolean);

    const offset = (currentPage - 1) * PAGE_SIZE;

    const marketPlacePayload = {
      token: atob(token),
      limit: PAGE_SIZE,
      offset,
      searchString: searchText || undefined,
      industry: industryCheckedList.length > 0 ? industryCheckedList : undefined,
      assetType: mappedAssetTypeIds,
    };

    const resp = await marketPlaceAssetListing(marketPlacePayload);

    if (!resp?.success) {
      return rejectWithValue(resp?.message || 'Failed to fetch agents');
    }

    return {
      agents: resp.data,
      total: resp.pagination?.total ?? 0,
      appliedIndustry: industryCheckedList,
      appliedAssetType: assetTypeCheckedList,
    };
  }
);

const agentListSlice = createSlice({
  name: 'agentList',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
      state.currentPage = 1; // reset pagination when search changes
    },
    setIndustryCheckedList(state, action: PayloadAction<string[]>) {
      console.log('Reducer - setIndustryCheckedList stt', state);
      console.log('Reducer - setIndustryCheckedList acc', action);
      state.industryCheckedList = action.payload;
    },
    setAssetTypeCheckedList(state, action: PayloadAction<string[]>) {
      state.assetTypeCheckedList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.agents;
        state.total = action.payload.total;
        state.industryTag = action.payload.appliedIndustry;
        state.assetTypeTag = action.payload.appliedAssetType;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Failed to fetch agents';
      });
  },
});

export const {
  setCurrentPage,
  setSearchText,
  setIndustryCheckedList,
  setAssetTypeCheckedList,
} = agentListSlice.actions;

export default agentListSlice.reducer;
