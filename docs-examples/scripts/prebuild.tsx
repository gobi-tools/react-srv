import ReactSrv from 'react-srv';
import Document from "../../docs-src/Document";

const srv = new ReactSrv({ Document, srcFolder: './src' });

srv.prebuild();