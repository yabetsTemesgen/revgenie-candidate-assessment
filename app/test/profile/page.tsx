
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfileTestPage() {
  const [getResult, setGetResult] = useState<any>(null)
  const [postResult, setPostResult] = useState<any>(null)
  const [loading, setLoading] = useState<{ get: boolean; post: boolean }>({
    get: false,
    post: false
  })

  const testGetProfile = async () => {
    setLoading(prev => ({ ...prev, get: true }))
    try {
      const response = await fetch('/api/test/profile')
      const data = await response.json()
      setGetResult(data)
    } catch (error) {
      setGetResult({ error: error.message })
    } finally {
      setLoading(prev => ({ ...prev, get: false }))
    }
  }

  const testCreateProfile = async () => {
    setLoading(prev => ({ ...prev, post: true }))
    try {
      const response = await fetch('/api/test/profile', {
        method: 'POST'
      })
      const data = await response.json()
      setPostResult(data)
    } catch (error) {
      setPostResult({ error: error.message })
    } finally {
      setLoading(prev => ({ ...prev, post: false }))
    }
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Profile API Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GET Test */}
        <Card>
          <CardHeader>
            <CardTitle>GET Profile Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testGetProfile}
              disabled={loading.get}
              className="w-full"
            >
              {loading.get ? 'Testing...' : 'Test GET /api/test/profile'}
            </Button>
            {getResult && (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                {JSON.stringify(getResult, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>

        {/* POST Test */}
        <Card>
          <CardHeader>
            <CardTitle>POST Profile Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testCreateProfile}
              disabled={loading.post}
              className="w-full"
              variant="outline"
            >
              {loading.post ? 'Creating...' : 'Test POST /api/test/profile'}
            </Button>
            {postResult && (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
                {JSON.stringify(postResult, null, 2)}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>GET test:</strong> Retrieves your current profile (should be null initially)</li>
            <li><strong>POST test:</strong> Creates a test company and profile for your user</li>
            <li>After running POST, run GET again to see the created data</li>
            <li>Check your Supabase dashboard to see the data in the tables</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
