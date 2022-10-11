# Kusk Gateway - OAuth 

This repository contains an example of a frontend application that is protected behind Kusk's OAuth. 

It uses Auth0 as the auth provider. 

## 1. Deploy the frontend application 

```sh
kubectl apply -f deployment/frontend-app.yaml
```

## 2. Configuring Auth0

1. Signup for an account at [Auth0](https://auth0.com/).
2. Create an Auth0 Application
3. Configure the following Auth0 Application fields: 
    1. Allowed Callback URLs (e.g. `http://**KUSK_IP**/oauth2/callback`)
    2. Allowed Logout URLs (e.g. `http://**KUSK_IP**/oauth2/signout`)
(**KUSK_IP** is the IP of the Kusk's LoadBalancer, you can obtain it by running `kusk ip`)
4. Take note of the credentials as we will need this later on:

```json
{
  "client_id": "go8brZmF6eE6r7TObzpGaD5KFjJkm6Qb",
  "client_secret": "bkryzZGGA6Ko0VGnUEl_1YeREMHDpjGP8r1BTN1HYlmXpAWaiWNkD4bqIDuAuCKV"
}
```

## 3. Protect your frontend app with Kusk

Update [`static-route.yaml`](./deployment/satic-route.yaml): 
- Replace `$AUTH0_DOMAIN` with your Auth0 domain, e.g. `domain.us.auth0.com`
- Replace `$CLIENT_ID` with the Client ID from Step 2.
- Replace `$CLIENT_SECRET` with the Client Secret from Step 2.

Apply the definition with: 

```sh 
kusk deploy -i deployment/static-route.yaml
```

## 4. Update EnvoyFleet ConfigMap

We need to include to `client_secret` to Envoy's `ConfigMap`, by running 

```
kubectl edit -n kusk-system configmaps kusk-gateway-envoy-fleet
```

And then update the field `inline_string` replacing it with the `client_secret` obtained from Auth0. 

```yaml
  secrets:
  - name: token
    generic_secret:
      secret:
        inline_string: "<stub_token_secret>" # <- replace with "CLIENT_SECRET"
```

Finally, you should save the configuration and the changes will be applied. 

### 5. Restart Envoy Fleet

As we currently have upstream issues with Envoy waiting to be fixed, the temporal solution is to restart Envoy manually (this only needs to be done once): 

For this:

1. Port-Forward into Envoy's control plane: 

```sh
kubectl port-forward --namespace kusk-system deployment/kusk-gateway-envoy-fleet 19000:19000
```
2. Restart Envoy by making a POST request to `/quitquitquit`

```sh
curl -X POST 'http://localhost:19000/quitquitquit'
```

3. Wait until the changes to be propogated, this could take a while. To know if the Envoy has restarted, check if the Envoy container has restarted

<pre>
kubectl get pods -w -n kusk-system --selector=app.kubernetes.io/instance=kusk-gateway-envoy-fleet
NAME                                        READY   STATUS    RESTARTS      AGE
kusk-gateway-envoy-fleet-6f9ff68bcd-jxlwk   1/1     <b>Running</b>   1 (30s ago)   1h
</pre>

### 6. Test using the browser

You're all set now, test your OAuth2 implementation through the browser by visiting Kusk's LoadBalancer. Get the URL with: 

```sh
kusk ip

100.12.34.56
```