const documentation = {
    "openapi": "3.1.0",
    "info": {
        "title": "API de Gestion de Bibliothèque",
        "description": "Système complet de gestion de livres, prêts et authentification.",
        "version": "1.0.0"
    },
    "servers": [
        { "url": "http://localhost:3000/", "description": "Serveur local" }
    ],
    "components": {
        "securitySchemes": {
            "ApiKeyAuth": {
                "type": "apiKey",
                "in": "header",
                "name": "X-API-KEY"
            }
        }
    },
    "paths": {
        "/api/bibliotheques": {
            "post": {
                "summary": "Inscription d'une bibliothèque",
                "tags": ["Users"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "nom_bibliotheque": { "type": "string", "example": "Biblio de Victo" },
                                    "courriel": { "type": "string", "example": "admin@biblio.ca" },
                                    "mot_de_passe": { "type": "string", "example": "secret123" }
                                }
                            }
                        }
                    }
                },
                "responses": { "201": { "description": "Compte créé" } }
            }
        },
        "/api/bibliotheques/cle": {
            "post": {
                "summary": "Récupérer la clé API",
                "tags": ["Users"],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "courriel": { "type": "string", "example": "admin@biblio.ca" },
                                    "mot_de_passe": { "type": "string", "example": "secret123" }
                                }
                            }
                        }
                    }
                },
                "responses": { "200": { "description": "Retourne la clé" } }
            }
        },
        "/api/livres": {
            "get": {
                "summary": "Liste des livres",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "query", "name": "tous", "schema": { "type": "boolean" } }],
                "responses": { "200": { "description": "Liste récupérée" } }
            },
            "post": {
                "summary": "Ajouter un livre",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "titre": { "type": "string", "example": "Le Spleen de Paris" },
                                    "auteur": { "type": "string", "example": "Charles Baudelaire" },
                                    "isbn": { "type": "string", "example": "9782070322886" },
                                    "description": { "type": "string", "example": "Poèmes en prose" }
                                }
                            }
                        }
                    }
                },
                "responses": { "201": { "description": "Livre ajouté" } }
            }
        },
        "/api/livres/{id}": {
            "get": { "summary": "Détails d'un livre", "tags": ["Livres"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "200": { "description": "Détails" } } },
            "put": { 
                "summary": "Modifier un livre (complet)", 
                "tags": ["Livres"], 
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }],
                "requestBody": {
                    "content": { "application/json": { "schema": { "type": "object", "properties": { "titre": { "type": "string" }, "auteur": { "type": "string" }, "isbn": { "type": "string" }, "description": { "type": "string" } } } } }
                },
                "responses": { "200": { "description": "Modifié" } } 
            },
            "delete": { "summary": "Supprimer un livre", "tags": ["Livres"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "204": { "description": "Supprimé" } } }
        },
        "/api/livres/{id}/statut": {
            "patch": {
                "summary": "Modifier le statut (disponible/emprunte)",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }],
                "requestBody": {
                    "content": { "application/json": { "schema": { "properties": { "statut": { "type": "string", "example": "emprunte" } } } } }
                },
                "responses": { "200": { "description": "Statut mis à jour" } }
            }
        },
        "/api/prets": {
            "post": {
                "summary": "Créer un prêt",
                "tags": ["Prêts"],
                "security": [{"ApiKeyAuth": []}],
                "requestBody": {
                    "content": { "application/json": { "schema": { "type": "object", "properties": { "livre_id": { "type": "integer", "example": 1 }, "nom_emprunteur": { "type": "string", "example": "Louis Hince" }, "date_retour_prevue": { "type": "string", "example": "2026-05-10" } } } } }
                },
                "responses": { "201": { "description": "Prêt enregistré" } }
            }
        },
        "/api/prets/{id}": {
            "patch": { "summary": "Terminer un prêt", "tags": ["Prêts"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "200": { "description": "Livre retourné" } } },
            "delete": { "summary": "Supprimer un prêt", "tags": ["Prêts"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "204": { "description": "Supprimé" } } }
        }
    }
};

module.exports = documentation;