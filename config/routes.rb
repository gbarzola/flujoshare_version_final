Rails.application.routes.draw do

  resources :procesos
  devise_for :users
  
  authenticated :user do
    root 'procesos#index'
  end

  unauthenticated :user do
    devise_scope :user do
      root 'devise/sessions#new'
    end
  end

  get 'menu/diagrama_flujo'
  get 'menu/comentarios'
  get 'menu/cambios_aprobados'
  get 'menu/estadisticas'
  get 'menu/contribuidores'

end
