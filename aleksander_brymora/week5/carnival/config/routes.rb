Rails.application.routes.draw do
  root :to => 'pages#home'

  # Magic ball
  get '/magicball' => 'balls#game'
  get '/magicball/result' => 'balls#result'

  # Secret number
  get '/secretnumber' => 'secrets#game'
  get '/secretnumber/result' => 'secrets#result'
  
  # RPS
  get '/rps' => 'rps#game'
  get '/rps/result' => 'rps#result'
end
