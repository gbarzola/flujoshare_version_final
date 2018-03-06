class AddUserEditToRecords < ActiveRecord::Migration[5.1]
  def change
    add_column :records, :user_edit, :string
  end
end
