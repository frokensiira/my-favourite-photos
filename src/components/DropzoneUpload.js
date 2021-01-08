import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useUploadFile from '../hooks/useUploadFile';

const DropzoneUpload = ({albumTitle}) => {
    const [uploadFile, setUploadFile] = useState();
    const { error } = useUploadFile(albumTitle, uploadFile);
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 0){
            return;
        }
        setUploadFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop
    });



    return (  
        <div {...getRootProps()} id="dropzone-wrapper" className={`px-4 py-4 my-3 ${isDragAccept ? `drag-accept` : ``} ${isDragReject ? `drag-reject` : ``}`}>
            <input {...getInputProps()} />
            {
                isDragActive 
                    ? isDragAccept 
                        ? (<p>Just drop it already</p>) 
                        : (<p>Sorry, not the right file type</p>)
                    : (<p>Give me some filez</p>) 
            }

            {
                acceptedFiles && (
                    <div className="accepted-files mt-2">
                        <ul className="list-unstyled">
                            {acceptedFiles.map(file => (
                                <li key={file.name}>
                                    {/* <img src={URL.createObjectURL(file)} className="img-fluid w-25" alt="preview"/> */}
                                    {file.name}
                                </li>
                            ))}
                        </ul>   
                    </div>
                )
            }
            
        </div>
    );
}
 
export default DropzoneUpload;