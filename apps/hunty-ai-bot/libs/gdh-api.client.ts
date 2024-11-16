import { z } from "zod";

export const SearchParamsSchema = z.object({
    techStack: z.array(z.string()).optional().describe("A list of technologies. Use only technologies that are mentioned in user query. Do not hallucinate and do not add any technologies that are not mentioned in user query."),
    position: z.enum([
        "Frontend",
        "Backend",
        "Fullstack",
        "Mobile",
        "DevOps",
        "QA",
        "PM",
        "DataScience",
        "GameDev",
        "VR_AR",
        "UX_UI",
        "Crypto",
        "CyberSecurity",
        "SysAdmin",
        "UX_Designer",
        "UX_Researcher",
        "UX_Writer",
        "UI_Designer",
        "UX_UI_Designer",
        "Product_Designer",
    ])
        .optional()
        .describe("Use only specializations that are mentioned in user query. Do not hallucinate and do not add any specializations that are not mentioned in user query."),
})

export type SearchParamsType = z.infer<typeof SearchParamsSchema>;

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

    private async req<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

    async searchProfiles(params: SearchParamsType) {
        const profiles = await this.req(`${this.baseUrl}/profiles/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({ params }),
        });

        return profiles;
    }

    // Add other methods for profile operations
}