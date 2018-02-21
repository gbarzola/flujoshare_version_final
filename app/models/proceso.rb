class Proceso < ApplicationRecord
    belongs_to :user
    has_many :record
end
