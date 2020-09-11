/*
 * Author: Rennah Weng @rennahweng
 * Date: 09/11/2020
 * 
 * Lab 1 - Build your own keyboard
 * For this lab I will build my own keyboard on the web using WebAudio. 
 * This gives a familiarity with the basic workflow and structure of working with WebAudio.
*/

// setup a gain node, 
// and give ourselves a bit of room to avoid clipping
document.addEventListener("DOMContentLoaded", function(event) {
    // initialize an audio context
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // a map from keys to frequencies
    const keyboardFrequencyMap = {
        '90': 261.625565300598634,  //Z - C
        '83': 277.182630976872096, //S - C#
        '88': 293.664767917407560,  //X - D
        '68': 311.126983722080910, //D - D#
        '67': 329.627556912869929,  //C - E
        '86': 349.228231433003884,  //V - F
        '71': 369.994422711634398, //G - F#
        '66': 391.995435981749294,  //B - G
        '72': 415.304697579945138, //H - G#
        '78': 440.000000000000000,  //N - A
        '74': 466.163761518089916, //J - A#
        '77': 493.883301256124111,  //M - B
        '81': 523.251130601197269,  //Q - C
        '50': 554.365261953744192, //2 - C#
        '87': 587.329535834815120,  //W - D
        '51': 622.253967444161821, //3 - D#
        '69': 659.255113825739859,  //E - E
        '82': 698.456462866007768,  //R - F
        '53': 739.988845423268797, //5 - F#
        '84': 783.990871963498588,  //T - G
        '54': 830.609395159890277, //6 - G#
        '89': 880.000000000000000,  //Y - A
        '55': 932.327523036179832, //7 - A#
        '85': 987.766602512248223,  //U - B
    }

    /*
     * Challenge 1: Allow the user to choose a waveform (1 pt)
     *
     * 4 forms of wave: sine, sawtooth, square, and triangle wave
     */
    
    var waveform = "sine" // default waveform is sine
    // Get button's id that indicates the waveform they correspond to
    const sineButton = document.getElementById('sine');
    const sawtoothButton = document.getElementById('sawtooth');
    const squareButton = document.getElementById('square');
    const triangleButton = document.getElementById('triangle');
    
    // If sine button is clicked, change waveform to "sine"
    sineButton.addEventListener('click', function() {
        waveform = "sine"
    });

    // If sawtooth button is clicked, change waveform to "sawtooth"
    sawtoothButton.addEventListener('click', function() {
        waveform = "sawtooth"
    });

    // If square button is clicked, change waveform to "square"
    squareButton.addEventListener('click', function() {
        waveform = "square"
    });

    // If square button is clicked, change waveform to "square"
    triangleButton.addEventListener('click', function() {
        waveform = "triangle"
    });


    /*
     * Play a single note when a key is pressed:
     */
    window.addEventListener('keydown', keyDown, false);
    window.addEventListener('keyup', keyUp, false);

    activeOscillators = {}

    function keyDown(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
            playNote(key);
        }
    }

    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
            activeOscillators[key].stop();
            delete activeOscillators[key];
        }
    }

    function playNote(key) {
        const osc = audioCtx.createOscillator();
        osc.frequency.setValueAtTime(keyboardFrequencyMap[key], audioCtx.currentTime)
        osc.type = waveform //choose your favorite waveform
        osc.connect(audioCtx.destination)
        osc.start();
        activeOscillators[key] = osc
    }

    /*
    Challenges 2: Implement ADSR envelopes for your notes you you don’t get zero-ing clicks. 
       You will need to add a gain node for this. It will be in between the osc and the audioCtx.
    */

});
