const Sentry = require('@sentry/node');

const sendWelcomeNotification = (user) => {
    try {
        // Kirim notifikasi welcome setelah user mendaftar
        console.log(`Welcome, ${user.email}!`);
    } catch (error) {
        Sentry.captureException(error);
    }
};

const sendPasswordChangeNotification = (user) => {
    try {
        // Kirim notifikasi ketika password berhasil diubah
        console.log(`Password changed successfully for ${user.email}`);
    } catch (error) {
        Sentry.captureException(error);
    }
};

module.exports = {
    sendWelcomeNotification,
    sendPasswordChangeNotification
};