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
  pageData: {
    page: number;
    limit: number;
  };
}

export interface IError {
  message: string | string[];
}
