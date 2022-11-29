# Deploying Web Apps on Kubernetes with Kusk Gateway

This is an example of a NextJS application deployed to Kubernetes and exposed to the world using Kusk Gateway.

In [`/application`](./application/) you'll find an NextJS app that's containerized and available on with the Docker image `kubeshop/kusk-web-app-example:v1.0.0`.

## 1. Deploy the sample web app

```sh
kubectl create deployment web-app --image=kubeshop/kusk-web-app-example:v1.0.0
kubectl expose deployment web-app --name web-app-svc --port=3000
```

## 2. Create a Kusk `StaticRoute`

`StaticRoute` is the Kubernetes Custom Resource that Kusk uses to deploy web applications.

```sh
kubectl apply -f kubernetes/static-route.yaml
```

## 3. Test the application

Get the Kusk IP by running:

```sh
kusk ip

> 34.45.56.78
```

And now test the application on the browser:

![example deployed application](./assets/CleanShot%202022-11-29%20at%2022.59.03.png)
