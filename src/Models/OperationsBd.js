import pool from '../Config/db_pg.js';

const deleteLivreBd = async (id) => {
    const requete = `DELETE FROM livres WHERE id = $1 RETURNING *;`;
    try {
        const resultat = await pool.query(requete, [id]);
        return resultat.rowCount > 0; //bool
    } catch (erreur) {
        throw erreur;
    }
};

const getLivreIdBd = async (id) => {
    const requete = `
        SELECT * FROM livres 
        LEFT JOIN prets ON livres.id = prets.livre_id
        WHERE livres.id = $1`;
    const params = [id];

    try {
        const resultats = await pool.query(requete, params);
        return resultats.rows[0] ?? null;
    } catch (erreur) {
        console.error(`Erreur PostgreSQL : ${erreur.message}`);
        throw erreur;
    }
};

const createLivreBd = async (livre) => {
    const { biblio_id, titre, auteur, isbn, description } = livre;
    const requete = `
        INSERT INTO livres (biblio_id, titre, auteur, isbn, description, statut)
        VALUES ($1, $2, $3, $4, $5, 'disponible')
        RETURNING *;`;
    
    const params = [biblio_id, titre, auteur, isbn, description];
    const resultat = await pool.query(requete, params);
    return resultat.rows[0];
};

const updateLivreBd = async (id, donnees) => {
    const { titre, auteur, isbn, description } = donnees;
    const requete = `
        UPDATE livres 
        SET titre = $1, auteur = $2, isbn = $3, description = $4
        WHERE id = $5
        RETURNING *;
    `;
    const params = [titre, auteur, isbn, description, id];
    try {
        const resultat = await pool.query(requete, params);
        return resultat.rows[0] ?? null;
    } catch (erreur) {
        console.error(`Erreur PostgreSQL : ${erreur.message}`);
        throw erreur;
    }
};

const getLivresBd = async (afficherTout) => {
    let requete = `SELECT id, titre, auteur, statut FROM livres`;
    if (!afficherTout) {
        requete += ` WHERE statut = 'disponible'`;
    }
    try {
        const resultats = await pool.query(requete);
        
        return resultats.rows;
    } 
    catch (erreur) {
        console.error(`Erreur PostgreSQL : ${erreur.message}`);
        throw erreur;
    }
};

const updateStatutLivreBd = async (id, nouveauStatut) => {
    const requete = `UPDATE livres SET statut = $1 WHERE id = $2 RETURNING *;`;
    const resultat = await pool.query(requete, [nouveauStatut, id]);
    return resultat.rows[0];
};

// Ajouter un prêt
const createPretBd = async (livre_id, nom_emprunteur, date_retour_prevue) => {
    const requete = `
        INSERT INTO prets (livre_id, nom_emprunteur, date_debut, date_retour_prevue, statut_pret)
        VALUES ($1, $2, CURRENT_DATE, $3, 'en_cours')
        RETURNING *;`;
    const resultats = await pool.query(requete, [livre_id, nom_emprunteur, date_retour_prevue]);
    return resultats.rows[0];
};

// Modifier un prêt
const updatePretBd = async (id, donnees) => {
    const { nom_emprunteur, date_retour_prevue } = donnees;
    const requete = `
        UPDATE prets 
        SET nom_emprunteur = $1, date_retour_prevue = $2 
        WHERE id = $3 
        RETURNING *;`;
    const resultats = await pool.query(requete, [nom_emprunteur, date_retour_prevue, id]);
    return resultats.rows[0];
};

// Modifier le statut du prêt (Terminer un prêt)
const terminerPretBd = async (id) => {
    const requete = `
        UPDATE prets 
        SET statut_pret = 'termine', date_retour_reelle = CURRENT_DATE 
        WHERE id = $1 
        RETURNING *;`;
    const resultats = await pool.query(requete, [id]);
    return resultats.rows[0];
};

// Supprimer un prêt
const deletePretBd = async (id) => {
    const requete = `DELETE FROM prets WHERE id = $1`;
    const resultat = await pool.query(requete, [id]);
    return resultat.rowCount > 0;
};

// Ajouter une bibliothèque et sa clé (Inscription)
const createBiblioBd = async (nom, courriel, mdp, cleApi) => {
    const requete = `
        INSERT INTO bibliotheques (nom, courriel, mot_de_passe, cle_api)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nom, cle_api;`;
    const resultats = await pool.query(requete, [nom, courriel, mdp, cleApi]);
    return resultats.rows[0];
};

// Récupérer la clé avec email/password
const getCleApiBd = async (courriel, mdp) => {
    const requete = `SELECT cle_api FROM bibliotheques WHERE courriel = $1 AND mot_de_passe = $2`;
    const resultats = await pool.query(requete, [courriel, mdp]);
    return resultats.rows[0] ?? null;
};

// Mettre à jour la clé (Régénérer)
const updateCleApiBd = async (courriel, nouvelleCle) => {
    const requete = `UPDATE bibliotheques SET cle_api = $1 WHERE courriel = $2 RETURNING cle_api`;
    const resultats = await pool.query(requete, [nouvelleCle, courriel]);
    return resultats.rows[0];
};

export{
    getLivresBd,
    getLivreIdBd,
    deleteLivreBd,
    createLivreBd,
    updateLivreBd,
    updateStatutLivreBd,
    updatePretBd,
    createPretBd,
    deletePretBd,
    createBiblioBd,
    updateCleApiBd,
    getCleApiBd,
    terminerPretBd
};