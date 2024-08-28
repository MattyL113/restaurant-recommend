const restaurants = require('../restaurants-data')

module.exports = {
    getRestaurants
}

function getRestaurants(){
    return restaurants;
}
