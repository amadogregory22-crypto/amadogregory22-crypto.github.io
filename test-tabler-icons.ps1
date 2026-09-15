#!/usr/bin/env powershell

# Test pour vérifier l'intégrité de l'installation des icônes Tabler

$projectRoot = 'F:\signature-studio-v34'
$tablerPath = Join-Path $projectRoot 'icons\SVG\tabler-icons'

Write-Host "
╔════════════════════════════════════════════════╗
║  Test d'installation des Icônes Tabler        ║
╚════════════════════════════════════════════════╝
"

# Test 1: Vérifier l'existence du dossier
Write-Host "Test 1: Vérification du dossier..."
if (Test-Path $tablerPath) {
    Write-Host "✅ Dossier trouvé: $tablerPath"
} else {
    Write-Host "❌ Dossier NOT FOUND: $tablerPath"
    exit 1
}

# Test 2: Compter les icônes
Write-Host "`nTest 2: Comptage des icônes SVG..."
$icons = @(Get-ChildItem -Path $tablerPath -Filter *.svg -File -ErrorAction SilentlyContinue)
$count = $icons.Count
Write-Host "📊 Total d'icônes trouvées: $count"

if ($count -eq 0) {
    Write-Host "⚠️  Aucune icône trouvée. La copie est peut-être en cours..."
    exit 1
} elseif ($count -lt 4000) {
    Write-Host "⚠️  Nombre d'icônes faible (attendu ~5093). La copie est peut-être incomplète."
} else {
    Write-Host "✅ Nombre d'icônes correct!"
}

# Test 3: Vérifier quelques icônes importantes
Write-Host "`nTest 3: Vérification d'icônes importantes..."
$requiredIcons = @('home.svg', 'plus.svg', 'settings.svg', 'edit.svg', 'trash.svg')
$foundCount = 0

foreach ($icon in $requiredIcons) {
    $iconPath = Join-Path $tablerPath $icon
    if (Test-Path $iconPath) {
        Write-Host "  ✅ $icon"
        $foundCount++
    } else {
        Write-Host "  ❌ $icon NOT FOUND"
    }
}

if ($foundCount -eq $requiredIcons.Count) {
    Write-Host "✅ Toutes les icônes essentielles sont présentes!"
} else {
    Write-Host "⚠️  Certaines icônes essentielles manquent."
}

# Test 4: Vérifier l'intégrité d'un fichier SVG
Write-Host "`nTest 4: Vérification d'intégrité SVG..."
$testIcon = Join-Path $tablerPath 'home.svg'
if (Test-Path $testIcon) {
    $content = Get-Content -Path $testIcon -Raw
    if ($content -match '<svg' -and $content -match '</svg>') {
        Write-Host "✅ Structure SVG valide (home.svg)"
    } else {
        Write-Host "❌ Structure SVG invalide (home.svg)"
    }
} else {
    Write-Host "⚠️  Impossible de vérifier (home.svg non trouvé)"
}

# Test 5: Vérifier que @tabler/icons est dans package.json
Write-Host "`nTest 5: Vérification du package.json..."
$packagePath = Join-Path $projectRoot 'package.json'
if (Test-Path $packagePath) {
    $packageContent = Get-Content -Path $packagePath -Raw
    if ($packageContent -match '"@tabler/icons"') {
        Write-Host "✅ @tabler/icons déclaré dans package.json"
    } else {
        Write-Host "⚠️  @tabler/icons NOT FOUND dans package.json"
    }
} else {
    Write-Host "❌ package.json NOT FOUND"
}

Write-Host "`n
╔════════════════════════════════════════════════╗
║  Résumé                                        ║
╚════════════════════════════════════════════════╝
"

if ($count -gt 4000) {
    Write-Host "✅ Installation des icônes Tabler: SUCCÈS"
    Write-Host "   - $count icônes SVG disponibles"
    Write-Host "   - Localisation: icons/SVG/tabler-icons/"
    Write-Host "   - Utilisation: Voir TABLER_ICONS_USAGE.md"
} else {
    Write-Host "⚠️  Installation INCOMPLÈTE"
    Write-Host "   - Nombre d'icônes insuffisant: $count/5093"
    Write-Host "   - La copie est peut-être encore en cours"
    Write-Host "   - Relancez ce test dans quelques minutes"
}

