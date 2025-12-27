import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isFiltersDialogOpen: boolean;
  isTradingDialogOpen: boolean;
  sidebarCollapsed: boolean;
  theme: "dark" | "light";
}

const initialState: UiState = {
  isFiltersDialogOpen: false,
  isTradingDialogOpen: false,
  sidebarCollapsed: false,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFiltersDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isFiltersDialogOpen = action.payload;
    },
    setTradingDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isTradingDialogOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setFiltersDialogOpen,
  setTradingDialogOpen,
  toggleSidebar,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;

