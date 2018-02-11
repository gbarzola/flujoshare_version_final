class AddAvatarToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_attachment :profiles, :avatar
  end
end
