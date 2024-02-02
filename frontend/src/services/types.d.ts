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