const express = require("express");
const cors = require("cors")
const fileUpload = require("express-fileupload")
const uploadRoute = require("./routes/route")
const app = express();
const {cloudinaryConnect} = require("./config/cloudinary");

cloudinaryConnect();
app.use(cors({
     origin:"*"
}))


app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use("/api/v1",uploadRoute)
app.get("/",(req,res) => {
    return res.json({
         message:"Server is started",
         success:true
     })
})

app.listen(3000,() => {
   console.log("server is start")
});
