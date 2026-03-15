import { Render } from "../render/Render.js"; 

export class Auth { 
    static veterinarios = []
    static veterinarioActual = null

    static procesarLogin(usuario, password) {
        if (!usuario || !password) {
            alert('Por favor ingresa usuario y contraseña');
            return null;
        }
        
        if (Auth.veterinarios.length === 0) {
            alert('No hay veterinarios registrados en el sistema');
            return null;
        }
        
        Auth.veterinarios.forEach((vet, index) => {
            console.log(`Vet ${index + 1}:`, {
                nombre: vet.nombreCompleto,
                usuario: vet.usuario,
                password: vet.password,
                coincideUsuario: vet.usuario === usuario,
                coincidePassword: vet.password === password
            });
        });

        const veterinario = Auth.veterinarios.find(vet => 
            vet.verificarCredenciales(usuario, password)
        );

        if(veterinario) {
            console.log('✅ Login exitoso para:', veterinario.nombreCompleto);
            Auth.veterinarioActual = veterinario;
            alert(`${veterinario.nombreCompleto} ha ingresado con éxito`);
            
            if (typeof Render !== 'undefined') {
                if (typeof Render.mostrarDashboard === 'function') {
                    Render.mostrarDashboard(Auth.veterinarioActual);
                }
                
                if (typeof Render.mostrarMascotas === 'function') {
                    Render.mostrarMascotas(Auth.veterinarioActual.mascotas);
                } else {
                    console.error('Render.mostrarMascotas no es una función');
                    console.log('Métodos disponibles en Render:', Object.keys(Render));
                }
            } else {
                console.error('❌ Render no está definido');
            }
            
            return Auth.veterinarioActual;
        } else {
            console.log('❌ Login fallido');
            
            const credenciales = Auth.veterinarios.map(v => 
                `Usuario: ${v.usuario} | Password: ${v.password}`
            ).join('\n');
            
            alert(`Error: Usuario o contraseña incorrectos\n\nCredenciales disponibles:\n${credenciales}`);
            return null;
        }
    }

    static registrarVeterinario(nuevoVeterinario) {
        console.log('Registrando veterinario:', {
            nombre: nuevoVeterinario.nombreCompleto,
            usuario: nuevoVeterinario.usuario,
            password: nuevoVeterinario.password
        });
        
        const existeVeterinario = Auth.veterinarios.some(
            (vet) => vet.id === nuevoVeterinario.id
        );

        if (existeVeterinario) {
            throw new Error("El veterinario ya está registrado en el sistema");
        }

        Auth.veterinarios.push(nuevoVeterinario);
        console.log('Total veterinarios:', Auth.veterinarios.length);
    }
    
    static mostrarCredenciales() {
        console.log('=== CREDENCIALES DISPONIBLES ===');
        Auth.veterinarios.forEach(vet => {
            console.log(`👨‍⚕️ ${vet.nombreCompleto}: usuario="${vet.usuario}", password="${vet.password}"`);
        });
    }
    
    static logout() {
        Auth.veterinarioActual = null;
        console.log('Sesión cerrada');
        
        const loginSection = document.querySelector('#loginSection');
        const dashboardSection = document.querySelector('#dashboardSection');
        const navbar = document.querySelector('#navbar');
        
        if (loginSection) loginSection.style.display = 'block';
        if (dashboardSection) dashboardSection.style.display = 'none';
        if (navbar) navbar.style.display = 'none';
    }
}