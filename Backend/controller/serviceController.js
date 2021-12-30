let Service = require("../util/Models").ServiceModel;
let Comment = require("../util/Models").CommentModel;
let User = require("../util/UserModel");
let axios = require("axios");

exports.post = async (req, res, next) => {
  try {
    console.log(req.body, req.params.userId);

    let newService = new Service(req.body);

    await newService.save();

    let myUser = await User.findOne({ _id: req.params.userId });
    let newList = [...myUser[req.query.type], newService._id];
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { [req.query.type]: newList }
    );

    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};
exports.postComment = async (req, res, next) => {
  try {
    console.log(req.params.id, req.body);
    const newComment = new Comment({ ...req.body, post_id: req.params.id });
    await newComment.save();
    const myService = await Service.findOne({ _id: req.params.id });
    myService.comment.push(newComment);
    await Service.findOneAndUpdate({ _id: req.params.id }, myService);

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
exports.getProvided = async (req, res, next) => {
  try {
    const postPerPage = 5;
    const page = Math.max(0, req.query.page - 1);
    const city = req.query.city;
    console.log(city);

    let baseUrl = "http://localhost:1211/services/provide?page=";

    let myServices = await Service.find({
      type: "provide",
      "location.city":req.query.city,
    })
      .sort({
        createdAt: -1,
      })
      .limit(postPerPage)
      .skip(postPerPage * page);

    res.links({
      previous: baseUrl + req.query.page,
      next: baseUrl + (req.query.page + 1),
    });

    res.json({ success: true, data: myServices });
  } catch (e) {
    next(e);
  }
};
exports.getRequested = async (req, res, next) => {
  try {
    const postPerPage = 5;
    const page = Math.max(0, req.query.page - 1);
    let baseUrl = "baseURL = 'http://localhost:1211/services/provide?page='";

    let myServices = await Service.find({ type: "request" })
      .sort({
        createdAt: -1,
      })
      .limit(postPerPage)
      .skip(postPerPage * page);
    res.json({ success: true, data: myServices });
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const myService = await Service.findOne({ _id: req.params.id });
    res.json({ success: true, data: myService });
  } catch (error) {
    next(error);
  }
};
exports.getByName = async (req, res, next) => {
  try {
    const myService = await Service.findOne({
      "sevice.title": req.params.name,
    });
    res.json({ success: true, data: myService });
  } catch (error) {
    next(error);
  }
};
exports.getComments = async (req, res, next) => {
  try {
    const myService = await Service.findOne({ _id: req.params.id });
    res.json({ success: true, data: myService.comment });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const myService = await Service.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.updateUsersAndServices = async (req, res, next) => {
  try {
    console.log(req.params.serId, req.params.userId, req.query.type);

    let myUser = await User.findOne({ _id: req.params.userId });
    let myService = await Service.findByIdAndUpdate(
      { _id: req.params.serId },
      { fulfilled: true }
    );

    let newList = [...myUser[req.query.type], req.params.serId];
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { [req.query.type]: newList }
    );
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};
exports.updateName = async (req, res, next) => {
  try {
    console.log(req.params.fullname);
    console.log(req.body);
    let fullname = req.params.fullname.split("-");
    const myService = await Service.findOneAndUpdate(
      { firstname: fullname[0], lastname: fullname[1] },
      { firstname: req.body.firstname, lastname: req.body.lastname }
    );
    console.log(myService);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const myService = await Service.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
