const Score =  require("../model/scores.model")

const createScore =async(req, res, next) => {
    try {

    
    const {id}  = req.user;
    const {score} = req.body;

    if (!score) {
        return res.status(400).json({msg: "Sorry the score isnt included. Please try again soonest"})
    }
    const checkUser =  await Score.findOne({user: id});
    if(checkUser && checkUser.scoreDetail < score) {
      const updateScore = await Score.findByIdAndUpdate(checkUser.id, {scoreDetail : score})
      console.log(updateScore);
       return res.status(200).json({msg: "Score has been saved"})
      
    } 
    if(checkUser && checkUser.scoreDetail > score ) {
      return res.status(200).json({msg: "Your highest score has been saved"})
    }
    const uploadScore = await Score.create({ scoreDetail : score, user: id, 

    })
    console.log(uploadScore);
    if(!uploadScore) {
return res.status(400).json({msg: "There was an error saving the score Please try again later"})
    }

    return res.status(200).json({msg: "User score successfully saved"})
} catch(err) {
console.log(err);
return res.status(500).json({msg: "Result upload unsuccessful. Please try again later"})
}
}

const viewLeaderBoard =async(req, res, next) => {

  try {
    const scoreBoard =  await Score.find().limit(10).populate("user").sort({scoreDetail : -1 });
    console.log(scoreBoard);
    res.status(200).json(scoreBoard);
    

  } catch(err) {
    console.log(err)
    return res.status(500).json({msg: "details couldn't be fetched. Please try again later"})
  }
   

}
module.exports = {viewLeaderBoard, createScore}