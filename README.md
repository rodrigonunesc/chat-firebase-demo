# Firebase Chat Demo

## Requisitos

```1. Firebase CLI: https://firebase.google.com/docs/cli```<br>

## Inicializando um projeto Firebase
```1. Primeiramente, faça o login na sua conta firebase utilizando o comando: firebase login```<br>
```2. Com seu usuário logado na sua conta firebase, utilize o comando: "firebase init" na raiz deste projeto. Ele inicializará um projeto firebase```<br>
``` 2.1. Selecione o serviço "Firestore" e confirme```<br>
``` 2.2. Selecione um projeto na GCP ou crie um novo```<br>
``` 2.3. Algumas perguntas serão feitas logo em seguida. Confirme-as.```<br>
```3. No código, no arquivo index.html e login.html(na variável "firebaseConfig") substitua pelas suas credenciais do aplicativo firebase.```<br>
``` 3.1 Para acessar suas credenciais, vá ao console do firebase, clique em "configuraçoes" no seu projeto```<br>
``` 3.2 Na aba "Geral" em "Seus Aplicativos", clique no aplicativo web e em CDN, você terá acesso a variavel "firebaseConfig" com suas credenciais```<br>
``` 3.3 Copie-a e cole nos arquivos index.html e login.html```<br>

## Realizar Deploy
```Na raíz do seu projeto: "firebase deploy"```<br>

## Rodar o projeto localmente
```Suba um servidor HTTP simples na porta de sua preferência. Exemplo "python -m SimpleHTTPServer 8000"```<br>
```Acesse localhost:8000/public```<br>