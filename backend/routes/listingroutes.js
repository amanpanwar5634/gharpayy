const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { addListing, getAllListings } = require('../controllers/listingsController');
const router = express.Router();

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (ext && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png)'));
    }
  },
});

// Routes
// router.post('/', upload.array('photos', 12), async (req, res, next) => {
//   try {
//     // Access uploaded files via req.files
//     console.log('Uploaded files:', req.files);

//     // Pass files to controller
//     await addListing(req, res);
//   } catch (err) {
//     if (err instanceof multer.MulterError) {
//       // Handle Multer-specific errors
//       return res.status(400).json({ error: err.message });
//     }
//     // Handle other errors
//     next(err);
//   }
// });

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' });
  }

  const photoPath = `/uploads/${req.file.filename}`;
  res.status(200).json({ photoPath });
});

router.get('/', getAllListings);
router.post('/', addListing)

module.exports = router;
