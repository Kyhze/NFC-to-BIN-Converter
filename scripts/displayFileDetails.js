// displayFileDetails.js
import { colorizeBlockData } from './colorizeBlockData.js';

function displayFileDetails(details) {
  const detailsDiv = document.getElementById('fileDetails');

  // Color mapping for each detail field (customize colors as per the sector highlighting)
  const colorMapping = {
    filetype: "#ffffff",
    version: "#ffffff",
    deviceType: "#ffffff",
    mifareType: "#ffffff",
    uid: "#00ffff",
    atqa: "#ffff00",
    sak: "#add8e6"
  };

  let content = `
    <h3>Parsed NFC File Details</h3>
    <p><strong>Filetype:</strong> <span class="value" style="color:${colorMapping.filetype}">${details.filetype}</span></p>
    <p><strong>Version:</strong> <span class="value" style="color:${colorMapping.version}">${details.version}</span></p>
    <p><strong>Device Type:</strong> <span class="value" style="color:${colorMapping.deviceType}">${details.deviceType}</span></p>
    <p><strong>Mifare Classic Type:</strong> <span class="value" style="color:${colorMapping.mifareType}">${details.mifareType}</span></p>
    <p><strong>UID:</strong> <span class="value" style="color:${colorMapping.uid}">${details.uid}</span></p>
    <p><strong>ATQA:</strong> <span class="value" style="color:${colorMapping.atqa}">${details.atqa}</span></p>
    <p><strong>SAK:</strong> <span class="value" style="color:${colorMapping.sak}">${details.sak}</span></p>
  `;

  // Display each sector with block data
  if (details.sectors) {
    Object.keys(details.sectors).forEach(sector => {
      const sectorIndex = parseInt(sector);
      content += `<div class="sector"><h3>Sector ${sectorIndex}:</h3>`;
      details.sectors[sector].forEach((block, blockIndex) => {
        content += `<p><strong>Block ${blockIndex}:</strong> ${colorizeBlockData(block, sectorIndex, blockIndex)}</p>`;
      });
      content += '</div>';
    });
  }

  detailsDiv.innerHTML = content;
}

export { displayFileDetails };