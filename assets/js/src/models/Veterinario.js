import { REGEX_NAME } from "../utils/constants.js"
import { Validator } from "../utils/validador.js"
import { Mascota } from "./Mascota.js"

export class Veterinario {
    #id
    #nombre
    #apellido
    #usuario
    #password
    #mascotas = []

    constructor(nombre, apellido, password) {
        this.#id = crypto.randomUUID()
        this.#nombre = Validator.nombre(nombre, REGEX_NAME, 'Campo nombre inválido')
        this.#apellido = Validator.nombre(apellido, REGEX_NAME, 'Campo apellido inválido')
        this.#password = password 
        this.#usuario = this.#generarUsuario()
    }

    #generarUsuario() {
        const inicialNombre = this.#nombre.charAt(0).toLowerCase();
        const inicialApellido = this.#apellido.charAt(0).toLowerCase();
        
        return `vet_${inicialNombre}${inicialApellido}`;
    }

    get id() {
        return this.#id
    }

    get nombreCompleto() {
        return `Dr/a. ${this.#nombre} ${this.#apellido}`
    }

    get nombre() {
        return this.#nombre
    }

    get apellido() {
        return this.#apellido
    }

    get password() {
        return this.#password
    }

    get mascotas() {
        return [...this.#mascotas]
    }

    get usuario() {
        return this.#usuario
    }

    setNombre(newNombre) {
        this.#nombre = Validator.nombre(newNombre, REGEX_NAME, 'Nombre de veterinario inválido')
    }

    setApellido(newApellido) {
        this.#apellido = Validator.nombre(newApellido, REGEX_NAME, 'Apellido de veterinario inválido')
    }

    setPassword(newPassword) {
        this.#password = newPassword
    }

    agregarMascota(nuevaMascota) {
        if (!(nuevaMascota instanceof Mascota)) {
            throw new Error('Solo se pueden agregar instancias de la clase Mascota')
        }

        const existeMascota = this.#mascotas.some(m => m.id === nuevaMascota.id)
        if (existeMascota) {
            throw new Error('Esta mascota ya está registrada con este veterinario')
        }

        this.#mascotas.push(nuevaMascota)
    }

    buscarMascota(criterio) {
        if (!criterio || criterio.trim() === '') {
            return this.mascotas
        }

        const busqueda = criterio.toLowerCase()
        return this.#mascotas.filter(mascota => 
            mascota.nombreCompleto.toLowerCase().includes(busqueda)
        )
    }

    cantidadMascotas() {
        return this.#mascotas.length
    }

    verificarCredenciales(usuario, password) {
        return this.usuario === usuario && this.password === password
    }

    toFullObject() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            apellido: this.#apellido,
            password: this.#password,
            usuario: this.#usuario,
            mascotas: this.#mascotas.map(m => m.id)
        }
    }

    getInfo() {
        return {
            id: this.#id,
            nombreCompleto: this.nombreCompleto,
            usuario: this.#usuario,
            cantidadMascotas: this.cantidadMascotas()
        }
    }
}