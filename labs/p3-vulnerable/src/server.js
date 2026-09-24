import express from 'express';
import { registerIdorChallenge } from './challenges/idor.js';

if (process.env.P3_CYBER_RANGE !== '1') {
  console.error('Set P3_CYBER_RANGE=1 to run the local training range.');
  process.exit(1);
}

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 31337);

const labUsers = [
  { id: 1, email: 'alice@p3.local', role: 'user' },
  { id: 2, email: 'bob@p3.local', role: 'user' }
];

const labLoans = [
  { id: 1001, borrowerId: 1, amount: 150, status: 'current' },
  { id: 1002, borrowerId: 2, amount: 200, status: 'current' }
];

app.get('/', (_req, res) => {
  res.type('html').send('<h1>P3 Cyber Range</h1><p>Local training environment</p>');
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'p3-cyber-range' });
});

app.get('/api/lab/users', (_req, res) => {
  res.json(labUsers);
});

app.get('/api/lab/loans', (_req, res) => {
  res.json(labLoans);
});

registerIdorChallenge(app, labLoans);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`P3 Cyber Range listening on http://127.0.0.1:${PORT}`);
  console.log('Training only. Keep this service isolated.');
});
