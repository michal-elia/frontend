import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './Fotos.scss';

const Fotos = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('foto', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:3001/anmeldungen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedFiles([...uploadedFiles, response.data]);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>Hier kommen die Fotos hin!</h1>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>

      {uploadedFiles.map((file) => (
        <div key={file.id}>
          <img src={`data:image/png;base64,${file.foto.toString('base64')}`} alt="Uploaded" />
        </div>
      ))}
    </div>
  );
};

export default Fotos;
