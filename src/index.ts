import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import courseRoutes from './routes/courseRoutes';
import tagRoutes from './routes/tagRoutes';
import authRouter from './routes/public/authRouter';
import { Router } from 'express';
import errorHandler from './middleware/errorHandler';
import { setupSwagger } from './swaggerConfig';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
setupSwagger(app);


app.get('/', (req, res) => {
  res.send('Hello World');
})

const adminRouter = Router();

adminRouter.use(userRoutes);
adminRouter.use(projectRoutes);
adminRouter.use(courseRoutes);
adminRouter.use(tagRoutes);

app.use('/admin', adminRouter);

app.use('/api', authRouter);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

