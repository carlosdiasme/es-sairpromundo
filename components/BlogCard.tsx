// components/BlogCard.tsx
import React from 'react';
import { BlogView } from '@/app/actions/vw_blogs';

interface BlogCardProps {
  blog: BlogView;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{blog.title}</h2>
        <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
        <a href={`/blog/${blog.slug}`} className="text-blue-500 hover:underline">Leia mais</a>
      </div>
    </div>
  );
};

export default BlogCard;
