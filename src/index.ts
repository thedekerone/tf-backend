import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import courseRoutes from './routes/courseRoutes';
import tagRoutes from './routes/tagRoutes';
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

app.use(userRoutes);
app.use(projectRoutes);
app.use(courseRoutes);
app.use(tagRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

