# fetchT

The way which is perfect type-safe fetch

Basic(fetchT)

```ts
import fetchT from "../fetchT";

interface Params {
  pathParams: {
    id: number;
  };
  queryParams: {
    q: string;
  };
}

interface Post {
  id: number;
}

const buildParams = (params: Params) => {
  return `${params.pathParams}/${params.queryParams}`;
};

const getPosts = fetchT(buildParams);

const posts = getPosts<Post[]>(
  {
    pathParams: {
      id: 1,
    },
    queryParams: {
      q: "1",
    },
  },
  {
    method: "GET",
    headers: {
      test: "",
    },
  }
);

const getPosts2 = fetchT<Post[], Params>(buildParams, {
  headers: {
    "api-token": process.env.API_TOKEN || "",
  },
});

interface CustomOption extends RequestInit {
  method: "GET";
  headers: {
    test: "";
  };
}

const getPosts3 = fetchT<Post[], Params, CustomOption>(buildParams);

const posts3 = getPosts3(
  {
    pathParams: {
      id: 1,
    },
    queryParams: {
      q: "1",
    },
  },
  {
    method: "GET",
    headers: {
      test: "",
    },
  }
);
```

with zod

```ts
import { z } from "zod";
import fetchZodT from "../fetchZodT";

interface Params {
  pathParams: {
    id: number;
  };
  queryParams: {
    q: string;
  };
}

interface Post {
  id: number;
}

const buildParams = (params: Params) => {
  return `${params.pathParams}/${params.queryParams}`;
};
const schema = z.array(
  z.object({
    id: z.number(),
  })
);
const getPosts4 = fetchZodT(schema)(buildParams);

const posts4 = getPosts4(
  {
    pathParams: {
      id: 1,
    },
    queryParams: {
      q: "1",
    },
  },
  {
    method: "GET",
  }
);
```
