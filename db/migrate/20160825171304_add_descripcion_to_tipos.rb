class AddDescripcionToTipos < ActiveRecord::Migration
  def change
    add_column :tipos, :descripcion, :string
  end
end
