import { Account } from "../../main/interface/account";

export interface User {
    id: number;
    surname: string;
    name: string;
    email: string;
    roles: string[];
    account: Account | null;
};

export interface UserShortDetails {
    id: number;
    name: string;
    surname: string;
    email: string;
    accountPublicInfo: AccountShortDetails | null;
}

export interface AccountShortDetails {
    id: number;
    username: string;
    profilePicture: string | null;
    createdAt: string;
}