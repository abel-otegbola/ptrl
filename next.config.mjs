/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: false, // Disable SWC (uses Babel instead)
    },
    swcMinify: false, // Disable SWC minifier
};

export default nextConfig;