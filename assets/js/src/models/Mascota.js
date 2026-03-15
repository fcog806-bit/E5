import { REGEX_NAME, REGEX_GENERAL } from "../utils/constants.js"
import { Validator } from "../utils/validador.js"
import { Dueño } from "./Dueno.js"

export class Mascota {
    #id
    #nombre
    #especie 
    #diagnostico
    #fechaNacimiento
    #dueño = null 
    #isAlta = false

    constructor(nombre, especie, fechaNacimiento, diagnostico) {
        this.#id = crypto.randomUUID()
        this.#nombre = Validator.nombre(nombre, REGEX_NAME, 'Nombre mascota no válido')
        this.#especie = Validator.nombre(especie, REGEX_GENERAL, 'Especie/Raza no válida')
        this.#fechaNacimiento = fechaNacimiento
        this.#diagnostico = diagnostico
        this.#isAlta = false
    }

    get id() {
        return this.#id
    }

    get nombreCompleto() {
        return `${this.#nombre} (${this.#especie})`
    }

    get nombre() {
        return this.#nombre
    }

    get especie() {
        return this.#especie
    }

    get fechaNacimiento() {
        return this.#fechaNacimiento
    }

    get edad() {
        const hoy = new Date()
        const nacimiento = new Date(this.#fechaNacimiento)
        let edad = hoy.getFullYear() - nacimiento.getFullYear()

        const diferenciaMes = hoy.getMonth() - nacimiento.getMonth()
        if(diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--
        }
        return edad
    }

    get diagnostico() {
        return this.#diagnostico
    }

    get dueño() { 
        return this.#dueño
    }

    get isAlta() {
        return this.#isAlta
    }

    setNombre(newNombre) {
        this.#nombre = Validator.nombre(newNombre, REGEX_NAME, "Nombre mascota no válido")
    }

    setEspecie(newEspecie) {
        this.#especie = Validator.nombre(newEspecie, REGEX_NAME, "Especie no válida")
    }

    setFechaNacimiento(newFechaNacimiento) {
        this.#fechaNacimiento = newFechaNacimiento
    }

    actualizarDiagnostico(nuevoDiagnostico) {
        this.#diagnostico = nuevoDiagnostico
    }

    toggleAlta() { 
        this.#isAlta = !this.#isAlta
        return this.#isAlta
    }

    agregarDueño(dueño) { 
        if(!(dueño instanceof Dueño)) {
            throw new Error('El dueño debe ser una instancia de la clase Dueño')
        }
        this.#dueño = dueño
    }
}