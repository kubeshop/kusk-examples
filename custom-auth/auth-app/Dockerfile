FROM denoland/deno:latest
EXPOSE 8080
WORKDIR /app
USER deno
COPY index.ts .
RUN deno cache index.ts
CMD ["run", "--allow-net", "--allow-env", "index.ts"]