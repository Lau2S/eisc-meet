import { useState, useCallback } from "react";
// @ts-ignore
import { initWebRTC, disableOutgoingAudio, enableOutgoingAudio, disableOutgoingVideo, enableOutgoingVideo } from "../../../webrtc/webrtc";
/**
 * Component for controlling voice input/output.
 * @returns {JSX.Element} The JSX.Element containing the voice control button.
 */
export default function Interaction() {
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if the user is speaking
  const [callPeers, setCallPeers] = useState(true); // State to track if peers should be called
  const [isAudioMuted, setIsAudioMuted] = useState(false); // State to track if audio is muted
  const [isVideoOff, setIsVideoOff] = useState(false); // State to track if video is off

  // Function to start speaking
  const speak = useCallback(() => {
    setIsSpeaking(true);

    if (callPeers) {
      setCallPeers(false);
      initWebRTC();
    }
    enableOutgoingAudio();
    enableOutgoingVideo();
  }, [callPeers]);

  // Function to toggle audio mute
  const toggleAudio = useCallback(() => {
    if (isAudioMuted) {
      enableOutgoingAudio();
      setIsAudioMuted(false);
    } else {
      disableOutgoingAudio();
      setIsAudioMuted(true);
    }
  }, [isAudioMuted]);

  // Function to leave the call
  const leaveCall = useCallback(() => {
    setIsSpeaking(false);
    disableOutgoingAudio();
    disableOutgoingVideo();
    // Optionally, disconnect WebRTC, but for now just disable
  }, []);

  // Function to toggle video
  const toggleVideo = useCallback(() => {
    if (isVideoOff) {
      enableOutgoingVideo();
      setIsVideoOff(false);
    } else {
      disableOutgoingVideo();
      setIsVideoOff(true);
    }
  }, [isVideoOff]);

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-4 w-full h-full">
        <div id="video-container" className="grid grid-cols-2 gap-4">
          {/* Videos will be appended here */}
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={isSpeaking ? leaveCall : speak}>
            {isSpeaking ? "Salir de la llamada" : "Unirse a la llamada"}
          </button>
          <button onClick={toggleAudio}>
            {isAudioMuted ? "Activar Audio" : "Mutear Audio"}
          </button>
          <button onClick={toggleVideo}>
            {isVideoOff ? "Encender Cámara" : "Apagar Cámara"}
          </button>
        </div>
      </div>
    </div>
  );
}