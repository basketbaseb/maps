class WelcomeController < ApplicationController
  def index
  end

  def search
	parameters = { term: params[:term], limit: 5, sort: 2, radius_filter: 8046 }
	coordinates = params[:coordinates]
	# render json: Yelp.client.search(params[:location], parameters)
	render json: Yelp.client.search_by_coordinates(coordinates, parameters)
  end

  def business
  	parameters = params[:id]
	render json: Yelp.client.business(parameters)
  end

end
