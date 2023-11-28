import auth_route from './auth.route.js';
import category_route from './category.route.js';
import course_route from './course.route.js';
import week_route from './week.route.js';
import lecture_route from './lecture.route.js';
import lesson_route from './lesson.route.js';
import note_route from './note.route.js';
import participating_course_route from './participating_course.route.js';
import completed_lesson_route from './completed_lesson.route.js';
import user_route from './user.route.js'

export default (app) => {
    app.use('/api/auth', auth_route);
    app.use('/api/category', category_route);
    app.use('/api/course', course_route);
    app.use('/api/week', week_route);
    app.use('/api/lecture', lecture_route);
    app.use('/api/lesson', lesson_route);
    app.use('/api/note', note_route);
    app.use('/api/participating_course', participating_course_route);
    app.use('/api/completed_lesson', completed_lesson_route);
    app.use('/api/user', user_route);
};
