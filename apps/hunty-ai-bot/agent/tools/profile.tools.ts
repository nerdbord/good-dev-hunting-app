import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { GoodDevHuntingAPIClient } from '../../libs/gdh-api.client';

const apiClient = new GoodDevHuntingAPIClient();

export const searchProfileTool = tool(
    async ({ query }) => {
        try {

            const profiles = await apiClient.searchProfiles(query);

            // Return the search results with both the SQL and the results
            return JSON.stringify({
                executedQuery: query,
                results: profiles
            }, null, 2);
        } catch (error) {
            console.error('Search profile error:', error);
            return "Failed to search profiles";
        }
    },
    {
        name: "searchProfile",
        description: `
        You are an expert SQL developer that helps search for profiles by generating and executing SQL queries.

        <objective>
        Generate and execute SQL queries to search for profiles when users ask questions about developers.
        </objective>

        <rules>
        - ALWAYS USE THIS TOOL to execute the SQL query, don't just return the SQL.
        - Generate valid SQL queries based on user questions about developers.
        - Only use SELECT queries, no INSERT, UPDATE or DELETE.
        - Make queries case-insensitive (e.g., "Frontend" and "frontend" should match).
        - When searching for technologies, always join with the Technology table.
        - Return both the executed query and the results.
        </rules>

        `,
        schema: z.object({
            query: z.string().describe(`
                SQL query to search for profiles.
                Must be a SELECT query.
                Will be executed against the database.

                <database_schema>
                ${Bun.file(new URL('../data/prisma-db-schema.txt', import.meta.url)).text()}
                </database_schema>

                <examples>
                User: "Find me frontend developers"
                AI Action: "SELECT DISTINCT p.* FROM \"Profile\" p WHERE LOWER(p.position) LIKE LOWER('%frontend%')"

                User: "Show me TypeScript developers"
                AI Action: "SELECT DISTINCT p.* FROM \"Profile\" p 
                INNER JOIN \"_ProfileToTechnology\" pt ON p.id = pt.\"A\" 
                INNER JOIN \"Technology\" t ON t.id = pt.\"B\" 
                WHERE LOWER(t.name) = LOWER('TypeScript')"

                User: "Find fullstack developers who know TypeScript and React"
                AI Action: "SELECT DISTINCT p.* FROM \"Profile\" p 
                INNER JOIN \"_ProfileToTechnology\" pt ON p.id = pt.\"A\" 
                INNER JOIN \"Technology\" t ON t.id = pt.\"B\" 
                WHERE LOWER(p.position) LIKE LOWER('%fullstack%')
                AND p.id IN (
                    SELECT p2.id FROM \"Profile\" p2 
                    INNER JOIN \"_ProfileToTechnology\" pt2 ON p2.id = pt2.\"A\" 
                    INNER JOIN \"Technology\" t2 ON t2.id = pt2.\"B\" 
                    WHERE LOWER(t2.name) IN (LOWER('TypeScript'), LOWER('React'))
                    GROUP BY p2.id 
                    HAVING COUNT(DISTINCT t2.name) = 2
                )"
                </examples>
            `),
        }),
    }
);

export const rejectProfileTool = tool(
    async ({ email, reason }) => {
        // TODO: Implement profile rejection logic using platform app's service
        console.log('rejectProfileTool', email, reason);
        return `Profile ${email} rejected with reason: ${reason}`;
    },
    {
        name: "rejectProfile",
        description: "Reject a user profile and send notification",
        schema: z.object({
            email: z.string().describe("Email of the profile to reject"),
            reason: z.string().describe("Reason for rejection"),
        }),
    }
);

export const approveProfileTool = tool(
    async ({ email }) => {
        // TODO: Implement profile approval logic using platform app's service
        console.log('approveProfileTool', email);
        return `Profile ${email} approved`;
    },
    {
        name: "approveProfile",
        description: "Approve a user profile and send notification",
        schema: z.object({
            email: z.string().describe("Email of the profile to approve"),
        }),
    }
);

export const messageProfileTool = tool(
    async ({ email, message }) => {
        // TODO: Implement profile messaging logic
        console.log('messageProfileTool', email, message);
        return `Message sent to profile ${email}`;
    },
    {
        name: "messageProfile",
        description: "Send a message to a user profile",
        schema: z.object({
            email: z.string().describe("Email of the profile to message"),
            message: z.string().describe("Message content to send"),
        }),
    }
);

export const profileTools = [
    searchProfileTool,
    rejectProfileTool,
    approveProfileTool,
    messageProfileTool
];