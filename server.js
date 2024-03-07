import 'dotenv/config';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import FastifyJwt from '@fastify/jwt';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const users = [];

const __dirname = dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({
  logger: true
});

fastify.register(FastifyJwt, {
  secret: process.env.JWT_SECRET
});

fastify.register(FastifyStatic, {
  root: join(__dirname, './build/client'),
  wildcard: false
});

fastify.get('*', function (req, reply) {
  return reply.sendFile('index.html');
});

fastify.post('/api/login', {
  schema: {
    summary: 'authentication',
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string', minLength: 8 }
      },
      required: ['email', 'password']
    }
  }},
  async (req, reply) => {
    const user = users.find(user => user.email === req.body.email);

    if (user && user.password === req.body.password) {
      const token = fastify.jwt.sign({ email: req.body.email });

      return reply.send({ token });
    }

    reply.status(401).send({ error: 'Invalid credentials!' });
  }
);

fastify.post('/api/sign-up', {
  schema: {
    summary: 'registration',
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string', minLength: 8 }
      },
      required: ['email', 'password']
    }
  }},
  (req, reply) => {
    const user = users.find(user => user.email === req.body.email);

    if (user) {
      return reply.status(409).send({ error: 'The email is already taken!' });
    }

    users.push({ 
      email: req.body.email,
      password: req.body.password
    });

    reply.send({ message: 'Your account was successfully created!'});
  }
);

fastify.get('/api/users', 
  (req, reply) => {
    reply.send(users);
  }
);

fastify.setNotFoundHandler((req, reply) => {
  reply.code(404).send('Page not found.');
});

try {
  await fastify.listen({ port: process.env.PORT });
} catch (error) {
  fastify.log.error(error);

  process.exit(1);
}
