/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sequelize', 'pg'],

      
  webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
  },
  experimental:{
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
    
  },
  async redirects() {
    return [
      {
        source: '/restaurants',
        destination: '/restaurants/list',
        permanent:true
      },
    ]
  },
    

};

export default nextConfig;
