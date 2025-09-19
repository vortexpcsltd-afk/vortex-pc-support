'use client'

import React from 'react'

// Import with error handling
let notificationService: any = null
try {
  const notificationModule = require('../../lib/notification-service')
  notificationService = notificationModule.notificationService
} catch (error) {
  console.warn('Notification service not available:', error)
}

export default function NotificationSettings() {
  const [webhookUrl, setWebhookUrl] = React.useState('')
  const [adminEmail, setAdminEmail] = React.useState('kevin@vortexpcs.com')
  const [notificationPermission, setNotificationPermission] = React.useState(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  )

  const requestBrowserNotifications = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
    }
  }

  const testNotifications = async () => {
    try {
      if (notificationService) {
        await notificationService.testNotifications()
        alert('Test notifications sent! Check your browser, email, and webhook endpoints.')
      } else {
        alert('Notification service not available.')
      }
    } catch (error) {
      console.error('Test failed:', error)
      alert('Test failed. Check the console for details.')
    }
  }

  const handleAdminEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminEmail(e.target.value)
  }

  const handleWebhookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
          <p className="text-gray-600 mt-2">Configure how you want to be notified about new user registrations.</p>
        </div>

        <div className="space-y-8">
          {/* Browser Notifications */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Browser Notifications</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get instant browser notifications when new users sign up.
            </p>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                notificationPermission === 'granted' ? 'bg-green-100 text-green-800' :
                notificationPermission === 'denied' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {notificationPermission === 'granted' ? 'Enabled' :
                 notificationPermission === 'denied' ? 'Blocked' : 'Not Set'}
              </span>
              {notificationPermission !== 'granted' && (
                <button
                  onClick={requestBrowserNotifications}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Enable Notifications
                </button>
              )}
            </div>
          </div>

          {/* Email Notifications */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-600 mb-4">
              Receive email alerts for new user registrations.
            </p>
            <div className="max-w-md">
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email Address
              </label>
              <input
                type="email"
                id="admin-email"
                value={adminEmail}
                onChange={handleAdminEmailChange}
                placeholder="kevin@vortexpcs.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Webhook Notifications */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Webhook Notifications</h3>
            <p className="text-sm text-gray-600 mb-4">
              Send notifications to Slack, Discord, or other services via webhook.
            </p>
            <div className="max-w-md">
              <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL (Optional)
              </label>
              <input
                type="url"
                id="webhook-url"
                value={webhookUrl}
                onChange={handleWebhookUrlChange}
                placeholder="https://hooks.slack.com/services/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                For Slack: Create an incoming webhook in your Slack workspace
              </p>
            </div>
          </div>

          {/* Test Notifications */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Test Notifications</h3>
            <p className="text-sm text-gray-600 mb-4">
              Send a test notification to verify your settings are working correctly.
            </p>
            <button
              onClick={testNotifications}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Send Test Notification
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will send test notifications using your current settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
