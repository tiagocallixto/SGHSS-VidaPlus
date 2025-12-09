import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff, Phone, Share2, Copy, Check } from "lucide-react";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: { name: string; id: number };
  profissional: { name: string; id: number };
  roomId: string;
  onEndCall: () => void;
}

export function VideoCallModal({
  isOpen,
  onClose,
  paciente,
  profissional,
  roomId,
  onEndCall,
}: VideoCallModalProps) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEndCall = () => {
    setIsCameraOn(false);
    setIsMicOn(false);
    onEndCall();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Teleconsulta em Andamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Video Area - Placeholder */}
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-sm text-gray-400">
                Integração com Jitsi Meet
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Sala: {roomId}
              </p>
            </div>
          </div>

          {/* Participants Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Paciente</p>
              <p className="font-semibold">{paciente.name}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Profissional</p>
              <p className="font-semibold">{profissional.name}</p>
            </div>
          </div>

          {/* Room ID Sharing */}
          <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">ID da Sala</p>
              <p className="font-mono text-sm">{roomId}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyRoomId}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Controls */}
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              variant={isCameraOn ? "default" : "destructive"}
              onClick={() => setIsCameraOn(!isCameraOn)}
            >
              {isCameraOn ? (
                <Video className="w-4 h-4 mr-2" />
              ) : (
                <VideoOff className="w-4 h-4 mr-2" />
              )}
              {isCameraOn ? "Câmera On" : "Câmera Off"}
            </Button>

            <Button
              size="sm"
              variant={isMicOn ? "default" : "destructive"}
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? (
                <Mic className="w-4 h-4 mr-2" />
              ) : (
                <MicOff className="w-4 h-4 mr-2" />
              )}
              {isMicOn ? "Microfone On" : "Microfone Off"}
            </Button>

            <Button
              size="sm"
              variant="outline"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar Tela
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={handleEndCall}
            >
              <Phone className="w-4 h-4 mr-2" />
              Encerrar Chamada
            </Button>
          </div>

          {/* Status */}
          <div className="text-center text-sm text-gray-600">
            <p>Duração da chamada: {Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, "0")}</p>
            <p className="text-xs mt-1">Integração com Jitsi Meet será ativada em produção</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
