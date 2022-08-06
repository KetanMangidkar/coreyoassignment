const mongoose = require("mongoose");
// const autenticate=require("../middlewares/autanticate")

const newsSchema = new mongoose.Schema(
  {
   headline:{type:String, required:true},
   link:{type:String, required:true},
    
  },
  {
    versionKey: false,
    timestamps: true,
  },

);

module.exports=mongoose.model("news",newsSchema)