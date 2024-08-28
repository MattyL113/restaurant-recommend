const { getRestaurants } = require('../models/restaurants')

function recommendRestaurant(req, res) {
    console.log("we made it here!");
    const restaurants = getRestaurants();
    const distance = parseInt(req.body.distance);
    const cuisine = req.body.cuisine;
    let recommendedRestaurant;
    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.cuisineType === cuisine && restaurant.distance <= distance && restaurant.rating > 3.5
    );

    if (filteredRestaurants.length > 0) {
        recommendedRestaurant = filteredRestaurants[Math.floor(Math.random())];
    }
    console.log(recommendedRestaurant);
    res.json(recommendedRestaurant);
}

module.exports = {
    recommendRestaurant
}