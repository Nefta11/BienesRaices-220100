setTimeout(function(){
    var alerts = document.querySelectorAll('[role="alert"]');
    alerts.forEach(function(alert) {
        alert.style.display = 'none';
    });
}, 3000);