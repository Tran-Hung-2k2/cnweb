
import React, { useState, useEffect } from 'react';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Gọi API hoặc truy vấn cơ sở dữ liệu để lấy danh sách bài viết
    fetch('http://localhost:3001/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Danh Sách Bài Viết</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
