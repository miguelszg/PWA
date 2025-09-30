// scripts/verify-pwa.js
// Script para verificar que todos los requisitos PWA están cumplidos

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    log(`✅ ${description}: ${filePath} (${stats.size} bytes)`, 'green');
    return true;
  } else {
    log(`❌ ${description}: ${filePath} NO ENCONTRADO`, 'red');
    return false;
  }
}

function checkJSONValid(filePath) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    JSON.parse(content);
    log(`   ✅ JSON válido`, 'green');
    return true;
  } catch (error) {
    log(`   ❌ JSON inválido: ${error.message}`, 'red');
    return false;
  }
}

function checkManifestContent() {
  try {
    const manifestPath = path.join(process.cwd(), 'public/manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    log('\n📋 Verificando contenido del manifest:', 'cyan');
    
    const checks = [
      { key: 'name', value: manifest.name },
      { key: 'short_name', value: manifest.short_name },
      { key: 'start_url', value: manifest.start_url },
      { key: 'display', value: manifest.display },
      { key: 'theme_color', value: manifest.theme_color },
      { key: 'background_color', value: manifest.background_color },
      { key: 'icons', value: manifest.icons }
    ];
    
    let allValid = true;
    checks.forEach(check => {
      if (check.value) {
        if (check.key === 'icons') {
          const has192 = check.value.some(icon => icon.sizes === '192x192');
          const has512 = check.value.some(icon => icon.sizes === '512x512');
          if (has192 && has512) {
            log(`   ✅ ${check.key}: Incluye 192x192 y 512x512`, 'green');
          } else {
            log(`   ❌ ${check.key}: Falta 192x192 o 512x512`, 'red');
            allValid = false;
          }
        } else {
          log(`   ✅ ${check.key}: ${check.value}`, 'green');
        }
      } else {
        log(`   ❌ ${check.key}: NO DEFINIDO`, 'red');
        allValid = false;
      }
    });
    
    return allValid;
  } catch (error) {
    log(`❌ Error leyendo manifest: ${error.message}`, 'red');
    return false;
  }
}

function checkIndexHTML() {
  try {
    const htmlPath = path.join(process.cwd(), 'index.html');
    const content = fs.readFileSync(htmlPath, 'utf8');
    
    log('\n📄 Verificando index.html:', 'cyan');
    
    const checks = [
      { pattern: /<link[^>]*rel="manifest"[^>]*>/i, name: 'Link al manifest' },
      { pattern: /<meta[^>]*name="theme-color"[^>]*>/i, name: 'Meta theme-color' },
      { pattern: /<meta[^>]*name="viewport"[^>]*>/i, name: 'Meta viewport' }
    ];
    
    let allValid = true;
    checks.forEach(check => {
      if (check.pattern.test(content)) {
        log(`   ✅ ${check.name}`, 'green');
      } else {
        log(`   ❌ ${check.name}: NO ENCONTRADO`, 'red');
        allValid = false;
      }
    });
    
    return allValid;
  } catch (error) {
    log(`❌ Error leyendo index.html: ${error.message}`, 'red');
    return false;
  }
}

function checkBuildOutput() {
  const distPath = path.join(process.cwd(), 'dist');
  
  log('\n🏗️  Verificando build output (dist/):', 'cyan');
  
  if (!fs.existsSync(distPath)) {
    log('   ⚠️  Carpeta dist/ no existe. Ejecuta: npm run build', 'yellow');
    return false;
  }
  
  const files = [
    'dist/service-worker.js',
    'dist/manifest.json',
    'dist/index.html'
  ];
  
  let allExist = true;
  files.forEach(file => {
    if (checkFile(file, path.basename(file))) {
      // File exists
    } else {
      allExist = false;
    }
  });
  
  return allExist;
}

function provideSolutions() {
  log('\n💡 Soluciones rápidas:', 'cyan');
  log('');
  log('1. Si falta service-worker.js:', 'yellow');
  log('   - Verifica que existe en public/service-worker.js');
  log('   - Ejecuta: npm run build');
  log('   - Verifica que aparece en dist/service-worker.js');
  log('');
  log('2. Si falta manifest.json:', 'yellow');
  log('   - Crea public/manifest.json con la configuración básica');
  log('');
  log('3. Si faltan íconos:', 'yellow');
  log('   - Crea íconos temporales:');
  log('   curl -o public/pwa-192x192.png "https://via.placeholder.com/192/2563eb/fff?text=PWA"');
  log('   curl -o public/pwa-512x512.png "https://via.placeholder.com/512/2563eb/fff?text=PWA"');
  log('');
  log('4. Para probar la PWA:', 'yellow');
  log('   npm run build && npm run preview');
  log('   Luego abre: http://localhost:4173');
  log('');
  log('5. Para probar en móvil:', 'yellow');
  log('   - Opción A: Usa ngrok (npx ngrok http 4173)');
  log('   - Opción B: Usa tu IP local en vite.config.js');
  log('');
}

async function main() {
  log('═══════════════════════════════════════════════════', 'blue');
  log('🔍 VERIFICACIÓN DE PWA - App Shell', 'blue');
  log('═══════════════════════════════════════════════════', 'blue');
  
  let totalChecks = 0;
  let passedChecks = 0;
  
  log('\n📁 Verificando archivos en public/:', 'cyan');
  
  const publicFiles = [
    { path: 'public/service-worker.js', desc: 'Service Worker' },
    { path: 'public/manifest.json', desc: 'Manifest' },
    { path: 'public/pwa-192x192.png', desc: 'Ícono 192x192' },
    { path: 'public/pwa-512x512.png', desc: 'Ícono 512x512' },
    { path: 'public/apple-touch-icon.png', desc: 'Apple Touch Icon' }
  ];
  
  publicFiles.forEach(file => {
    totalChecks++;
    if (checkFile(file.path, file.desc)) {
      passedChecks++;
      if (file.path.endsWith('.json')) {
        if (checkJSONValid(file.path)) passedChecks++;
        totalChecks++;
      }
    }
  });
  
  log('\n📁 Verificando archivos en src/:', 'cyan');
  
  const srcFiles = [
    { path: 'src/registerServiceWorker.js', desc: 'Registro SW' },
    { path: 'src/main.jsx', desc: 'Main.jsx' },
    { path: 'src/App.jsx', desc: 'App.jsx' }
  ];
  
  srcFiles.forEach(file => {
    totalChecks++;
    if (checkFile(file.path, file.desc)) passedChecks++;
  });
  
  // Verificar manifest content
  totalChecks += 7;
  if (checkManifestContent()) passedChecks += 7;
  
  // Verificar index.html
  totalChecks += 3;
  if (checkIndexHTML()) passedChecks += 3;
  
  // Verificar build
  const buildExists = checkBuildOutput();
  totalChecks += 3;
  if (buildExists) passedChecks += 3;
  
  // Resumen
  log('\n═══════════════════════════════════════════════════', 'blue');
  const percentage = Math.round((passedChecks / totalChecks) * 100);
  const color = percentage >= 90 ? 'green' : percentage >= 70 ? 'yellow' : 'red';
  
  log(`📊 RESULTADO: ${passedChecks}/${totalChecks} verificaciones pasadas (${percentage}%)`, color);
  
  if (percentage === 100) {
    log('🎉 ¡PERFECTO! Tu PWA está lista.', 'green');
    log('');
    log('Siguiente paso:', 'cyan');
    log('1. Ejecuta: npm run preview', 'yellow');
    log('2. Abre: http://localhost:4173', 'yellow');
    log('3. DevTools (F12) → Application → Service Workers', 'yellow');
    log('4. Marca "Offline" y recarga para probar', 'yellow');
  } else if (percentage >= 70) {
    log('⚠️  Casi listo. Corrige los errores marcados arriba.', 'yellow');
    provideSolutions();
  } else {
    log('❌ Faltan varios requisitos. Revisa la guía de instalación.', 'red');
    provideSolutions();
  }
  
  log('═══════════════════════════════════════════════════', 'blue');
}

main().catch(console.error);