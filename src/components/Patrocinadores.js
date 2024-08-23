import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Image } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Patrocinadores = () => {
  const { t } = useTranslation();
  const [patrocinadores, setPatrocinadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLanguagePrefix = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2})\//);
    return match ? match[1] : 'en';
  };

  useEffect(() => {
    const languagePrefix = getLanguagePrefix();
    const apiUrl = `${process.env.REACT_APP_API_URL}/${languagePrefix}/api/sponsors/`;

    axios.get(apiUrl)
      .then(response => {
        setPatrocinadores(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(t('sponsors.errorFetchingSponsors'), error);
        setError(t('sponsors.errorLoadingSponsorsList'));
        setLoading(false);
      });
  }, [t]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">{t('sponsors.loading')}</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  if (!patrocinadores || patrocinadores.length === 0) {
    return <p className="text-center">{t('sponsors.noSponsorsFound')}</p>;
  }

  return (
    <div>
      <Container className="py-5">
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem', color: '#FFD700', textAlign: 'center', marginBottom: '40px' }}>
          {t('sponsors.title')}
        </h1>
        <p style={{ fontWeight: '500', fontSize: '1.5rem', color: '#555', textAlign: 'center', marginBottom: '40px' }}>
          {t('sponsors.subtitle')}
        </p>
        <Row>
          {patrocinadores.map(patrocinador => (
            <Col md={6} className="mb-4" key={patrocinador.id}>
              <Row>
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <Image src={patrocinador.logo_url} alt={patrocinador.name} fluid style={{ maxHeight: '200px' }} /> {/* Corrigido para usar logo_url */}
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                  <h5 style={{ fontWeight: 'bold', color: '#333' }}>
                    {patrocinador.name || t('sponsors.nameUnavailable')}
                  </h5>
                  <p style={{ margin: '0.5rem 0', color: '#555' }}>
                    {patrocinador.description || t('sponsors.descriptionUnavailable')}
                  </p>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Patrocinadores;
