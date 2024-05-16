import mongoose from "mongoose";
import nodemailer from "nodemailer"

export const connectDB = (uri: string) => {
    mongoose
      .connect(uri)
      .then((c) => console.log(`DB connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
  };


export const sendmail= async (text:string)=>{
    let config={
      service:"gmail",
      auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_PASS
      }
    }
    let transporter=nodemailer.createTransport(config);
    let message={
      from:process.env.USER_MAIL,
      to: "info@redpositive.in",
      subject: "User details",
      text: text
  
    }
    transporter.sendMail(message)
  }