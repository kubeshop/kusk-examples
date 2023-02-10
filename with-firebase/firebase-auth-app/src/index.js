const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const express = require("express");

const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(async (req, res) => {
  const bearer = req.headers?.authorization;

  if (!bearer) {
    return res.status(401).send("Bearear token missing.");
  }

  const idToken = bearer.split(" ")[1];

  try {
    const tokenVerificationResult = await getAuth().verifyIdToken(idToken);
    return res.send(tokenVerificationResult);
  } catch (err) {
    return res.status(401).send(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
