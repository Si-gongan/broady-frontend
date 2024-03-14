import { CommentServer } from "./setting";
import { PostListType } from "./types";

export const getCommentUserInfoApi = async (token: string) => {
    return await CommentServer.get('/comment-user/info', {
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export const getCommentUserPointApi = async (token: string) => {
    return await CommentServer.get('/comment-user/point', {
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export const getPostAvailableApi = async ({ limit, page, token }: { limit: number; page: number; token: string }) => {
    return await CommentServer.get<PostListType>(
        `/comment-user/post/available?${page && `page=${page}`}${limit && `&limit=${limit}`}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
    );
};

export const getPostTodayCompleteApi = async ({ limit, page, token }: { limit: number; page: number; token: string }) => {
    return await CommentServer.get<PostListType>(
        `/comment-user/post/today-complete?${page && `page=${page}`}${limit && `&limit=${limit}`}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
    );
};

