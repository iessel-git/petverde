import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';

const BlogPreview: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: '10 Ways to Make Your Pet Care Routine More Sustainable',
      excerpt: 'Simple swaps and habits that reduce your pet\'s environmental pawprint without compromising on quality.',
      image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840168096_2f1f426f.jpg',
      author: 'Dr. Sarah Green',
      readTime: '5 min read',
      category: 'Sustainability'
    },
    {
      id: 2,
      title: 'Understanding Your Dog\'s Nutritional Needs by Age',
      excerpt: 'A comprehensive guide to feeding your canine companion at every life stage for optimal health.',
      image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840075862_1bf6d2c0.jpg',
      author: 'Dr. Mike Chen',
      readTime: '8 min read',
      category: 'Nutrition'
    },
    {
      id: 3,
      title: 'The Benefits of Natural Toys for Cats',
      excerpt: 'Why choosing eco-friendly toys can improve your cat\'s health and reduce plastic waste.',
      image: 'https://d64gsuwffb70l.cloudfront.net/697d9d6761d62ce7a7e10dd1_1769840104985_22c1f905.jpg',
      author: 'Emma Wilson',
      readTime: '4 min read',
      category: 'Cat Care'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wider">Pet Care Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Tips & Guides for Pet Parents
            </h2>
            <p className="text-gray-600 mt-2">
              Expert advice on sustainable pet care, nutrition, and wellness
            </p>
          </div>
          <button className="group flex items-center gap-2 text-emerald-600 font-semibold mt-4 md:mt-0 hover:text-emerald-700 transition-colors">
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
