var { Resend } = require("resend")

var resend = new Resend(process.env.RESEND_API_KEY)

function sendBookingConfirmation(booking) {
  if (!booking || !booking.user || !booking.user.email) return

  var seatList = booking.seats.map(function (s) { return s.id }).join(", ")
  var showtimeDate = booking.showtime.date || ""
  var showtimeTime = booking.showtime.time || ""
  var movieTitle = booking.movie.title || ""
  var theaterName = booking.showtime.theater || booking.showtime.screen || ""
  var totalAmount = booking.totalAmount || 0
  var bookingId = booking.bookingId || booking.id || ""
  var transactionId = (booking.paymentDetails && booking.paymentDetails.transactionId) || ""

  var html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#0f0f1a;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:#4f46e5;padding:24px 32px;">
        <h1 style="margin:0;font-size:22px;letter-spacing:1px;">🎬 PopcornPass</h1>
        <p style="margin:6px 0 0;color:#c7d2fe;font-size:14px;">Booking Confirmed!</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="color:#a5b4fc;font-size:13px;margin:0 0 4px;">Booking ID</p>
        <p style="font-size:18px;font-weight:bold;margin:0 0 20px;color:#fff;">${bookingId}</p>

        <div style="background:#1e1e2e;border-radius:10px;padding:18px 20px;margin-bottom:20px;">
          <h2 style="margin:0 0 14px;font-size:16px;color:#e0e7ff;">${movieTitle}</h2>
          <table style="width:100%;font-size:13px;border-collapse:collapse;">
            <tr><td style="color:#6b7280;padding:4px 0;">Date &amp; Time</td><td style="text-align:right;color:#fff;">${showtimeDate} &nbsp;${showtimeTime}</td></tr>
            <tr><td style="color:#6b7280;padding:4px 0;">Venue</td><td style="text-align:right;color:#fff;">${theaterName}</td></tr>
            <tr><td style="color:#6b7280;padding:4px 0;">Seats</td><td style="text-align:right;color:#a5b4fc;">${seatList}</td></tr>
            <tr><td style="color:#6b7280;padding:4px 0;">Format</td><td style="text-align:right;color:#fff;">${booking.showtime.format || ""}</td></tr>
          </table>
        </div>

        <div style="background:#1e1e2e;border-radius:10px;padding:18px 20px;margin-bottom:20px;">
          <h3 style="margin:0 0 12px;font-size:14px;color:#e0e7ff;">Payment Receipt</h3>
          <table style="width:100%;font-size:13px;border-collapse:collapse;">
            <tr><td style="color:#6b7280;padding:4px 0;">Amount Paid</td><td style="text-align:right;color:#34d399;font-weight:bold;">₹${totalAmount}</td></tr>
            <tr><td style="color:#6b7280;padding:4px 0;">Transaction ID</td><td style="text-align:right;color:#fff;">${transactionId}</td></tr>
            <tr><td style="color:#6b7280;padding:4px 0;">Status</td><td style="text-align:right;color:#34d399;">✅ Confirmed</td></tr>
          </table>
        </div>

        <p style="font-size:12px;color:#4b5563;text-align:center;margin-top:24px;">
          Please arrive 15 minutes before showtime. Enjoy the movie! 🍿
        </p>
      </div>
    </div>
  `

  resend.emails.send({
    from: "PopcornPass <onboarding@resend.dev>",
    to: booking.user.email,
    subject: "🎬 Booking Confirmed — " + movieTitle + " | PopcornPass",
    html: html
  })
    .then(function (data) {
      console.log("Confirmation email sent:", data.id)
    })
    .catch(function (err) {
      console.log("Email send error:", err.message)
    })
}

module.exports = { sendBookingConfirmation }