import test from 'node:test';import assert from 'node:assert/strict';
import {isShopifyGid,validQuantity,validGiftNote,domainIsSafe} from '../lib/guards.mjs';
test('GIDs are restricted to expected resource type',()=>{assert.equal(isShopifyGid('gid://shopify/ProductVariant/1234','ProductVariant'),true);assert.equal(isShopifyGid('gid://shopify/CartLine/999','CartLine'),true);assert.equal(isShopifyGid('gid://shopify/CartLine/%invalid','CartLine'),false);});
test('quantities bounded',()=>{assert.equal(validQuantity('3'),3);assert.equal(validQuantity('0'),0);assert.equal(validQuantity('26'),null);assert.equal(validQuantity('3.5'),null);assert.equal(validQuantity('banana'),null)});
test('gift notes trimmed and capped',()=>{assert.equal(validGiftNote(' hello '),'hello');assert.equal(validGiftNote('a'.repeat(300)).length,220)});
test('only myshopify store domain',()=>{assert.equal(domainIsSafe('store-name.myshopify.com'),true);assert.equal(domainIsSafe('store-name.myshopify.com.attacker.com'),false);assert.equal(domainIsSafe('https://myshopify.com'),false)});
