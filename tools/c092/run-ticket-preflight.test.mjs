import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateTicketAuthorityReference as valid} from './run-ticket-preflight.mjs';
const repo='/srv/test/project';
const input=(relative,writerPrompt=`Read ${relative}. No push, merge or deploy.`)=>({repo,authorityPath:repo+'/'+relative,writerPrompt});
test('approved repo-local Markdown, not only legacy LAB docs/metis',()=>{
 for(const name of ['docs/metis/QA-005.md','docs/trains/T40.md','docs/handoffs/TICKET.md','work-orders/real-ticket.md'])
  assert.equal(valid(input(name)),true,name);
});
test('reject outside, hidden git internals, no authority binding, forbidden extension',()=>{
 for(const name of ['../other/TICKET.md','../../tmp/secret.md','.git/config.md','docs/file.txt','docs/../private.md'])
  assert.equal(valid(input(name)),false,name);
 assert.equal(valid(input('docs/trains/T40.md','No push')),false);
 assert.equal(valid(input('docs/trains/T40.md','Read docs/trains/T40.md and push.')),false);
});
