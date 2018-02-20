class MenuController < ApplicationController
  def diagrama_flujo
  end

  def comentarios
  end

  def procesos_pendientes
    @procesos = Proceso.where(status: 'Solicitud de Aprobacion')
  end
  
  def cambio_estado_proceso
    proceso = Proceso.find(params[:id])
    if params[:valor] == "Aceptado"
      proceso.update_attributes(status: "Aceptado")
    else
      proceso.update_attributes(status: "Rechazado")
    end

    redirect_to menu_procesos_pendientes_path
  end
  
  def cambios_aprobados
    @procesos = Proceso.where(status: 'Aceptado')
  end
  
  def estadisticas
  end

  def contribuidores
  end
  
end
