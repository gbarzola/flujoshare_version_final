class CreateComentarios < ActiveRecord::Migration[5.1]
  def change
    create_table :comentarios do |t|
      t.string :idUsuario
      t.string :descripcion
      t.string :fecha

      t.timestamps
    end
  end
end
