// parseNfcFileContent.js
function parseNfcFileContent(content) {
  const details = {};
  const lines = content.split('\n');
  let sectorIndex = -1;

  lines.forEach(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("Filetype:")) {
      details.filetype = trimmedLine.split(":")[1].trim();
    }
    if (trimmedLine.startsWith("Version:")) {
      details.version = trimmedLine.split(":")[1].trim();
    }
    if (trimmedLine.startsWith("Device type:")) {
      details.deviceType = trimmedLine.split(":")[1].trim();
    }
    if (trimmedLine.startsWith("UID:")) {
      details.uid = trimmedLine.split(":")[1].trim().replace(/\s+/g, ' ');
    }
    if (trimmedLine.startsWith("ATQA:")) {
      details.atqa = trimmedLine.split(":")[1].trim();
    }
    if (trimmedLine.startsWith("SAK:")) {
      details.sak = trimmedLine.split(":")[1].trim();
    }
    if (trimmedLine.startsWith("Mifare Classic type:")) {
      details.mifareType = trimmedLine.split(":")[1].trim();
    }
    if (trimmedLine.startsWith("Block")) {
      const blockData = trimmedLine.split(":")[1].trim();
      const sector = Math.floor(parseInt(trimmedLine.split(" ")[1]) / 4); // Assuming each sector has 4 blocks

      if (!details.sectors) details.sectors = {};
      if (!details.sectors[sector]) details.sectors[sector] = [];

      details.sectors[sector].push(blockData);
    }
  });

  return details;
}

export { parseNfcFileContent };