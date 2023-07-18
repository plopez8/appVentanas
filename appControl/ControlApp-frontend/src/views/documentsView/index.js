import React, { useState, useRef } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { useHistory, useLocation } from 'react-router-dom';
import { createVentana, createImagen } from 'api/api';
import { Container } from './components';

function DocumentsView() {
  console.log("DocumetnsView");
  const location = useLocation();
  const datos = location.state?.data;
  const history = useHistory();
  if(!datos){
    history.push({
    pathname: '/public',
  });
}
  const [arrayDatos, setArrayDatos] = useState({
    header: '',
    XValue: '',
    YValue: '',
    QuantitatValue: '',
    description: '',
    obra_id: datos,
  });
  const [imagenes, setImagenes] = useState([]);
  const fileInputRef = useRef(null);



  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n > 0) {
      n -= 1;
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }
  


  const fileToDataUri = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })



    const handleFileChange = ({ target }) => {
      const { files } = target;
      const imageArray = Array.from(files);
    
      const readerPromises = imageArray.map((file) =>
        fileToDataUri(file)
          .then((dataUri) => {
            const blob = dataURLtoBlob(dataUri);
            return blob;
          })
      );
    
      Promise.all(readerPromises)
        .then((blobs) => {
          setImagenes(blobs);
        })
        .catch((error) => {
          console.error('Error al convertir las imágenes:', error);
        });
    };

  const handleSubmit = () => {
    const newData2 = {
      header: arrayDatos.header,
      XValue: arrayDatos.XValue,
      YValue: arrayDatos.YValue,
      QuantitatValue: arrayDatos.QuantitatValue,
      description: arrayDatos.description,
      obra_id: arrayDatos.obra_id
    }
    if (
      newData2.header !== '' &&
      newData2.XValue !== '' &&
      newData2.YValue !== '' &&
      newData2.QuantitatValue !== '' &&
      newData2.description !== ''
    ){
    handleCreateTasca(newData2);
  }
 else {
  alert('Per favor, completi tots els camps.');
}
  };
  

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleCreateTasca = async (ventana) => {
    let createdVentana;
    
    
    try {
      // Llamada a la API para crear la nueva ventana
      createdVentana = await createVentana(ventana);
    } catch (error) {
      console.error('Error al crear la ventana:', error);
      // Manejar el error de alguna manera (mostrar mensaje de error, etc.)
    }
    const createImagenPromises = imagenes.map((imagen) => {
      const imagenData = {
        ventana_id: createdVentana.results.insertId,
        imagen_data: imagen,
      };
      return createImagen(imagenData);
    });
  
    try {
      await Promise.all(createImagenPromises);
    } catch (error) {
      console.error('Error al crear las imágenes:', error);
      // Manejar el error de alguna manera (mostrar mensaje de error, etc.)
    }
    
    history.push({
      pathname: '/ventanas',
      state: datos,
    });
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container>
            <div className="upload">
              <div className="wrapperp">
                <div className="file-upload">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <BsCloudUpload onClick={handleFileInputClick} />
                </div>
              </div>
              <div style={{ display: 'grid' }}>
                <input
                  type="button"
                  id="selected"
                  value={
                    imagenes.length > 0
                    ? `${imagenes.length} arxius seleccionats`
                    : 'Seleccionar arxius'
                }
                  onClick={handleFileInputClick}
                />
                <text>Puja els teus arxius aquí</text>
              </div>
            </div>
            <div className="popup-content">
              <p>Títol</p>
              <input
                type="text"
                name="title"
                placeholder="Títol"
                value={arrayDatos.header}
                onChange={(event) =>
                  setArrayDatos((prevInfo) => ({ ...prevInfo, header: event.target.value }))
                }
              />
              <p>Descripció</p>
              <textarea
                name="description"
                placeholder="Descripció"
                value={arrayDatos.description}
                onChange={(event) =>
                  setArrayDatos((prevInfo) => ({ ...prevInfo, description: event.target.value }))
                }
              />
              <p>Amplada</p>
              <input
                type="text"
                name="x"
                placeholder="Amplada"
                value={arrayDatos.XValue}
                onChange={(event) =>
                  setArrayDatos((prevInfo) => ({ ...prevInfo, XValue: event.target.value }))
                }
              />
              <p>Altura</p>
              <input
                type="text"
                name="y"
                placeholder="Altura"
                value={arrayDatos.YValue}
                onChange={(event) =>
                  setArrayDatos((prevInfo) => ({ ...prevInfo, YValue: event.target.value }))
                }
              />
              <p>Quantitat</p>
              <input
                type="text"
                name="quantitat"
                placeholder="Quantitat"
                value={arrayDatos.QuantitatValue}
                onChange={(event) =>
                  setArrayDatos((prevInfo) => ({ ...prevInfo, QuantitatValue: event.target.value }))
                }
              />
              <button className="btn-up" type="submit" onClick={handleSubmit}>
                Pujar
              </button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default DocumentsView;