import { guardianAuth, type GuardianAuthConfig } from 'svelte-guardian';
import { prisma } from '$lib/server/db';
import { env } from '$env/dynamic/private';
import { PrismaAdapter } from '@auth/prisma-adapter';

const adapter = PrismaAdapter(prisma);

export const { handle, signIn, signOut, middleware, createUser } = await guardianAuth({
	database: {
		type: 'custom',
		adapter
	},
	providers: {
		google: {
			enabled: true
		},
		credentials: {
			additionalUserFields: ['role', 'premium', 'premiumUntil'],
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
			from: 'Modo AI <modoai@mudiageo.tech>',
			auth: {
				method: 'app-password',
				user: env.GMAIL_USER,
				appPass: env.GMAIL_APP_PASSWORD
			}
		},
		routeProtection: {
			protectedRoutes: {
				'/auth/onboarding': {
					redirectPath: '/signin'
				},
				'/app': {
					authenticated: true,
					redirectPath: '/welcome'
				}
			},
			publicRoutes: {
				'/signin': {
					redirectPath: '/dashboard'
				},
				'/signup': {}
			},
			redirectPath: '/welcome',
			authenticatedRedirect: '/app',
			roleKey: 'role'
		}
	},
	pages: {
		signIn: '/signin'
	}
} satisfies GuardianAuthConfig);
