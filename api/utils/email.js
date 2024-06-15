const nodemailer = require("nodemailer");
const pug = require("pug");

module.exports = class Email {
  constructor(user, url, otp = null) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.otp = otp;
    this.from = `"Tour Email" <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //Sendgird
      return nodemailer.createTransport({
        service: "gmail", //Recomention to use Sendgird
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAILTRAP_HOST,
      port: process.env.EMAILTRAP_PORT,
      auth: {
        user: process.env.EMAILTRAP_FROM,
        pass: process.env.EMAILTRAP_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //1. Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      name: this.name,
      url: this.url,
      otp: this.otp,
      subject: subject,
    });
    //2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
    };

    //3. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to HoYoViVu!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset OTP (valid for only 10 minutes)"
    );
  }
};
