import { Client, IntentsBitField } from 'discord.js';

import client from './config/client';
import { token } from './config/config.json';

import { logger } from './utils';


client.login(token)
    .catch(err => logger.error(err));