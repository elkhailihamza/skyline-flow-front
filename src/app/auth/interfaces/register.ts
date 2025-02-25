export interface register {
    email: string;
    password: string;
};

export interface RegisterSuccess {
    token: string;
    refreshToken: string;
    expirationDate: string;
};

export interface RegisterFailed {
    code: number;
    message: string;
};

export type LoginResponse = RegisterSuccess | RegisterFailed;