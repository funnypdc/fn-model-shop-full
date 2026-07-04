@echo off
cd /d "%~dp0"
setlocal enabledelayedexpansion

:: ── check gh CLI ────────────────────────────────────────────
where gh >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] gh CLI not found. Install at https://cli.github.com then run "gh auth login"
  pause
  exit /b 1
)

:: ── clean and build ─────────────────────────────────────────
echo Cleaning out folder...
if exist out rmdir /S /Q out

echo Building...
call npm run build
if %errorlevel% neq 0 (
  echo.
  echo [ERROR] Build failed! Please try again.
  pause
  exit /b 1
)

:: ── prepare out folder ──────────────────────────────────────
type nul > out\.nojekyll
mkdir out\.github\workflows 2>nul
copy site-pages.yml out\.github\workflows\pages.yml > nul
if exist out\product        rmdir /S /Q out\product
if exist out\slide          rmdir /S /Q out\slide
if exist out\public\product rmdir /S /Q out\public\product
if exist out\public\slide   rmdir /S /Q out\public\slide

:: ── deploy site ─────────────────────────────────────────────
echo.
echo [SITE] Pushing to GitHub...
pushd out
git init
git checkout -b main 2>nul || git checkout main 2>nul
git add .
git commit -m "deploy"
git remote remove origin 2>nul
git remote add origin https://github.com/funnypdc/fn-model-shop.git
git push --force origin main
if %errorlevel% neq 0 (
  popd
  echo [ERROR] git push failed. Please try again.
  pause
  exit /b 1
)
popd

:: ── wait for site run ────────────────────────────────────────
echo [SITE] Waiting for workflow to start...
set RUN_ID=
set /a COUNT=0
:find_site_run
timeout /t 5 /nobreak > nul
set /a COUNT+=1
for /f "tokens=*" %%r in ('gh run list --repo funnypdc/fn-model-shop --workflow=pages.yml --limit 1 --json databaseId --jq ".[0].databaseId" 2^>nul') do set RUN_ID=%%r
if "%RUN_ID%"=="" (
  if %COUNT% lss 12 goto find_site_run
  echo [ERROR] Workflow run not found after 60s. Please try again.
  pause
  exit /b 1
)

:: ── monitor site ─────────────────────────────────────────────
echo [SITE] Monitoring deployment (run %RUN_ID%)...
gh run watch %RUN_ID% --repo funnypdc/fn-model-shop --exit-status
if %errorlevel% neq 0 (
  echo.
  echo [ERROR] Site deployment failed after all retries!
  echo Check: https://github.com/funnypdc/fn-model-shop/actions
  echo Please try again.
  pause
  exit /b 1
)
echo [SITE] SUCCESS - Site deployed!

:: ── prepare assets ───────────────────────────────────────────
echo.
echo [ASSETS] Syncing images (incremental)...
if exist assets-out rmdir /S /Q assets-out
git clone https://github.com/funnypdc/fn-model-assets.git assets-out 2>nul
if not exist assets-out mkdir assets-out
if not exist assets-out\.git (
  pushd assets-out
  git init
  git checkout -b main 2>nul
  popd
)
if exist assets-out\product rmdir /S /Q assets-out\product
if exist assets-out\slide   rmdir /S /Q assets-out\slide
if exist public\product\ xcopy /E /I /Y public\product assets-out\product > nul
if exist public\slide\   xcopy /E /I /Y public\slide   assets-out\slide   > nul
type nul > assets-out\.nojekyll
mkdir assets-out\.github\workflows 2>nul
copy assets-pages.yml assets-out\.github\workflows\pages.yml > nul

:: ── push assets if changed ───────────────────────────────────
pushd assets-out
git add -A
git diff --cached --quiet
if %errorlevel% equ 0 (
  echo [ASSETS] No changes detected, skipping push.
  popd
  rmdir /S /Q assets-out
  goto done
)
git commit -m "update assets"
git remote remove origin 2>nul
git remote add origin https://github.com/funnypdc/fn-model-assets.git
git push origin main
if %errorlevel% neq 0 (
  popd
  rmdir /S /Q assets-out
  echo [ERROR] Assets git push failed. Please try again.
  pause
  exit /b 1
)
popd
rmdir /S /Q assets-out

:: ── wait for assets run ──────────────────────────────────────
echo [ASSETS] Waiting for workflow to start...
set RUN_ID=
set /a COUNT=0
:find_assets_run
timeout /t 5 /nobreak > nul
set /a COUNT+=1
for /f "tokens=*" %%r in ('gh run list --repo funnypdc/fn-model-assets --workflow=pages.yml --limit 1 --json databaseId --jq ".[0].databaseId" 2^>nul') do set RUN_ID=%%r
if "%RUN_ID%"=="" (
  if %COUNT% lss 12 goto find_assets_run
  echo [ERROR] Assets workflow run not found after 60s. Please try again.
  pause
  exit /b 1
)

:: ── monitor assets ───────────────────────────────────────────
echo [ASSETS] Monitoring deployment (run %RUN_ID%)...
gh run watch %RUN_ID% --repo funnypdc/fn-model-assets --exit-status
if %errorlevel% neq 0 (
  echo.
  echo [ERROR] Assets deployment failed after all retries!
  echo Check: https://github.com/funnypdc/fn-model-assets/actions
  echo Please try again.
  pause
  exit /b 1
)
echo [ASSETS] SUCCESS - Assets deployed!

:done
echo.
echo ============================================
echo  Deploy complete! Everything succeeded.
echo  Site:   https://funnypdc.github.io/fn-model-shop
echo  Assets: https://funnypdc.github.io/fn-model-assets
echo ============================================
