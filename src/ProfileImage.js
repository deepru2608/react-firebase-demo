import React, { useRef, useState, useEffect } from 'react';
import { getDownloadUrl, uploadImage } from './firebase/user';
import LinearProgress from '@material-ui/core/LinearProgress';

function ProfileImage({ id }) {
    const fileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false);

    useEffect(() => {
        getDownloadUrl(id).then((url) => {
            !!url && setImageUrl(url);
        });
    }, [id]);

    const fileChange = async (files) => {
        setShowProgressBar(true);
        const ref = await uploadImage(id, files[0], updateProgress);
        const downloadUrl = await ref.getDownloadURL();
        setImageUrl(downloadUrl);
        setShowProgressBar(false);
    }

    const updateProgress = snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
    }

    return (
        <div className="profile-image">
            <img className="img-fluid" src={imageUrl || "/DefaultPhoto.jpg"} alt="profile" />
            <input className="file-input" type="file" accept=".png,.jpg" ref={fileInput}
                onChange={(e) => fileChange(e.target.files)} />
            { showProgressBar ? <LinearProgress variant="determinate" value={uploadProgress} /> : '' }
            <button className="btn btn-sm btn-primary upload-photo-btn" onClick={() => fileInput.current.click()}>
                Upload Photo
            </button>
        </div>
    )
}

export default ProfileImage
