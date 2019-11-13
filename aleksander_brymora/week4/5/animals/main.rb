require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'
require 'httparty'

get '/' do
    url = "https://api.thecatapi.com/v1/images/search"
    info = HTTParty.get url
    @image = info.first["url"]
    erb :home
end

get '/photos' do 
    erb :photos
end

get '/cats' do
    @cats = dbquery "SELECT * FROM cats"
    erb :all_cats
end

get '/cats/new' do 
    erb :new_cat
end

get '/cats/:id/edit' do
    @cat_to_edit = dbquery "SELECT * FROM cats WHERE id=#{params[:id]}"
    @cat_to_edit = @cat_to_edit.first
    erb :edit_cat
end

get '/cats/:id/delete' do 
    dbquery "DELETE FROM cats WHERE id='#{params[:id]}'"
    redirect to ("/cats")
end

post '/cats' do 
    add_cat = "INSERT INTO cats (name, isfluffy, color, image) VALUES ('#{params[:name]}', '#{params[:isfluffy]}', '#{params[:color]}', '#{params[:image]}')"
    dbquery add_cat
    redirect to ('/cats')
end

post '/cats/:id' do
    dbquery "UPDATE cats SET name='#{params[:name]}', isfluffy='#{params[:isfluffy]}', color='#{params[:color]}', image='#{params[:image]}' WHERE id=#{params[:id]}"
    redirect to ("cats/#{params[:id]}")
end

get '/cats/:id' do
    @cat = dbquery "SELECT * FROM cats WHERE id=#{params[:id]}"
    @cat = @cat.first
    erb :cat_show
end

def dbquery question
    puts question
    db = SQLite3::Database.new 'animals.sqlite3'
    db.results_as_hash = true
    results = db.execute question
    db.close
    results
end