const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const initDatabase = require('./start/initDatabase');
const routes = require('./routes');

const app = express();

app.use('/api', routes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get('port') ?? 8080;

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.messege));
    process.exit(1);
  }
}

start();
