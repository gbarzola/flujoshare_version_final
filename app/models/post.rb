class Post < ApplicationRecord
	has_many :comments, dependent: :destroy
	validates :titulo, presence: true, length: {minimum: 5}
	validates :descripcion,  presence: true
end
