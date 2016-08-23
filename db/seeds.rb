require 'faker'

5.times do
  name = Faker::Name.name
  firstname = name.split(" ")[0]
  lastname = name.split(" ")[1]
  email = Faker::Internet.email
  number = Faker::Number.number(10).to_s
  birth = Faker::Date.backward(10000)
  Contact.create(
    firstname: firstname,
    lastname: lastname,
    email: email,
    phonenumber: number,
    birthday: birth
  )
end
