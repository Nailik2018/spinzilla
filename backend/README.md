# Spinzilla Backend

## Informationen zum Projekt
```text
Autor: Kilian Althaus
Version: 0.0.1
Datum 06.10.2024
```
***

## Eingesetzte Software
```text
nodejs Version: 20.17.0
nestjs Version: 10.4.5
npm Version: 10.8.3
Docker Version: 24.0.6
mysql Version: 8.3.0
```
***

## Deine verwendete Software
```bash
node --version
```
```bash
nest --version
```
```bash
npm --version
```
```bash
docker --version
```
***

## Verwendete Ports
| Port | Verwendung |
|------|------------|
| 3000 | Backend    |
| 3306 | MySQL      |
| 8080 | PhpMyAdmin |
***

## Betriebsoptionen
```text
Achtung .env DB_HOST=localhost setzen, wenn ohne Dockerisierung gestartet wird.
```

### 1) Dockerisierung Dev Container mit live view
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

### 2) Dockerisierung Prod Container
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### 3) Betrieb development
#### NodeJS dependencies installieren
```bash
npm i
```

#### Installation Docker dev Container für Entwicklung ohne Docker host
```bash
docker-compose -f docker-compose-dev-mysql-phpmyadmin.yml up -d
```
***

### Deinstallation Docker Container
#### Deinstallation Docker dev Container
```bash
docker-compose -f docker-compose-dev-mysql-phpmyadmin.yml down
```

### Backend starten zum Entwickeln
```bash
nest start watch
```
***
## Aufrufe URLS
### PhpMyAdmin dev oder prod
http://localhost:8080/
http://localhost:8080/

### Backend dev oder prod
http://localhost:3000/api/docs
http://localhost:3000/api/docs
***

## Betriebsoptionen
```text
Achtung .env DB_HOST=localhost setzen, wenn ohne Dockerisierung gestartet wird.
```

```bash
netstat -ano | findstr :3000
```

```bash
taskkill /PID 25168 /F
 ```
***