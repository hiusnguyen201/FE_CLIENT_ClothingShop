import { Blog } from "@/models/Blogs";
import React from "react";

interface BlogsDataProps {
  blogsData: Blog[];
}

const Blogs: React.FC<BlogsDataProps> = ({ blogsData }) => {
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latset From Blog</h2>
      <p className="section__subheader">Explore Clothing Shop in Vietnam</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {blogsData.map((blog) => (
          <div
            key={blog.id}
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={blog.imageUrl} alt={blog.title} />
            <div className="blog__card__content">
              <h6>{blog.subtitle}</h6>
              <h4>{blog.title}</h4>
              <p>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
