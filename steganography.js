document.addEventListener('DOMContentLoaded', () => {
    const embedBtn = document.getElementById('embed-btn');
    const coverFileInput = document.getElementById('cover-file');
    const secretMessageInput = document.getElementById('secret-message');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const outputSection = document.getElementById('output-section');
    const downloadLink = document.getElementById('download-link');

    embedBtn.addEventListener('click', () => {
        const coverFile = coverFileInput.files[0];
        const message = secretMessageInput.value;

        // 1. Validate inputs
        if (!coverFile || !message) {
            alert('Please select an image file and enter a secret message.');
            return;
        }

        const reader = new FileReader();

        // 2. Read the image file
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // 3. Draw image on canvas to access pixel data
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data; // This is the array of [R,G,B,A, R,G,B,A, ...]

                // 4. Convert message to binary and add a delimiter
                const delimiter = "_#_"; // A simple delimiter to know where the message ends
                const messageInBinary = stringToBinary(message + delimiter);
                
                // Check if message is too long for the image
                if (messageInBinary.length > data.length * 3 / 4) { // We use 3 of 4 channels (RGB)
                    alert('The message is too long to be hidden in this image.');
                    return;
                }

                // 5. Embed the binary message into the image data
                let dataIndex = 0;
                for (let i = 0; i < messageInBinary.length; i++) {
                    // Find the next available R, G, or B value (skip alpha channels)
                    while ((dataIndex + 1) % 4 === 0) {
                        dataIndex++;
                    }
                    
                    // Get the current color component value
                    let pixelValue = data[dataIndex];
                    
                    // Modify the Least Significant Bit (LSB)
                    if (messageInBinary[i] === '1') {
                        // Make LSB 1 (which makes the number odd)
                        data[dataIndex] = pixelValue | 1; 
                    } else {
                        // Make LSB 0 (which makes the number even)
                        data[dataIndex] = pixelValue & 254; // 254 in binary is 11111110
                    }
                    dataIndex++;
                }

                // 6. Put the modified data back onto the canvas
                ctx.putImageData(imageData, 0, 0);

                // 7. Generate the new image and show the download link
                const newImageUrl = canvas.toDataURL('image/png'); // Use PNG to avoid losing data
                downloadLink.href = newImageUrl;
                outputSection.style.display = 'block';
                alert('Success! Your message has been embedded. Click "Download Image" to save it.');

            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(coverFile);
    });

    /**
     * Converts a string to its binary representation.
     * @param {string} str The input string.
     * @returns {string} The binary string.
     */
    function stringToBinary(str) {
        let binaryString = '';
        for (let i = 0; i < str.length; i++) {
            //
