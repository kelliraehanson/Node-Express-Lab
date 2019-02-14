require('dotenv').config();

// console.log('\nGreeting:', process.env.GREET);

const server = require('./server');

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
