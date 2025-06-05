
import { AuthForm } from '@/components/auth/auth-form';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5a17d6] to-[#7c3aed] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image 
              src="/logo/revgeni-logo.png" 
              alt="RevGeni Logo" 
              width={200} 
              height={64} 
              priority 
              className="object-contain"
            />
          </Link>
        </div>

        {/* Auth Form - defaults to sign up tab */}
        <AuthForm defaultTab="signup" />

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
