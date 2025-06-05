
"use client";

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
  asMenuItem?: boolean;
}

export function LogoutButton({ 
  variant = 'ghost', 
  size = 'default', 
  showIcon = true, 
  showText = true, 
  className = '',
  asMenuItem = false 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await signOut();
      
      if (result.success) {
        // Redirect to signin page after successful logout
        router.push('/signin');
      } else {
        console.error('Logout failed:', result.error);
        // Even if signOut fails, redirect to signin
        router.push('/signin');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: redirect anyway
      router.push('/signin');
    } finally {
      setIsLoading(false);
    }
  };

  if (asMenuItem) {
    return (
      <div 
        onClick={handleLogout}
        className={`flex items-center cursor-pointer px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm ${className}`}
      >
        {showIcon && <LogOut className="mr-2 h-4 w-4 text-red-500" />}
        {showText && <span className="text-gray-700">Log out</span>}
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={`${className}`}
    >
      {showIcon && <LogOut className={`h-4 w-4 ${showText ? 'mr-2' : ''} text-red-500`} />}
      {showText && <span>{isLoading ? 'Signing out...' : 'Log out'}</span>}
    </Button>
  );
}
