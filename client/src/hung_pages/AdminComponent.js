import React, { useState, useEffect } from 'react';

const AdminComponent = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Gọi API hoặc truy vấn cơ sở dữ liệu để lấy danh sách khóa học
    fetch('your_api_endpoint_or_database_query')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Danh Sách Khóa Học</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.course_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComponent;
