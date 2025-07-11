#!/bin/bash
echo "Iniciando Build do projeto"
npm run build
echo 'Removendo build OLD'
rm -rf ../app-centroinfo/build
echo 'OLD build removida'
cp -rf build/ ../app-centroinfo/build
# cp -vru build/ ../app-centroinfo
echo 'NEW build criada'
echo 'sucess'
# rm -rf build
echo 'Fim ...'