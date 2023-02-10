# Kusk with Firebase

This is an example of using Kusk's API Gateway with Firebase JWT. 

It uses Kusk's [Custom Auth Upstream](https://docs.kusk.io/guides/authentication/custom-auth-upstream) to use Firebase's Admin SDK as authorizer of requests. 

## 1. Create a Firebase Service Account

Follow the instructions at https://firebase.google.com/docs/admin/setup?authuser=0#set-up-project-and-service-account. 

Add the generated `service-account.json` file to the `firebase-auth-app` folder.
 
## 2. Build the Firebase authorizer

```sh 
docker build -t $DOCKER_USERNAME/kusk-firebase-auth .
docker push $DOCKER_USERNAME/kusk-firebase-auth
```

## 3. Add the docker image to the Kubernetes manifest

Update [`kubernetes/firebase-auth.yaml`](./kubernetes/firebase-auth.yaml) docker image. 

## 4. Deploy the authorizer with an example upstream

```sh 
kubectl apply -f kubernetes
```

## 5. Create a Kusk API

```sh 
kusk deploy -i openapi.yaml
```

## 6. Create a test JWT token 

Replace your Firebase config in [`firebase-auth-app/script/generate-token.js`](./firebase-auth-app/script/generate-token.js) and run: 

```sh 
node generate-token.js

eyJhbGciO...
```

## 7. Test Kusk with Firebase authorizer

```sh 
curl $(kusk ip)/hello -H "Authorization: Bearer eyJhbGciO..."
```