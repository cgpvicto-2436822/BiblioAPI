
import {getLivresBd, getLivreIdBd,
     deleteLivreBd, createLivreBd} from '../Models/OperationsBd.js';

export const deleteLivre = async (req, res) => {
    const id = req.params.id;
    try {
        const succes = await deleteLivreBd(id);
        if (succes) {
            res.status(200).json({ message: "Livre supprimé!" });
        } else {
            res.status(404).json({ error: "Livre pas trouvé." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du delete" });
    }
};

export const addLivre = async (req, res) => {
    const { titre, auteur, biblio_id } = req.body;
    if (!titre || !biblio_id) {
        return res.status(400).json({ error: "Le titre et le biblio_id sont requis" });
    }

    try {
        const nouveauLivre = await createLivreBd(req.body);
        res.status(201).json(nouveauLivre);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du livre" });
    }
};

// TO DO
export const getLivreId = async (req, res) => {
    const id = req.params.id;

    if (id >=0)
    {
        try {
            const livre = await getLivreIdBd(id);
            res.status(200).json({livre});
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération"});
        }
    }
    else{
        res.status(500).json({error: "L'id est mauvais, id: " + id + ". L'id doit etre un chiffre positif"})
    }
};

export const getLivres = async (req, res) => {
    const afficherTout = req.query.tous === 'true';
    try {
        const livres = await getLivresBd(afficherTout);
        res.status(200).json({ livres });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
};