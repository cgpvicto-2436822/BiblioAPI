
import express from 'express';

import { getLivres, getLivreId, deleteLivre,
 addLivre, updateLivre, 
 updateStatutLivre} from '../Controlleurs/biblio.controller.js';

import { ajoutBiblio, getCleeAPI } from '../Controlleurs/Authentification.controlleur.js';

import { deletePret, createPret, terminerPret } from '../Controlleurs/PretsCont.controlleur.js';

const router = express.Router();

import authentification from '..middlewares/authentification.middleware';

router.get('/', (req, res) => {
    res.send("<h1>Route de base de l'API de bibliotheque! (Pour la doc, /docs)</h1>");
});

router.get("/livres", authentification, getLivres);
router.get("/livres/:id", authentification, getLivreId);

// CRUD
router.post("/livres", authentification, addLivre);
router.put("/livres/:id", authentification, updateLivre);
router.patch("/livres/:id/statut", authentification, updateStatutLivre);
router.delete("/livres/:id", authentification, deleteLivre);

// prets
router.post("/prets", authentification, createPret);
router.patch("/prets/:id", authentification,terminerPret);
router.delete("/prets/:id", authentification,deletePret);

// users
router.post("/bibliotheques", ajoutBiblio);
router.post("/bibliotheques/cle", getCleeAPI);

export default router;