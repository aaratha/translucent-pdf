<script>
import { onMount } from 'svelte';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import ThemeComponent from '../components/theme.svelte'; // Import the new component

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

	const fg = window.getComputedStyle(document.documentElement).getPropertyValue('--fg');
	const bg = window.getComputedStyle(document.documentElement).getPropertyValue('--bg');
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
	background: 'rgba(0,0,0,0)',
	pageColors: {background: 'rgba(0,0,0,0)', foreground: fg}
  };
  await page.render(renderContext);
});

function openNewWindow() {
    const newWindow = window.open(
      '/external.html',
      '',
      'titleBarStyle=hidden,transparent=true,width=300,height=450,backgroundColor=#00000000,vibrancy=hud, frame=false',
	);
    newWindow.focus();
  }

</script>

<div id="main">
	<div id="menu">
		<h1>Translucent PDF</h1>
		<button class="button">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
				<path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/>
			</svg>
		</button>
		<button class="button" on:click={openNewWindow}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
				<path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
				<path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7"/>
			</svg>
		</button>
		<button class="button">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
				<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
			</svg>
		</button>
	</div>
	<div id="viewer">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>
