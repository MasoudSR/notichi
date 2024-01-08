const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode:false ,
	images:{
	remotePatterns:[
		{
			protocol:"https",
			hostname:"*.googleusercontent.com",
			port:"",
			pathname:"**",
		},
		{
			protocol:"https",
			hostname:"avatars.githubusercontent.com",
			port:"",
			pathname:"**",
		}
	]
}};

module.exports = withPWA(nextConfig);
