import { upload } from "./uploader.js";
import { notify, fallbackNotify } from "./notifier.js";

const path = process.argv[2];

console.log(`processing recording from path ${path}`);

upload(path)
  .then(fileId => console.log(`recording uploaded to google drive with ${fileId}`))
  .catch(console.error);

notify(path)
  .then(() => console.log(`recording sent by email`))
  .catch(error => {
    console.error(error);
    fallbackNotify(path).catch(console.error);
  });
