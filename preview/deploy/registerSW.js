if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/youtube-reload/preview/deploy/sw.js', { scope: '/youtube-reload/preview/deploy/' })})}