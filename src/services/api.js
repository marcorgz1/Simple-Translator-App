const translationApi = async (text, sourceLanguage, targetLanguage) => {
    try {        
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            text
            )}&langpair=${sourceLanguage}|${targetLanguage}`
        );
        
        const data = await response.json();
        
        const translatedText = data.responseData.translatedText;
        
        return translatedText;
    } catch (err) {
        throw new Error('Error al traducir el texto introducido: ', err);
    };
};

export default translationApi;
