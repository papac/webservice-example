## Web Service App

Ceci est un exemple pour une application de service Web basée sur `nodejs`,` express` et `mongodb`, trois services Web ont été intégrés.

Liste de services Web:

- Mailer
- File Uploader
- Auth system With JWT

## Deployment

### Require

Installez les dépendances suivantes, sur votre PC:

- Nodejs
- Mongodb (L'application utilise [mlab.com](https://mlab.com)), mais vous pouvez modifier le DSN de la connexion dans le fichier `config.js`.
- Npm or Yarn (Choisissez)
- Git (Ou vous pouvez télécharger l'application)
- Maildev

#### Maildev

Pour installer MailDev:

```bash
npm install -g maildev
```

Lancer avec la commande suivante:

```bash
maildev
```

### Installation

Pour installer l'application, suivez les instructions suivantes:

```bash
git clone https://github.com/adeielevate/webservice --depth=1
cd webservice
npm install
```

### Lancer le service

Pour lancer le service, assurez-vous que vous êtes dans le dossier `webservice` ou si vous avez modifier le dossier; lancer dans le nouveau dossier:

#### Lancer le service Auth

```bash
# je suis dans le dossier de l'application
ENV_SERVICE=auth PORT=3000 node ./bin/www
```

#### Lancer le service mailer

```bash
# je suis dans le dossier de l'applicationl'application
ENV_SERVICE=mailer PORT=3001 node ./bin/www
```

#### Lancer le service uploader

```bash
# je suis dans le dossier de l'application
ENV_SERVICE=uploader PORT=3002 node ./bin/www
```

> Dans notre cas d'utilisation le service **Auth** doit être sur le PORT 3000

## Description des Service

On nous a appris qu'un service communique avec d'autre service dans un système hétérogène au travers d'API qui permet au service de s'auto-décrire.

Alors voici les descriptions (API REST) de chaque service:

## Service AUTH

Ce service permet d'authifier un utilisateur sur le système général.

Après chaque requête le service retourne une information descrivant l'état de la requête.

### Login

```http
POST /login

Content-Type: application/x-form-www-urlencoded
Host: http://locahost:3000

email=example@email.com&password=password
```

### Register

```http
POST /register

Content-Type: application/x-form-www-urlencoded
Host: http://locahost:3000

email=example@email.com&password=password&name=nom
```

### Vérifier un token

```http
POST /veridy

Host: http://locahost:3000
X-Access-Token: Votre-Token-Ici
```

## Service Upload

Ce service permet d'envoyer des fichiers sur le serveur.

Avant d'utiliser ce service votre devrez disposer d'un token valide:

### Uploade un fichier

```http
POST /upload

Host: http://locahost:3002
Content-Type: multipart/form-data
```

### Téléchargé un image

Le service pour permet aussi de télécharger une image.

```http
GET /url?filename={filename}

Host: http://localhost:3002
```

## Service Mailer

Ce service permet d'envoyer des emails et de verifier la validité des email.

Avant d'utiliser ce service votre devrez disposer d'un token valide:

### Vérifié un email

```http
POST /verify

Host: localhost:3001
Content-Type: application/x-form-www-urlencoded
X-Access-Token: Votre-Token-Valide

email=example@email.com
```

### Envoyer un email

```http
POST /process

Host: localhost:3001
Content-Type: application/x-form-www-urlencoded
X-Access-Token: Votre-Token-Valide

to=destinateur@email.com&subject=objet&message=Bonjour&from=expediteur@email.com
```
