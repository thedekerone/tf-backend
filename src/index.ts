import helmet from 'helmet';
import express from 'express';
import { Router } from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import { setupSwagger } from './swaggerConfig';
import { projectRouter } from './routes/project';
import { authRouter } from './routes/auth';
import { courseRouter } from './routes/course';

const app = express();
const baseRouter = Router();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
setupSwagger(app);


baseRouter.get('/', (req, res) => {
  res.send('Hello World');
});

const adminRouter = Router();

baseRouter.use('/admin', adminRouter);

baseRouter.use('/project', projectRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/course', courseRouter);

app.use('/tf-backend', baseRouter);


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


