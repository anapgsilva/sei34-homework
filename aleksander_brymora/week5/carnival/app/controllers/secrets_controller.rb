class SecretsController < ApplicationController
	def game
	end

	def result
		@rand_number = rand(1...10)
		@guessed_number = params[:choice].to_i
		render :result
	end
end