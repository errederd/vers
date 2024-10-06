const express = require('express');
const fetch = require('node-fetch');
const app = express();

let isLive = false;

const checkStreamStatus = async () => {
    try {
        // Reemplaza con la API o endpoint que monitorea el stream de Kick
        const response = await fetch('https://api.kick.com/stream/status');
        const data = await response.json();

        // Verifica si el streamer está en vivo
        isLive = data.isLive || false;
    } catch (error) {
        console.error('Error checking stream status:', error);
        isLive = false; // Asume que no está en vivo si hay un error
    }
};

// Llama a checkStreamStatus cada 30 segundos
setInterval(checkStreamStatus, 30000);

// Ruta para el frontend que decide qué video mostrar
app.get('/', (req, res) => {
    if (isLive) {
        res.send('<h1>Stream en Vivo</h1><video src="https://kick.com/stream-url" autoplay></video>');
    } else {
        res.send('<h1>Video de Espera</h1><video src="/path/to/waiting.mp4" autoplay loop></video>');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
