import express from 'express';

import { PORT } from './config';

import cors from "cors"
import morgan from "morgan"


import { authRoutes } from './routes/auth';
import { projectRoutes } from './routes/projects';

export const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/auth", authRoutes)
app.use("/project", projectRoutes)



app.get('/', (req, res) => {
  res.send('Hi World Test!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
})




