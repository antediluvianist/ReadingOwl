<pre style="line-height:1px">                                                                     
  _____                _ _              ____           _ 
 |  __ \              | (_)            / __ \         | |
 | |__) |___  __ _  __| |_ _ __   __ _| |  | |_      _| |
 |  _  // _ \/ _` |/ _` | | '_ \ / _` | |  | \ \ /\ / / |
 | | \ \  __/ (_| | (_| | | | | | (_| | |__| |\ V  V /| |
 |_|  \_\___|\__,_|\__,_|_|_| |_|\__, |\____/  \_/\_/ |_|
                                  __/ |                  
                                 |___/                                                  
</pre>

## Présentation

Projet personnel pour travailler **React** & **Symfony**.<br>
🚧 _( Projet en cours de construction )_ 🚧

## Problématique

Vous désirez avoir un suivi de vos lectures, et vous ne voulez pas que vos amis se moquent de vous parce que vous utilisez un tableau Excel comme un homme des cavernes ?

Pas de problème **ReadingOwl** est là pour vous ! 🚀

Avec **ReadingOwl** suivez et archivez toutes vos lectures. Notez les, classez les. Mais pas que !
Accomplissez aussi des objectifs et des défis de lecture pour gagner des points, monter de niveau, remportez des succès et partagez vos avancées avec vos amis (et vos ennemis) !

## MockUp

![mockup on devices with title03](https://github.com/user-attachments/assets/22e3b20a-25fd-4dac-a939-0a6342933b59)


## Features à venir & avancée du projet 💡

✅ Génération de la structure de base Symfony<br>
✅ Création & configuration de la BDD (PostgreSQL)<br>
✅ Installation et configuration d'API Platform pour exposer les endpoints REST<br>
✅ Gestion des routes API pour les opérations CRUD<br>
✅ Génération de la structure de base React<br>
✅ Connexion entre front et back<br>
✅ Connexion avec Open Library API pour pré-remplir certains des champs et en ajouter d'autres<br>
✅ Création des composants React<br>
<br>
🔄 Création de compte et connexion sécurisée<br>
🔄 Polissage des composants React<br>
🔄 Design frontend<br>
🔄 Animations<br>
🔄 Interface responsive pour utilisation mobile<br>
<br>
⏳ Système de missions/défis de lecture<br>
⏳ Système de score à partager<br>
⏳ Système de recommandation de lecture personalisée<br>
⏳ Gestion de la PAL (pile à lire)<br>
⏳ Gestion d'une wishlist<br>

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
