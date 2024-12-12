"use client";

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export function useAudioPlayer(audioUrl: string) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'hsl(var(--primary) / 0.4)',
      progressColor: 'hsl(var(--primary))',
      cursorColor: 'hsl(var(--primary))',
      barWidth: 2,
      barGap: 3,
      height: 60,
      normalize: true,
      // responsive: true,
      fillParent: true,
    });

    wavesurferRef.current.load(audioUrl);

    wavesurferRef.current.on('ready', () => {
      setDuration(wavesurferRef.current?.getDuration() || 0);
    });

    wavesurferRef.current.on('audioprocess', () => {
      setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0);
    });

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    waveformRef,
    isPlaying,
    duration,
    currentTime,
    togglePlayPause,
    formatTime,
  };
}