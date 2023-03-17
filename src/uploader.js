import { createReadStream } from 'fs';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	keyFile: process.env.GOOGLE_DRIVE_CREDENTIALS_PATH,
	scopes: ['https://www.googleapis.com/auth/drive'],
});

const service = google.drive({ version: 'v3', auth });

async function upload(path) {
	const filename = path.split('/').pop();
	const file = await service.files.create({
		resource: {
			name: filename,
			parents: [process.env.GOOGLE_DRIVE_PARENT_ID]
		},
		media: {
			mimeType: 'video/mp4',
			body: createReadStream(path)
		},
		fields: 'id',
	});
	return file.data.id;
}

export { upload };
