class RpsController < ApplicationController
	def game
	end

	def result
		choice = params[:choice]
		rand = ["ROCK", "PAPER", "SCISSORS"].sample
		case choice
		when "ROCK"
			if rand == "ROCK"
				@result = "It's a draw"
			elsif rand == "PAPER"
				@result = "You lost"
			else 
				@result = "You won"
			end
		when "PAPER"
			if rand == "PAPER"
				@result = "It's a draw"
			elsif rand == "SCISSORS"
				@result = "You lost"
			else 
				@result = "You won"
			end
		when "SCISSORS"
			if rand == "SCISSORS"
				@result = "It's a draw"
			elsif rand == "ROCK"
				@result = "You lost"
			else 
				@result = "You won"
			end
		end
		render :result
	end
end