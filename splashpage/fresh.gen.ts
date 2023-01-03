// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/about.tsx";
import * as $1 from "./routes/api/joke%202.ts";
import * as $2 from "./routes/api/joke.ts";
import * as $3 from "./routes/index.tsx";
import * as $$0 from "./islands/Footer.tsx";
import * as $$1 from "./islands/Header.tsx";

const manifest = {
  routes: {
    "./routes/about.tsx": $0,
    "./routes/api/joke%202.ts": $1,
    "./routes/api/joke.ts": $2,
    "./routes/index.tsx": $3,
  },
  islands: {
    "./islands/Footer.tsx": $$0,
    "./islands/Header.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
