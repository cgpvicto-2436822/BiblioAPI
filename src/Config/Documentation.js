const documentation = {
    "openapi": "3.1.0",
    "info": {
        "title": "API de Gestion de Bibliothèque",
        "summary": "Service de gestion de prêts et de livres",
        "description": "Cette API permet de gérer les livres, les prêts et les accès via une clé API unique.",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:3000/",
            "description": "Serveur de développement"
        }
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
        "/api/bibliotheque/inscription": {
            "post": {
                "summary": "Inscrire une bibliothèque",
                "tags": ["Authentification"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "nom_bibliotheque": { "type": "string" },
                                    "courriel": { "type": "string" },
                                    "mot_de_passe": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": { "201": { "description": "Clé API générée" } }
            }
        },
        "/api/bibliotheque/cle": {
            "post": {
                "summary": "Récupérer ou régénérer une clé API",
                "tags": ["Authentification"],
                "parameters": [
                    { "in": "query", "name": "nouvelle", "schema": { "type": "boolean" }, "description": "Générer une nouvelle clé si vrai" }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "courriel": { "type": "string" },
                                    "mot_de_passe": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": { "200": { "description": "Clé API retournée" } }
            }
        },
        "/api/livres": {
            "get": {
                "summary": "Liste des livres",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [
                    { "in": "query", "name": "tous", "schema": { "type": "boolean" } }
                ],
                "responses": { "200": { "description": "Succès" } }
            },
            "post": {
                "summary": "Ajouter un livre",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "titre": { "type": "string" },
                                    "auteur": { "type": "string" },
                                    "isbn": { "type": "string" },
                                    "description": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": { "201": { "description": "Livre créé" } }
            }
        },
        "/api/livres/{id}": {
            "get": { "summary": "Détails livre", "tags": ["Livres"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "200": { "description": "OK" } } },
            "put": { "summary": "Modifier livre", "tags": ["Livres"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "200": { "description": "Modifié" } } },
            "delete": { "summary": "Supprimer livre", "tags": ["Livres"], "security": [{"ApiKeyAuth": []}], "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }], "responses": { "204": { "description": "Supprimé" } } }
        },
        "/api/livres/{id}/statut": {
            "patch": {
                "summary": "Changer statut (disponible/emprunte)",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "requestBody": {
                    "content": { "application/json": { "schema": { "properties": { "statut": { "type": "string" } } } } }
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
                    "content": { "application/json": { "schema": { "properties": { "livre_id": { "type": "integer" }, "nom_emprunteur": { "type": "string" }, "date_retour_prevue": { "type": "string" } } } } }
                },
                "responses": { "201": { "description": "Prêt créé" } }
            }
        },
        "/api/prets/{id}": {
            "patch": { "summary": "Terminer un prêt", "tags": ["Prêts"], "security": [{"ApiKeyAuth": []}], "responses": { "200": { "description": "Livre retourné" } } },
            "delete": { "summary": "Supprimer prêt", "tags": ["Prêts"], "security": [{"ApiKeyAuth": []}], "responses": { "204": { "description": "Supprimé" } } }
        }
    }
};

module.exports = documentation;