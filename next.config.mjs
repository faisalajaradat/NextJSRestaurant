/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sequelize', 'pg'],

      
  webpack: (config) => {
      config.externals = [...config.externals, 'bcrypt'];
      return config;
    },
};

export default nextConfig;
