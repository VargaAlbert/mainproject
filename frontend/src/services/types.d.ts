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

type productT = {
    id: string;
    product: string;
    description: string;
    img: string;
    price: number;
    category: string;
}

type filterT = {
    category?: string
}