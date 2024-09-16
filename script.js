document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('url').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            generateIframe();
        }
    });
});

function addHttps(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

function generateIframe() {
    var inputUrl = document.getElementById('url').value;
    var urlWithHttps = addHttps(inputUrl);
    var iframe = document.createElement('iframe');
    iframe.src = urlWithHttps;
    document.body.appendChild(iframe);
}

function generateIframeWithLoading() {
    var loading = document.createElement('div');
    loading.innerText = "Loading...";
    document.body.appendChild(loading);

    var countdown = 3;
    var countdownInterval = setInterval(function() {
        if (countdown > 0) {
            loading.innerText = "Loading in " + countdown + " seconds...";
            countdown--;
        } else {
            clearInterval(countdownInterval);
            var inputUrl = document.getElementById('url').value;
            var urlWithHttps = addHttps(inputUrl);
            var iframe = document.createElement('iframe');
            iframe.src = urlWithHttps;
            iframe.style.display = 'none';

            iframe.onload = function() {
                loading.style.display = 'none';
                iframe.style.display = 'block';
            }
            document.body.appendChild(iframe);
        }
    }, 1000);
}