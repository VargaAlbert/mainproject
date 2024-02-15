import WHITE_LIST from "../config/allowedOrigins.mjs";

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (WHITE_LIST.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

export default credentials;