import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import * as React from "react";
// jest.setup.ts
jest.mock("@/constants/env", () => ({
  BASE_URL: "http://localhost:8080",
}));
jest.mock("lucide-react", () => {
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        return (props: any) =>
          React.createElement("svg", { ...props, "data-icon": String(prop) });
      },
    }
  );
});

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
