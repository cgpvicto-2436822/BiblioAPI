
import {getLivresBd, getLivreIdBd,
     deleteLivreBd, createLivreBd, updateLivreBd, updateStatutLivreBd} from '../Models/OperationsBd.js';

/*
    deleteLivre: suprimme un livre selon un id donné dans l'url
    statut 200: Reussi
    statut 404: livre non trouvé
    statut 500: erreur recup bd ou mauvais id
    Return: message de reussite
*/
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

/*
    updateLivre: update un livre selon un id donné dans l'url
    statut 200: Reussi
    statut 404: livre non trouvé
    statut 500: erreur recup bd ou mauvais id
    Return: message de reussite
*/
export const updateLivre = async (req, res) => {
    const id = req.params.id;
    const nouvellesDonnees = req.body;
    if (!nouvellesDonnees.titre) {
        return res.status(400).json({ error: "Le titre est obligatoire pour la modification." });
    }

    try {
        const livreModifie = await updateLivreBd(id, nouvellesDonnees);
        if (livreModifie) {
            res.status(200).json({ 
                message: "Livre mis à jour avec succes",
                livre: livreModifie 
            });
        } else {
            res.status(404).json({ error: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du livre" });
    }
};


/*
    addLivre: ajoute un livre selon les params donné dans le body
    statut 201: Reussi
    statut 500: erreur recup bd
    statut 400: mauvais params du body
    Return: le livre
*/
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

/*
    getLivreID: recuprere un livre precis selon un id donné dans l'url
    statut 200: Reussi
    statut 500: erreur recup bd ou mauvais id
    Return: le livre
*/
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

/*
    gitLivres: recupere la liste complet de tout les livres selon la condition "tous"
    statut 200: Reussi
    statut 500: erreur recup bd
    Return: les livres
*/
export const getLivres = async (req, res) => {
    const afficherTout = req.query.tous === 'true';
    try {
        const livres = await getLivresBd(afficherTout);
        res.status(200).json({ livres });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
};

export const updateStatutLivre = async (req, res) => {
    const id = req.params.id;
    const { statut } = req.body;

    if (!statut) {
        return res.status(400).json({ error: "Le champ 'statut' est requis." });
    }

    const statutsPermis = ['disponible', 'emprunte']; //ca ca l'avait été donné dans les consignes
    if (!statutsPermis.includes(statut)) {
        return res.status(400).json({ error: "Statut invalide. Utilisez 'disponible' ou 'emprunte'." });
    }

    try {
        const livreModifie = await updateStatutLivreBd(id, statut);
        
        if (livreModifie) {
            res.status(200).json({ 
                message: "Statut mis a jour", 
                livre: livreModifie 
            });
        } else {
            res.status(404).json({ error: "Livre non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la modification du statut" });
    }
};