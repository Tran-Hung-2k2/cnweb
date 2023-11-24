import auth_route from './auth.route.js';
import category_route from './category.route.js';

export default (app) => {
    app.use('/api/auth', auth_route);
    app.use('/api/category', category_route);
};
