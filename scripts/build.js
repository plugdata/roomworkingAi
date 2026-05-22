#!/usr/bin/env node

/**
 * Build script for roomworkingAi
 */
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';

const BUILD_DIR = 'dist';
const SRC_DIR = 'src';

console.log('🚀 Starting build process for roomworkingAi...');

// Clean build directory
if (existsSync(BUILD_DIR)) {
  console.log('🧹 Cleaning existing build directory...');
  rmSync(BUILD_DIR, { recursive: true });
}

// Create build directory
mkdirSync(BUILD_DIR, { recursive: true });

try {
  // Run linting
  console.log('🔍 Running linter...');
  execSync('npm run lint', { stdio: 'inherit' });

  // Run tests
  console.log('🧪 Running tests...');
  execSync('npm run test', { stdio: 'inherit' });

  // Copy source files (for now, just copy - could add transpilation later)
  console.log('📁 Copying source files...');
  execSync(`cp -r ${SRC_DIR}/* ${BUILD_DIR}/`, { stdio: 'inherit' });

  // Copy package.json for deployment
  execSync(`cp package.json ${BUILD_DIR}/`, { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log(`📦 Build artifacts available in: ${path.resolve(BUILD_DIR)}`);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}