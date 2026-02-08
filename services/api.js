const translationApi = async (text, sourceLanguage, targetLanguage) => {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
        )}&langpair=${sourceLanguage}|${targetLanguage}`
    );

    const data = await response.json();

    if (data.responseStatus !== 200) {
        throw new Error('Translation failed');
    };

    const translatedText = data.responseData.translatedText;

    return translatedText;
}

export default translationApi;
