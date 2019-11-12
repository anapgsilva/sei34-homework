class AddContinentIdToCountries < ActiveRecord::Migration[6.0]
  def change
    add_column :countries, :continent_id, :integer
  end
end
