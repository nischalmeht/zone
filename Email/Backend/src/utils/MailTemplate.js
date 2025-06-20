export const Mail = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We Miss You!</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; margin: 30px auto; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #004aad; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h2>We Miss You at {{CompanyName}}!</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p>Hi <strong>{{CustomerName}}</strong>,</p>
        <p>We sincerely appreciate your previous order worth over <strong>₹1,00,000</strong> — thank you for your trust and support!</p>
        <p>It’s been more than <strong>60 days</strong> since your last purchase, and we truly miss having you with us.</p>
        <p>To welcome you back, we’d love to offer you an exclusive reward:</p>
        
        <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #004aad; margin: 20px 0;">
          🎁 <strong>{{Insert Your Offer Here}}</strong>
        </div>

        <p>Explore our latest offerings and enjoy this special benefit before it expires!</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{ShopNowLink}}" style="background-color: #004aad; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">Shop Now</a>
        </div>

        <p>If you have any questions or need assistance, feel free to reply to this email. We're always here to help.</p>

        <p style="margin-top: 30px;">Warm regards,<br/>
        <strong>{{Your Name}}</strong><br/>
        Customer Success Team<br/>
        {{CompanyName}}<br/>
        <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f4f4f4; text-align: center; padding: 15px; font-size: 12px; color: #888;">
        © {{Year}} {{CompanyName}}. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`