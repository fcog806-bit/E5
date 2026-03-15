import { REGEX_EMAIL, REGEX_NAME, REGEX_TELEFONO_CL } from "../utils/constants.js"
import { Validator } from "../utils/validador.js"

export class Dueño {
    #id
    #nombre
    #apellido
    #telefono
    #email
    #relacion 

    constructor(nombre, apellido, telefono, email, relacion = 'Dueño') {
        this.#id = crypto.randomUUID() 
        this.#nombre = Validator.nombre(nombre, REGEX_NAME, 'Nombre del dueño inválido')
        this.#apellido = Validator.nombre(apellido, REGEX_NAME, 'Apellido del dueño inválido')
        this.#telefono = Validator.telefono(telefono, REGEX_TELEFONO_CL)
        this.#email = Validator.email(email, REGEX_EMAIL)
        this.#relacion = relacion
    }

    // Getters
    get id() {
        return this.#id
    }

    get nombre() {
        return this.#nombre
    }

    get apellido() {
        return this.#apellido
    }

    get nombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`
    }

    get telefono() {
        return this.#telefono
    }

    get email() {
        return this.#email
    }

    get relacion() {
        return this.#relacion
    }

    // Setters
    setNombre(nuevoNombre) {
        this.#nombre = Validator.nombre(nuevoNombre, REGEX_NAME, 'Nombre del dueño inválido')
    }

    setApellido(nuevoApellido) {
        
        this.#apellido = Validator.nombre(nuevoApellido, REGEX_NAME, 'Apellido del dueño inválido')
    }

    setEmail(nuevoEmail) {
        this.#email = Validator.email(nuevoEmail, REGEX_EMAIL, 'Correo electrónico inválido')
    }

    setTelefono(nuevoTelefono) {
        this.#telefono = Validator.telefono(nuevoTelefono, REGEX_TELEFONO_CL)
    }

    actualizarRelacion(nuevaRelacion) {
        this.#relacion = nuevaRelacion
    }

    
    toFullObject() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            apellido: this.#apellido,
            nombreCompleto: this.nombreCompleto,
            email: this.#email,
            telefono: this.#telefono,
            relacion: this.#relacion
        }
    }
}