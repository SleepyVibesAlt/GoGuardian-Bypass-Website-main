document.addEventListener('DOMContentLoaded', function() {
    // Event listener for URL input keyup (Enter key)
    document.getElementById('url').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            generateIframeWithLoading();
        }
    });
});

// Function to ensure URL starts with http:// or https://
function addHttps(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

// Function to validate the URL format
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Function to generate an iframe with a countdown and loading message
function generateIframeWithLoading() {
    var inputUrl = document.getElementById('url').value.trim();
    
    // Validate URL
    if (!isValidUrl(addHttps(inputUrl))) {
        alert('Please enter a valid URL.');
        return;
    }

    var loading = document.createElement('div');
    loading.id = 'loadingMessage';
    loading.innerText = "Loading...";
    document.body.appendChild(loading);

    var countdown = 3;
    var countdownInterval = setInterval(function() {
        if (countdown > 0) {
            loading.innerText = "Loading in " + countdown + " seconds...";
            countdown--;
        } else {
            clearInterval(countdownInterval);
            var urlWithHttps = addHttps(inputUrl);
            var iframe = document.createElement('iframe');
            iframe.src = urlWithHttps;
            iframe.style.display = 'none'; // Hide iframe until it loads
            
            // Sandboxing to limit what the iframe can do (e.g., no scripts, no forms)
            iframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';

            // Display iframe and hide loading message when iframe loads
            iframe.onload = function() {
                loading.style.display = 'none';
                iframe.style.display = 'block';
            };

            // Error handling for failed iframe load
            iframe.onerror = function() {
                loading.innerText = 'Failed to load the website. It might not allow embedding.';
            };

            // Adjust iframe dimensions and append to the body
            iframe.style.width = "100%";  
            iframe.style.height = "600px"; 
            iframe.style.border = 'none'; // Remove border for better appearance

            document.body.appendChild(iframe);
        }
    }, 1000);
}
