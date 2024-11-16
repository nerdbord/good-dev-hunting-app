import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { GoodDevHuntingAPIClient } from '../../libs/gdh-api.client';
import { searchQueryParser } from "./profile.parsers";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

const apiClient = new GoodDevHuntingAPIClient();

export const searchProfileTool = tool(
    async ({ query }) => {
        try {
            // Parse natural language query
            const parsedQuery = await searchQueryParser(query);
            console.log('parsedQuery', parsedQuery);

            // Search profiles with structured parameters
            const profiles = await apiClient.searchProfiles(parsedQuery);


            return JSON.stringify(profiles, null, 2);
        } catch (error) {
            console.error('Search profile error:', error);
            return "Failed to search profiles";
        }
    },
    {
        name: "searchProfile",
        description: "You should use this tool when someone asks you to search for developers. You can search by seniority, skills, employment type, availability, and remote work preference.",
        schema: z.object({
            query: z.string().describe("Natural language search query (e.g., 'Find senior Python developers available for contract work')"),
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