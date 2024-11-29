import axios from 'axios';
import { TranslationResponse, AudioResponse, TranscriptionResponse } from '../types';

const API_URL = 'http://localhost:5000';

export async function translateText(text: string): Promise<TranslationResponse> {
  const response = await axios.post(`${API_URL}/translate`, { text });
  return response.data;
}

export async function generateAudio(text: string): Promise<AudioResponse> {
  const response = await axios.post(`${API_URL}/generate-audio`, { text });
  return response.data;
}

export async function extractTextFromFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/extract-text`, formData);
  return response.data.text;
}

export async function transcribeAudio(file: File): Promise<TranscriptionResponse> {
  const formData = new FormData();
  formData.append('files', file);
  const response = await axios.post(`${API_URL}/transcribe`, formData);
  return response.data;
}
