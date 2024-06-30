// require('dotenv').config({ path: '' });
// require('ts-node').register();
// require('./prisma/save-local.ts');
import { config } from 'dotenv';
import { register } from 'ts-node';

// Load environment variables from .env.local
config({ path: '.env.development.local' });

// Register ts-node
register({
  transpileOnly: true,
  project: 'tsconfig.json'
});

// Import and execute the seed script
import('./prisma/save-local.ts');
