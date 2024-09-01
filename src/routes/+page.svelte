<script>
import { onMount } from 'svelte';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

let canvas;

onMount(async () => {
  const loadingTask = pdfjsLib.getDocument('example.pdf');
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
	background: 'rgba(0,0,0,0)'
  };
  await page.render(renderContext);
});
</script>

<canvas bind:this={canvas}></canvas>
