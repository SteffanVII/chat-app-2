/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        formats : [ 'image/avif', 'image/webp' ],
        remotePatterns : [
            {
                protocol : 'http',
                hostname : 'localhost',
                port : '3000',
            }
        ]
    },
    env : {
        URL : process.env.URL
    }
}

module.exports = nextConfig
