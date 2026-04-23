
// import { getLivresFromDb } from '../Models/OperationsBd.js';
// import {getLivresWithId} from '../Models/OperationsBd.js';
// import {getLivresListeDb} from '../Models/OperationsBd.js';
import {getLivresBd} from '../Models/OperationsBd.js';

// // TO DO
// export const getLivre = async (req, res) => {
//     const id = req.params.id;

//     if (id >=0)
//     {
//         try {
//             const pokemon = await getLivresWithId(id);
//             res.status(200).json({pokemon});
//         } catch (error) {
//             res.status(500).json({ error: "Erreur lors de la récupération"});
//         }
//     }
//     else{
//         res.status(500).json({error: "L'id est mauvais, id: " + id + ". L'id doit etre un chiffre positif"})
//     }
// };

// TO DO
export const getLivres = async (req, res) => {
    try {
        const livres = await getLivresBd();
            res.status(200).json({livres});
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" + error });
    }
};

// // TO DO
// export const getLivressListe = async(req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const type = req.query.type || null;
//         try {
//         const listePokemon = await getLivressListeDb(page, type);
//             res.status(200).json({listePokemon});
//     } catch (error) {
//         res.status(500).json({ error: "Erreur lors de la récupération" + page + ". " + type});
//         console.log("DÉBUG ERREUR :", error);
//     }
// };
    
// // TO DO
// export const ajoutLivre = (req, res) => {
//     const newData = req.body;
//     if(newData.nom && newData.type_primaire &&newData.type_secondaire &&newData.attaque && newData.defense && newData.pv) {
//     ajoutLivreDb(newData.nom, newData.type_primaire, newData.type_secondaire, newData.attaque, newData.defense, newData.pv);
//     res.status(200).json(newData);
//     }
//     else{
//         res.send("Erreur, le controlleur a pas valider");
//         res.status(400).send({ error: "Données de salutation invalides" });
//     }
// };