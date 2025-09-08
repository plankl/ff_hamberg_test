# Hydrantenkarte Hamberg/Breitenbrunn - Modulare Version

## 📁 Inhalt

- `index_simple_ar.html` - Hauptanwendung
- `manifest.json` - PWA-Manifest  
- `service-worker.js` - Service Worker für Offline-Funktionalität
- `icon.png/svg` - App-Icon
- `icons/` - Hydrantentyp-Icons
- `README.md` - Diese Datei

## 🚀 Installation

### Lokale Nutzung
1. Alle Dateien in einen Webserver-Ordner kopieren
2. `index_simple_ar.html` in Browser öffnen

### GitHub Pages
1. Alle Dateien in Repository hochladen
2. GitHub Pages aktivieren
3. Über HTTPS-URL aufrufen (für Kamera-Zugriff erforderlich)

### Als PWA installieren
1. Website in mobilen Browser öffnen
2. "Zur Startseite hinzufügen" wählen
3. App verhält sich wie native Anwendung

## 🎯 Features

- **2D-Karte**: Interaktive Karte mit 5 Hydrantentypen
- **GPS-AR**: Kamera-basierte AR mit GPS-Positionierung  
- **Offline-Funktionalität**: Service Worker für Offline-Nutzung
- **Progressive Web App**: Installierbar wie native App
- **Mobile-optimiert**: Touch-Bedienung und responsive Design

## 🧭 Bedienung

### 2D-Modus
- Karte zoomen/bewegen
- Hydranten anklicken für Details
- Filter über Legende
- Themen wechseln

### AR-Modus  
- Kamera-Berechtigung erteilen
- Gerät in Richtung Hydranten drehen
- GPS-basierte Overlay-Positionierung
- Automatische Kompass-Kalibrierung

## 🔧 Technische Details

- **Framework**: Vanilla JavaScript
- **Karten-API**: Leaflet.js
- **AR-Implementierung**: Native Web-APIs (getUserMedia, DeviceOrientation)
- **PWA**: Service Worker, Web App Manifest
- **Offline**: Application Cache, lokale Datenspeicherung

Erstellt mit modularer Architektur für bessere Wartbarkeit.
