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
    #estado = 'tratamiento'

    constructor(nombre, especie, fechaNacimiento, diagnostico) {
        this.#id = crypto.randomUUID()
        this.#nombre = Validator.nombre(nombre, REGEX_NAME, 'Nombre mascota no válido')
        this.#especie = Validator.nombre(especie, REGEX_GENERAL, 'Especie/Raza no válida')
        this.#fechaNacimiento = fechaNacimiento
        this.#diagnostico = diagnostico
        this.#isAlta = false
        this.#estado = 'tratamiento'
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
    
    get estado() {
        return this.#estado
    }
    
    get estadoTexto() {
        const estados = {
            'tratamiento': 'En Tratamiento',
            'recuperacion': 'En Recuperación',
            'observacion': 'En Observación',
            'critico': 'Estado Crítico',
            'alta': 'Alta Médica'
        }
        return estados[this.#estado] || 'En Tratamiento'
    }

    get badgeColor() {
        const colores = {
            'tratamiento': 'bg-warning text-dark',
            'recuperacion': 'bg-info text-white',
            'observacion': 'bg-primary text-white',
            'critico': 'bg-danger text-white',
            'alta': 'bg-success text-white'
        }
        return colores[this.#estado] || 'bg-warning text-dark'
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

    cambiarEstado(nuevoEstado) {
        const estadosValidos = ['tratamiento', 'recuperacion', 'observacion', 'critico', 'alta']
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error('Estado no válido')
        }
        this.#estado = nuevoEstado
        this.#isAlta = (nuevoEstado === 'alta')
        return this.#estado
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