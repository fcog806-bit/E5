import { Componentes } from '../components/cardMascota.js';

export class Render {
    static mostrarDashboard(veterinarioActual) {
        console.log('🎯 Intentando mostrar dashboard para:', veterinarioActual.nombreCompleto);
        
        const loginSection = document.querySelector('#loginSection')
        const dashboardSection = document.querySelector('#dashboardSection')
        const navbar = document.querySelector('#navbar')
        const welcomeText = document.querySelector('#welcomeText')
        const veterinarioInfo = document.querySelector('#medicoInfo')
        
        console.log('Elementos del DOM:');
        console.log('- loginSection:', loginSection ? '✅' : '❌');
        console.log('- dashboardSection:', dashboardSection ? '✅' : '❌');
        console.log('- navbar:', navbar ? '✅' : '❌');
        console.log('- welcomeText:', welcomeText ? '✅' : '❌');
        console.log('- veterinarioInfo:', veterinarioInfo ? '✅' : '❌');

        if (!dashboardSection || !loginSection) {
            console.error('❌ No se encontraron las secciones necesarias');
            return;
        }

        loginSection.style.display = 'none'
        dashboardSection.style.display = 'block'
        
        if (navbar) {
            navbar.style.display = 'block'
        }
        
        if (welcomeText) {
            welcomeText.textContent = `Bienvenido ${veterinarioActual.nombreCompleto}`
        }
        
        if (veterinarioInfo) {
            veterinarioInfo.textContent = `${veterinarioActual.nombreCompleto} - Usuario: ${veterinarioActual.usuario}`
        }
        
        console.log('✅ Dashboard mostrado correctamente');
    }

    static mostrarMascotas(mascotas) {
        console.log('📋 Mostrando mascotas:', mascotas?.length || 0);
        
        const listaMascotas = document.querySelector('#patientList');
        const patientCount = document.querySelector('#patientCount');
        
        if (!listaMascotas) {
            console.error('❌ No se encontró el elemento #patientList');
            return;
        }
        
        if (!mascotas || mascotas.length === 0) {
            listaMascotas.innerHTML = '<div class="alert alert-info">No hay mascotas registradas</div>';
            if (patientCount) patientCount.textContent = '0';
            return;
        }
        
        try {
            const htmlCard = mascotas.map(mascota => {
                if (!mascota) return '';
                return Componentes.crearTarjetaMascota(mascota);
            }).join('');
            
            listaMascotas.innerHTML = htmlCard;
            
            if (patientCount) {
                patientCount.textContent = mascotas.length;
            }
            
            console.log('✅ Mascotas mostradas correctamente');
        } catch (error) {
            console.error('Error al mostrar mascotas:', error);
            listaMascotas.innerHTML = '<div class="alert alert-danger">Error al cargar las mascotas</div>';
        }
    }
}