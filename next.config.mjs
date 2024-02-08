/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
const pwa =  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                pathname: "**",
                port: '3000',
                protocol: "http"
            },
            {
                hostname: "https://stud-explorer.onrender.com",
                pathname: "**",
                protocol: "https"
            }
        ]
    }
};

export default pwa(nextConfig);
