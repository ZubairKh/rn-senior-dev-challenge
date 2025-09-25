#!/usr/bin/env node
const { existsSync, copyFileSync } = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const envPath = path.join(root, '.env');
const envExamplePath = path.join(root, '.env.example');

if (!existsSync(envPath)) {
  try {
    copyFileSync(envExamplePath, envPath);
    console.log('Created .env from .env.example');
  } catch (error) {
    console.warn('Unable to create .env automatically. Please copy .env.example manually.', error);
  }
}
