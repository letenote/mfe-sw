import { importShared } from './__federation_fn_import-2d46ca1b.js';
import { j as jsx } from './__federation_expose_Button-d4500f0d.js';
import { r as reactDomExports } from './index-ebe3b9e0.js';
import App from './__federation_expose_App-8d522341.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const index = '';

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
);
