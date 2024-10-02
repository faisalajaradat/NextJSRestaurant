/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
      },
        webpack: (config) => {
            config.externals = [...config.externals, 'bcrypt'];
            return config;
          },
};

export default nextConfig;
