# Kusk with custom authentication

This repository sets up an upstream service that is used for the API and for the [custom auth feature](https://docs.kusk.io/guides/authentication/custom-auth-upstream) of Kusk.

## 1. Install Kusk 

[Install the Kusk CLI](https://docs.kusk.io/quick-links/install) and run: 

```sh
kusk cluster install
```

## 2. Deploy the upstream application

```sh
kubectl apply -f deployment/auth-app.yaml
```

## 3. Deploy the Kusk API

```sh 
kusk deploy -i openapi.yaml
```

## 4. Test the authenticated API 

```sh 
curl -u kusk:gateway localhost:8080
Authorized
```
