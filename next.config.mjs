/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: false, // Disable SWC (uses Babel instead)
    }
};

export default nextConfig;