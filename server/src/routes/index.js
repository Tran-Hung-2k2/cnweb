import auth_route from './auth.route.js';
import category_route from './category.route.js';
import course_route from './course.route.js';
import week_route from './week.route.js';
import lecture_route from './lecture.route.js';
import lesson_route from './lesson.route.js';

export default (app) => {
    app.use('/api/auth', auth_route);
    app.use('/api/category', category_route);
    app.use('/api/course', course_route);
    app.use('/api/week', week_route);
    app.use('/api/lecture', lecture_route);
    app.use('/api/lesson', lesson_route);
};
