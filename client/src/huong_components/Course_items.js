import { text } from "body-parser";

export default function Course_items(courses) {

    return (
        <>
            <div className="course">
                <figure><img src={courses.image_course} alt="Course" /></figure>
                <div className="course_body">
                    <h2 className="university">
                        {courses.university}
                        <div className="type_course">FREE</div>
                    </h2>
                    <p style="font-size:120%;">{courses.details}</p>
                    <p>Course</p>
                </div>
            </div>
        </>

    );
}
