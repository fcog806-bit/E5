import { Dueño } from "../models/Dueno.js"
import { Mascota } from "../models/Mascota.js"
import { Render } from "../render/Render.js"

export class AppManager {

    static agregarMascota(veterinarioActual) {
       
        const inputNombreMascota = document.querySelector('#mascotaNombre')
        const inputEspecieMascota = document.querySelector('#mascotaEspecie')
        const inputNacimientoMascota = document.querySelector('#mascotaFechaNacimiento')
        const inputDiagnostico = document.querySelector('#mascotaSintomas')
        
        const inputNombreDueño   = document.querySelector('#dueñoNombre')
        const inputApellidoDueño = document.querySelector('#dueñoApellido')
        const inputEmailDueño = document.querySelector('#dueñoEmail')
        const inputTelefonoDueño = document.querySelector('#dueñoTelefono')
        const inputRelacion = document.querySelector('#dueñoRelacion')

        const mascota = new Mascota(
            inputNombreMascota.value,
            inputEspecieMascota.value,
            inputNacimientoMascota.value,
            inputDiagnostico.value
        )

        const dueño = new Dueño(
            inputNombreDueño.value,
            inputApellidoDueño.value,
            inputTelefonoDueño.value,
            inputEmailDueño.value,
            inputRelacion.value
        )

        mascota.agregarDueño(dueño)
        veterinarioActual.agregarMascota(mascota)

        Render.mostrarMascotas(veterinarioActual.mascotas)

        document.querySelector('#addMascotaForm').reset()

        const modalElemento = document.querySelector('#addMascotaModal')
        const modal = bootstrap.Modal.getInstance(modalElemento) || new bootstrap.Modal(modalElemento)
        modal.hide()
    }

    static buscarMascota(veterinarioActual, criterio) {
        if(!veterinarioActual) return

        const mascotas = veterinarioActual.buscarMascota(criterio)
        Render.mostrarMascotas(mascotas)
    }

    static editarDiagnostico(veterinarioActual, mascotaId, nuevoDiagnostico) {
        if (!veterinarioActual) {
            alert('Debes iniciar sesión para realizar esta acción');
            return false;
        }

        const mascota = veterinarioActual.mascotas.find(m => m.id === mascotaId);
        
        if (!mascota) {
            alert('Mascota no encontrada');
            return false;
        }

        mascota.actualizarDiagnostico(nuevoDiagnostico);
        Render.mostrarMascotas(veterinarioActual.mascotas);
        
        return true;
    }
}