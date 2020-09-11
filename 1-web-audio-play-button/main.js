// web audio uses audio context 
var audioCtx;

// link playButton to an HTML element <button>
const playButton = document.querySelector('button');

// user interaction
playButton.addEventListener('click', function() {
    // 2 options because some browser doesn't take audio context
    audioCtx = new (window.AudioContext || window.webkitAudioContext);

    var osc = audioCtx.createOscillator();
    // createOscillator() is what plays the sound
    // it generates a wave
    osc.connect(audioCtx.destination);
    osc.start();

}, false)

/*
Two ways of generating waves:
1. Wavetable Synthesis
- web audio does allow us to do wavetable synthesis
- we can fill the wavetable with random values
- There is a way to set sample rate and bit depth,
but web audio has its own default values already,
we can use that.

2. Direct Computation
- setSpeaker(Math.sin(time)) will be an issue because
our sample rate is 44.1kHz and we have to make sure
the while loop is running at that frequency.

- Sine is calculated approximately with power series.
We can approximate it by adding many many terms, but
the runtime is expensive and slow. So rather than computation,
we would prefer wavetable synthesis.
*/