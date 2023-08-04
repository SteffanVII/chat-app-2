/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        formats : [ 'image/avif', 'image/webp' ],
        remotePatterns : [
            {
                protocol : 'http',
                hostname : 'localhost',
                port : '8080',
            }
        ]
    }
}

module.exports = nextConfig
