export class Componentes {
    static crearTarjetaMascota(mascota) {
        return `
            <div class="card mb-3 border-start border-4 border-info shadow-sm" data-mascota-id="${mascota.id}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6 class="card-title mb-1 text-info">
                                        <i class="bi bi-paw-fill"></i>
                                        ${mascota.nombreCompleto}
                                    </h6>
                                    <p class="text-muted small mb-1">
                                        <i class="bi bi-calendar-event"></i>
                                        Nacimiento: ${mascota.fechaNacimiento} (${mascota.edad} años)
                                    </p>
                                    <div class="d-flex align-items-center gap-2">
                                        <p class="text-muted small mb-1">
                                            <i class="bi bi-clipboard2-pulse"></i>
                                            <strong>Síntomas:</strong> ${mascota.diagnostico}
                                        </p>
                                        <button class="btn btn-sm btn-outline-primary editar-diagnostico-btn" 
                                                data-mascota-id="${mascota.id}"
                                                title="Editar diagnóstico">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="card-title mb-1">
                                        <i class="bi bi-person-heart"></i>
                                        Responsable
                                    </h6>
                                    <p class="text-muted small mb-1">
                                        ${mascota.dueño.nombreCompleto} 
                                        <span class="badge bg-light text-dark border">${mascota.dueño.relacion}</span>
                                    </p>
                                    <p class="text-muted small mb-1">
                                        <i class="bi bi-telephone"></i>
                                        ${mascota.dueño.telefono}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="d-flex flex-column align-items-end gap-2">
                                <span class="badge ${mascota.badgeColor} p-2">
                                    <i class="bi ${mascota.isAlta ? 'bi-check-circle' : 'bi-clock-history'}"></i>
                                    ${mascota.estadoTexto}
                                </span>
                                <button class="btn btn-sm btn-outline-secondary cambiar-estado-btn" 
                                        data-mascota-id="${mascota.id}"
                                        title="Cambiar estado">
                                    <i class="bi bi-arrow-repeat"></i> Cambiar Estado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}