import { test } from 'node:test'
import assert from 'node:assert/strict'
import { api } from '../lib/api'

// Basic integration test for the simulated login flow

test('login returns user data and token', async () => {
  const { user, token } = await api.auth.login('test@example.com', 'secret')
  assert.equal(user.email, 'test@example.com')
  assert.equal(token, 'mock-jwt-token')
})
