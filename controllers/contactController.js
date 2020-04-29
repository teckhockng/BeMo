const nodemailer = require('nodemailer');

exports.send = function(req, res) {

  const connect = process.env.PASSWORD; //password
  const email = process.env.EMAIL; //email for sending the mail
  const service_p = process.env.SERVICE;

  const smtpTransport = require('nodemailer-smtp-transport');
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(smtpTransport({
    service: service_p,
    // port: 465,
    // secure: false, // true for 465, false for other ports
    // requireTLS: true,
    auth: {
      user: email,
      pass: connect,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }));
  console.log(req.body.email);
  const my_email = "info@bemoacademicconsulting.com"; //change this email to your email
  // setup email data with unicode symbols
  const mailOptions = {
    from: `${req.body.email}` + ' <you@your_email.com>', // sender address
    to: my_email, // list of receivers
    subject: 'New message from website', // Subject line
    text: req.body.details, // plain text body
  };


  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {
      title: 'Contact Us',
    });
  });
  };
