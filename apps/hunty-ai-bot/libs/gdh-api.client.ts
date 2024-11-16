interface SearchParams {
    seniority?: string[];
    skills?: string[];
    employmentTypes?: string[];
    isOpenForWork?: boolean;
    remoteOnly?: boolean;
}

export class GoodDevHuntingAPIClient {
    private baseUrl: string;
    private apiKey: string;

    constructor() {
        this.baseUrl = process.env.GDH_API_URL || 'http://localhost:3000/api';
        this.apiKey = process.env.GDH_API_KEY || '';

        if (!this.apiKey) {
            throw new Error('GDH_API_KEY is not set');
        }
    }

    private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async searchProfiles(params: SearchParams) {
        const response = await fetch(`${this.baseUrl}/profiles/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({ params }),
        });

        if (!response.ok) {
            throw new Error('Failed to search profiles');
        }

        return response.json();
    }

    // Add other methods for profile operations
}