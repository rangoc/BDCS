/**
 * Branded Email Template for BDCS Contact Form Notifications
 *
 * Inline CSS for maximum email client compatibility.
 * Matches the site's dark primary + gold accent brand identity.
 */

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function contactNotificationEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps): string {
  const timestamp = new Date().toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Podgorica",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #F3F4F6;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%;">

          <!-- Header: Dark with gold accent line -->
          <tr>
            <td style="background-color: #1A1849; border-radius: 12px 12px 0 0; padding: 0;">
              <!-- Gold top line -->
              <div style="height: 3px; background: linear-gradient(90deg, transparent 0%, #AE9751 20%, #BEAA6E 50%, #AE9751 80%, transparent 100%);"></div>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding: 32px 40px 32px;">
                    <h1 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                      New Contact Form Submission
                    </h1>
                    <p style="margin: 8px 0 0; font-size: 14px; color: #9CA3AF; line-height: 1.5;">
                      Received on ${timestamp}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body: White card -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">

                <!-- Subject -->
                <tr>
                  <td style="padding: 32px 40px 0;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #AE9751;">Subject</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: #1A1849; line-height: 1.4;">${escapeHtml(subject)}</p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <div style="height: 1px; background-color: #E5E7EB;"></div>
                  </td>
                </tr>

                <!-- From -->
                <tr>
                  <td style="padding: 0 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-bottom: 20px;">
                          <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #AE9751;">From</p>
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1A1849;">${escapeHtml(name)}</p>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-bottom: 20px;">
                          <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #AE9751;">Email</p>
                          <p style="margin: 0; font-size: 15px; color: #1A1849;">
                            <a href="mailto:${escapeHtml(email)}" style="color: #1A1849; text-decoration: none;">${escapeHtml(email)}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 40px 20px;">
                    <div style="height: 1px; background-color: #E5E7EB;"></div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #AE9751;">Message</p>
                    <p style="margin: 0; font-size: 15px; color: #333333; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>

                <!-- Reply CTA -->
                <tr>
                  <td style="padding: 0 40px 32px;">
                    <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(subject)}" style="display: inline-block; padding: 12px 28px; background-color: #AE9751; color: #0A0819; font-size: 13px; font-weight: 600; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
                      Reply to ${escapeHtml(name.split(" ")[0])}
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A1849; border-radius: 0 0 12px 12px; padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; color: #9CA3AF; line-height: 1.5;">
                      BD Corporate Services d.o.o. Podgorica
                    </p>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #6B7280; line-height: 1.5;">
                      Podgorica, Montenegro &middot; Sarajevo, Bosnia and Herzegovina
                    </p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <a href="https://www.bdcs.me" style="font-size: 12px; color: #AE9751; text-decoration: none;">bdcs.me</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
