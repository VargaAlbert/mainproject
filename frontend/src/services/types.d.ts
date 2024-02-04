type uiObjT = {
    [key: string]: boolean
}

type loginObjT = {
    user: string;
    pwd: string;
    errMsg: string;
    success: boolean
}

type authT = {
    user: string;
    pwd: string;
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