Set oShell = CreateObject ("Wscript.Shell") 
Dim strArgs
strArgs = "cmd /c RunSiteServer.bat"
oShell.Run strArgs, 0, false