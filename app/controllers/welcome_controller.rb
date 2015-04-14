class WelcomeController < ApplicationController
  def index
  end
  def search
	parameters = { term: params[:term], limit: 5 }
	render json: Yelp.client.search('San Francisco', parameters)
  end
end
