# Homepage (Root path)
require 'json'

get '/' do
  erb :index
end

get '/contacts' do
  content_type :json
  Contact.order(created_at: :desc).to_json
end

get '/contact/:id' do
  content_type :json
  Contact.find(params[:id])
end

post '/add_contact' do
  content_type :json
  contact = Contact.new(params[:contact])
  if contact.save
    contact.to_json
  else
    redirect_to '/'
  end
end

delete '/delete_contact' do
  content_type :json
  binding.pry
  contact = Contact.where(params[:contact]).to_json
end
