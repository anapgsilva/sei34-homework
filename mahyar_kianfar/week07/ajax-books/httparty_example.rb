require 'HTTParty'

date = HTTParty.get 'https://www.googleapis.com/books/v1/volumes?q='

puts data
