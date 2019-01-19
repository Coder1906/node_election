const Service = require('egg').Service;
const nodemailer = require("nodemailer");

class BaseService extends Service {
  async sendEmail (email, subject, {text, html}) {
    const config = this.config.email
    let transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: true, 
      auth: {
        user: config.user, 
        pass: config.pass 
      }
    });
  
    let mailOptions = {
      from: config.from, 
      to: email, 
      subject
    }
    if (text) mailOptions.text = text
    if (html) mailOptions.html = html
    let info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}
module.exports = BaseService