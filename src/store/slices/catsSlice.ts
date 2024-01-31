import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatsState, IError } from "../types";
import axios, { AxiosError } from "axios";
import { fetchCats } from "@/api/catApi";
import { RootState } from "..";

export const fetchCatsAction = createAsyncThunk("cats/fetchCats", async () => {
  try {
    const cats = await fetchCats();
    console.log(cats);
    return cats;
  } catch (err) {
    const error = err as AxiosError<IError>;
    throw error.message;
  }
});

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
  pageData: {
    page: 1,
    limit: 12,
  },
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatsAction.pending, (state) => {
        state.errors.fetchCatsErr = null;
        state.isLoadings.isFetchCatsLoading = true;
      })
      .addCase(fetchCatsAction.rejected, (state, action) => {
        state.errors.fetchCatsErr = action.payload as string;
        state.isLoadings.isFetchCatsLoading = false;
      })
      .addCase(
        fetchCatsAction.fulfilled,
        (state, { payload }: PayloadAction<unknown>) => {
          const { cats } = payload;
          state.cats = cats;
          state.errors.fetchCatsErr = null;
          state.isLoadings.isFetchCatsLoading = false;
        }
      );
  },
});

// export const {} = catsSlice.actions;
export default catsSlice.reducer;
