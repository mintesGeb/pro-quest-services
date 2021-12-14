let User = require("../util/UserModel");

module.exports.getAllUsers = async (req, res, next) => {
  let allUsers = await User.find();
  res.json({ success: true, data: allUsers });
};
// module.exports.getByFullName = async (req, res, next) => {
//    let name= req.params.name.split("-");
//    let firstname=name[0];
//    let lastname=name[1];

//   let user = await User.findOne({firstname,lastname});
//   res.json({ success: true, data: user });
// };
module.exports.getByEmail = async (req, res, next) => {

  let user = await User.findOne({email:req.params.email});
  res.json({ success: true, data: user });
};
module.exports.deleteUser=async(req,res,next)=>{
    await User.findOneAndDelete({email:req.params.email})
    res.json({success:true})
}
module.exports.UpdateUser=async(req,res,next)=>{
    await User.findOneAndUpdate({email:req.params.email}, req.body)
    res.json({success:true})
}