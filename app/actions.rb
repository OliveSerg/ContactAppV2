# Homepage (Root path)
require 'json'

get '/' do
  erb :index
end

get '/contacts' do
  content_type :json
  Contact.all.to_json
end

get '/contact/:id' do
  content_type :json
  Contact.find(params[:id])
end

post '/add_contact' do
  content_type :json
  contact = Contact.new(params[:contact])
  
end
