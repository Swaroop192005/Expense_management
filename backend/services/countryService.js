const axios = require('axios');

class CountryService {
  constructor() {
    this.countriesCache = null;
    this.lastFetch = null;
    this.cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours
  }

  async getCountries() {
    try {
      // Return cached data if still valid
      if (this.countriesCache && this.lastFetch && 
          (Date.now() - this.lastFetch) < this.cacheTimeout) {
        return this.countriesCache;
      }

      // Fetch from API
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,currencies');
      
      const countries = response.data.map(country => {
        const currency = country.currencies ? Object.keys(country.currencies)[0] : 'USD';
        return {
          name: country.name.common,
          code: country.name.common.toLowerCase().replace(/\s+/g, '-'),
          currency: currency,
          currencySymbol: this.getCurrencySymbol(currency)
        };
      }).sort((a, b) => a.name.localeCompare(b.name));

      // Cache the result
      this.countriesCache = countries;
      this.lastFetch = Date.now();

      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      
      // Return fallback data
      return [
        { name: 'United States', code: 'united-states', currency: 'USD', currencySymbol: '$' },
        { name: 'United Kingdom', code: 'united-kingdom', currency: 'GBP', currencySymbol: '£' },
        { name: 'Canada', code: 'canada', currency: 'CAD', currencySymbol: 'C$' },
        { name: 'Australia', code: 'australia', currency: 'AUD', currencySymbol: 'A$' },
        { name: 'Germany', code: 'germany', currency: 'EUR', currencySymbol: '€' },
        { name: 'France', code: 'france', currency: 'EUR', currencySymbol: '€' },
        { name: 'India', code: 'india', currency: 'INR', currencySymbol: '₹' },
        { name: 'Japan', code: 'japan', currency: 'JPY', currencySymbol: '¥' }
      ];
    }
  }

  getCurrencySymbol(currency) {
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
    return symbols[currency] || currency;
  }

  async getCountryByCode(countryCode) {
    const countries = await this.getCountries();
    return countries.find(country => country.code === countryCode);
  }

  async getCurrencyByCountry(countryName) {
    const countries = await this.getCountries();
    const country = countries.find(c => 
      c.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.currency : 'USD';
  }
}

module.exports = new CountryService();
