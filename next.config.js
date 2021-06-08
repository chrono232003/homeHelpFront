module.exports = {
  images: {
    domains: ['localhost:3001'],
  },
    async rewrites() {
        return [
          {
            source: '/pages/signup',
            destination: 'http://localhost:3001/createCustomer/',
          },
        ]
      },
  };