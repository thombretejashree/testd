(function() {
    // --- Universal Elements ---
    const stegoImageInput = document.getElementById('stego-image-input');
    const canvas = document.getElementById('canvas');

    // --- Tab Elements ---
    const insertTabBtn = document.getElementById('insert-tab-btn');
    const extractTabBtn = document.getElementById('extract-tab-btn');
    const insertPanel = document.getElementById('insert-panel');
    const extractPanel = document.getElementById('extract-panel');

    // --- Embed Elements ---
    const embedBtn = document.getElementById('embed-btn');
    const secretMessageInput = document.getElementById('secret-message');
    const outputSection = document.getElementById('output-section');

    // --- Extract Elements ---
    const extractBtn = document.getElementById('extract-btn');
    const extractedOutputSection = document.getElementById('extracted-output-section');
    const extractedMessageTextarea = document.getElementById('extracted-message');
    const copyTextBtn = document.getElementById('copy-text-btn');

    // Basic check to ensure we are on the steganography page
    if (!insertTabBtn || !canvas) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // --- TAB SWITCHING LOGIC ---
    insertTabBtn.addEventListener('click', () => {
        insertTabBtn.classList.add('active');
        extractTabBtn.classList.remove('active');
        insertPanel.classList.add('active');
        extractPanel.classList.remove('active');
    });

    extractTabBtn.addEventListener('click', () => {
        extractTabBtn.classList.add('active');
        insertTabBtn.classList.remove('active');
        extractPanel.classList.add('active');
        insertPanel.classList.remove('active');
    });


    // --- EMBEDDING LOGIC ---
    embedBtn.addEventListener('click', () => {
        const coverFile = stegoImageInput.files[0];
        const message = secretMessageInput.value;

        if (!coverFile || !message) {
            alert('Please select an image file and enter a secret message to embed.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                const delimiter = "_#_";
                const messageInBinary = stringToBinary(message + delimiter);
                
                if (messageInBinary.length > (data.length / 4) * 3) {
                    alert('Message is too long for this image.');
                    return;
                }

                let dataIndex = 0;
                for (let i = 0; i < messageInBinary.length; i++) {
                    while ((dataIndex + 1) % 4 === 0) dataIndex++;
                    data[dataIndex] = (messageInBinary[i] === '1') ? (data[dataIndex] | 1) : (data[dataIndex] & 254);
                    dataIndex++;
                }

                ctx.putImageData(imageData, 0, 0);
                
                // Create a temporary link to trigger the download
                const downloadLink = document.createElement('a');
                downloadLink.href = canvas.toDataURL('image/png');
                downloadLink.download = 'steganography-image.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                outputSection.style.display = 'block';
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(coverFile);
    });

    // --- EXTRACTING LOGIC ---
    extractBtn.addEventListener('click', () => {
        const stegoFile = stegoImageInput.files[0];

        if (!stegoFile) {
            alert('Please select an image file to extract the message from.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let binaryMessage = '';

                for (let i = 0; i < data.length; i++) {
                    if ((i + 1) % 4 !== 0) { // Skip alpha channel
                        binaryMessage += (data[i] & 1).toString();
                    }
                }
                
                const decodedString = binaryToString(binaryMessage);
                const delimiterIndex = decodedString.indexOf('_#_');

                if (delimiterIndex !== -1) {
                    const finalMessage = decodedString.substring(0, delimiterIndex);
                    extractedMessageTextarea.value = finalMessage;
                    extractedOutputSection.style.display = 'block';
                } else {
                    alert('No hidden message found or the message is corrupted.');
                    extractedOutputSection.style.display = 'none';
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(stegoFile);
    });

    // --- COPY TEXT LOGIC ---
    copyTextBtn.addEventListener('click', () => {
        extractedMessageTextarea.select();
        document.execCommand('copy');
        alert('Extracted text copied to clipboard!');
    });

    // --- HELPER FUNCTIONS ---
    function stringToBinary(str) {
        return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    }

    function binaryToString(binary) {
        let str = '';
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substr(i, 8);
            if (byte.length === 8) {
                str += String.fromCharCode(parseInt(byte, 2));
            }
        }
        return str;
    }

})();
