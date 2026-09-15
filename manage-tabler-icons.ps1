# Script pour gérer les icônes Tabler Icons
# Cet script peut être utilisé pour mettre à jour ou réinstaller les icônes Tabler

$projectRoot = 'F:\signature-studio-v34'
$tablerSourcePath = Join-Path $projectRoot 'node_modules\@tabler\icons\icons\outline'
$tablerDestPath = Join-Path $projectRoot 'icons\SVG\tabler-icons'

function Update-TablerIcons {
    Write-Host "🔄 Mise à jour des icônes Tabler Icons..."

    # Vérifier que npm package est installé
    if (-not (Test-Path $tablerSourcePath)) {
        Write-Host "❌ Erreur: npm package @tabler/icons non trouvé"
        Write-Host "   Exécutez d'abord: npm install @tabler/icons"
        return
    }

    # Créer le dossier de destination s'il n'existe pas
    if (-not (Test-Path $tablerDestPath)) {
        New-Item -Type Directory -Path $tablerDestPath -Force | Out-Null
        Write-Host "✓ Dossier créé: $tablerDestPath"
    }

    # Copier les icônes
    Write-Host "⏳ Copie de 5000+ icônes SVG en cours..."

    # Utiliser robocopy pour de meilleures performances
    $robocopyArgs = @(
        $tablerSourcePath,
        $tablerDestPath,
        '*.svg',
        '/E',           # Include subdirectories
        '/Y',           # Overwrite files
        '/NJH',         # No Job Header
        '/NJS'          # No Job Summary
    )

    & robocopy @robocopyArgs

    # Vérifier le résultat
    $count = @(Get-ChildItem -Path $tablerDestPath -Filter *.svg -File -ErrorAction SilentlyContinue).Count

    if ($count -gt 0) {
        Write-Host "✅ Succès! $count icônes Tabler copiées dans icons/SVG/tabler-icons/"
    } else {
        Write-Host "❌ La copie a échoué ou aucun fichier n'a été copié"
    }
}

function Show-TablerIconStats {
    Write-Host "📊 Statistiques des icônes Tabler..."

    if (Test-Path $tablerDestPath) {
        $count = @(Get-ChildItem -Path $tablerDestPath -Filter *.svg -File -ErrorAction SilentlyContinue).Count
        Write-Host "   Icônes locales: $count"

        # Afficher quelques exemples
        $examples = @(Get-ChildItem -Path $tablerDestPath -Filter *.svg -File | Select-Object -First 10)
        Write-Host "   Exemples d'icônes disponibles:"
        $examples | ForEach-Object { Write-Host "     - $($_.BaseName)" }
    } else {
        Write-Host "   Le dossier tabler-icons n'existe pas encore"
    }
}

function Clean-TablerIcons {
    Write-Host "🗑️  Suppression des icônes Tabler locales..."
    if (Test-Path $tablerDestPath) {
        Remove-Item -Path $tablerDestPath -Recurse -Force
        Write-Host "✅ Dossier supprimé: $tablerDestPath"
    } else {
        Write-Host "ℹ️  Le dossier n'existe pas"
    }
}

# Menu principal
if ($args.Count -eq 0) {
    Write-Host "
╔════════════════════════════════════════════════╗
║  Gestionnaire des Icônes Tabler Icons          ║
╚════════════════════════════════════════════════╝

Usage: .\'manage-tabler-icons.ps1' [command]

Commandes disponibles:
  update    - Mettre à jour/installer les icônes
  stats     - Afficher les statistiques
  clean     - Supprimer les icônes locales
  help      - Afficher cette aide

Exemples:
  .\'manage-tabler-icons.ps1' update
  .\'manage-tabler-icons.ps1' stats
"
} else {
    switch ($args[0].ToLower()) {
        'update' {
            Update-TablerIcons
        }
        'stats' {
            Show-TablerIconStats
        }
        'clean' {
            Clean-TablerIcons
        }
        'help' {
            Write-Host "Voir les exemples ci-dessus"
        }
        default {
            Write-Host "❌ Commande inconnue: $($args[0])"
            Write-Host "   Utilisez 'help' pour voir les commandes disponibles"
        }
    }
}

