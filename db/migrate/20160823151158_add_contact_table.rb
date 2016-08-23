class AddContactTable < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :phonenumber
      t.datetime :birthday
      t.string :email
      t.timestamps
    end
  end
end
