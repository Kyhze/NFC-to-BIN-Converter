// colorizeBlockData.js
function colorizeBlockData(blockData, sectorIndex, blockIndex) {
  const bytes = blockData.split(' ');

  // Apply specific colorizations to the correct byte ranges
  return bytes.map((byte, index) => {
    let colorClass = '';

    // Special handling for Sector 0
    if (sectorIndex === 0) {
      if (blockIndex === 0) {
        // Block 0 of Sector 0 contains UID, BCC, SAK, ATQA, etc.
        if (index < 4) {
          colorClass = 'block-uid'; // UID
        } else if (index === 4) {
          colorClass = 'block-bcc'; // BCC
        } else if (index === 5) {
          colorClass = 'block-sak'; // SAK
        } else if (index < 8) {
          colorClass = 'block-atqa'; // ATQA
        } else {
          colorClass = 'block-manufacturer'; // Manufacturer Code
        }
      } else if (blockIndex === 3) {
        // Block 3 of Sector 0 contains Key A, ACs, and Key B
        if (index < 6) {
          colorClass = 'block-keyA'; // Key A
        } else if (index < 10) {
          colorClass = 'block-ac'; // ACs
        } else {
          colorClass = 'block-keyB'; // Key B
        }
      } else {
        // Other blocks in Sector 0
        colorClass = 'block-data'; // Data
      }
    } else if ((blockIndex === 3 && sectorIndex < 32) || (sectorIndex >= 32 && blockIndex === 15)) {
      // Block 3 in sectors 0-31 or block 15 in sectors 32-39 (trailer blocks)
      if (index < 6) {
        colorClass = 'block-keyA'; // Key A
      } else if (index < 10) {
        colorClass = 'block-ac'; // ACs
      } else {
        colorClass = 'block-keyB'; // Key B
      }
    } else {
      // Data blocks
      colorClass = 'block-data'; // Data
    }

    return `<span class="${colorClass}">${byte}</span>`;
  }).join(' ');
}

export { colorizeBlockData };