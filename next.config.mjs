/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'hoanghamobile.com',
            
          },
        ],
      },
};

export default nextConfig;
