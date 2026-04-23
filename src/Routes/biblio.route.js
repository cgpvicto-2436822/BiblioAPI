
import express from 'express';

import { getLivres, getLivreId, deleteLivre,
 addLivre, updateLivre, 
 updateStatutLivre} from '../Controlleurs/biblio.controller.js';

import { ajoutBiblio, getCleeAPI } from '../Controlleurs/Authentification.controlleur.js';

import { deletePret, createPret, terminerPret } from '../Controlleurs/PretsCont.controlleur.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>Route de base de l'API de bibliotheque! (Pour la doc, /docs)</h1>");
});

router.get("/livres", getLivres);
router.get("/livres/:id", getLivreId);

// CRUD
router.post("/livres", addLivre);
router.put("/livres/:id", updateLivre);
router.patch("/livres/:id/statut", updateStatutLivre);
router.delete("/livres/:id", deleteLivre);

// prets
router.post("/prets", createPret);
router.patch("/prets/:id", terminerPret);
router.delete("/prets/:id", deletePret);

// users
router.post("/bibliotheques", ajoutBiblio);
router.post("/bibliotheques/cle", getCleeAPI);

export default router;