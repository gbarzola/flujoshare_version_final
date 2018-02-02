class CreateProcesos < ActiveRecord::Migration[5.1]
  def change
    create_table :procesos do |t|
      t.string :nombre
      t.string :commits
      t.string :status
      t.string :contribuidores
      t.string :version

      t.timestamps
    end
  end
end
