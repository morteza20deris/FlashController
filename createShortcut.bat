::Set the application-specific string vars 
SET AppDescription=FlashController
SET IconName=thunder.ico
SET Shortcut_Name=Flash Controller.url
SET URL_PATH=http://localhost:3000

::Set the common string vars 
SET WORKING_PATH=%~dp0
SET ICONDEST=c:\ProgramData\%AppDescription%
SET LinkPath=%userprofile%\Desktop\%Shortcut_Name%

@echo. Copy Icon 
IF EXIST "%ICONDEST%" (GOTO _CopyIcon) 
mkdir "%ICONDEST%"
:_CopyIcon 
copy "%WORKING_PATH%\client\public\%IconName%" "%ICONDEST%"


echo [InternetShortcut] > "%LinkPath%"
echo URL=%URL_PATH% >> "%LinkPath%"
echo IDList= >> "%LinkPath%"
echo IconFile=%ICONDEST%\%IconName% >> "%LinkPath%"
echo IconIndex=0 >> "%LinkPath%"
echo HotKey=0 >> "%LinkPath%"
 