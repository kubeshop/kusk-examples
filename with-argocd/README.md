# Deploying APIs to production with ArgoCD and Kusk Gateway

This repository sets up ArgoCD to use Kusk to generate API resource manifests that ArgoCD will then apply to a Kubernetes cluster. To make that possible, Kusk needs to be added as a plugin to ArgoCD. This repository covers the steps to do that.
### 1. Patching ArgoCD's deployment

The `argocd-repo-server` deployment images need to be replaced by the `kubeshop/kusk-argocd` Docker image.

Apply the following the command: 

```sh
kubectl patch deployments.apps -n argocd argocd-repo-server --type json --patch-file customization/patch.yaml
```

### 2. Define ArgoCD in ArgoCD PluginConfigurattionManagement

In order to define the name of the plugin that will be used by an ArgoCD application, and to define the command ArgoCD should run to generate the manifests when the plugin is used, run: 

```sh
kubectl patch configmaps -n argocd argocd-cm --patch-file customization/argocd-plugins.yaml
```

Note: The flag will be added to all the test CRDs that will be generated.

```yaml
data:
  configManagementPlugins: |
    - name: kusk-gateway
      generate:
        command: ["bash", "-c"]
        args: ["kusk generate -i openapi.yaml"]
      lockRepo: true
```

### 3. Create an ArgoCD application that uses the Kusk plugin 

In [`kusk-gateway.yaml`](applications/kusk-gateway.yaml) update the field:
 - `APPLICATION_NAME` with the unique name of ArgoCD application
 - `REPOSITORY_URL` with the Git repository containing OpenAPI definitions
 - `$PATH_TO_OPENAPI` with the path to the folder containing an OpenAPI definition

Create the application by running the command

```sh
kubectl apply -f applications/kusk-gateway.yaml
```
