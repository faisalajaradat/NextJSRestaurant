/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize', 'pg'],
        appDir:true,
      },
        webpack: (config) => {
            config.externals = [...config.externals, 'bcrypt'];
            return config;
          },
};

export default nextConfig;
