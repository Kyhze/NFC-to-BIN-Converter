// handleFileUpload.js
import { crc32 } from './crc32.js';
import { parseNfcFileContent } from './parseNfcFileContent.js';
import { displayFileDetails } from './displayFileDetails.js';

function handleFileUpload(event) {
  const fileInput = event.target;
  const status = document.getElementById('status');
  const crcDisplay = document.getElementById('crc32');
  const downloadButton = document.getElementById('downloadLink');
  const detailsDiv = document.getElementById('fileDetails');

  // Clear the CRC32 display and other UI elements
  crcDisplay.innerHTML = ''; // Reset CRC32 text
  status.textContent = '';   // Reset status message
  detailsDiv.innerHTML = ''; // Clear parsed details
  downloadButton.style.display = "none"; // Hide the download button

  if (!fileInput.files.length) {
    status.textContent = "Please select a file.";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const lines = content.split('\n');
    const lowerCaseLines = lines.map(line => line.trim().toLowerCase());

    let deviceTypeOk = false;
    let mifareTypeOk = false;
    let filetypeOk = false;
    let versionOk = false;
    let versionFieldOk = false;

    // Validate the file content
    for (const line of lowerCaseLines) {
      if (line.includes("device type: mifare classic")) {
        deviceTypeOk = true;
      }
      if (line.includes("mifare classic type: 1k")) {
        mifareTypeOk = true;
      }
      if (line.includes('filetype: flipper nfc device')) {
        filetypeOk = true;
      }
      if (line.includes("data format version: 2")) {
        versionOk = true;
      }
      if (line.includes("version: 4")) {
        versionFieldOk = true;
      }
    }

    // If any validation fails, display an error and stop processing
    if (!deviceTypeOk || !mifareTypeOk || !filetypeOk || !versionOk || !versionFieldOk) {
      status.textContent = "Invalid NFC file format.";
      status.style.color = "#ff4040";
      return; // Exit the function early
    }

    // If validation passes, proceed with parsing and displaying the file details
    const details = parseNfcFileContent(content);
    displayFileDetails(details);

    let binaryData = [];
    for (const line of lines) {
      if (line.trim().startsWith("Block")) {
        const hexData = line.split(':')[1].trim();
        const hexBytes = hexData.split(/\s+/);
        hexBytes.forEach(byte => {
          binaryData.push(parseInt(byte, 16));
        });
      }
    }

    if (binaryData.length === 0) {
      status.textContent = "Invalid NFC file format.";
      return;
    }

    // Calculate CRC32 checksum of raw binary data before conversion
    const crc = crc32(binaryData);
    crcDisplay.innerHTML = `CRC32 of binary data: <span class="crc-value">${crc.toString(16).toUpperCase().padStart(8, '0')}</span>`;

    // Create a downloadable binary file
    const blob = new Blob([new Uint8Array(binaryData)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    // Update download button
    downloadButton.href = url;
    downloadButton.download = `${details.uid.replace(/\s+/g, '')}.bin`;
    downloadButton.style.display = "inline-flex";

    // Update status message with the file name in italic
    const fileName = file.name;
    status.innerHTML = `NFC file <strong>'${fileName}'</strong> loaded!`;
    status.style.color = "#ffffff";
  };

  reader.onerror = function () {
    status.textContent = "Error reading file.";
  };

  reader.readAsText(file);

  // Reset the file input after processing, regardless of success or failure
  fileInput.value = '';
}

export { handleFileUpload };