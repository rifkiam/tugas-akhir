const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 5001;

app.use(express.json());

app.post('/scale', (req, res) => {
  const { service, replicas } = req.body;

  if (!service || typeof replicas !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid service/replicas' });
  }

  const command = `docker service scale ${service}=${replicas}`;
  console.log(`Executing: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: stderr.trim() });
    }

    console.log(`Success: ${stdout}`);
    return res.json({ message: `Scaled ${service} to ${replicas} replicas.` });
  });
});

app.listen(PORT, () => {
  console.log(`Docker scale webhook running on http://localhost:${PORT}`);
});