Rails.application.routes.draw do
  root :to => 'countries#index'
  resources :continents
  resources :countries
end
