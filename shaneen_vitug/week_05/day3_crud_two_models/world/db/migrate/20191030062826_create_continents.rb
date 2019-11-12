class CreateContinents < ActiveRecord::Migration[6.0]
  def change
    create_table :continents do |t|
      t.text :name
      t.integer :size
      t.integer :population
      t.integer :numofcountries
      t.text :fact
      t.text :image
    end
  end
end
