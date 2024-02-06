type uiObjT = {
    [key: string]: boolean
}

type authT = {
    user: string;
    roles: number[];
    accessToken: string;
}

type userT = {
    refreshToken: string[];
    username: string;
    roles: {
        User: number;
        Editor?: number | null | undefined;
        Admin?: number | null | undefined;
    };
    password: string;
}