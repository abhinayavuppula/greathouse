// Mock resend to allow local development without a real key
const resend = {
  emails: {
    send: async (data: any) => {
      console.log('--- MOCK EMAIL SENT ---');
      console.log('To:', data.to);
      console.log('Subject:', data.subject);
      console.log('-----------------------');
      return { id: 'mock_id' };
    }
  }
} as any;

const FROM_EMAIL = 'Great Houses India <noreply@greathouses.in>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@greathouses.in'
const CMS_URL = process.env.CMS_URL || 'http://localhost:5174'

function brandWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:'Jost',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#1a1a1a;padding:32px 40px;text-align:center;border-radius:4px 4px 0 0;">
              <p style="margin:0;color:#c9a96e;font-family:Georgia,serif;font-size:22px;letter-spacing:0.15em;text-transform:uppercase;">Great Houses India</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:12px;letter-spacing:0.1em;opacity:0.7;">CRAFTED FOR THE EXTRAORDINARY</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-radius:0 0 4px 4px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;text-align:center;">
              <p style="margin:0;color:#6b7280;font-size:12px;">© 2025 Great Houses India · 12, Jubilee Hills, Hyderabad 500033</p>
              <p style="margin:8px 0 0;color:#6b7280;font-size:12px;">
                <a href="https://instagram.com/greathousesindia" style="color:#c9a96e;text-decoration:none;">Instagram</a> &nbsp;·&nbsp;
                <a href="https://pinterest.com/greathousesindia" style="color:#c9a96e;text-decoration:none;">Pinterest</a> &nbsp;·&nbsp;
                <a href="mailto:hello@greathouses.in" style="color:#c9a96e;text-decoration:none;">hello@greathouses.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function goldButton(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background-color:#c9a96e;color:#1a1a1a;text-decoration:none;padding:14px 28px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;border-radius:2px;margin-top:24px;">${label}</a>`
}

interface SendNewInquiryAdminParams {
  inquiryId: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  productName?: string
  productSlug?: string
}

export async function sendNewInquiryAdmin(params: SendNewInquiryAdminParams) {
  const { inquiryId, name, email, phone, subject, message, productName, productSlug } = params

  const productLine = productName
    ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f5f0e8;">Product</td><td style="padding:8px 0;color:#1a1a1a;font-size:14px;"><a href="${process.env.FRONTEND_URL}/product/${productSlug}" style="color:#c9a96e;">${productName}</a></td></tr>`
    : ''

  const content = `
    <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;color:#1a1a1a;font-weight:400;">New Inquiry Received</h1>
    <p style="color:#6b7280;font-size:14px;margin:0 0 32px;">A new inquiry has been submitted through the Great Houses website.</p>
    
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f5f0e8;">Name</td><td style="padding:8px 0;color:#1a1a1a;font-size:14px;font-weight:500;">${name}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f5f0e8;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#c9a96e;text-decoration:none;">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f5f0e8;">Phone</td><td style="padding:8px 0;color:#1a1a1a;font-size:14px;">${phone}</td></tr>` : ''}
      ${subject ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f5f0e8;">Subject</td><td style="padding:8px 0;color:#1a1a1a;font-size:14px;">${subject}</td></tr>` : ''}
      ${productLine}
    </table>
    
    <div style="margin-top:24px;padding:20px;background-color:#f5f0e8;border-radius:4px;">
      <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
      <p style="margin:0;color:#1a1a1a;font-size:14px;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
    </div>
    
    ${goldButton('View in CMS', `${CMS_URL}/inquiries/${inquiryId}`)}
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Inquiry from ${name}${subject ? ` — ${subject}` : ''}`,
    html: brandWrapper(content),
  })
}

interface SendInquiryConfirmationParams {
  name: string
  email: string
  message: string
}

export async function sendInquiryConfirmation(params: SendInquiryConfirmationParams) {
  const { name, email, message } = params

  const content = `
    <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;color:#1a1a1a;font-weight:400;">Thank You, ${name}</h1>
    <p style="color:#6b7280;font-size:14px;margin:0 0 24px;line-height:1.6;">We have received your inquiry and a Great Houses consultant will be in touch within 24 hours.</p>
    
    <div style="margin:24px 0;padding:20px;background-color:#f5f0e8;border-radius:4px;">
      <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Your Message</p>
      <p style="margin:0;color:#1a1a1a;font-size:14px;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
    </div>
    
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin-top:24px;">In the meantime, if you have an urgent question, please call us at <strong>+91 98765 43210</strong> or WhatsApp us at the same number.</p>
    
    ${goldButton('Browse Our Collection', process.env.FRONTEND_URL || 'https://greathouses.in')}
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your Great Houses Inquiry — We\'ll Be in Touch',
    html: brandWrapper(content),
  })
}

interface SendNewsletterWelcomeParams {
  email: string
  unsubscribeToken: string
  featuredProducts?: Array<{ name: string; price: string; slug: string; imageUrl?: string }>
}

export async function sendNewsletterWelcome(params: SendNewsletterWelcomeParams) {
  const { email, unsubscribeToken, featuredProducts = [] } = params
  const unsubscribeUrl = `${process.env.FRONTEND_URL || 'https://greathouses.in'}/api/newsletter/unsubscribe?token=${unsubscribeToken}`

  const productsHtml = featuredProducts.length > 0
    ? `<table style="width:100%;border-collapse:collapse;margin-top:32px;">
        <tr><td colspan="3" style="padding-bottom:16px;"><p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Featured Pieces</p></td></tr>
        ${featuredProducts.slice(0, 3).map((p) => `
          <td style="width:33%;padding:8px;vertical-align:top;text-align:center;">
            ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" style="width:100%;border-radius:2px;margin-bottom:8px;">` : ''}
            <p style="margin:0 0 4px;font-size:14px;color:#1a1a1a;">${p.name}</p>
            <p style="margin:0 0 8px;font-size:12px;color:#c9a96e;">₹${parseInt(p.price).toLocaleString('en-IN')}</p>
            <a href="${process.env.FRONTEND_URL}/product/${p.slug}" style="font-size:11px;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.08em;">View Piece →</a>
          </td>
        `).join('')}
      </table>`
    : ''

  const content = `
    <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:28px;color:#1a1a1a;font-weight:400;">Welcome to the Great Houses Circle</h1>
    <p style="color:#c9a96e;font-size:14px;margin:0 0 24px;letter-spacing:0.05em;">You're now part of something extraordinary</p>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 16px;">As a member of the Great Houses Circle, you'll be among the first to discover new collections, receive exclusive insights into Indian craft traditions, and receive invitations to private events at our Hyderabad showroom.</p>
    ${productsHtml}
    ${goldButton('Explore the Collection', process.env.FRONTEND_URL || 'https://greathouses.in')}
    <p style="margin-top:32px;color:#6b7280;font-size:11px;text-align:center;"><a href="${unsubscribeUrl}" style="color:#6b7280;">Unsubscribe from this list</a></p>
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Welcome to the Great Houses Circle',
    html: brandWrapper(content),
  })
}

export async function sendUnsubscribeConfirmation(email: string) {
  const content = `
    <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;color:#1a1a1a;font-weight:400;">You've Been Unsubscribed</h1>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px;">We've removed you from the Great Houses Circle newsletter. You won't receive any further emails from us.</p>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;">Changed your mind? You can always <a href="${process.env.FRONTEND_URL}" style="color:#c9a96e;">re-subscribe on our website</a>.</p>
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'You\'ve Been Unsubscribed — Great Houses India',
    html: brandWrapper(content),
  })
}
