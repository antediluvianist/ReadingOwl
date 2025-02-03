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
🚧 _( Projet en cours de construction )_ 🚧

## Problématique

Vous désirez avoir un suivi de vos lectures, et vous ne voulez pas que vos amis se moquent de vous parce que vous utilisez un tableau Excel comme un homme des cavernes ?

Pas de problème **MyReadingTracker** est là pour vous ! 🚀

Avec **MyReadingTracker** suivez et archivez toutes vos lectures. Notez les, classez les. Mais pas que !
Accomplissez aussi des objectifs et des défis de lecture pour gagner des points, remportez des succès et partagez vos avancées avec vos amis (et vos ennemis) !

## MockUp

![mockup on devices with title02](https://github.com/user-attachments/assets/074f134b-9c5a-489e-8af9-7023a9ae6f81)


## Features à venir & avancée du projet 💡

✅ Génération de la structure de base Symfony<br>
✅ Création & configuration de la BDD (PostgreSQL)<br>
✅ Installation et configuration d'API Platform pour exposer les endpoints REST<br>
✅ Gestion des routes API pour les opérations CRUD<br>
✅ Génération de la structure de base React<br>
✅ Connexion entre front et back<br>
✅ Connexion avec Open Library API pour pré-remplir certains des champs et en ajouter d'autres<br>
<br>
🔄 Création des composants React<br>
🔄 Design frontend<br>
🔄 Interface responsive pour utilisation mobile<br>
<br>
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
