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
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
setupSwagger(app);


app.get('/', (req, res) => {
  res.send('Hello World');
})

const adminRouter = Router();

app.use('/admin', adminRouter);

app.use('/project', projectRouter);
app.use('/auth', authRouter);
app.use('/course', courseRouter);


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

