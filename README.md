# Web dětské vodácké skupiny ŠÁN

## Instalace pro produkci

Stažení zdrojového kódu:
```
$ git clone https://github.com/SmallhillCZ/bosan-cz
$ cd bosan-cz
```

Instalace npm balíčků potřebných pro běh:

```
$ npm install
```

Kompilace kódu:
```
$ npm run build
```

Nastavení serveru jako služby

```
$ sudo npm install forever-service -g
$ forever-service install -c "server/server.js" bosan
```

Spuštění

```
$ sudo service bosan start
```

### Aktualizace

```
$ sudo service bosan stop
$ git pull origin master
$ npm run build
$ sudo service bosan start
```

## Instalace pro vývoj

Stažení zdrojového kódu:

```
$ git clone https://github.com/SmallhillCZ/bosan-cz
$ cd bosan-cz
```

Instalace npm balíčků potřebných pro běh:

```
$ npm install
```

Vytvoření konfigurace pro Mongo-Express prohlížeč databáze:

```
$ cp server/mongo-config.example.js server/mongo-config.js
```

Nyní je potřeba v souboru server/mongo-config.js nastavit databázi a přístupové údaje dle https://github.com/mongo-express/mongo-express.

Poté již spustíme testovací server:

```
$ npm run dev
```

 - Server se při každé úpravě souborů sám zrestartuje a TypeScriptový kód se překompiluje.
 - Při zobrazení webu pak probíhá kompilace komponent, takže načítání trvá déle.
 - Prohlížeč databáze je přístupný na adrese /db
