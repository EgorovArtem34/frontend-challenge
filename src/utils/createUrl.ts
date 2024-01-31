import { CategoryType, SortEnum } from "../types";
import { sortingVariants } from "./constants";

export const createUrl = (
  baseUrl: string,
  sortingBy: SortEnum,
  categoryQuery: CategoryType,
  searchQuery: string,
  startIndex: number,
  booksPerFetch: number
) => {
  const searchQueryParam = searchQuery
    ? `volumes?q=${searchQuery}`
    : `volumes?q=""`;
  const categoryParam =
    categoryQuery !== "all"
      ? `${searchQueryParam}+subject:${categoryQuery}`
      : `${searchQueryParam}`;
  const startIndexParam = startIndex !== 0 ? `startIndex=${startIndex}` : "";
  const maxResultParam = `maxResults=${booksPerFetch}`;
  const sortingParam = sortingBy !== "relevance" ? `orderBy=${sortingBy}` : "";
  const keyParam = `key=${APIKey}`;

  const queryParams = [
    categoryParam,
    sortingParam,
    startIndexParam,
    maxResultParam,
    keyParam,
  ]
    .filter((param) => param.length > 0)
    .join("&");
  return [apiUrl, queryParams].join("/");
};
