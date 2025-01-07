import React, { useState } from 'react';

    function App() {
      const [photo, setPhoto] = useState(null);
      const [location, setLocation] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
      };

      const getLocation = () => {
        if (!navigator.geolocation) {
          setError('Geolocalización no soportada por tu navegador');
          return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            setLoading(false);
          },
          (error) => {
            setError('No se pudo obtener tu ubicación');
            setLoading(false);
          }
        );
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!photo || !location) {
          setError('Por favor sube una foto y obtén tu ubicación');
          return;
        }
        
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('location', JSON.stringify(location));
        
        // Aquí enviarías el formData a tu backend
        console.log('Enviando:', {
          photo: photo.name,
          location
        });
      };

      return (
        <div className="form-container">
          <h1>Registro de Conductor</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <i className="icon">📷</i> Subir Foto:
              </label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>

            <div className="form-group">
              <label>
                <i className="icon">📍</i> Ubicación:
              </label>
              <button 
                type="button" 
                onClick={getLocation}
                disabled={loading}
              >
                {loading ? 'Obteniendo ubicación...' : 'Obtener Ubicación Actual'}
              </button>
              {location && (
                <p>
                  <i className="icon">🌍</i> Ubicación: {location.latitude}, {location.longitude}
                </p>
              )}
            </div>

            {error && <p style={{ color: 'red' }}><i className="icon">⚠️</i> {error}</p>}

            <button type="submit" disabled={!photo || !location}>
              <i className="icon">✅</i> Enviar Registro
            </button>
          </form>
        </div>
      );
    }

    export default App;
