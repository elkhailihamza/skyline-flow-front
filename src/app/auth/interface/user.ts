export interface User {
    name: string;
    surname: string;
    email: string;
    roles: string[];
};

export interface UserShortDetails {
    id: number;
    name: string;
    surname: string;
    email: string;
    accountPublicInfoDTO: AccountShortDetails;
}

export interface AccountShortDetails {
    id: number;
    username: string;
    profilePicture: string;
    createdAt: string;
}