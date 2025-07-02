import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/process-meeting', upload.single('file'), async (req, res) => {
  if (req.file) {
    const text = fs.readFileSync(req.file.path, 'utf-8');
    req.body.text = text;
  }
  // TODO: Implement meeting processing
});

export default router;