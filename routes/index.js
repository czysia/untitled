var express = require('express');
var router = express.Router();

/* GET home page. */
var dbConnect='mongodb+srv://admin:admin@cluster0.hgkyu.mongodb.net/tinder?retryWrites=true&w=majority';
const  mongoose =require('mongoose');
mongoose.connect(dbConnect,{useNewUrlParser:true,useUnifiedTopology:true});

var user=new mongoose.Schema(
    {
      userName:String,
      email:String,
      password:String,
      sdt:String,
      avatar:String,
    }
)

router.get('/getUsers', function (req, res) {
  var connectUsers = db.model('users', user);
  var baseJson = {
    errorCode: undefined,
    errorMessage: undefined,
    data: undefined
  }
  connectUsers.find({}, function (err, users) {
    if (err) {
      baseJson.errorCode = 403
      baseJson.errorMessage = '403 Forbidden'
      baseJson.data = []
    } else {
      baseJson.errorCode = 200
      baseJson.errorMessage = 'OK'
      baseJson.data = users
    }
    res.send(baseJson);
  })

})
router.post("/users",  (req, res) => {
  var userConnect=db.model('users',user);
  const u = new userConnect(req.body);
  try {
    u.save();
    res.send(u);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.post("/delete11", (req, res) => {
  db.model('users',user).findByIdAndRemove(req.body.id)
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});
router.post("/update12", (req, res) => {
  db.model('users',user).findByIdAndUpdate(req.body.id, {
    userName:req.body.userName,
    email:req.body.email,
    password:req.body.password,
    sdt:req.body.sdt,
  })
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

const  db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function (){
  console.log('connection')
});

module.exports = router;
