class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :nombre
      t.string :apellidos
      t.datetime :fecha_nacimiento
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
