import net from 'net';
import readline from 'readline';

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.connect(9000, '127.0.0.1', () => {
  console.log('Client connected on port 9000');

  rl.addListener('line', line => {
    client.write(line);
  });

  client.on('data', data => {
    console.log(`Server response: ${data}`);
  });

  client.on('end', () => {
    console.log('END CONNECTION');
    client.end();
    process.exit(1);
  });

  client.on('error', (err: Error) => {
    console.log(err.stack);
    client.end();
    process.exit(1);
  });
});
