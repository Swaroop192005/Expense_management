const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class OCRService {
  constructor() {
    this.apiKey = process.env.OCR_API_KEY || 'helloworld'; // Free tier key
    this.apiUrl = process.env.OCR_API_URL || 'https://api.ocr.space/parse/image';
  }

  async processReceipt(imagePath) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(imagePath));
      formData.append('apikey', this.apiKey);
      formData.append('language', 'eng');
      formData.append('isOverlayRequired', 'false');
      formData.append('detectOrientation', 'true');
      formData.append('scale', 'true');
      formData.append('OCREngine', '2');

      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (response.data.IsErroredOnProcessing) {
        throw new Error('OCR processing failed: ' + response.data.ErrorMessage);
      }

      const parsedText = response.data.ParsedResults[0].ParsedText;
      return this.extractExpenseData(parsedText);
    } catch (error) {
      console.error('OCR processing error:', error);
      throw error;
    }
  }

  async processReceiptFromBuffer(imageBuffer, filename) {
    try {
      const formData = new FormData();
      formData.append('file', imageBuffer, {
        filename: filename,
        contentType: 'image/jpeg'
      });
      formData.append('apikey', this.apiKey);
      formData.append('language', 'eng');
      formData.append('isOverlayRequired', 'false');
      formData.append('detectOrientation', 'true');
      formData.append('scale', 'true');
      formData.append('OCREngine', '2');

      const response = await axios.post(this.apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (response.data.IsErroredOnProcessing) {
        throw new Error('OCR processing failed: ' + response.data.ErrorMessage);
      }

      const parsedText = response.data.ParsedResults[0].ParsedText;
      return this.extractExpenseData(parsedText);
    } catch (error) {
      console.error('OCR processing error:', error);
      throw error;
    }
  }

  extractExpenseData(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Extract amount (look for currency patterns)
    const amountPattern = /(\$|€|£|₹|¥|USD|EUR|GBP|INR|JPY)?\s*(\d+\.?\d*)/g;
    let amount = null;
    let currency = 'USD';
    
    for (const line of lines) {
      const matches = [...line.matchAll(amountPattern)];
      for (const match of matches) {
        const value = parseFloat(match[2]);
        if (value > 0) {
          // Take the largest amount found (likely the total)
          if (!amount || value > amount) {
            amount = value;
            if (match[1]) {
              currency = this.normalizeCurrency(match[1]);
            }
          }
        }
      }
    }

    // Extract date
    const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})/g;
    let date = null;
    for (const line of lines) {
      const match = line.match(datePattern);
      if (match) {
        date = new Date(match[0]);
        break;
      }
    }

    // Extract merchant name (usually first or second line)
    let merchant = null;
    if (lines.length > 0) {
      merchant = lines[0];
    }

    // Extract description (combine relevant lines)
    const description = lines.slice(0, 3).join(' ').substring(0, 200);

    // Determine category based on keywords
    const category = this.categorizeExpense(text);

    return {
      amount: amount,
      currency: currency,
      date: date,
      merchant: merchant,
      description: description,
      category: category,
      rawText: text,
      confidence: 0.8 // OCR confidence score
    };
  }

  normalizeCurrency(currencySymbol) {
    const currencyMap = {
      '$': 'USD',
      '€': 'EUR',
      '£': 'GBP',
      '₹': 'INR',
      '¥': 'JPY',
      'USD': 'USD',
      'EUR': 'EUR',
      'GBP': 'GBP',
      'INR': 'INR',
      'JPY': 'JPY'
    };
    return currencyMap[currencySymbol] || 'USD';
  }

  categorizeExpense(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('restaurant') || lowerText.includes('food') || lowerText.includes('dining')) {
      return 'meals';
    }
    if (lowerText.includes('hotel') || lowerText.includes('accommodation') || lowerText.includes('lodging')) {
      return 'accommodation';
    }
    if (lowerText.includes('flight') || lowerText.includes('airline') || lowerText.includes('airport')) {
      return 'travel';
    }
    if (lowerText.includes('taxi') || lowerText.includes('uber') || lowerText.includes('transport')) {
      return 'transport';
    }
    if (lowerText.includes('office') || lowerText.includes('supplies') || lowerText.includes('stationery')) {
      return 'office_supplies';
    }
    if (lowerText.includes('entertainment') || lowerText.includes('movie') || lowerText.includes('theater')) {
      return 'entertainment';
    }
    if (lowerText.includes('training') || lowerText.includes('course') || lowerText.includes('education')) {
      return 'training';
    }
    
    return 'other';
  }

  // Mock OCR for development/testing
  async mockProcessReceipt(imagePath) {
    return {
      amount: 120.50,
      currency: 'USD',
      date: new Date(),
      merchant: 'Sample Restaurant',
      description: 'Business lunch with client',
      category: 'meals',
      rawText: 'Sample Restaurant\nBusiness lunch\nTotal: $120.50',
      confidence: 0.9
    };
  }
}

module.exports = new OCRService();
