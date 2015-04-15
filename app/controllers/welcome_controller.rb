class WelcomeController < ApplicationController
  def index
  end
  def search
	parameters = { term: params[:term], limit: 5, sort: 0, radius_filter: 4000 }
	coordinates = params[:coordinates]
	render json: Yelp.client.search('2988 Via Bahia', parameters)
	# render json: Yelp.client.search_by_coordinates(coordinates, parameters)
  end
end
