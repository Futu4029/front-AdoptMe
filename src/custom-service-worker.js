self.addEventListener('push', function(event) {
    const notificationTitle = 'Te llegó una notificación 🎉';
    let notificationBody = 'No hay contenido';

    if (event.data) {
        try {
            const data = JSON.parse(event.data.text()); // Parsear el mensaje JSON
            notificationBody = data.body || 'No hay contenido'; // Usar solo el contenido del campo 'body'
            console.log("ACAAAAA", data.body); // Mostrar solo el 'body'
        } catch (error) {
            console.error("Error al parsear el mensaje:", error);
        }
    }

    const notificationOptions = {
        body: notificationBody,
        icon: '/assets/icons/icon-72x72.png',
        badge: '/assets/icons/icon-72x72.png',
    };

    event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('http://127.0.0.1:4200/')
    );
});
