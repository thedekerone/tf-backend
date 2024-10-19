import express from 'express';
import helmet from 'helmet';
import { Router } from 'express';
import errorHandler from './middleware/errorHandler';
import { setupSwagger } from './swaggerConfig';
import { projectRouter } from './routes/project';
import { courseRouter } from './routes/course';
import { authRouter } from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
setupSwagger(app);


app.get('/', (req, res) => {
  res.send('Hello World');
})

const adminRouter = Router();

app.use('/admin', adminRouter);

app.use('/project', projectRouter);
app.use('/course', courseRouter);
app.use('/auth', authRouter);


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

