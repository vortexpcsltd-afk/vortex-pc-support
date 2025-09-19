'use client'

import React from 'react'
import { notificationService } from '@/lib/notification-service'

interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin' | 'technician'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {}
}

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const mockUser: User = {
          id: '1',
          name: 'Kevin Smith',
          email: 'kevin@vortexpcs.com',
          role: 'admin'
        }
        setUser(mockUser)
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockUser: User = {
        id: '1',
        name: 'Kevin Smith',
        email: email,
        role: 'admin'
      }
      setUser(mockUser)
    } catch (error) {
      throw new Error('Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: 'customer'
      }
      
      // Send notification about new user signup
      await notificationService.notifySignUp({
        userId: newUser.id,
        userName: newUser.name,
        userEmail: newUser.email,
        signUpDate: new Date(),
        userRole: newUser.role
      })

      setUser(newUser)
    } catch (error) {
      throw new Error('Sign up failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
