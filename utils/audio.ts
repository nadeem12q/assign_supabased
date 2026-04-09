/**
 * Small utility to play a positive, non-intrusive 'pop' sound as a micro-interaction
 * upon successful upload/action without needing an external asset file.
 */

// A simple synthesized pop sound using AudioContext instead of base64

export const playSuccessSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const actx = new AudioContext();
        const osc = actx.createOscillator();
        const gainNode = actx.createGain();

        osc.connect(gainNode);
        gainNode.connect(actx.destination);

        osc.type = 'sine';

        // Quick pitch drop for a satisfying "pop/bloop" sound
        osc.frequency.setValueAtTime(600, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, actx.currentTime + 0.1);

        // Quick fade out volume
        gainNode.gain.setValueAtTime(0.1, actx.currentTime); // Low volume (10%)
        gainNode.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.1);

        osc.start(actx.currentTime);
        osc.stop(actx.currentTime + 0.1);
    } catch (e) {
        // Ignore if audio isn't supported or is blocked by browser interaction policies
        console.debug('Audio playback failed or not supported', e);
    }
};
