export interface TranslationResponse {
  original_text: string;
  haoussa_text: string;
}

export interface AudioResponse {
  message: string;
  file_path: string;
  text: string;
}

export interface TranscriptionResponse {
  success: boolean;
  text: string;
  error: string | null;
}

export type InputTab = 'text' | 'pdf' | 'audio' | 'video';