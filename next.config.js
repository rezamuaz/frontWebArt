const isProd = process.env.NODE_ENV === "production";
module.exports = {
    locales: ["id"],
    defaultLocale: "id",
    // you need to add:
    assetPrefix: isProd
        ? "https://main-website-next.vercel.app"
        : "http://localhost:3000",
    async redirect() {
        return [
            {
                source: "/terbaru",
                destination: "/terbaru/page/1",
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/api/backend",
                destination: "http://localhost:4000/graphql",
            },
            {
                source: "/gallery",
                destination: "https://api.cloudinary.com",
            },
            {
                source: "/terbaru",
                destination: "/terbaru/page/1",
            },
        ];
    },

    images: {
        domains: ["res.cloudinary.com", "ianfinho.sirv.com"],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    reactStrictMode: true,
    poweredByHeader: false,
    env: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        BACKEND: process.env.BACKEND,
        PROXY: process.env.PROXY,
        API: process.env.API,
    },
};
