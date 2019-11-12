class ContinentsController < ApplicationController
  def index
    @continents = Continent.all
  end

  def new
    @continent = Continent.new
  end

  def create
    continent = Continent.create continent_params
    redirect_to continent
  end

  def edit
    @continent = Continent.find params[:id]
  end

  def update
    continent = Continent.find params[:id]
    continent.update continent_params
    redirect_to continent
  end

  def show
    @continent = Continent.find params[:id]
  end

  def destroy
    continent = Continent.find params[:id]
    continent.destroy
    redirect_to continents_path
  end

  private
  def continent_params
    params.require(:continent).permit(:name, :size, :population, :numofcountries, :fact, :image)
  end
end
