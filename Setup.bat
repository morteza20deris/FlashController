cd server
start cmd /c npm install
cd ..

cd client
start /B /wait cmd /c npm install
cd ..

createShortcut