/** @type {import('next').NextConfig} */
module.exports = {
        reactStrictMode: true,
        images: {
                domains: ["i.ibb.co"],
        },
        async headers() {
                return [{ source: "/_next/:path", headers: [{ key: "Access-Controller-Allow-Origin", value: "*" }] }];
        },
};
