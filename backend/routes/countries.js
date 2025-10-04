const express = require('express');
const router = express.Router();
const countryService = require('../services/countryService');
const currencyService = require('../services/currencyService');

// Get all countries with their currencies
router.get('/countries', async (req, res) => {
  try {
    const countries = await countryService.getCountries();
    res.json({
      success: true,
      data: { countries }
    });
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching countries',
      error: error.message
    });
  }
});

// Get currency by country
router.get('/currency/:countryName', async (req, res) => {
  try {
    const { countryName } = req.params;
    const currency = await countryService.getCurrencyByCountry(countryName);
    
    res.json({
      success: true,
      data: { currency }
    });
  } catch (error) {
    console.error('Get currency error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching currency',
      error: error.message
    });
  }
});

// Convert currency
router.post('/convert', async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;
    
    if (!amount || !fromCurrency || !toCurrency) {
      return res.status(400).json({
        success: false,
        message: 'Amount, fromCurrency, and toCurrency are required'
      });
    }

    const convertedAmount = await currencyService.convertCurrency(
      parseFloat(amount), 
      fromCurrency, 
      toCurrency
    );

    res.json({
      success: true,
      data: {
        originalAmount: amount,
        fromCurrency,
        toCurrency,
        convertedAmount: convertedAmount,
        formattedAmount: currencyService.formatCurrency(convertedAmount, toCurrency)
      }
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    res.status(500).json({
      success: false,
      message: 'Error converting currency',
      error: error.message
    });
  }
});

// Get supported currencies
router.get('/currencies', async (req, res) => {
  try {
    const currencies = await currencyService.getSupportedCurrencies();
    res.json({
      success: true,
      data: { currencies }
    });
  } catch (error) {
    console.error('Get currencies error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching currencies',
      error: error.message
    });
  }
});

module.exports = router;
