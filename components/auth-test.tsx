
"use client";

import { useState } from 'react';
import { signUp, signIn, signOut, getCurrentUser } from '@/lib/auth';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AuthTest() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    setMessage('Signing up...');
    const result = await signUp(email, password, fullName);
    if (result.success) {
      setMessage('Sign up successful! Check your email for verification.');
    } else {
      setMessage(`Sign up failed: ${result.error}`);
    }
  };

  const handleSignIn = async () => {
    setMessage('Signing in...');
    // Get redirect parameter from URL for test component too
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirectedFrom') || '/dashboard';
    
    const result = await signIn(email, password, redirectTo);
    if (result.success) {
      setMessage('Sign in successful!');
    } else {
      setMessage(`Sign in failed: ${result.error}`);
    }
  };

  const handleSignOut = async () => {
    setMessage('Signing out...');
    const result = await signOut();
    if (result.success) {
      setMessage('Signed out successfully!');
    } else {
      setMessage(`Sign out failed: ${result.error}`);
    }
  };

  const handleGetUser = async () => {
    const { user, error } = await getCurrentUser();
    if (user) {
      setMessage(`Current user: ${user.email} (ID: ${user.id})`);
    } else {
      setMessage(`No user found: ${error || 'Not authenticated'}`);
    }
  };

  if (isLoading) {
    return <div>Loading authentication state...</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Authentication Test</CardTitle>
        <CardDescription>
          Test the Supabase authentication functionality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleSignUp} variant="outline">
            Sign Up
          </Button>
          <Button onClick={handleSignIn}>
            Sign In
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
          <Button onClick={handleGetUser} variant="outline">
            Get User
          </Button>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <h4 className="font-semibold">Auth Status:</h4>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>User: {user?.email || 'None'}</p>
          <p>User ID: {user?.id || 'None'}</p>
        </div>

        {message && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm">{message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
