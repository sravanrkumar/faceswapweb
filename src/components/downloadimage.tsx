import { useState } from 'react';

const DownloadImageComponent = ({ imageData }:any) => {
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        const blob = new Blob([imageData], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloaded(true);
    };

    return (
        <div>
            {!downloaded ? (
                <button onClick={handleDownload}>Download Image</button>
            ) : (
                <p>Image downloaded!</p>
            )}
        </div>
    );
};

export default DownloadImageComponent;
