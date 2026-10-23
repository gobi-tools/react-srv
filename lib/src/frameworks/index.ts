import { FrameworkAdapter } from "./framework.js";
import { PreactAdapter } from "./preact.js";
import { ReactAdapter } from "./react.js";

export const FRAMEWORK_ADAPTERS: Record<TSupportedFramework, FrameworkAdapter> = {
  react: new ReactAdapter(),
  preact: new PreactAdapter(),
};

export const FALLBACK_FRAMEWORK: TSupportedFramework = 'react';

export type TSupportedFramework = "react" | "preact";

