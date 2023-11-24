import auth_route from './auth.route.js';

export default (app) => {
    app.use('/api/auth', auth_route);
};
