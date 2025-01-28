## What does this do?
This simple web app allows you to take your Flipper Zero .nfc dumps and convert them to raw .bin dumps. It'll also display the contents of the dump file on screen.

You can also use it to archive your NFC tag dumps into a pure binary format. You can also import them directly to devices that support it (Chameleon Ultra...).

### Limitations:
Currently, this only supports **Mifare Classic 1K** dumps.

Tested on: Flipper Zero w/ mntm-009 firmware, but OFW should work too.

## How to set up?

The simplest way is to do the following:

1. Clone the repo: ```git clone https://github.com/Kyhze/NFC-to-BIN-Converter.git && cd NFC-to-BIN-Converter```
2. Run the web server of your choice: (example: Node.js) ```http.server -p 8080```
3. Browse to ```http://localhost:8080```

Make sure CORS is disabled when hosting it locally.

### Wondering how to install node.js? 
1. ```sudo apt update && sudo apt install -y npm```
2. ```npm install -g http-server```
3. ```http.server -p 8080```

Or you can just check out the [live demo](https://kyhze.github.io/NFC-to-BIN-Converter/).

PRs are welcome!
