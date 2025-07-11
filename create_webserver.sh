#!/bin/bash
echo "Iniciando Build para webserver"
npm run build
echo 'Removendo build OLD'
rm -rf ../../Dockers/webserver/build
echo 'OLD build removida'
cp -rf build/ ../../Dockers/webserver/build
# cp -vru build/ ../app-centroinfo
echo 'new build criada'
echo 'sucess'
# rm -rf build
echo 'Fim ...'