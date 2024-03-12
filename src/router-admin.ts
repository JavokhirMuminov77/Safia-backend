 import express  from "express";
const routerAdmin = express.Router();
import memberController from './controllers/member.controller';
import restaurantController from "./controllers/restaurant.controller";

/**Restaurant */
routerAdmin.get("/", restaurantController.goHome );


routerAdmin
.get("/login", restaurantController.getLogin)
.post("/login", restaurantController.processLogin);

routerAdmin
.get("/signup", restaurantController.getSignup)
.post("/signup", restaurantController.processSignup);

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);


/*Prodect*/

/**User*/
export default routerAdmin;