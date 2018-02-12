class AddUserToProceso < ActiveRecord::Migration[5.1]
  def change
    add_reference :procesos, :user, foreign_key: true
  end
end
