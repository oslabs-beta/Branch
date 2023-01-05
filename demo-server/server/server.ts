// https://deno.land/x/oak@v11.1.0
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const PORT = 3000;
const app = new Application();
const router = new Router();

router
  .get('/', ctx => {
    ctx.response.body = 'Hello World!';
  })
  .post('/', ctx => {
    ctx.response.body = 'Hello Post!';
  });

console.log(router.routes());
app.use(router.routes());

console.log(`listening on ${PORT}`);
await app.listen({port: PORT});
