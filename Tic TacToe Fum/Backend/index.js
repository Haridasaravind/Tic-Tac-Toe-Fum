const { server, port } = require('./Server');

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
