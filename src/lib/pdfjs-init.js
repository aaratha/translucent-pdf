import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

import * as pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs';

GlobalWorkerOptions.workerSrc = import.meta.url + 'pdfjs-dist/legacy/build/pdf.worker.mjs';
