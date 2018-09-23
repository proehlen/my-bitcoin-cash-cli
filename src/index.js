import stack from './view/stack';
import NetworkSelection from './view/views/NetworkSelection';

stack.push(new NetworkSelection());
stack.render();

const { stdin } = process;
stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdin.on('data', async (key) => {
  await stack.handle(key);
  stack.render();
});
