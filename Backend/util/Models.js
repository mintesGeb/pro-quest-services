const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post_id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  comment: { type: String },
});

const ServiceSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  creatorId: { type: Number },
  service: {
    title: { type: String, required: true },
    detail: { type: String, required: true },
    catagory: { type: String, required: true },
  },
  type: {
    type: String,
    enum: ["request", "provide"],
    required: true,
  },
  fulfilled: { type: Boolean, default: false },
  hourlyPayment: { type: Number, required: true },
  location: {
    city: { type: String, required: true, default: "Laurel" },
    coords: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },

    timestamp: { type: String, required: true },
  },
  comment: { type: Array, default: [] },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
});

// const UserSchema = new Schema({
//   password:String,
//   email:String
// firstname: { type: String, required: true },
// lastname: { type: String, required: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// phone: { type: String, default: "**********" },
// address:{
//   street:String,
//   city:String,
//   state:String,
//   zipcode:String,
//   country:String

// },
// createdAt: {
//   required: true,
//   type: Date,
//   default: Date.now(),
// },
// });

// module.exports.UserModel = mongoose.model("User", UserSchema);
module.exports.CommentModel = mongoose.model("Comment", CommentSchema);
module.exports.ServiceModel = mongoose.model("Service", ServiceSchema);

// {
//   "firstname":"Mintesinot",
//   "lastname":"Tekle",
//   "email":"mintes4@gmail.com",
//   "password":"321654",
//   "phone":"3476228398",
//   "address":{
//       "street":"6202 Springhill Dr",
//       "city":"Greenbelt",
//       "state":"MD",
//       "zipcode":"20770",
//       "country":"USA"
//       }
//   }
