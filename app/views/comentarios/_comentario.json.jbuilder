json.extract! comentario, :id, :idUsuario, :descripcion, :fecha, :created_at, :updated_at
json.url comentario_url(comentario, format: :json)
