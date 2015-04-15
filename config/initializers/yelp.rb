require 'yelp'

# client = Yelp::Client.new({ consumer_key: 'GbNMI--YE4VXaUMvHSLEsQ',
#                             consumer_secret: 'xhVqjm7vUYIWc-LL6qYiVihpFH4',
#                             token: 'A_dIWuysN9Ru6Qi5feHRIo3-C2AmMapG',
#                             token_secret: 'YvJiXmLW5EbPvBj7_Cl1pw4-1WY'
#                           })

Yelp.client.configure do |config|
  config.consumer_key = 'GbNMI--YE4VXaUMvHSLEsQ'
  config.consumer_secret = 'xhVqjm7vUYIWc-LL6qYiVihpFH4'
  config.token = 'A_dIWuysN9Ru6Qi5feHRIo3-C2AmMapG'
  config.token_secret = 'YvJiXmLW5EbPvBj7_Cl1pw4-1WY'
end

# client = Yelp::Client.new