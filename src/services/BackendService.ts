import { NoteData } from '../models/NoteData';

class BackendService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async getTestData(): Promise<NoteData> {
    try {
      const response = await fetch(`${this.baseURL}/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: NoteData = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data from the backend');
    }
  }

  public async getNotesData(): Promise<NoteData[]> {
    try {
      const response = await fetch(`${this.baseURL}/notes`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: NoteData[] = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch note data from the backend');
    }
  }

  public async postNoteData(noteData: NoteData): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error('Failed to post note data to the backend');
    }
  }

  public async deleteNoteData(index: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/notes/${index}`, {
        method: 'DELETE'
        
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      throw new Error('Failed to delete note data in the backend');
    }
  }
}


export default new BackendService('http://localhost:8000');