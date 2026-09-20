* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: #f1f3f6;
    min-height: 100vh;
}

.container {
    width: 100%;
    max-width: 650px;
    margin: auto;
    padding: 25px 15px;
}

.header {
    text-align: center;
    margin-bottom: 25px;
}

.header h1 {
    font-size: 30px;
    margin-bottom: 8px;
}

.header p {
    color: #666;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.08);
}

label {
    display: block;
    margin-top: 18px;
    margin-bottom: 7px;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 13px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
}

input:focus {
    border-color: #111;
}

.upload {
    position: relative;
    border: 2px dashed #aaa;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    overflow: hidden;
}

.upload input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.upload span {
    color: #666;
}

button {
    width: 100%;
    margin-top: 25px;
    padding: 15px;
    border: none;
    border-radius: 9px;
    background: #111;
    color: white;
    font-size: 17px;
    font-weight: bold;
}

button:disabled {
    opacity: 0.5;
}

.note {
    margin-top: 8px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 8px;
    font-size: 12px;
    color: #555;
}

#status {
    margin-top: 18px;
    text-align: center;
    font-weight: bold;
    line-height: 1.5;
    white-space: pre-line;
}
