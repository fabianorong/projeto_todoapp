const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://fabianorong:EFTMp29UX2ZGpYZw@cluster0.cbij1lu.mongodb.net/"
  );
  console.log("Conectou ao mongoose");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
