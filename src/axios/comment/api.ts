import { CommentServer } from "./setting";
import { AvailablePostType } from "./types";

export const getPostAvailable = async ({ limit, page, token }: { limit: number; page: number; token: string }) => {
    return await CommentServer.get<AvailablePostType>(
        `/comment-user/post/available?${page && `page=${page}`}${limit && `&limit=${limit}`}`,
        {
            headers: {
                authorization: `Bearer [${token}]`,
                'Content-Type': 'application/json'
            },
        }
    );
};

