$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " VALIDATION RÉELLE DE LA BASE DE DONNÉES (PHASE 4.3)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

function Run-Command {
    param([scriptblock]$Command)
    & $Command
    if ($LASTEXITCODE -ne 0) {
        throw "La commande a échoué avec le code $LASTEXITCODE"
    }
}

# 1. Vérifier Docker Compose
Write-Host "`n[1/5] Vérification de la configuration Docker..." -ForegroundColor Yellow
try {
    Run-Command { docker compose config }
    Write-Host "✅ Configuration Docker Compose OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur Docker Compose. Vérifiez que Docker est installé et actif." -ForegroundColor Red
    exit 1
}

# 2. Démarrer PostgreSQL
Write-Host "`n[2/5] Démarrage du conteneur PostgreSQL..." -ForegroundColor Yellow
try {
    Run-Command { docker compose up -d postgres }
    Write-Host "⏳ Attente de 5 secondes pour l'initialisation de la base..."
    Start-Sleep -Seconds 5
    Write-Host "✅ PostgreSQL démarré" -ForegroundColor Green
} catch {
    Write-Host "❌ Impossible de démarrer PostgreSQL via Docker." -ForegroundColor Red
    Write-Host "Assurez-vous que Docker Desktop est ouvert et actif !" -ForegroundColor Red
    exit 1
}

# 3. Validation et Génération Prisma
Write-Host "`n[3/5] Validation et génération Prisma..." -ForegroundColor Yellow
try {
    Set-Location -Path "backend"
    Run-Command { npm install }
    Run-Command { npx prisma validate }
    Run-Command { npx prisma generate }
    Write-Host "✅ Schéma validé et Client Prisma généré" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur Prisma." -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

# 4. Migration de la base de données
Write-Host "`n[4/5] Exécution des migrations (Prisma Migrate Dev)..." -ForegroundColor Yellow
try {
    Run-Command { npx prisma migrate dev --name init_v2 }
    Write-Host "✅ Base de données migrée avec succès" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la migration. DATABASE_URL est-elle correcte dans .env ?" -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

# 5. Build et test backend
Write-Host "`n[5/5] Build du backend..." -ForegroundColor Yellow
try {
    Run-Command { npm run build }
    Write-Host "✅ Backend buildé avec succès" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur de build backend." -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}

Set-Location -Path ".."

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "🎉 TOUTES LES ÉTAPES SONT VALIDÉES AVEC SUCCÈS" -ForegroundColor Green
Write-Host "Vous pouvez maintenant lancer l'application." -ForegroundColor Cyan
Write-Host "Installez les dépendances globales : npm install" -ForegroundColor Cyan
Write-Host "Puis lancez : npm run dev" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
