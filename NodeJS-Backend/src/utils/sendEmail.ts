import nodemailer from 'nodemailer';

export const sendEmail=async(email:any,subject:any,message:any)=>{
  try{
    const transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
          service: 'gmail',
          port:587,
          secure: true,
          auth: {
            user: "scm.nawlarphawhtoo@gmail.com",
            pass: "qmrgafjeicdnvktv"
          }
    });
    await transporter.sendMail({
      from:'scm.nawlarphawhtoo@gmail.com',
      to:email,
      subject:subject,
      text:message
    })
    console.log("Email sent successfully");

  }catch(error){
    console.log(error,"Email not sent");
  }
 
}
