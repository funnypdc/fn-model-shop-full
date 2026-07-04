@echo off
setlocal

set ROOT=%~dp0
set DEST=%ROOT%setupdata

if not exist "%DEST%" mkdir "%DEST%"

powershell -NoProfile -Command ^
  "$sh = New-Object -ComObject WScript.Shell;" ^
  "$items = @(" ^
  "  @{ name='product';                  target='%ROOT%public\product' }," ^
  "  @{ name='slide';                    target='%ROOT%public\slide' }," ^
  "  @{ name='category-cutjet.json';     target='%ROOT%data\category-cutjet.json' }," ^
  "  @{ name='products.example.jsonc';   target='%ROOT%data\products.example.jsonc' }," ^
  "  @{ name='products.json';            target='%ROOT%data\products.json' }," ^
  "  @{ name='slide.json';               target='%ROOT%data\slide.json' }" ^
  ");" ^
  "foreach ($item in $items) {" ^
  "  $lnk = $sh.CreateShortcut('%DEST%\' + $item.name + '.lnk');" ^
  "  $lnk.TargetPath = $item.target;" ^
  "  $lnk.Save();" ^
  "}"

echo.
echo Shortcuts created in: %DEST%
echo.
pause
