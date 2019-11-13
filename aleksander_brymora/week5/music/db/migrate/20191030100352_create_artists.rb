class CreateArtists < ActiveRecord::Migration[6.0]
  def change
    create_table :artists do |t|
      t.text :name
      t.text :genre
      t.text :bio
      t.text :image
      t.integer :year
      t.timestamps null: false
    end
  end
end
