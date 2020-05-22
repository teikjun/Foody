const express = require("express");

require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// database connection for deployment, uncomment when deploying
/*
const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
*/

// database Connection for localhost, comment out when deploying
const { Pool } = require("pg");
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fds",
  password: "learning",
  port: 5432,
});

// controllers - AKA the db queries
const auth = require("./controllers/auth");
const order = require("./controllers/order");
const food = require("./controllers/food");
const stats = require("./controllers/stats");
const moreStats = require("./controllers/moreStats");

// App
const app = express();

// App Middleware
const whitelist = ["http://localhost:3001", "http://fooddeliveries.herokuapp.com/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'

// authentication routes
app.post("/add_customer", (req, res) => auth.addCustomer(req, res, db));
app.post("/add_delivery_rider", (req, res) => auth.addDeliveryRider(req, res, db));
app.post("/add_restaurant_staff", (req, res) => auth.addRestaurantStaff(req, res, db));
app.post("/add_fds_manager", (req, res) => auth.addFdsManager(req, res, db));

app.post("/validate_email", (req, res) => auth.validateEmail(req, res, db));
app.post("/validate_password", (req, res) => auth.validatePassword(req, res, db));
app.post("/change_password", (req, res) => auth.changePassword(req, res, db));
app.post("/change_credit_card", (req, res) => auth.changeCreditCard(req, res, db));
app.post("/delete_user", (req, res) => auth.deleteUser(req, res, db));

// Customer routes
app.post("/check_valid_order", (req, res) => order.checkValidOrder(req, res, db));
app.post("/get_recent_order_locations", (req, res) => order.getRecentOrderLocations(req, res, db));
app.post("/place_order", (req, res) => order.placeOrder(req, res, db));
app.post("/has_ongoing_order", (req, res) => order.hasOngoingOrder(req, res, db));
app.post("/get_past_orders", (req, res) => order.getPastOrders(req, res, db));
app.post("/add_review_and_rating", (req, res) => order.addReviewAndRating(req, res, db));
app.post("/get_restaurant_reviews_and_ratings", (req, res) =>
  order.getRestaurantReviewsAndRatings(req, res, db),
);

// Food and Restaurants routes
app.get("/get_food_data", (req, res) => food.getFoodData(req, res, db));
app.get("/get_restaurants", (req, res) => food.getRestaurants(req, res, db));
app.post("/add_availability", (req, res) => food.addAvailability(req, res, db));
app.post("/minus_availability", (req, res) => food.minusAvailability(req, res, db));

// Rider routes
app.post("/set_t_depart_to_rest", (req, res) => order.setTDepartToRest(req, res, db));
app.post("/set_t_arrive_at_rest", (req, res) => order.setTArriveAtRest(req, res, db));
app.post("/set_t_depart_from_rest", (req, res) => order.setTDepartFromRest(req, res, db));
app.post("/set_deliver_order", (req, res) => order.setTDeliverOrder(req, res, db));

// Rider statistics routes
app.get("/get_rider_monthly_stats", (req, res) => stats.getRiderMonthlyStats(req, res, db));

// Manager statistics routes
app.get("/get_total_order", (req, res) => stats.getTotalOrder(req, res, db));
app.get("/get_total_cost", (req, res) => stats.getTotalCost(req, res, db));
app.get("/get_total_customers", (req, res) => stats.getTotalCustomers(req, res, db));
app.post("/get_monthly_stats", (req, res) => stats.getMonthlyStats(req, res, db));

// Other statistics routes
app.post("/get_rider_monthly_stats", (req, res) => moreStats.getRiderMonthlyStats(req, res, db));
app.get("/get_delivery_location_stats", (req, res) =>
  moreStats.getDeliveryLocationStats(req, res, db),
);

// Staff statistics routes
app.get("/get_restaurant_food_data", (req, res) => stats.getRestaurantFoodData(req, res, db));
app.get("/get_this_month_stats", (req, res) => stats.getThisMonthStats(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
