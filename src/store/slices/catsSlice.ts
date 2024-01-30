import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatsState } from "../types";

export const fetchCats = createAsyncThunk("cats/fetchCats", async () => {});

export const fetchMoreCats = createAsyncThunk(
  "cats/fetchMoreCats",
  async () => {}
);

const initialState: CatsState = {
  cats: [],
  favoriteIdsCats: [],
  errors: {
    fetchCatsErr: null,
    fetchMoreCatsErr: null,
  },
  isLoadings: {
    isFetchCatsLoading: false,
    isFetchMoreCatsLoading: false,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.errors.fetchCatsErr = null;
        state.isLoadings.isFetchCatsLoading = true;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.errors.fetchCatsErr = action.payload as string;
        state.isLoadings.isFetchCatsLoading = false;
      })
      .addCase(
        fetchCats.fulfilled,
        (state, { payload }: PayloadAction<unknown>) => {
          // const { users } = payload;
          // state.cats = users;
          state.errors.fetchCatsErr = null;
          state.isLoadings.isFetchCatsLoading = false;
        }
      );
  },
});

// export const {} = usersSlice.actions;
export default usersSlice.reducer;
