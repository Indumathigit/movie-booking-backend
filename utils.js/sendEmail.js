var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

function sendBookingConfirmation(booking) {
  var seatIds = []
  for (var i = 0; i < booking.seats.length; i++) {
    seatIds.push(booking.seats[i].id)
  }

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.user.email,
    subject: "🎬 Booking Confirmed - " + booking.movie.title + " | PopcornPass",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; color: #ffffff; padding: 24px; border-radius: 12px;">
        
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #ef4444; font-size: 28px; margin: 0;">🍿 PopcornPass</h1>
          <p style="color: #9ca3af; margin: 8px 0 0;">Your ticket is confirmed!</p>
        </div>

        <div style="background: #1f2937; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0 0 16px;">✅ Booking Confirmed</h2>
          <p style="color: #9ca3af; margin: 0;">Booking ID: <span style="color: #ef4444; font-family: monospace;">${booking.bookingId}</span></p>
        </div>

        <div style="background: #1f2937; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #ffffff; margin: 0 0 16px;">🎬 Movie Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Movie</td>
              <td style="color: #ffffff; font-weight: bold;">${booking.movie.title}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Date</td>
              <td style="color: #ffffff;">${booking.showtime.date}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Time</td>
              <td style="color: #ffffff;">${booking.showtime.time}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Screen</td>
              <td style="color: #ffffff;">${booking.showtime.screen}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Format</td>
              <td style="color: #ffffff;">${booking.showtime.format}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Seats</td>
              <td style="color: #ef4444; font-weight: bold;">${seatIds.join(", ")}</td>
            </tr>
          </table>
        </div>

        <div style="background: #1f2937; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #ffffff; margin: 0 0 16px;">💳 Payment Receipt</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Amount</td>
              <td style="color: #ffffff;">₹${booking.totalAmount}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Payment Method</td>
              <td style="color: #ffffff; text-transform: capitalize;">${booking.paymentDetails.method}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Transaction ID</td>
              <td style="color: #ffffff; font-family: monospace; font-size: 12px;">${booking.paymentDetails.transactionId}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 6px 0;">Status</td>
              <td style="color: #22c55e; font-weight: bold;">✅ Paid</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 24px;">
          <p>Please show this email or your booking ID at the cinema entrance.</p>
          <p style="margin-top: 8px;">© 2026 PopcornPass. Enjoy your movie! 🎬</p>
        </div>

      </div>
    `
  }

  return transporter.sendMail(mailOptions)
    .then(function (info) {
      console.log("Confirmation email sent:", info.messageId)
    })
    .catch(function (err) {
      console.log("Email error:", err.message)
    })
}

module.exports = { sendBookingConfirmation }