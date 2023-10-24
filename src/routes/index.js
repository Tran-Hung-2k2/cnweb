import authRouter from './auth_route.js';
import productRouter from './productRouter.js';
import cartRouter from './cartRouter.js';
import orderRouter from './orderRouter.js';
import voucherRouter from './voucherRouter.js';
import forumRouter from './forumRouter.js';

export default (app) => {
  app.use('/auth', authRouter);
};
