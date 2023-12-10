
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Thay đổi URL API tùy thuộc vào API của bạn
    axios.get(`https://api.example.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user profile', error));

    axios.get(`https://api.example.com/users/${userId}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching user courses', error));

    axios.get(`https://api.example.com/users/${userId}/history`)
      .then(response => setHistory(response.data))
      .catch(error => console.error('Error fetching user history', error));
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Thông tin cá nhân</h2>
      <p><strong>Họ tên:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Danh sách khóa học đã đăng ký</h3>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>

      <h3>Lịch sử học tập</h3>
      <ul>
        {history.map(item => (
          <li key={item.id}>{item.course} - {item.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
