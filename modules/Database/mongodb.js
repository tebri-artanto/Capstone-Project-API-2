const mongoose = require("mongoose");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();
const getSecretValue = async () => {
  const [version] = await client.accessSecretVersion({
    name: "projects/377381526885/secrets/database/versions/1",
  });
  const connectionString = version.payload.data.toString("utf8");
  return connectionString;
};

const connectDb = async () => {
  const connectionString = await getSecretValue();

  await mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error.message));
};

connectDb();

// const connectionString = getSecretValue();

// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("Database Connected"))
//   .catch((error) => console.log(error.message));
// async function getSecretValue() {
//   const client = new SecretManagerServiceClient();
//   const name = 'projects/377381526885/secrets/database/versions/1';

//   const [version] = await client.accessSecretVersion({
//     name: name,
//   });

//   const payload = version.payload.data.toString();

//   console.log('Secret value:', payload);
// }

// mongoose.connect("string", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database Connected"))
//   .catch((error) => console.log(error.message));
