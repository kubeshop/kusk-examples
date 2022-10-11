FROM alpine:3.14 as builder
RUN apk add curl
RUN curl https://raw.githubusercontent.com/kubeshop/kusk-gateway/main/cmd/kusk/scripts/install.sh --output install.sh
RUN chmod +x install.sh && ./install.sh

FROM argoproj/argocd:latest as runner
# Switch to root for the ability to perform install
COPY --from=builder /usr/local/bin/kusk /usr/local/bin/kusk
# Switch back to non-root user
USER 999