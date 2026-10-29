import { config } from 'dotenv';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
config({path:'.env.local',quiet:true});
const mode=process.argv[2];
const sql=mode==='file'?readFileSync(process.argv[3],'utf8'):process.argv[3];
if(!sql) throw new Error('Provide a SQL file or query');
let last='No database connection configured';
for(const connection of [...new Set([process.env.POSTGRES_URL_NON_POOLING,process.env.POSTGRES_URL,process.env.POSTGRES_PRISMA_URL].filter(Boolean))]) {
 const url=new URL(connection);
 const result=spawnSync('psql',['-X','-v','ON_ERROR_STOP=1','-At'],{input:sql,encoding:'utf8',env:{...process.env,PGHOST:url.hostname,PGPORT:url.port||'5432',PGDATABASE:url.pathname.slice(1),PGUSER:decodeURIComponent(url.username),PGPASSWORD:decodeURIComponent(url.password),PGSSLMODE:'require',PGCONNECT_TIMEOUT:'8'},timeout:90000,maxBuffer:4*1024*1024});
 if(result.status===0){console.log(result.stdout);process.exit(0);}
 last=(result.stderr||result.error?.message||'Database operation failed').split(decodeURIComponent(url.password)).join('[redacted]');
 // Only retry connection failures; SQL errors must not re-run migrations.
 if(!/could not|connection|resolve|timeout|timed out|network/i.test(last)) break;
}
console.error(last);process.exit(1);
