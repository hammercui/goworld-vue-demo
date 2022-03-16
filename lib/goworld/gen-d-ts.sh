cd core/js
rm -rf *.d.ts
cd ..
cd ts
tsc --declaration *.ts --outDir ../js
cd ..
cd ..