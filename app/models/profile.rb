class Profile < ApplicationRecord
    belongs_to :user
    
    def full_name
        self.nombre + " " + self.apellidos
    end
    
    
    
end
