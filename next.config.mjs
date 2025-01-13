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
    

};

export default nextConfig;
