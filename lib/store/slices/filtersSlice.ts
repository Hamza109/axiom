import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  selectedProtocols: Set<string>;
  selectedQuoteTokens: Set<string>;
  searchKeywords: string;
  excludeKeywords: string;
  activeTab: "newPairs" | "finalStretch" | "migrated";
  activeCategory: "protocols" | "audit" | "metrics" | "socials";
  activeFilters: {
    newPairs: "P1" | "P2" | "P3";
    finalStretch: "P1" | "P2" | "P3";
    migrated: "P1" | "P2" | "P3";
  };
}

const initialState: FiltersState = {
  selectedProtocols: new Set(["pump", "mayhem", "bonk", "moonit", "jupiter", "meteora", "meteoraV2"]),
  selectedQuoteTokens: new Set(["sol"]),
  searchKeywords: "",
  excludeKeywords: "",
  activeTab: "newPairs",
  activeCategory: "protocols",
  activeFilters: {
    newPairs: "P1",
    finalStretch: "P1",
    migrated: "P1",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleProtocol: (state, action: PayloadAction<string>) => {
      const protocolId = action.payload;
      if (state.selectedProtocols.has(protocolId)) {
        state.selectedProtocols.delete(protocolId);
      } else {
        state.selectedProtocols.add(protocolId);
      }
    },
    selectAllProtocols: (state, action: PayloadAction<string[]>) => {
      state.selectedProtocols = new Set(action.payload);
    },
    toggleQuoteToken: (state, action: PayloadAction<string>) => {
      const tokenId = action.payload;
      if (state.selectedQuoteTokens.has(tokenId)) {
        state.selectedQuoteTokens.delete(tokenId);
      } else {
        state.selectedQuoteTokens.add(tokenId);
      }
    },
    setSearchKeywords: (state, action: PayloadAction<string>) => {
      state.searchKeywords = action.payload;
    },
    setExcludeKeywords: (state, action: PayloadAction<string>) => {
      state.excludeKeywords = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<FiltersState["activeTab"]>) => {
      state.activeTab = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<FiltersState["activeCategory"]>) => {
      state.activeCategory = action.payload;
    },
    setActiveFilter: (
      state,
      action: PayloadAction<{
        column: keyof FiltersState["activeFilters"];
        filter: "P1" | "P2" | "P3";
      }>
    ) => {
      state.activeFilters[action.payload.column] = action.payload.filter;
    },
    resetFilters: (state) => {
      state.selectedProtocols = new Set();
      state.selectedQuoteTokens = new Set();
      state.searchKeywords = "";
      state.excludeKeywords = "";
    },
  },
});

export const {
  toggleProtocol,
  selectAllProtocols,
  toggleQuoteToken,
  setSearchKeywords,
  setExcludeKeywords,
  setActiveTab,
  setActiveCategory,
  setActiveFilter,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

