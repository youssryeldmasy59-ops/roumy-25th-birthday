import wave
import struct
import math
import random

SAMPLE_RATE = 44100
VOLUME = 0.94  # Loud, crystal clear, lush & dreamy

def midi_to_freq(note_name):
    note_map = {
        'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
        'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
    }
    if len(note_name) == 2:
        letter = note_name[0]
        octave = int(note_name[1])
    elif len(note_name) == 3:
        letter = note_name[:2]
        octave = int(note_name[2])
    else:
        raise ValueError(f"Invalid note: {note_name}")
    
    semitone = note_map[letter]
    midi = 12 + (octave * 12) + semitone
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))

def generate_dreamy_chime_loop(output_path):
    # Dreamy Celestial Chime / Ambient Music Box (Vibe 1: Sparkling Stars & Warm Synth Pad)
    BAR_DURATION = 3.6
    
    # Chord sequence in A Major / E Major (Pure warmth, uplifting nostalgic romance)
    # (Bass_Note, Pad_Chords, [(chime_note, offset_sec, dur, vel)])
    SONG_SCORE = [
        # Bar 1: A Major (Ethereal Opening Starlight)
        ('A2', ['A3', 'C#4', 'E4'], [
            ('E5', 0.0, 3.0, 0.95),
            ('C#5', 0.45, 2.4, 0.8),
            ('A4', 0.90, 2.2, 0.75),
            ('B4', 1.35, 2.4, 0.8),
            ('C#5', 1.80, 2.8, 0.9),
            ('E5', 2.35, 2.5, 0.85),
            ('A5', 2.90, 3.2, 1.0)
        ]),
        # Bar 2: E Major / G# (Warm Floating Glow)
        ('G#2', ['G#3', 'B3', 'E4'], [
            ('G#5', 0.0, 3.0, 0.95),
            ('E5', 0.45, 2.4, 0.85),
            ('B4', 0.90, 2.2, 0.75),
            ('C#5', 1.35, 2.4, 0.8),
            ('E5', 1.80, 2.8, 0.9),
            ('G#5', 2.35, 2.6, 0.9),
            ('B5', 2.90, 3.2, 1.0)
        ]),
        # Bar 3: F# Minor 7 (Deep Tender Affection)
        ('F#2', ['F#3', 'A3', 'C#4'], [
            ('A5', 0.0, 3.0, 0.95),
            ('F#5', 0.45, 2.4, 0.85),
            ('C#5', 0.90, 2.2, 0.8),
            ('D5', 1.35, 2.4, 0.8),
            ('E5', 1.80, 2.6, 0.85),
            ('F#5', 2.30, 2.8, 0.9),
            ('C#6', 2.85, 3.5, 1.0)
        ]),
        # Bar 4: D Major 9 (Sparkling Magic & Sweet Smiles)
        ('D2', ['F#3', 'A3', 'D4'], [
            ('F#5', 0.0, 3.0, 0.9),
            ('E5', 0.45, 2.4, 0.85),
            ('D5', 0.90, 2.4, 0.85),
            ('C#5', 1.35, 2.2, 0.8),
            ('B4', 1.80, 2.4, 0.8),
            ('A4', 2.30, 2.6, 0.85),
            ('F#5', 2.85, 3.2, 0.95)
        ]),
        # Bar 5: A Major High Sparkle (Pure Euphoria)
        ('A2', ['E3', 'A3', 'C#4'], [
            ('C#6', 0.0, 3.2, 1.0),
            ('B5', 0.45, 2.5, 0.85),
            ('A5', 0.90, 2.6, 0.9),
            ('E5', 1.40, 2.4, 0.85),
            ('A5', 1.85, 2.8, 0.95),
            ('C#6', 2.35, 3.0, 0.95),
            ('E6', 2.90, 3.5, 1.0)
        ]),
        # Bar 6: C# Minor / G# (Gentle Whispers & Closeness)
        ('C#2', ['G#3', 'C#4', 'E4'], [
            ('G#5', 0.0, 3.0, 0.95),
            ('F#5', 0.45, 2.4, 0.85),
            ('E5', 0.90, 2.5, 0.9),
            ('D#5', 1.35, 2.2, 0.8),
            ('E5', 1.85, 2.8, 0.9),
            ('G#5', 2.35, 2.6, 0.9),
            ('C#6', 2.90, 3.5, 0.95)
        ]),
        # Bar 7: D Major 7 (Infinite Romantic Warmth)
        ('D2', ['A3', 'D4', 'F#4'], [
            ('F#5', 0.0, 3.2, 0.95),
            ('A5', 0.45, 2.8, 0.95),
            ('G#5', 1.00, 2.5, 0.85),
            ('F#5', 1.50, 2.6, 0.9),
            ('E5', 2.00, 2.5, 0.85),
            ('D5', 2.50, 2.5, 0.8),
            ('A4', 3.00, 2.4, 0.75)
        ]),
        # Bar 8: E7sus4 -> E Major (Seamless Dreamy Turnaround that flows right into Bar 1)
        ('E2', ['B3', 'D4', 'E4'], [
            ('B4', 0.0, 3.0, 0.85),
            ('C#5', 0.50, 2.8, 0.9),
            ('D5', 1.00, 2.8, 0.9),
            ('E5', 1.55, 3.2, 0.95),
            ('G#5', 2.15, 3.5, 1.0),
            ('B5', 2.80, 3.8, 1.0)
        ])
    ]

    total_bars = len(SONG_SCORE)
    song_duration = total_bars * BAR_DURATION
    total_samples = int(song_duration * SAMPLE_RATE)
    
    extra_tail_samples = int(5.0 * SAMPLE_RATE)
    buffer_samples = total_samples + extra_tail_samples

    audio_l = [0.0] * buffer_samples
    audio_r = [0.0] * buffer_samples

    print(f"Synthesizing {song_duration:.1f}s dreamy synth & celestial chime loop (Vibe 1)...")

    # 1. Warm Analog Synth Pad Synth
    def render_ambient_pad(freq, start_sec, duration, vel=0.25):
        start_idx = int(start_sec * SAMPLE_RATE)
        pad_samples = int(duration * SAMPLE_RATE)
        end_idx = min(buffer_samples, start_idx + pad_samples)

        for i in range(end_idx - start_idx):
            t = i / SAMPLE_RATE
            # Slow breathing swell
            if t < 0.6:
                env = (t / 0.6) ** 1.5
            elif t > duration - 0.8:
                env = max(0.0, (duration - t) / 0.8)
            else:
                env = 1.0 + 0.05 * math.sin(t * 2.0 * math.pi * 0.5)

            # Soft filtered warm saw/sine mix
            phase1 = 2.0 * math.pi * freq * t
            phase2 = 2.0 * math.pi * (freq * 1.002) * t  # Rich chorus detune
            sample_val = (math.sin(phase1) * 0.7 + math.sin(phase2) * 0.3) * env * vel * 0.28

            audio_l[start_idx + i] += sample_val * 0.85
            audio_r[start_idx + i] += sample_val * 0.85

    # 2. Sparkling Celestial Music Box / Dream Bell Tone (From Vibe 1)
    def render_chime_bell(freq, start_sec, duration, velocity, pan=0.0):
        start_idx = int(start_sec * SAMPLE_RATE)
        chime_samples = int(duration * SAMPLE_RATE)
        end_idx = min(buffer_samples, start_idx + chime_samples)

        # Crystalline Bell Harmonics (Fundamental, Octave, 5th, 2nd Octave Glass)
        harmonics = [(1.0, 0.75), (2.0, 0.35), (3.0, 0.15), (4.0, 0.18), (5.0, 0.08)]
        left_gain = (1.0 - pan) * 0.82 * velocity
        right_gain = (1.0 + pan) * 0.82 * velocity

        decay_rate = 2.2 / duration

        for i in range(end_idx - start_idx):
            t = i / SAMPLE_RATE
            # Crisp glass attack
            if t < 0.008:
                env = (t / 0.008) ** 1.2
            else:
                env = math.exp(-decay_rate * (t - 0.008)) * (0.85 + 0.15 * math.exp(-t * 4.0))

            sample_val = 0.0
            for h_mult, h_amp in harmonics:
                h_freq = freq * h_mult
                phase = 2.0 * math.pi * h_freq * t
                h_decay = math.exp(-decay_rate * h_mult * 0.25 * t)
                sample_val += math.sin(phase) * h_amp * h_decay

            sample_val *= env
            audio_l[start_idx + i] += sample_val * left_gain
            audio_r[start_idx + i] += sample_val * right_gain

    # Render All Bars
    for bar_idx, (bass_name, pad_chord_names, notes) in enumerate(SONG_SCORE):
        bar_start = bar_idx * BAR_DURATION
        
        # Bass Anchor
        bass_freq = midi_to_freq(bass_name)
        render_ambient_pad(bass_freq, bar_start, BAR_DURATION + 1.2, vel=0.35)
        
        # Soft Chord Pads
        for chord_note in pad_chord_names:
            p_freq = midi_to_freq(chord_note)
            render_ambient_pad(p_freq, bar_start, BAR_DURATION + 1.0, vel=0.18)

        # Sparkling Chimes & Bells (The iconic Vibe 1 sound!)
        for note_name, offset_sec, dur, vel in notes:
            note_freq = midi_to_freq(note_name)
            note_start = bar_start + offset_sec
            pan = (random.random() - 0.5) * 0.35
            render_chime_bell(note_freq, note_start, dur, velocity=vel * 1.15, pan=pan)

    # Apply Dreamy Ping-Pong Delay & Reverb (Celestial Atmosphere)
    print("Applying ambient stereo space & celestial sparkle reverb...")
    reverb_l = [0.0] * buffer_samples
    reverb_r = [0.0] * buffer_samples

    delays = [
        (int(0.055 * SAMPLE_RATE), 0.44),
        (int(0.110 * SAMPLE_RATE), 0.38),
        (int(0.185 * SAMPLE_RATE), 0.32),
        (int(0.295 * SAMPLE_RATE), 0.25),
        (int(0.440 * SAMPLE_RATE), 0.18)
    ]

    for delay_samples, feedback in delays:
        for i in range(delay_samples, buffer_samples):
            reverb_l[i] += audio_r[i - delay_samples] * feedback  # Stereo ping-pong cross
            reverb_r[i] += audio_l[i - delay_samples] * feedback

    # Mix dry + ambient wet
    for i in range(buffer_samples):
        audio_l[i] = audio_l[i] * 0.70 + reverb_l[i] * 0.40
        audio_r[i] = audio_r[i] * 0.70 + reverb_r[i] * 0.40

    # 🔁 SEAMLESS LOOP WRAPAROUND: Reverb tail seamlessly wraps back into the opening!
    print("Seamlessly wrapping ambient tail into opening for infinite loop...")
    final_l = [0.0] * total_samples
    final_r = [0.0] * total_samples

    for i in range(total_samples):
        final_l[i] = audio_l[i]
        final_r[i] = audio_r[i]

    for i in range(extra_tail_samples):
        tail_idx = total_samples + i
        if tail_idx < buffer_samples:
            final_l[i] += audio_l[tail_idx]
            final_r[i] += audio_r[tail_idx]

    # Peak Normalization (Loud, Clear, Warm & Dreamy)
    max_peak = 0.0001
    for i in range(total_samples):
        peak = max(abs(final_l[i]), abs(final_r[i]))
        if peak > max_peak:
            max_peak = peak

    norm_factor = (VOLUME * 32767.0) / max_peak
    print(f"Normalizing audio: factor {norm_factor:.2f} (peak was {max_peak:.4f})...")

    with wave.open(output_path, 'wb') as wav_file:
        wav_file.setnchannels(2)
        wav_file.setsampwidth(2)
        wav_file.setframerate(SAMPLE_RATE)
        
        frames = bytearray()
        for i in range(total_samples):
            val_l = max(-32767, min(32767, int(final_l[i] * norm_factor)))
            val_r = max(-32767, min(32767, int(final_r[i] * norm_factor)))
            frames.extend(struct.pack('<hh', val_l, val_r))
        
        wav_file.writeframes(frames)
    
    print(f"Generated Dreamy Chime Loop: {output_path}")

if __name__ == '__main__':
    generate_dreamy_chime_loop('assets/audio/romantic_nostalgia.wav')
