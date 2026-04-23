import crypto from 'crypto';

import { updateCleApiBd, createBiblioBd, getCleApiBd } from '../Models/OperationsBd.js';

export const ajoutBiblio = async (req, res) =>{
    const{ nom_biblio, courriel, mot_de_passe } = req.body;
    const cleApi = crypto.randomUUID();
    try{
        const nouvelleBiblio = await createBiblioBd(nom_biblio, courriel, mot_de_passe, cleApi);
        res.status(201).json({ 
            message: "Inscription réussie", 
            cle_api: nouvelleBiblio.cle_api 
        });
    } catch (error){
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

export const getCleeAPI = async (req, res) =>{
    const{ courriel, mot_de_passe } = req.body;
    const genererNouvelle = req.query.nouvelle === 'true'; //param d'url "?nouvelle=..."
    try{
        if (genererNouvelle)
        {
            const nouvelleCle = crypto.randomUUID();
            const resultat = await updateCleApiBd(courriel, nouvelleCle);
            return res.status(200).json({ cle_api: resultat.cle_api });
        }

        const data = await getCleApiBd(courriel, mot_de_passe);
        if (data)
       {
            res.status(200).json({ cle_api: data.cle_api });
        } else
        {
            res.status(401).json({ error: "Params invalides" });
        }
    } catch (error)
    {
        res.status(500).json({ error: "Erreur serveur" });
    }
};