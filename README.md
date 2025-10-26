# 🚒 Hydrantenkarte Feuerwehr Hamberg

Progressive Web App zur Darstellung von Feuerwehr-Hydranten und Rettungspunkten.

## 🌟 Features

- 📍 **Interaktive 2D-Karte** mit Leaflet.js
- 📱 **AR-Modus** mit Kamera-Overlays
- 🔦 **Taschenlampen-Steuerung** (Ein/Aus/Blinken)
- 🧭 **Kompass** und Geräteorientierung
- 💨 **Windanzeige**
- 📡 **Offline-Funktionalität** durch Service Worker
- 🗺️ **Navigation** zu Apple Maps / Google Maps
- 🔍 **Nächster Hydrant** finden
- 🎯 **Filterbare Kategorien**

## 📱 Installation

### Als PWA installieren

1. Öffne die App im Browser (Chrome/Edge/Safari)
2. Klicke auf "Installieren" in der Adressleiste
3. Die App wird als eigenständige Anwendung installiert

### Lokal testen

```bash
# Klone das Repository
git clone https://github.com/plankl/ff-hamberg.git
cd ff-hamberg

# Starte lokalen Server
python -m http.server 8000

# Öffne im Browser
# http://localhost:8000
```

## 🗺️ Kategorien

- **Überflurhydrant** (rot) - Oberirdischer Hydrant
- **Unterflurhydrant** (blau) - Unterirdischer Hydrant
- **Rettungspunkt** (grün) - Rettungspunkt
- **Wasserbehälter** (gelb) - Löschwasserbehälter
- **Sperrpunkt** (lila) - Sperrpunkt

## 🛠️ Technologie-Stack

- **Kartendarstellung:** Leaflet.js 1.9.4
- **PWA:** Service Worker mit Cache-Strategie
- **AR:** Kamera-basierte Overlays mit Device Orientation
- **Frontend:** Vanilla JavaScript (ES6+), CSS3
- **Datenformat:** GeoJSON

## 📄 Lizenz

MIT License - Copyright (c) 2025 Feuerwehr Hamberg

## 🗺️ Datenquellen & Attribution

- **Kartendaten:** © [OpenStreetMap](© OpenStreetMap contributors) contributors (ODbL 1.0)
- **Leaflet.js:** BSD-2-Clause License
- **Hydrantendaten:** Feuerwehr Hamberg

## 📱 Browser-Kompatibilität

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ⚠️ AR-Funktionen nur auf Mobilgeräten mit Kamera

## 🔒 Datenschutz

Diese App verarbeitet keine personenbezogenen Daten. Die GPS-Position wird nur lokal auf dem Gerät verwendet und nicht an Server übertragen.

---

**Build:** 26.10.2025  
**Erstellt mit ❤️ für die Feuerwehr Hamberg**
