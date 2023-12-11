const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */

const nextConfig = {images:{
	domains:["avatars.githubusercontent.com"]
}};

module.exports = withPWA(nextConfig);
