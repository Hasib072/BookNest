import nodemailer from 'nodemailer';

/**
 * Sends an email using Nodemailer.
 * @param {Object} params - The email parameters.
 * @param {string} params.to - The recipient's email address.
 * @param {string} params.name - The recipient's name.
 * @param {string} params.verificationCode - The verification code to be sent.
 */
export const sendVerificationEmail = async ({ to, name, verificationCode }) => {
  try {
    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider (e.g., 'Gmail', 'Outlook')
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Define the HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333333;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
          }
          .email-body p {
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
          }
          .email-body .verification-code {
            font-size: 20px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            margin: 20px 0;
          }
          .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666666;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            Verify Your Account
          </div>
          <div class="email-body">
            <p>Hi ${name},</p>
            <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
            <div class="verification-code">${verificationCode}</div>
            <p>This code is valid for 24 hours.</p>
          </div>
          <div class="email-footer">
            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to, // Recipient address
      subject: 'Verify Your Account',
      html: htmlTemplate, // Use the HTML template
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully:', info.response);
  } catch (error) {
    console.error('Failed to send verification email:', error.message);
    throw new Error('Failed to send verification email.');
  }
};

export const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
      // Validate input
      if (!email) {
          return res.status(400).json({ success: false, message: "Email is required." });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          // To prevent email enumeration, respond with a generic message
          return res.status(200).json({ success: true, message: "If an account with that email exists, a verification code has been sent." });
      }

      if (user.isVerified) {
          return res.status(400).json({ success: false, message: "This email is already verified." });
      }

      // Optional: Implement rate limiting logic here to prevent abuse

      // Generate a new verification code
      const newVerificationCode = generateVerificationCode();

      // Update user's verificationToken and verificationExpireAt
      user.verificationToken = newVerificationCode;
      user.verificationExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

      await user.save();

      // Send verification email
      await sendVerificationEmail({
          to: user.email,
          name: user.name,
          verificationCode: newVerificationCode,
      });

      res.status(200).json({ success: true, message: "Verification code has been resent to your email." });

  } catch (error) {
      console.error("resendVerification Failed: ", error);
      res.status(500).json({ success: false, message: "Internal Server Error while resending verification code." });
  }
};
