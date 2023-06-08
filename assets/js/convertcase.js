function convertToInvertCase(text) {
    let invertedText = '';
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char === char.toUpperCase()) {
        invertedText += char.toLowerCase();
      } else {
        invertedText += char.toUpperCase();
      }
    }
  
    return invertedText;
  }

  function convertToRandomCase(text) {
    let randomizedText = '';
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      const random = Math.random();
  
      if (random < 0.5) {
        randomizedText += char.toLowerCase();
      } else {
        randomizedText += char.toUpperCase();
      }
    }
  
    return randomizedText;
  }

  function convertToProperCase(text) {
    const lines = text.split('\n');
    const properLines = lines.map((line) => {
      const words = line.split(' ');
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return capitalizedWords.join(' ');
    });
    return properLines.join('\n');
  }

  function convertToSentenceCase(text) {
    const sentences = text.split('. ');
    const sentenceCased = sentences.map((sentence) => {
      const trimmedSentence = sentence.trim();
      const firstChar = trimmedSentence.charAt(0).toUpperCase();
      let restOfSentence = trimmedSentence.slice(1).toLowerCase();
      restOfSentence = restOfSentence.replace(/\bi\b/g, 'I');
      return firstChar + restOfSentence;
    });
    return sentenceCased.join('. ');
  }
