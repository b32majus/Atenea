import path from 'node:path';
export function validateTicketAuthorityReference({repo,authorityPath,writerPrompt}) {
 if(typeof repo!=='string'||typeof authorityPath!=='string'||typeof writerPrompt!=='string')return false;
 // Reject authority spelling with explicit parent traversal before path.resolve normalizes it.
 if(authorityPath.split(/[\\/]+/).includes('..'))return false;
 const rel=path.relative(path.resolve(repo),path.resolve(authorityPath)).split(path.sep).join('/');
 if(!rel||rel==='.'||rel.startsWith('../')||path.posix.isAbsolute(rel)||
   rel.split('/').some(x=>!x||x==='.'||x==='..'||x==='.git')||!rel.endsWith('.md'))return false;
 return writerPrompt.includes(rel)&&writerPrompt.includes('No push');
}
