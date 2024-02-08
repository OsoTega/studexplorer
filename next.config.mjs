/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
const pwa =  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
    reactStrictMode: true,
};

export default pwa(nextConfig);
