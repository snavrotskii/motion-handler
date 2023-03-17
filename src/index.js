import { upload } from "./uploader.js";
import { notify, fallbackNotify } from "./notifier.js";

const path = process.argv[2];

upload(path).catch(console.error);

notify(path)
    .catch(error => {
        console.error(error);
        fallbackNotify(path).catch(console.error);
    });
