export class Normalizer {
    /**
     
      @param {string} nombre 
     */
    static nombre(nombre) {
        return nombre
            .toLowerCase()
            .trim()
            .split(' ')
            .filter(palabra => palabra !== "") 
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }

    static lowerCase(texto) {
        return texto.toLowerCase().trim();
    }
}