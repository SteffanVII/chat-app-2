/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        formats : [ 'image/avif', 'image/webp' ],
        remotePatterns : [
            {
                protocol : 'http',
                hostname : 'localhost',
                port : '3000',
            },
            {
                protocol : 'https',
                hostname : "chat-app-2-ely8llonz-steffanvii.vercel.app"
            }
        ]
    },
    env : {
        URL : process.env.URL
    }
}

module.exports = nextConfig
