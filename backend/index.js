import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = 'http://localhost:3000'; // local dev origin


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json()); // for parsing application/json
app.use('/', usersRouter);
app.use('/', authRouter);

app.get('/', (req, res) => res.send('API is working 🎉'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
