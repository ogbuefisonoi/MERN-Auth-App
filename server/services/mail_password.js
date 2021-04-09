
//   const nodemailer = require('nodemailer');


//   const PassReset = async (email) => {
//     try {
//       const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           port: 465,
//           logger: true,
//           debug: true,
//           auth: {
//               user: 'johnikems10thousand@gmail.com',
//               pass: 'zmpdszkwggotlqyr' 
//           },
//       });
  
//       const options  = {
//           from: 'johnikems10thousand@gmail.com',
//           to: email,
//           subject: "Reset Password",
//           text: "Your New Password is : " ,
//       };
  
//       transporter.sendMail(options, (error, info) => {
//         if (error) {
//           return error;
//         } else {
//           console.log("Email sent correctly!");
//         }
//       });
//     } catch (error) {
//       return error;
//     }
//   };
  
// module.exports = PassReset

