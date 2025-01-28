// main.js
import { handleFileUpload } from './handleFileUpload.js';

// Add event listener for the download button
document.getElementById('downloadLink').addEventListener('click', function (event) {
  const downloadButton = event.target;
  const downloadUrl = downloadButton.href;

  // Triggering download automatically
  if (downloadUrl) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = downloadButton.download;
    link.click();
  }
});

document.getElementById('nfcFile').addEventListener('change', handleFileUpload);