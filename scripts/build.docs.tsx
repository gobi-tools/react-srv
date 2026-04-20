import ReactSrv2 from '../src';
import path from "path";
import Document from "../docs-src/Document";
import { fileURLToPath } from 'url';

/* re-create __dirname */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srv = new ReactSrv2({ Document });

srv.prerender(path.join(__dirname, '../docs-src'), './public', './docs');