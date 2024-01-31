import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatsState, ICat, IError } from "../types";
import { AxiosError } from "axios";
import { fetchCats } from "@/api/catApi";
import { RootState } from "..";

export const fetchCatsAction = createAsyncThunk<
  ICat[],
  void,
  { state: RootState }
>("cats/fetchCats", async (_, { getState }) => {
  try {
    const { limit, page, size, mime_types } = getState().catsSlice.params;
    const cats = await fetchCats({
      limit,
      page,
      size,
      mime_types,
    });
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
  params: {
    page: 1,
    limit: 15,
    size: "med",
    mime_types: "jpg",
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
        (state, { payload }: PayloadAction<ICat[]>) => {
          const currentCats = payload.map((cat) => ({
            ...cat,
            isFavorite: false,
          }));
          state.cats = currentCats;
          state.errors.fetchCatsErr = null;
          state.isLoadings.isFetchCatsLoading = false;
        }
      );
  },
});

// export const {} = catsSlice.actions;
export default catsSlice.reducer;
