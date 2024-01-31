interface IBreed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
}

export interface ICat {
  id: string;
  url: string;
  breeds: IBreed[];
  isFavorite?: boolean;
}

export interface CatsState {
  cats: ICat[];
  favoriteIdsCats: number[];
  errors: {
    fetchCatsErr: null | string;
    fetchMoreCatsErr: null | string;
  };
  isLoadings: {
    isFetchCatsLoading: boolean;
    isFetchMoreCatsLoading: boolean;
  };
  params: {
    page: number;
    limit: number;
    size: string;
    mime_types: string;
  };
}

export interface IError {
  message: string | string[];
}
