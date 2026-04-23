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

export{
    getLivresBd,
    getLivreIdBd,
    deleteLivreBd,
    createLivreBd
};