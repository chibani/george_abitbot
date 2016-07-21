# George AbitboT

Le bot le plus classe du monde !

![George's portrait](https://github.com/chibani/george_abitbot/raw/master/assets/george.png)

## But

Ce bot balance aléatoirement des citations tirées du flim "_La classe américaine_" lorsqu'on évoque "George" ou qu'on parle de "classe".  
Accessoirement, il réagit également quand on dit "yep".  

![Screenshot](https://github.com/chibani/george_abitbot/raw/master/assets/capture.png)

## Pré-requis techniques

Il vous faudra :
 * npm
 * nodejs >= 5.0.0
 * un chan Slack
 * un peu de surpuissance

## Installation

 * Créez un bot : https://slack.com/apps/build/custom-integration
 * (Optionnel : j'ai ajouté un avatar de George dans le dossier assets/ de ce projet)
 * clonez ce projet
 * en console, rendez-vous dans le dossier du projet
 * lancez `npm install`  
 * copiez config.json.sample vers config.json  
 * modifiez config.json en fonction des infos de votre bot (notamment Token, et Nom + Prénom du bot dans "Name")  
 * Invitez le bot dans un de vos channels : /invite @bot_name 

## Lancer le bot

Lancez ``npm start``

Le bot devrait se connecter à votre chat Slack.  
Vous pouvez commencer à découvrir la classe.  


## Tests

Le code bénéficie de quelques tests (sous mocha).  
Lancez ``npm test``  
Les tests tournent en mode "watch", avec un reporting minimal.

Pour la couverture de code, lancez ``npm cover``
La couverture ne concerne que le dossier lib/.  

Vous trouverez également des infos complémentaires sur la couverture dans le dossier coverage/.  
coverage/lcov-report/index.html peut même être ouvert dans un navigateur pour plus de détails.  

## Citations

Le fichier quotes.txt contient de nombreuses (quasi toutes) citations tirées du flim.

``quotes.txt.sample`` est un fichier d'exemple plus succint pour créer votre propre ``quotes.txt``.  
Vous pouvez placer quotes.txt où vous le souhaitez (mais toujours avec classe) et indiquer son chemin dans ``config.json``:  
 * "quotesPath": "quotes.txt"  

Le fichier ``quotes.txt`` doit contenir toutes les citations que vous souhaitez afficher.  

Chaque ligne du fichier se présente comme suit :  
``keyword, other_keywod|La citation``
 * une liste de mots-clés, séparés par des virgules
 * un pipe ``|``, pour séparer de la suite
 * une phrase (ou ensemble de phrases), qui se trouve être la citation

Parmi les fonctionnalités prévues (mais non terminée), il y avait un système de réponse "contextuelle", basée sur les mots-clés du fichier quotes.txt, mais le résultat était assez décevant, et la fonctionnalité est donc désactivée.

## Comment contribuer ?

Vous avez vu un bug, pensez que le code mérite quelques retouches (sic) ?  
N'hésitez pas à forker et proposer une PR :)  
