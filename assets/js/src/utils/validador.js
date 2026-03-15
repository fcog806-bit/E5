import { Normalizer } from "./normalizer.js";

export class Validator {
    static nombre(valor, regex, error) {
        if (!valor || !regex.test(valor.trim())) {
            throw new Error(error || 'Campo inválido');
        }
        return Normalizer.nombre(valor);
    }

    static email(email, regex, error) {
        if(!email || !regex.test(email)) {
            throw new Error(error || 'Correo electrónico inválido');
        }
        return Normalizer.lowerCase(email);
    }

    static telefono(telefono, regex, error) {
        if(!telefono || !regex.test(telefono.trim())) {
            throw new Error(error || 'Teléfono inválido');
        }
        return telefono.trim();
    }
}