import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Next.js is actual framework and no Liquid theme',()=>{const p=JSON.parse(read('package.json'));assert.ok(p.dependencies.next);assert.ok(!existsSync(new URL('../layout/theme.liquid',import.meta.url)));});
test('Shopify private token server-only',()=>{const client=read('lib/shopify/client.ts');assert.ok(client.includes('Shopify-Storefront-Private-Token'));assert.ok(client.includes('server-only'));assert.ok(!client.includes('NEXT_PUBLIC_'));});
test('full Trading Co. approved 1536x512 logo unchanged',()=>{const p=readFileSync(new URL('../public/brand/smoky-mountain-trading-co-logo.jpg',import.meta.url));const ref=readFileSync(new URL('../reference/approved-logo-original.jpg',import.meta.url));assert.equal(Buffer.compare(p,ref),0)});
test('mobile logo width exactly 65vw',()=>{assert.match(read('app/globals.css'),/\.logo\{width:65vw/);});
test('native Shopify checkout and bundle preview guard',()=>{assert.ok(read('app/actions.ts').includes('checkoutUrl'));assert.ok(read('app/build-a-crate/page.tsx').includes('not enabled'))});
test('no legacy supply mockup assets in public',()=>{assert.equal(existsSync(new URL('../public/mockup-2.jpg',import.meta.url)),false)});
