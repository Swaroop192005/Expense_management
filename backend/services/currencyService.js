const axios = require('axios');

class CurrencyService {
  constructor() {
    this.ratesCache = null;
    this.lastFetch = null;
    this.cacheTimeout = 60 * 60 * 1000; // 1 hour
  }

  async getExchangeRates(baseCurrency = 'USD') {
    try {
      // Return cached data if still valid
      if (this.ratesCache && this.lastFetch && 
          (Date.now() - this.lastFetch) < this.cacheTimeout) {
        return this.ratesCache;
      }

      // Fetch from API
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      const rates = response.data.rates;
      
      // Cache the result
      this.ratesCache = {
        base: baseCurrency,
        rates: rates,
        timestamp: response.data.timestamp
      };
      this.lastFetch = Date.now();

      return this.ratesCache;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      
      // Return fallback rates (1:1 for same currency, approximate rates for others)
      return {
        base: baseCurrency,
        rates: {
          'USD': 1,
          'EUR': 0.85,
          'GBP': 0.73,
          'JPY': 110,
          'CAD': 1.25,
          'AUD': 1.35,
          'INR': 75,
          'CNY': 6.45,
          'CHF': 0.92,
          'SEK': 8.5,
          'NOK': 8.7,
          'DKK': 6.3
        },
        timestamp: Date.now()
      };
    }
  }

  async convertCurrency(amount, fromCurrency, toCurrency) {
    try {
      if (fromCurrency === toCurrency) {
        return amount;
      }

      const rates = await this.getExchangeRates(fromCurrency);
      const rate = rates.rates[toCurrency];
      
      if (!rate) {
        throw new Error(`Exchange rate not found for ${toCurrency}`);
      }

      return amount * rate;
    } catch (error) {
      console.error('Currency conversion error:', error);
      throw error;
    }
  }

  async getSupportedCurrencies() {
    const rates = await this.getExchangeRates();
    return Object.keys(rates.rates);
  }

  formatCurrency(amount, currency) {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'CAD': 'C$',
      'AUD': 'A$',
      'INR': '₹',
      'CNY': '¥',
      'CHF': 'CHF',
      'SEK': 'kr',
      'NOK': 'kr',
      'DKK': 'kr'
    };

    const symbol = symbols[currency] || currency;
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

    return `${symbol}${formattedAmount}`;
  }
}

module.exports = new CurrencyService();
