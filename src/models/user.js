export default class userModel {
  getUserPolicy = async userName => {
    try {
      var dbo = db.db("mydb");
      dbo.collection("customers").findOne({ userName }, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
      });
    } catch {
      if (err) throw err;
      console.log("error", err);
    }
  };
}
