export interface Login {
    email: string;
    password: string;
};

export interface LoginSuccess {
    token: string;
    refreshToken: string;
    expirationDate: string;
};

export interface LoginFailed {
    code: number;
    message: string;
};

export type LoginResponse = LoginSuccess | LoginFailed;