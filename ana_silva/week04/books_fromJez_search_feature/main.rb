require 'sinatra'
require 'httparty'
require 'sinatra/reloader'
require 'pry'

get '/' do
  erb :home
end

def check_key(obj, key)
  begin
    res = obj[key]
    res = res["thumbnail"] if key == "imageLinks"
    puts res
    if res.class != Integer && res.class != Float
      res = "Unknown" if res.empty?
    end
  rescue NoMethodError
    res = "Unknown"
    res = "https://www.fillmurray.com/120/200" if key == "imageLinks"
    res = 0 if key == "ratingsCount" || key == "averageRating"
  end

  res
end

get '/book' do
  @title = params[:title]
  url = "https://www.googleapis.com/books/v1/volumes?fields=totalItems,items(volumeInfo(title,publishedDate,authors,averageRating,ratingsCount,description,previewLink,imageLinks(thumbnail)))&q=title:#{@title}"
  items = HTTParty.get(url)
  @total = items["totalItems"] #total hits for search
  data = items["items"] #array of books
  # binding.pry
  if items["totalItems"] == 0
    @hits = {};
  else
    # binding.pry
    @hits = data.map do |x|
      v = x["volumeInfo"]
      obj = {
        :title=> check_key(v, "title"),
        :authors=> check_key(v, "authors"),
        :rating=> check_key(v, "averageRating"),
        :rating_count=> check_key(v, "ratingsCount"),
        :date=> check_key(v, "publishedDate"),
        :description=> check_key(v, "description"),
        :preview=> check_key(v, "previewLink"),
        :thumb=> check_key(v, "imageLinks")
      }
      obj[:authors] = obj[:authors].join(', ') if obj[:authors].class == Array
      obj
    end
  end

  erb :book
end
