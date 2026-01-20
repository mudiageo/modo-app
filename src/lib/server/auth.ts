import { guardianAuth, type GuardianAuthConfig } from 'svelte-guardian';
import { prisma as client } from '$lib/server/db';
import { building } from '$app/environment'
import { env } from '$env/dynamic/private'

export const { handle, signIn, signOut, middleware, createUser } = await guardianAuth({
	database: {
		type: 'prisma',
		client
	},
	providers: {
		google: {
			enabled: true
		},
		credentials: {
		  additionalUserFields: ['premium', 'premiumUntil'],
			allowRegistration: true,
			requireEmailVerification: true
		}
	},
	security: {
		maxLoginAttempts: 5,
		lockoutDuration: 15 * 60 * 1000, // 15 minutes
		emailVerification: {
			method: 'otp',
			otpLength: 6,
			otpExpiration: 15 // in minutes
		},
		passwordReset: {
			tokenExpiration: 15
		},
		twoFactorAuth: {
			method: 'totp',
			allowBackupCodes: true,
			backupCodeCount: 5
		},
		emailProvider: {
			type: 'nodemailer',
			service: 'gmail',
			from: 'MODO AI <modoai@gmail.com>',
			auth: {
				method: 'app-password',
				user: building ? '' : env.GMAIL_USER,
				appPass: building ? '' : env.GMAIL_APP_PASSWORD 
			}
		},
		routeProtection: {
			protectedRoutes: {
				'/auth/onboarding': {
					authenticated: true,
				},
				'/app': {
					authenticated: true,
				}
			},
			publicRoutes: {
				'/login': {
					redirectPath: '/app'
				},
				'/signup': {}
			},
			redirectPath: '/welcome',
			authenticatedRedirect: '/app',
		}
	},
	pages: {
		signIn: '/auth/signin',
		signUp: '/auth/signup'
	}
} satisfies GuardianAuthConfig);

