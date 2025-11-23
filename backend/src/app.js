import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
const openapi = JSON.parse(fs.readFileSync(new URL('./docs/openapi.json', import.meta.url)));

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi, { explorer: true }));
app.get('/docs/swagger.json', (req, res) => res.json(openapi));

app.use(router);
app.use(errorHandler);

export default app;
