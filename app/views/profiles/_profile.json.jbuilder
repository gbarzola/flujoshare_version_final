json.extract! profile, :id, :nombre, :apellidos, :fecha_nacimiento, :user_id, :created_at, :updated_at
json.url profile_url(profile, format: :json)
