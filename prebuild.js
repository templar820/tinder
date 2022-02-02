import fs from 'fs';
import { exec } from 'child_process';

const port = process.env.PORT || 8000;

fs.writeFileSync(
  '.env',
  `VITE_BACKEND_PORT=${port}
  VITE_FRONTEND_PORT=3000
  `
);
exec('npm run build', () => {
  console.log('BUILD IS SUCCESS');
});
