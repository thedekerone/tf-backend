import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use(userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

