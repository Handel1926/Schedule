import nodemailer from "nodemailer"
import CalUser from "@/models/calUsers"
import bcryptjs from "bcryptjs"


export const sendEmail = async ({email, emailType, userId}: any)=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType == "VERIFY"){
            await CalUser.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })

        }else if(emailType === "RESET"){
            await CalUser.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILER_USERID as string,
              pass: process.env.MAILER_PASSID as string
            }
          });

        const mailOptions = {
            from: "ebi1926a@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email": "Reset your password"}</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse



    } catch (error: any) {
        throw new Error(error.message)
    }
}