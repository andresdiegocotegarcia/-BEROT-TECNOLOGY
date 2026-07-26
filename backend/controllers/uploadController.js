import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { AppError } from '../middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const upload = async (req, res, next) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      throw new AppError('No se proporcionaron imágenes', 400);
    }

    const savedPaths = [];

    for (const base64Image of images) {
      const matches = base64Image.match(/^data:image\/(png|jpg|jpeg|gif|webp);base64,(.+)$/);
      if (!matches) {
        continue; // skip invalid images
      }

      const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      const imageData = matches[2];
      const buffer = Buffer.from(imageData, 'base64');

      const filename = `${crypto.randomUUID()}.${extension}`;
      const filepath = path.join(uploadsDir, filename);

      fs.writeFileSync(filepath, buffer);
      savedPaths.push(`/uploads/${filename}`);
    }

    res.json({ paths: savedPaths });
  } catch (error) {
    next(error);
  }
};
