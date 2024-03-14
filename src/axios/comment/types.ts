import { IPost } from "@/@types/post";

export type PostListType = {
  statusCode: 200;
  result: {
    posts: IPost[];
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
};
