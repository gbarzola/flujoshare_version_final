class CreateRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :records do |t|
      t.references :proceso, foreign_key: true
      
      t.timestamps
    end
  end
end
