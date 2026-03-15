import { Dueño } from './src/models/Dueno.js';
import { Veterinario } from './src/models/Veterinario.js'
import { Mascota } from './src/models/Mascota.js';
import { AppManager } from './src/utils/AppManager.js';
import { Auth } from './src/utils/Auth.js';

let veterinarioActual = null

const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#loginForm")
const formularioPaciente = document.querySelector("#addPatientForm");
const buscadorPaciente = document.querySelector("#searchPatient");
const logoutBtn = document.querySelector("#logoutBtn");
const editarDiagnosticoForm = document.querySelector("#editarDiagnosticoForm");

console.log(window.bootstrap)

const veterinario = new Veterinario('Juan', 'Soto', '123456')

const mascota1 = new Mascota('Coquito', 'Perro Beagle', '2023-01-25', 'Control de vacunas')
const mascota2 = new Mascota('Sonic', 'Gato Persa', '2019-11-23', 'Sobrepeso')

const dueño1 = new Dueño('Manuel', 'Santos', '+56912345678', 'manuel@gmail.com', 'Dueño')
const dueño2 = new Dueño('Elvita', 'Zurita', '+56912345678', 'elva@gmail.com', 'Cuidadora')

mascota1.agregarDueño(dueño1)
mascota2.agregarDueño(dueño2)

veterinario.agregarMascota(mascota1)
veterinario.agregarMascota(mascota2)

console.log('Usuario generado:', veterinario.usuario)
console.log('Contraseña:', '123456789')

Auth.registrarVeterinario(veterinario)

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    veterinarioActual = Auth.procesarLogin(usuario.value, password.value)
})

if (formularioPaciente) {
    formularioPaciente.addEventListener('submit', (event) => {
        event.preventDefault()
        if (veterinarioActual) {
            AppManager.agregarMascota(veterinarioActual)
        } else {
            alert("Debes iniciar sesión para realizar esta acción.")
        }
    })
}

if (buscadorPaciente) {
    buscadorPaciente.addEventListener('input', () => {
        const criterio = buscadorPaciente.value
        if (veterinarioActual) {
            AppManager.buscarMascota(veterinarioActual, criterio)
        }
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        Auth.logout()
        veterinarioActual = null
    })
}

document.addEventListener('click', (event) => {
    const editarBtn = event.target.closest('.editar-diagnostico-btn');
    if (editarBtn) {
        const mascotaId = editarBtn.dataset.mascotaId;
        
        if (!veterinarioActual) {
            alert('Debes iniciar sesión para editar');
            return;
        }
        
        const mascota = veterinarioActual.mascotas.find(m => m.id === mascotaId);
        
        if (mascota) {
            const editPacienteId = document.querySelector('#editPacienteId');
            const editPacienteNombre = document.querySelector('#editPacienteNombre');
            const editDiagnostico = document.querySelector('#editDiagnostico');
            
            if (!editPacienteId || !editPacienteNombre || !editDiagnostico) {
                console.error('No se encontraron los elementos del modal de edición');
                alert('Error: No se encontró el formulario de edición');
                return;
            }
            
            editPacienteId.value = mascota.id;
            editPacienteNombre.value = mascota.nombreCompleto;
            editDiagnostico.value = mascota.diagnostico;
            
            const modalElement = document.querySelector('#editarDiagnosticoModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        }
    }
});

if (editarDiagnosticoForm) {
    editarDiagnosticoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const pacienteId = document.querySelector('#editPacienteId')?.value;
        const nuevoDiagnostico = document.querySelector('#editDiagnostico')?.value;
        
        if (veterinarioActual && pacienteId && nuevoDiagnostico) {
            const resultado = AppManager.editarDiagnostico(veterinarioActual, pacienteId, nuevoDiagnostico);
            
            if (resultado) {
                const modalElement = document.querySelector('#editarDiagnosticoModal');
                if (modalElement) {
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();
                }
                alert('Diagnóstico actualizado correctamente');
            }
        }
    });
}