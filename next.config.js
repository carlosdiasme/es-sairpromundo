/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pmiomzmwjvbnvfkdgivd.supabase.co',
        port: '', // Deixe em branco se não houver porta específica
        pathname: '/**', // Permite carregar qualquer caminho do domínio
      },
    ],
  },
}

module.exports = nextConfig