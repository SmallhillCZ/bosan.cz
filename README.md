# Web dětské vodácké skupiny ŠÁN

## Instalace pro produkci

Stažení zdrojového kódu:
```
git clone https://github.com/SmallhillCZ/bosan-cz
cd bosan-cz
```

Instalace npm balíčků potřebných pro běh:

```
npm run install
```

Kompilace kódu:
```
npm run build
```

Spuštění serveru (pro opravdu produkční nasazení je vhodné spustit jako službu, např. přes balíček forever-service):
```
npm start
```

## Instalace pro vývoj

Stažení zdrojového kódu:

```
git clone https://github.com/SmallhillCZ/bosan-cz
cd bosan-cz
```

Instalace npm balíčků potřebných pro běh:

```
npm run install
```

Vytvoření konfigurace pro Mongo-Express prohlížeč databáze:

```
cp server/mongo-config.example.js server/mongo-config.js
```

Nyní je potřeba v soubory server/mongo-config.js nastavit databázi a přístupové údaje dle https://github.com/mongo-express/mongo-express.

Poté již spustíme testovací server:

```
npm run dev
```

 - Server se při každé úpravě souborů sám zrestartuje a TypeScriptový kód se překompiluje.
 - Při zobrazení webu pak probíhá kompilace komponent, takže načítání trvá déle.
 - Prohlížeč databáze je přístupný na adrese /db
