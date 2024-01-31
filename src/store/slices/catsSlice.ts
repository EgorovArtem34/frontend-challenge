import { modifyCats } from "@/utils/catsHelpers";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatsState, ICat, IError, IFavoriteParams } from "../types";
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

    return cats;
  } catch (err) {
    const error = err as AxiosError<IError>;
    throw error.message;
  }
});

export const fetchMoreCats = createAsyncThunk<
  ICat[],
  void,
  { state: RootState }
>("cats/fetchMoreCats", async (_, { getState }) => {
  try {
    const { limit, page, size, mime_types } = getState().catsSlice.params;
    const newPage = page + 1;
    const cats = await fetchCats({
      limit,
      newPage,
      size,
      mime_types,
    });
    return cats;
  } catch (err) {
    const error = err as AxiosError<IError>;
    throw error.message;
  }
});

const initialState: CatsState = {
  cats: [],
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
  reducers: {
    setFavoriteCat: (state, { payload }: PayloadAction<IFavoriteParams>) => {
      state.cats = state.cats.map((cat) =>
        cat.id === payload.id ? { ...cat, isFavorite: payload.isFavorite } : cat
      );
    },
  },
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
          const currentCats = modifyCats(payload);
          state.cats = currentCats;
          state.errors.fetchCatsErr = null;
          state.isLoadings.isFetchCatsLoading = false;
        }
      )

      .addCase(fetchMoreCats.pending, (state) => {
        state.errors.fetchMoreCatsErr = null;
        state.isLoadings.isFetchMoreCatsLoading = true;
      })
      .addCase(fetchMoreCats.rejected, (state, action) => {
        state.errors.fetchMoreCatsErr = action.payload as string;
        state.isLoadings.isFetchMoreCatsLoading = false;
      })
      .addCase(
        fetchMoreCats.fulfilled,
        (state, { payload }: PayloadAction<ICat[]>) => {
          const currentCats = modifyCats(payload);
          state.cats = [...state.cats, ...currentCats];
          state.errors.fetchMoreCatsErr = null;
          state.isLoadings.isFetchMoreCatsLoading = false;
          state.params.page = state.params.page + 1;
        }
      );
  },
});

export const { setFavoriteCat } = catsSlice.actions;
export default catsSlice.reducer;
