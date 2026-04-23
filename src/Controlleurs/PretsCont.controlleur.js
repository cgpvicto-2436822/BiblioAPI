import { createPretBd, updateStatutLivreBd, terminerPretBd, deletePretBd } from "../Models/OperationsBd.js";

// POST /api/prets
export const createPret = async (req, res) => {
    const { livre_id, nom_emprunteur, date_retour_prevue } = req.body;

    try {
        const nouveauPret = await createPretBd(livre_id, nom_emprunteur, date_retour_prevue);
        await updateStatutLivreBd(livre_id, 'emprunte');

        res.status(201).json(nouveauPret);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du prêt" });
    }
};

// PATCH /api/prets/:id/statut
export const terminerPret = async (req, res) => {
    const id = req.params.id;

    try {
        const pret = await terminerPretBd(id);
        if (pret) {
            // Une fois le prêt fini, on remet le livre à "disponible"
            await updateStatutLivreBd(pret.livre_id, 'disponible');
            res.status(200).json({ message: "Prêt terminé et livre disponible" });
        } else {
            res.status(404).json({ error: "Prêt non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la clôture du prêt" });
    }
};

// DELETE /api/prets/:id
export const deletePret = async (req, res) => {
    try {
        const succes = await deletePretBd(req.params.id);
        succes ? res.status(204).send() : res.status(404).json({ error: "Prêt non trouvé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur suppression" });
    }
};