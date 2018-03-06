class AddVersionEditToRecords < ActiveRecord::Migration[5.1]
  def change
    add_column :records, :version_edit, :string
  end
end
