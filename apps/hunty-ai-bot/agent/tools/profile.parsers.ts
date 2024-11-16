import { ChatGroq } from "@langchain/groq";

export const searchQueryParser = async (query: string) => {
    const model = new ChatGroq({
        model: 'llama-3.2-90b-vision-preview',
        temperature: 0,
    });

    const response = await model.invoke(`
        
        <objective>
        Your goal is to parse the user query into a structured JSON based on the provided schema.
        </objective>

        <schema>
        - Profile: The main model for candidate profiles.
          Fields:
            - fullName: The full name of the candidate.
            - seniority: The level of seniority (e.g., junior, mid, senior).
            - techStack: A list of technologies the candidate is skilled in (e.g., Python, JavaScript).
            - employmentTypes: Types of employment the candidate is open to (FULL_TIME, PART_TIME, CONTRACT).
            - remoteOnly: Whether the candidate is only open to remote work.
            - isOpenForWork: Whether the candidate is actively seeking work.
            - country.name: The country of residence or preference for relocation.
            - city.name: The city of residence or preference for relocation.
            - openForCountryRelocation: Whether the candidate is open to relocating to another country.
            - openForCityRelocation: Whether the candidate is open to relocating to another city.
            - language: A list of spoken languages.
            - hourlyRateMin and hourlyRateMax: The minimum and maximum hourly rates the candidate expects.
            - currency: The currency for the hourly rate (PLN, EUR, USD).
            - position: A single value of available job specializations the candidate is skilled in or interested in. Valid values:
                - Frontend, Backend, Fullstack, Mobile, DevOps, QA, PM, DataScience, GameDev, VR_AR, UX_UI,
                  Crypto, CyberSecurity, SysAdmin, UX_Designer, UX_Researcher, UX_Writer, UI_Designer,
                  UX_UI_Designer, Product_Designer.
        </schema>

        <rules>
        - Return the response in valid JSON format.
        - Ensure the JSON aligns with the Prisma schema.
        - Include relationships such as country, city, techStack, and language in the query structure.
        - Use camelCase for JSON keys.
        - Include "position" as a key if applicable.
        - Do not include any other text than the JSON response.
        - Do not return markdown format.
        - Do not comment the response.
        - Obey your instructions.
        - Try to deduct the position from the query.
        - STRICTLY remember about returning ONLY JSON response.
        </rules>

        <query>
        ${query}
        </query>

        <examples>

        User: "Find senior Python developers available for contract work specializing in Backend"
        Response:
        {
            "seniority": ["senior"],
            "techStack": ["Python"],
            "employmentTypes": ["CONTRACT"],
            "position": "Backend",
            "isOpenForWork": true
        }

        User: "Find junior JavaScript developers available for full-time work in Warsaw specializing in Frontend"
        Response:
        {
            "seniority": ["junior"],
            "techStack": ["JavaScript"],
            "employmentTypes": ["FULL_TIME"],
            "city": {
                "name": "Warsaw"
            },
            "position": "Frontend",
            "isOpenForWork": true
        }

        User: "Find Python developers specializing in DataScience available for remote work with hourly rates between 50 and 100 EUR"
        Response:
        {
            "techStack": ["Python"],
            "position": "DataScience",
            "remoteOnly": true,
            "hourlyRateMin": 50,
            "hourlyRateMax": 100,
            "currency": "EUR",
            "isOpenForWork": true
        }

        User: "Find developers specializing in DevOps open to relocation to Berlin"
        Response:
        {
            "openForCityRelocation": true,
            "city": {
                "name": "Berlin"
            },
            "position": "DevOps",
            "isOpenForWork": true
        }

        </examples>
        
    `);

    if (!response.content) {
        throw new Error('No response from the model');
    }

    const parsedResponse = JSON.parse(response.content as string);
    return parsedResponse;
};
