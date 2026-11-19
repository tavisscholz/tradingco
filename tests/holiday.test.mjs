import test from 'node:test';import assert from 'node:assert/strict';
import {paletteFor,easternParts,lastMondayInMay,isPatrioticDay} from '../lib/holiday.mjs';
test('Memorial Monday computed',()=>{assert.equal(lastMondayInMay(2026),25);assert.equal(lastMondayInMay(2027),31)});
test('holiday calendar explicit',()=>{for(const [month,day] of [[5,25],[6,14],[7,4],[11,11]])assert.equal(isPatrioticDay({year:2026,month,day}),true)});
test('ordinary days are green',()=>{assert.equal(paletteFor(new Date('2026-11-17T16:00:00Z')),'everyday')});
test('Eastern date midnight boundary',()=>{assert.equal(paletteFor(new Date('2026-07-04T02:30:00Z')),'everyday');assert.equal(paletteFor(new Date('2026-07-04T06:00:00Z')),'patriotic')});
