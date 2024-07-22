import { TestData } from '../models/TestData';

class BackendService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async getTestData(): Promise<TestData> {
    try {
      const response = await fetch(`${this.baseURL}/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: TestData = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data from the backend');
    }
  }
}

export default new BackendService('http://localhost:8000');