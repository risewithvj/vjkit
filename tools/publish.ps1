# VL Tech Official | commit and push your changes as Vijaya Kumar L
# Usage (inside C:\Users\offic\OneDrive\Documents\vjkit):  .\tools\publish.ps1 "what you changed"
param([string]$Message = "update site assets")
$Repo = Split-Path $PSScriptRoot -Parent
& git -C $Repo pull --rebase --autostash origin main
if ($LASTEXITCODE -ne 0) { Write-Host "Pull failed. Fix the conflict, then run again." -ForegroundColor Red; exit 1 }
& git -C $Repo add -A
& git -C $Repo diff --cached --quiet
if ($LASTEXITCODE -eq 0) { Write-Host "Nothing to publish." -ForegroundColor Yellow; exit 0 }
& git -C $Repo -c "user.name=Vijaya Kumar L" -c "user.email=risewithvj@gmail.com" commit -m $Message
& git -C $Repo push origin main
if ($LASTEXITCODE -ne 0) { Write-Host "Push failed." -ForegroundColor Red; exit 1 }
Write-Host "Pushed. The site updates in 1-3 minutes: https://github.com/risewithvj/vjkit/actions" -ForegroundColor Green
