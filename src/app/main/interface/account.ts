import { User } from "../../auth/interface/user";

export interface Account {
    id?: number;
    username?: string;
    userId?: number;
    bio?: string;
    profilePicture?: string;
    createdAt?: string;
    followerCount?: number;
    contentCount?: number;
    user?: User
}

export interface AccountCreate {
    username: string;
    profilePicture: File | null;
}

export interface AccountUpdate {
    username: string;
    profilePicture: File | null;
    bio: string;
}