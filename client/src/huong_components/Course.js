import React from 'react';
import Course_items from './Course_items';

export default function Course() {
  // Sample course data (replace this with your actual course data)
  const courses = [
    {image_course:'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/53/0e8db0e5a711e5a8c04d762ec8f14d/____1200.png?auto=format%2Ccompress%2C%20enhance&amp;dpr=1&amp;w=80&amp;h=80&amp;fit=crop&amp;q=50',
        university: 'Peking University', 
        description: 'More Chinese for Beginers' },
    {image_course:'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/3f/e014c0ba7811e5a05e970d8586e01d/___-1.jpg?auto=format%2Ccompress%2C%20enhance&dpr=3&w=80&h=80&fit=crop&q=50',
        university: 'Peking University', 
        details:'Chinese for Beginers'}
    
  ];

  return (
    <>
      <div className="course_container">
        <div className="course_items">
          {/* Render the Course_items component and pass the courses as a prop */}
          {courses.map((item, index) => 

          <Course_items key={index} courses={item} />
          )}
        </div>
      </div>
    </>
  );
}
