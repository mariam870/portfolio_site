/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-supabase-project.supabase.co', // Remplace par ton URL Supabase
      'via.placeholder.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
