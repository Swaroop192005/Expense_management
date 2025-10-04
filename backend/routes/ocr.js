const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ocrService = require('../services/ocrService');
const auth = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/receipts');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, GIF) and PDF files are allowed'));
    }
  }
});

// Process receipt with OCR
router.post('/process-receipt', auth, upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No receipt file provided'
      });
    }

    const imagePath = req.file.path;
    
    // Process with OCR
    let ocrResult;
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_OCR === 'true') {
      // Use mock OCR for development
      ocrResult = await ocrService.mockProcessReceipt(imagePath);
    } else {
      // Use real OCR service
      ocrResult = await ocrService.processReceipt(imagePath);
    }

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      message: 'Receipt processed successfully',
      data: {
        extractedData: ocrResult,
        suggestions: {
          title: ocrResult.merchant || 'Receipt Expense',
          description: ocrResult.description,
          amount: ocrResult.amount,
          currency: ocrResult.currency,
          date: ocrResult.date,
          category: ocrResult.category
        }
      }
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Error processing receipt',
      error: error.message
    });
  }
});

// Process receipt from base64 data
router.post('/process-receipt-base64', auth, async (req, res) => {
  try {
    const { imageData, filename = 'receipt.jpg' } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided'
      });
    }

    // Convert base64 to buffer
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Process with OCR
    let ocrResult;
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_OCR === 'true') {
      // Use mock OCR for development
      ocrResult = await ocrService.mockProcessReceipt('mock');
    } else {
      // Use real OCR service
      ocrResult = await ocrService.processReceiptFromBuffer(imageBuffer, filename);
    }

    res.json({
      success: true,
      message: 'Receipt processed successfully',
      data: {
        extractedData: ocrResult,
        suggestions: {
          title: ocrResult.merchant || 'Receipt Expense',
          description: ocrResult.description,
          amount: ocrResult.amount,
          currency: ocrResult.currency,
          date: ocrResult.date,
          category: ocrResult.category
        }
      }
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing receipt',
      error: error.message
    });
  }
});

// Get OCR service status
router.get('/status', auth, (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'OCR Service',
      status: 'active',
      mockMode: process.env.MOCK_OCR === 'true',
      supportedFormats: ['JPEG', 'PNG', 'GIF', 'PDF'],
      maxFileSize: '5MB'
    }
  });
});

module.exports = router;
