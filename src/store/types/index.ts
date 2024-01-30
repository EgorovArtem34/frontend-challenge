// export interface Cat {

// }

export interface CatsState {
  cats: unknown[];
  favoriteIdsCats: number[];
  errors: {
    fetchCatsErr: null | string;
    fetchMoreCatsErr: null | string;
  };
  isLoadings: {
    isFetchCatsLoading: boolean;
    isFetchMoreCatsLoading: boolean;
  };
}
