import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeLinkRewrite } from '../lib/prestashop-api'

test('conversion a minusculas y reemplazo de espacios por guiones', () => {
  assert.strictEqual(sanitizeLinkRewrite('Hello World'), 'hello-world')
  assert.strictEqual(sanitizeLinkRewrite('Multiple   Spaces'), 'multiple-spaces')
})

test('eliminacion de caracteres no alfanumericos y guiones duplicados', () => {
  assert.strictEqual(sanitizeLinkRewrite('Hello !@# World--123'), 'hello-world-123')
  assert.strictEqual(sanitizeLinkRewrite('Clean___this'), 'clean___this')
})

test('manejo de cadenas vacias', () => {
  assert.strictEqual(sanitizeLinkRewrite(''), '')
  assert.strictEqual(sanitizeLinkRewrite('   '), '')
  assert.strictEqual(sanitizeLinkRewrite(String()), '')
})
