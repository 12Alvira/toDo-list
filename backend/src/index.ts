import express from 'express';
import cors from 'cors';
import path from 'path';
import toDoRouter from './routes/toDo.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/todos', toDoRouter);

const frontendBuild = path.join(__dirname, '../../frontend/build');
app.use(express.static(frontendBuild));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuild, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
