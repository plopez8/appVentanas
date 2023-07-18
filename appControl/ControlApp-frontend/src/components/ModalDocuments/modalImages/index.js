/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { getAllImagenesByVentana } from 'api/api';


const Title = styled.h1`
    font-weight: bold;
    color: #3472f7;
    font-size: 2rem;
`;

const NoImagesText = styled.p`
    font-size: 1.5rem;
    color: #777;
    text-align: center;
`;

function ModalImages({ show, onClose, ventanaId }) {
  const [imagenes, setImagenes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const fetchedImagenes = await getAllImagenesByVentana(ventanaId);
        setImagenes(fetchedImagenes);
      } catch (error) {
        console.error('Error fetching imagenes:', error);
      }
    };

    fetchImagenes();
  }, [ventanaId]);

  useEffect(() => {
    if (imagenes.length > 0) {
      const urls = [];
      const readerPromises = imagenes.map((imagen) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageData = reader.result;
            const imageUrl = `${imageData}`;
            urls.push(imageUrl);
            resolve();
          };
          reader.readAsDataURL(new Blob([new Uint8Array(imagen.imagen_data.data)], { type: 'image/jpeg' }));
        })
      );

      Promise.all(readerPromises)
        .then(() => {
          setImageUrls(urls);
        })
        .catch((error) => {
          console.error('Error reading images:', error);
        });
    }
  }, [imagenes]);


  return (
    <Modal animation={false} show={show} backdrop size="xl" onHide={onClose}>
      <Modal.Body>
        <button aria-hidden className="close" type="button" onClick={onClose}>
          <AiOutlineClose style={{ color: '#3472f7' }} />
        </button>
        <Title>Imatges</Title>

        {imageUrls.length > 0 ? (
          <Carousel>
            {imageUrls.map((imageUrl, index) => (
              <Carousel.Item key={imageUrl}>
                <img src={imageUrl} alt={`Ventana ${index + 1}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <NoImagesText>No hi ha imatges</NoImagesText>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalImages;