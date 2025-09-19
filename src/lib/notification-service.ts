interface SignUpNotification {
  userId: string
  userName: string
  userEmail: string
  signUpDate: Date
  userRole: 'customer' | 'admin' | 'technician'
}

interface NotificationOptions {
  email?: boolean
  browser?: boolean
  webhook?: boolean
}

class NotificationService {
  private webhookUrl?: string
  private adminEmail?: string

  constructor() {
    // You can set these from environment variables or config
    this.webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
    this.adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'kevin@vortexpcs.com'
  }

  async notifySignUp(userData: SignUpNotification, options: NotificationOptions = {}) {
    const notifications = []

    // Email notification
    if (options.email !== false) {
      notifications.push(this.sendEmailNotification(userData))
    }

    // Browser notification (if permission granted)
    if (options.browser !== false) {
      notifications.push(this.sendBrowserNotification(userData))
    }

    // Webhook notification (for integrations like Slack, Discord, etc.)
    if (options.webhook !== false && this.webhookUrl) {
      notifications.push(this.sendWebhookNotification(userData))
    }

    // Console log for development
    console.log('🎉 New User Sign Up:', {
      name: userData.userName,
      email: userData.userEmail,
      role: userData.userRole,
      date: userData.signUpDate.toISOString()
    })

    try {
      await Promise.allSettled(notifications)
    } catch (error) {
      console.error('Failed to send some notifications:', error)
    }
  }

  private async sendEmailNotification(userData: SignUpNotification) {
    // Mock email service - replace with your actual email service
    const emailData = {
      to: this.adminEmail,
      subject: `🎉 New User Registration - ${userData.userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New User Registration</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${userData.userName}</p>
            <p><strong>Email:</strong> ${userData.userEmail}</p>
            <p><strong>Role:</strong> ${userData.userRole}</p>
            <p><strong>Sign Up Date:</strong> ${userData.signUpDate.toLocaleString()}</p>
          </div>
          <p>A new user has registered for Vortex PC Support. You may want to reach out to welcome them!</p>
          <hr style="margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            This notification was sent from your Vortex PC Support system.
          </p>
        </div>
      `
    }

    // Mock API call - replace with your email service
    return fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    }).catch(error => {
      console.log('Email service not configured, notification logged to console')
    })
  }

  private async sendBrowserNotification(userData: SignUpNotification) {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      // Request permission if not already granted
      if (Notification.permission === 'default') {
        await Notification.requestPermission()
      }

      if (Notification.permission === 'granted') {
        new Notification('New User Registration', {
          body: `${userData.userName} (${userData.userEmail}) just signed up!`,
          icon: '/favicon.ico',
          tag: 'user-signup'
        })
      }
    }
  }

  private async sendWebhookNotification(userData: SignUpNotification) {
    if (!this.webhookUrl) return

    const webhookData = {
      text: `🎉 New user registration on Vortex PC Support!`,
      attachments: [
        {
          color: 'good',
          fields: [
            { title: 'Name', value: userData.userName, short: true },
            { title: 'Email', value: userData.userEmail, short: true },
            { title: 'Role', value: userData.userRole, short: true },
            { title: 'Date', value: userData.signUpDate.toLocaleString(), short: true }
          ]
        }
      ]
    }

    return fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookData)
    }).catch(error => {
      console.error('Webhook notification failed:', error)
    })
  }

  // Method to test notifications
  async testNotifications() {
    const testData: SignUpNotification = {
      userId: 'test-123',
      userName: 'Test User',
      userEmail: 'test@example.com',
      signUpDate: new Date(),
      userRole: 'customer'
    }

    await this.notifySignUp(testData)
  }
}

export const notificationService = new NotificationService()
export type { SignUpNotification, NotificationOptions }
