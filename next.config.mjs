const headers = [
  'Accept',
  'Accept-Version',
  'Content-Length',
  'Content-MD5',
  'Content-Type',
  'Date',
  'X-Api-Version',
  'X-CSRF-Token',
  'X-Requested-With',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}` },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST' },
          { key: 'Access-Control-Allow-Headers', value: headers.join(', ') },
        ],
      },
    ];
  },
};

export default nextConfig;
