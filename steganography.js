(function() {
    const embedBtn = document.getElementById('embed-btn');
    const coverFileInput = document.getElementById('cover-file');
    const secretMessageInput = document.getElementById('secret-message');
    const canvas = document.getElementById('canvas');
    const outputSection = document.getElementById('output-section');
    const downloadLink = document.getElementById('download-link');

    // This check is crucial. If the elements aren't found, it means we are not on the steganography page, so the script will stop.
    if (!embedBtn || !coverFileInput || !secretMessageInput || !canvas || !outputSection || !downloadLink) {
        return; 
    }

    const ctx = canvas.getContext('2d');

    embedBtn.addEventListener('click', () => {
        const coverFile = coverFileInput.files[0];
        const message = secretMessageInput.value;

        if (!coverFile || !message) {
            alert('Please select an image file and enter a secret message.');
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
                    alert('The message is too long to be hidden in this image.');
                    return;
                }

                let dataIndex = 0;
                for (let i = 0; i < messageInBinary.length; i++) {
                    while ((dataIndex + 1) % 4 === 0) {
                        dataIndex++;
                    }
                    
                    if (messageInBinary[i] === '1') {
                        data[dataIndex] = data[dataIndex] | 1;
                    } else {
                        data[dataIndex] = data[dataIndex] & 254;
                    }
                    dataIndex++;
                }

                ctx.putImageData(imageData, 0, 0);

                const newImageUrl = canvas.toDataURL('image/png');
                downloadLink.href = newImageUrl;
                outputSection.style.display = 'block';
                alert('Success! Your message has been embedded. Click "Download Image" to save it.');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(coverFile);
    });

    function stringToBinary(str) {
        let binaryString = '';
        for (let i = 0; i < str.length; i++) {
            let binaryChar = str.charCodeAt(i).toString(2).padStart(8, '0');
            binaryString += binaryChar;
        }
        return binaryString;
    }
})();
