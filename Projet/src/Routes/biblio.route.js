
import express from 'express';

// ajoute ici les nouvelles methodes ou les modifiés (de toi du passé, de rien)
import { ajoutLivre, createUser, modifierStatut, modifierLivre } from '../Controlleurs/biblio.controller.js';

const router = express.Router();    

router.get('/', (req, res) => {
    res.send("<h1>Route de base de l'API de bibliotheque! (Pour la doc, /docs)</h1>");
});

// TO DO (POST probabloement... a checker)
router.get('/ajout', ajoutLivre);

router.get("/livres", );

router.get('/statut', modifierStatut);

router.get('/modifier', modifierLivre);

router.get('/pokemons/:id', getPokemon);

export default router;