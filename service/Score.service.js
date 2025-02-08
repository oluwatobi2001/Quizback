const Score =  require("../model/scores.model")

const createScore =async(req, res, next) => {
    try {

    
    const {id}  = req.user;
    const {score} = req.body;

    if (!score) {
        return res.status(400).json({msg: "Sorry the score isnt included. Please try again soonest"})
    }
    const uploadScore = await Score.create({ scoreDetail : score, user: id, 

    })
    console.log(uploadScore);
    if(!uploadScore) {
return res.status(400).json({msg: ""})
    }

} catch(err) {
console.log(err);
return res.status(500).json({msg: "Result upload unsuccessful. Please try again later"})
}
}

const viewLeaderBoard =async(req, res, next) => {

  try {
    const scoreBoard =  await Score.findAll().limit(10).populate("users").sort({scoreDetail : -1 });
    console.log(scoreBoard);
    res.status(200).json(scoreBoard);
    

  } catch(err) {
    return res.status(500).json({msg: "details couldn't be fetched. Please try again later"})
  }
   

}
module.exports = {viewLeaderBoard, createScore}