# Secure Data Processing System

Welcome to the Secure Data Processing System! This is a web-based toolkit that runs entirely in your browser, allowing you to perform common cryptographic and data manipulation tasks securely. Because all operations happen on your computer, your data is never uploaded to a server, ensuring maximum privacy.

## 🚀 Getting Started

To use the application, simply open the **`index.html`** file in your web browser.

You can navigate between the different tools using the sidebar on the left. The sidebar can be collapsed or expanded using the arrow button at the bottom.

---

## 📖 User Guide: How to Use Each Page

Here is a step-by-step guide for each function of the application.

### 🗜️ 1. Data Compression

This tool allows you to compress one or more files into a single `.zip` archive.

1.  **Navigate:** Click on **Compression** in the sidebar.
2.  **Select Files:** Click the "Select Files" button to open your file explorer. You can select multiple files at once.
3.  **Review Selection:** The names of the files you selected will appear on the page.
4.  **Compress & Download:** Click the "Compress & Download ZIP" button. Your browser will automatically download a `.zip` file containing your selected files.

[Image of the Data Compression page interface]

### 🔒 2. Encryption

This tool encrypts text or the content of a file using AES-256, a strong encryption standard.

1.  **Navigate:** Click on **Encryption** in the sidebar.
2.  **Add Your Data:**
    * **Option A (Text):** Type or paste the text you want to encrypt directly into the text box.
    * **Option B (File):** Click the "Select File" button and choose a file. The content of the file will be loaded into the text box.
3.  **Set Encryption Key:** In the "Encryption Key" field, enter a strong, memorable password. **You will need this exact password to decrypt the data.**
4.  **Encrypt & Download:** Click the "Encrypt & Download ZIP" button. A `.zip` file will be downloaded, containing your encrypted data in a `.txt` file.

### 🔑 3. Decryption

This tool decrypts text that was previously encrypted using the Encryption tool.

1.  **Navigate:** Click on **Decryption** in the sidebar.
2.  **Enter Encrypted Text:** Paste the encrypted text (from the `.txt` file you downloaded earlier) into the text box.
3.  **Enter Decryption Key:** In the "Decryption Key" field, enter the **exact same password** you used to encrypt the data.
4.  **Decrypt:** Click the "Decrypt Text" button.
5.  **View Result:** The original, decrypted text will appear in a new text box below.

### #️⃣ 4. Hashing

This tool generates a unique, fixed-size "fingerprint" (hash) for any piece of text. This is useful for verifying data integrity.

1.  **Navigate:** Click on **Hashing** in the sidebar.
2.  **Enter Text:** Type or paste the text you want to hash into the text box.
3.  **Choose Algorithm:** Select a hashing algorithm (SHA-256 is recommended for most uses).
4.  **Generate Hash:** Click the "Generate Hash" button.
5.  **Copy Result:** The generated hash will appear below. Click the "Copy to Clipboard" button to copy it.

### 👁️ 5. Steganography (Placeholder)

This page is a placeholder for a future feature that will allow you to hide data within image files. The user interface is present, but the functionality is not yet implemented.

---

## ⚠️ Important Notes

* **Client-Side Security:** All processing is done on your machine. Your files and data are never sent over the internet.
* **Keep Your Keys Safe:** If you forget the password you used for encryption, there is no way to recover the data.
* **Browser Compatibility:** This application works best on modern web browsers like Chrome, Firefox, and Edge.
