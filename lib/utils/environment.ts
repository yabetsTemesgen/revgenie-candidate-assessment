
export function getCurrentBaseUrl(): string {
  // Check if we're on the client side
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Server side - determine environment
  const isDev = process.env.NODE_ENV === 'development';
  const replitUrl = process.env.NEXT_PUBLIC_DEV_URL;
  const prodUrl = process.env.NEXT_PUBLIC_PROD_URL;
  
  // If we have a Replit URL and we're in development, use it
  if (isDev && replitUrl) {
    return replitUrl;
  }
  
  // Otherwise use production URL
  return prodUrl || replitUrl || 'http://localhost:3000';
}

export function getAuthCallbackUrl(): string {
  return `${getCurrentBaseUrl()}/auth/callback`;
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
