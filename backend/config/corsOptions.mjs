import WHITE_LIST from "./allowedOrigins.mjs";

const corsOptions = {
    origin: (origin, callback) => {
        if (WHITE_LIST.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
}

export default corsOptions;