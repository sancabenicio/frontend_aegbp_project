import React, { useState, useEffect } from 'react';
import Galeria from './Galeria';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Importando o hook useTranslation

const GaleriaFotos = () => {
  const { t } = useTranslation(); // Inicializando o hook useTranslation
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLanguagePrefix = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2})\//);
    return match ? match[1] : 'en';
  };

  useEffect(() => {
    const languagePrefix = getLanguagePrefix();
    const apiUrl = `${process.env.REACT_APP_API_URL}/${languagePrefix}/api/photos/`;

    axios.get(apiUrl)
      .then(response => {
        setFotos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(t('galleryFotos.errorFetchingPhotos'), error); // Usando tradução para mensagens de erro
        setError(t('galleryFotos.errorLoadingGallery')); // Usando tradução para mensagens de erro
        setLoading(false);
      });
  }, [t]);

  if (loading) {
    return <p>{t('galleryFotos.loading')}</p>; // Usando tradução para o texto de carregamento
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="text-center my-5">
        <h1 style={{ fontWeight: 'bold', color: '#006400' }}>{t('galleryFotos.title')}</h1> {/* Usando tradução para "Galeria de Fotos" */}
      </div>
      <Galeria items={fotos} type="photo" />
    </div>
  );
};

export default GaleriaFotos;
