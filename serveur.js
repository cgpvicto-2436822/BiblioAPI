
// Importer le module express
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors';

const swaggerDocument = JSON.parse(fs.readFileSync('./src/Config/Documentation.json', 'utf8'));
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Documentation API Biblio"
};

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

import router from './src/Routes/biblio.route.js';

app.use('/api/docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument, swaggerOptions)
);

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

