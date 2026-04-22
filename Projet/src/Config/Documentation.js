const documentation = {
    "openapi": "3.1.0",
    "info": {
        "title": "API de Gestion de Bibliothèque",
        "summary": "Service de gestion de prêts et de livres par bibliothèque",
        "description": "Cette API permet de gérer les livres, les prêts et les accès via une clé API unique par bibliothèque.",
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
                "summary": "Ajouter une bibliothèque (responsable)",
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
                "responses": {
                    "201": { "description": "Bibliothèque créée, retourne la clé API" }
                }
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
                "responses": {
                    "200": { "description": "Retourne la clé API" }
                }
            }
        },
        "/api/livres": {
            "get": {
                "summary": "Liste des livres de la bibliothèque",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [
                    { "in": "query", "name": "tous", "schema": { "type": "boolean" }, "description": "Afficher aussi les livres empruntés" }
                ],
                "responses": {
                    "200": { "description": "Liste des livres récupérée" }
                }
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
                "responses": {
                    "201": { "description": "Livre ajouté" }
                }
            }
        },
        "/api/livres/{id}": {
            "get": {
                "summary": "Détail d'un livre et ses prêts",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }],
                "responses": {
                    "200": { "description": "Détails complets du livre" }
                }
            },
            "put": {
                "summary": "Modifier un livre",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }],
                "responses": {
                    "200": { "description": "Livre modifié" }
                }
            },
            "delete": {
                "summary": "Supprimer un livre",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }],
                "responses": {
                    "204": { "description": "Livre supprimé" }
                }
            }
        },
        "/api/livres/{id}/statut": {
            "patch": {
                "summary": "Modifier uniquement le statut du livre",
                "tags": ["Livres"],
                "security": [{"ApiKeyAuth": []}],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "integer" } }],
                "requestBody": {
                    "content": { "application/json": { "schema": { "properties": { "statut": { "type": "string" } } } } }
                },
                "responses": {
                    "200": { "description": "Statut mis à jour" }
                }
            }
        },
        "/api/prets": {
            "post": {
                "summary": "Ajouter un prêt",
                "tags": ["Prêts"],
                "security": [{"ApiKeyAuth": []}],
                "responses": { "201": { "description": "Prêt ajouté" } }
            }
        },
        "/api/prets/{id}": {
            "put": { "summary": "Modifier un prêt", "tags": ["Prêts"], "security": [{"ApiKeyAuth": []}], "responses": { "200": { "description": "Prêt modifié" } } },
            "delete": { "summary": "Supprimer un prêt", "tags": ["Prêts"], "security": [{"ApiKeyAuth": []}], "responses": { "204": { "description": "Prêt supprimé" } } }
        }
    }
};

module.exports = documentation;