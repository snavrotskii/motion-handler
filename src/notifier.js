import { createTransport } from "nodemailer";
import { createReadStream } from 'fs';

async function notify(path) {
  let transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
  });

  send(path, transporter, process.env.EMAIL_USERNAME);
}

async function fallbackNotify(path) {
  let transporter = createTransport({
    host: process.env.FALLBACK_EMAIL_HOST,
    port: process.env.FALLBACK_EMAIL_PORT,
    secure: process.env.FALLBACK_EMAIL_SECURE,
    auth: {
      user: process.env.FALLBACK_EMAIL_USERNAME,
      pass: process.env.FALLBACK_EMAIL_PASSWORD
    },
  });

  send(path, transporter, process.env.FALLBACK_EMAIL_USERNAME);
}

async function send(path, transporter, emailFrom) {
  const filename = path.split('/').pop();
  await transporter.sendMail({
    from: `${emailFrom}`,
    to: process.env.EMAIL_TO,
    subject: `Home camera motion detected`,
    text: `Please find the recording ${filename} in the attachements`,
    attachments: [{
      filename: filename,
      content: createReadStream(path)
    }]
  });
}

export { notify, fallbackNotify };
