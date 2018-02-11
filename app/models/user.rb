class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_attached_file :avatar, styles: { medium: "300x300", thumb: "100x100" }, default_url: "missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  
  has_one :profile
  
  enum role: [:user, :operator, :chef, :admin]
  after_initialize :set_default_role

  def friendly_name
     if self.default_profile.nombre.nil?
       self.email
     else
       self.profile.full_name
     end
  end
  
  def default_profile
    if self.profile.nil?
      profile = Profile.new
      profile.user = self
      profile.save
      self.save      
    end
    self.profile
  end
  
  def set_default_role
    self.role ||= :user
  end
  
end
