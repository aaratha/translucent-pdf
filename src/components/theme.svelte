<script>
    import { onMount } from 'svelte';
    import ColorPicker from 'svelte-awesome-color-picker';
    import Wrapper from './wrapper.svelte';

    let hex;
    let activeColor = 'bg';

    const colorVars = {
        bg: '--bg',
        fg: '--fg',
        'ui-bg': '--ui-bg',
        'ui-fg': '--ui-fg'
    };

    function getComputedColor(varName) {
        return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    }

    function updateColor(colorVar, value) {
        document.documentElement.style.setProperty(colorVars[colorVar], value);
        updateDisplayColor(colorVar);
    }

    function updateDisplayColor(colorVar) {
        const displayElement = document.getElementById(colorVar);
        if (displayElement) {
            const currentColor = getComputedColor(colorVars[colorVar]);
            displayElement.style.backgroundColor = currentColor;
        }
    }

    function handleColorChange(event) {
        const newColor = event.detail.hex;
        updateColor(activeColor, newColor);
    }

    function setActiveColor(color) {
        activeColor = color;
        hex = getComputedColor(colorVars[color]);
    }

    onMount(() => {
        Object.keys(colorVars).forEach(color => {
            updateDisplayColor(color);
        });
        setActiveColor('bg');
    });

    $: {
        if (hex) {
            updateColor(activeColor, hex);
        }
    }
</script>

<style>
    h1 {
        font-family: sans-serif;
        font-size: 18px;
        position: absolute;
        top: 2px;
        width: 100vw;
        text-align: center;
        color: var(--fg);
    }
    div {
        font-family: sans-serif;
    }
    .dragbar {
        -webkit-app-region: drag;
        position: absolute;
        z-index: 10;
        height: 10px;
        width: 100%;
    }
    #colors {
        position: absolute !important;
        right: 20px !important;
        top: 50px;
    }
    .color {
        width: 190px;
        height: 75px;
        border: 1px solid var(--fg);
        color: var(--fg);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        transition: all ease-in-out 0.05s;
        cursor: pointer;
    }
    .color:hover {
        background: var(--ui-bg);
    }
    .display {
        width: 55px;
        height: 55px;
        border-radius: 10px;
        border: 1px solid var(--fg);
        margin-left:10px;
        margin-right: 20px;
    }
    .active {
        border: 2px solid var(--fg);
    }
</style>

<div id="theme">
    <h1>Theme</h1>
    <div class="dragbar" />
    <ColorPicker
        bind:hex
        on:change={handleColorChange}
        components={{wrapper: Wrapper}}
        sliderDirection="horizontal"
        isDialog={false}
        --cp-bg-color="var(--bg)"
        --cp-border-color="var(--fg)"
        --cp-input-color="var(--ui-bg)"
        --cp-text-color="var(--fg)"
        --cp-button-hover-color="var(--ui-bg)"
        --slider-width="15px"
        --picker-indicator-size="15px"
        --focus-color="transparent"
        --input-size="10px"
    />
    <div id="colors">
        {#each Object.keys(colorVars) as color}
            <div class="color" class:active={activeColor === color} on:click={() => setActiveColor(color)}>
                <div id={color} class="display" />
                {color}
            </div>
        {/each}
    </div>
</div>
