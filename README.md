<pre style="line-height:1px">                                                                     
    _ __ ___  _   _                                                   
   | '_ ` _ \| | | |                                                  
   | | | | | | |_| |                                                  
  _|_|_|_| |_|\__, |   _ _          _______             _             
 |  __ \       __/ |  | (_)        |__   __|           | |            
 | |__) |___  |___/ __| |_ _ __   __ _| |_ __ __ _  ___| | _____ _ __ 
 |  _  // _ \/ _` |/ _` | | '_ \ / _` | | '__/ _` |/ __| |/ / _ \ '__|
 | | \ \  __/ (_| | (_| | | | | | (_| | | | | (_| | (__|   <  __/ |   
 |_|  \_\___|\__,_|\__,_|_|_| |_|\__, |_|_|  \__,_|\___|_|\_\___|_|   
                                  __/ |                               
                                 |___/                                
</pre>

## Présentation

Projet personnel pour travailler **React** & **Symfony**.<br>
🚧 *( Projet en cours de construction )* 🚧

## Problématique

Vous désirez avoir un suivi de vos lectures, et vous ne voulez pas que vos amis se moquent de vous parce que vous utilisez un tableau Excel comme un homme des cavernes ?

Pas de problème **MyReadingTracker** est là pour vous ! 🚀

Avec **MyReadingTracker** suivez et archivez toutes vos lectures. Notez les, classez les. Mais pas que !
Accomplissez aussi des objectifs et des défis de lecture pour gagner des points, remportez des succès et partagez vos avancées avec vos amis (et vos ennemis) !

## MockUp

![MockUp01](https://github.com/user-attachments/assets/b6158073-e306-4658-87e6-87a4aaddb938)

## Features à venir & avancée du projet 💡

✅ Génération de la structure de base Symfony<br>
✅ Création & configuration de la BDD (PostgreSQL)<br>
✅ Installation et configuration d'API Platform pour exposer les endpoints REST<br>
✅ Gestion des routes API pour les opérations CRUD<br>
✅ Génération de la structure de base React<br>
✅ Connexion entre front et back<br>
<br>
🔄 Création des composants React<br>
🔄 Interface responsive pour utilisation mobile<br>
<br>
⏳ Connexion avec une API (Open Library API, Google Books API ou autres) pour pré-remplir certains des champs<br>
⏳ Système de missions/défis de lecture<br>
⏳ Système de score à partager<br>
⏳ Système de recommandation de lecture personalisée<br>
⏳ Gestion de la PAL (pile à lire)<br>
⏳ Gestion d'une wishlist<br>
⏳ Création de compte et connexion sécurisée<br>

## Technologies utilisées

### ⚙️ Backend (Symfony)
- Symfony 6
- API Platform
- Doctrine ORM
- PostgreSQL

### 💻 Frontend (React)
- React 19
- Axios (pour les requêtes HTTP)
- React Router

### 📦 Outils & Déploiement
- Docker & Docker Compose
- Composer & NPM
- Git & GitHub

# ⚙️ Guide d'installation

## 🔗 1. Cloner le projet

## ⚙️ 2. Installation du backend (Symfony)

### Depuis le dossier backend :<br>

composer install

### Configurer l'environement :<br>

cp .env .env.local

### Modifier la variable DATABASE_URL dans .env.local :

DATABASE_URL="postgresql://user:votreMotDePasse@localhost:5432/reading_tracker"

### BDD<br>

php bin/console doctrine:database:create<br>
php bin/console doctrine:migrations:migrate<br>
php bin/console doctrine:fixtures:load # (optionnel)<br>

## 💻 3. Installation du frontend (React)<br>

### Depuis le dossier frontend :<br>

npm install
npm start

### En cas de conflit de dépendances :<br>

npm install --legacy-peer-deps

🔥🔥🔥



