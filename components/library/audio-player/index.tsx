"use client";

import { useAudioPlayer } from "./use-audio-player";
import { PlayerControls } from "./player-controls";

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const {
    waveformRef,
    isPlaying,
    duration,
    currentTime,
    togglePlayPause,
    formatTime,
  } = useAudioPlayer(audioUrl);

  return (
    <div className="space-y-4">
      {title && (
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      )}
      <div ref={waveformRef} className="w-full" />
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        currentTime={formatTime(currentTime)}
        duration={formatTime(duration)}
      />
    </div>
  );
}