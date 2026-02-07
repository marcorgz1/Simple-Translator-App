import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
  // Estado para manejar el texto introducido por el usuario
  const [text, setText] = useState('');
  // Estado para manejar el texto traducido escrito por el usuario
  const [translatedText, setTranslatedText] = useState('');

  // Estado para manejar el idioma de origen
  const [sourceLanguage, setSourceLanguage] = useState('es');
  // Estado para manejar el idioma de destino
  const [targetLanguage, setTargetLanguage] = useState('en');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const availableLanguages = [
    { code: 'en', name: 'Inglés' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Francés' },
    { code: 'de', name: 'Alemán' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Portugués' },
    { code: 'ru', name: 'Ruso' },
    { code: 'ja', name: 'Japonés' },
    { code: 'ko', name: 'Koreano' },
    { code: 'zh', name: 'Chino' },
    { code: 'ar', name: 'Árabe' },
    { code: 'nl', name: 'Holandés' },
    { code: 'pl', name: 'Polaco' },
    { code: 'tr', name: 'Turco' }
  ]

  useEffect(() => {
    // Comprobar que existe texto para traducir evitando hacer llamadas innecesarias a la API
    // Si no existe texto, no hacer nada
    if (!text.trim('')) {
      setTranslatedText('');
      return;
    };

    // Agregar un temporizador a la función encargada de traducir el texto para evitar que se traduzca instantáneamente cada letra que se traduce
    /*
    Ejemplo:
    El usuario escribe el texto "hola"
    Si no se crea un temporizador la app llamará a la API cada vez que el usuario escriba una letra en el input
    En cambio, utilizando el temporizador sólo se hará una llamada a la API con el texto completo que ha escrito el usuario evitando hacer 
    llamadas innecesarias a la API que puede generar gastos innecesarios
    */
    const timeoutId = setTimeout(() => {
      handleSubmit();
    }, 500);

    // Función para limpiar el temporizador una vez el texto ya ha sido traducido
    return () => clearTimeout(timeoutId);
    // Ejecutar el useEffect cada vez que cambie el valor de alguno de los tres estados
  }, [text, sourceLanguage, targetLanguage])

  const handleSubmit = async () => {
    // Comprobar que existe texto para traducir evitando hacer llamadas innecesarias a la API
    // Si no existe texto, no hacer nada
    if (!text.trim()) return;
    
    // Agregar momento de carga mientras se realiza la llamada correspondiente a la API
    setIsLoading(true);
    setError('');

    try {
      // Hacer llamada a la API de MyMemory Translation para traducir el texto correspondiente
      // Se pasan como parámetros los idiomas de origen y destino
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${sourceLanguage}|${targetLanguage}`
      );

      const data = await response.json();
      console.log('Datos obtenidos: ', data);

      // Si la llamada a la API se realiza correctamente, almacenar el valor 
      // de la propiedad "translatedText" del objeto de la respuesta de la API
      // en el estado "translatedText"

      // Por otro lado, si la llamada NO se realiza correctamente mostrar mensaje de error
      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setError('La traducción del texto ha fallado. Por favor, inténtelo de nuevo.');
      }

      console.log('Texto sin traducir: ', text);
      console.log('Texto traducido: ', translatedText);
    } catch (err) {
      setError('Error al conectar con el servidor.', err);      
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <h1 className='text-4xl text-center mt-8 mb-28'>Simple translator app</h1>
      <form onSubmit={handleSubmit}>
        <section className='flex gap-48'>
          <div className="flex flex-col gap-8 border border-gray-400 px-6 py-4 rounded-md">
            <p className='text-sm text-gray-400'>De</p>
            <select 
              name="origin_language_selector" 
              id="origin_language_selector" 
              value={sourceLanguage}
              // Almacenar en el estado "sourceLanguage" el idioma seleccionado por el usuario
              onChange={(ev) => setSourceLanguage(ev.target.value)}>
              {
                availableLanguages.map((availableLanguage) => (
                  <option key={availableLanguage.code} value={availableLanguage.code}>
                    {availableLanguage.name}
                  </option>
                ))
              }
            </select>
            <textarea
            className='text-sm font-light'
              name="to_translate_text" 
              id="to_translate_text"
              value={text}
              // Almacenar el texto escrito por el usuario en el estado "text"
              onChange={(ev) => setText(ev.target.value)}
              placeholder='Escribe tu texto...'
              cols="30" 
              rows="10"></textarea>
          </div>
          <div className="flex flex-col gap-6 border border-gray-400 px-8 py-4 rounded-md">
            <p className='text-sm text-gray-400'>A</p>
            <select 
              name="destination_language_selector" 
              id="destination_language_selector"
              // Mostrar en el select el idioma seleccionado por el usuario
              value={targetLanguage}
              // Almacenar en el estado "targetLanguage" el idioma seleccionado por el usuario
              onChange={(ev) => setTargetLanguage(ev.target.value)}>
            {
              availableLanguages.map((availableLanguage) => (
                <option key={availableLanguage.code} value={availableLanguage.code}>
                  {availableLanguage.name}
                </option>
              ))
            }  
              
            </select>
            <div className='text-sm w-full h-40 border border-gray-200 px-12 py-6'>{translatedText}</div>
          </div>
          <p className='text-sm font-semibold text-red-500'>{error}</p>
        </section>
      </form>
    </>
  );
};

export default App;
