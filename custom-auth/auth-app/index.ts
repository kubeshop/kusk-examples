import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { decode } from "https://deno.land/std@0.147.0/encoding/base64.ts";

const app = new Application();

app.use((ctx) => {
  console.log("Request: ", ctx.request);
  const authHeader = ctx.request.headers.get("Authorization");

  if (authHeader === null || !authHeader.startsWith("Basic")) {
    ctx.response.headers.set("WWW-Authenticate", 'Basic realm="Authenticated"');
    ctx.response.status = 401;
    return (ctx.response.body = "Missing Authorization Header");
  }

  const { user, pass } = getBasicAuthInfo(authHeader);

  if (user != "kusk" || pass != "gateway") {
    ctx.response.status = 401;
    return (ctx.response.body = "Unauthorized");
  }

  return (ctx.response.body = "Authorized");
});

type UserPass = {
  user: string;
  pass: string;
};

const getBasicAuthInfo = (authHeader: string): UserPass => {
  const encodedData = authHeader.split("Basic ")[1];
  const decodedData = new TextDecoder("utf-8").decode(decode(encodedData));
  const [user, pass] = decodedData.split(":");
  return {
    user,
    pass,
  };
};

const port = Deno.env.get("PORT") || "8080";
console.log("Listening on http://localhost:" + port);
await app.listen({ port: parseInt(port, 10) });
