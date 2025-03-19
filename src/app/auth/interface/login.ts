export interface Login {
    email: string;
    password: string;
};

export interface LoginSuccess {
    jwtToken: string;
    jwtRefreshToken: string;
    expDate: string;
};

export interface LoginFailed {
    code: number;
    message: string;
};

export type LoginResponse = LoginSuccess | LoginFailed;