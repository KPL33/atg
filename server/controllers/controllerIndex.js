import * as createUserControllers from "./user/createUser.js";
import * as editUserControllers from "./user/editUser.js";
import * as getUserControllers from "./user/getUser.js";
import * as deleteUserControllers from "./user/deleteUser.js";

import * as createProductControllers from "./product/createProduct.js";
import * as editProductControllers from "./product/editProduct.js";
import * as getProductControllers from "./product/getProduct.js";
import * as deleteProductControllers from "./product/deleteProduct.js";



const controllers = {
  createUserControllers,
  editUserControllers,
  getUserControllers,
  deleteUserControllers,
  createProductControllers,
  editProductControllers,
  getProductControllers,
  deleteProductControllers,
};

export default controllers;
