class CreateCountries < ActiveRecord::Migration[6.0]
  def change
    create_table :countries do |t|
      t.text :name
      t.text :capitalcity
      t.text :language
      t.boolean :visited
      t.text :flag
      t.text :image
    end
  end
end
