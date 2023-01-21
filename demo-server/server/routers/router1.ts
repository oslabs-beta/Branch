import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router1 = new Router();

router1
  .get('/')
  .post('/pasta');
