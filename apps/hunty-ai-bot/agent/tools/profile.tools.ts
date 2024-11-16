import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { GoodDevHuntingAPIClient, SearchParamsSchema } from '../../libs/gdh-api.client';


const apiClient = new GoodDevHuntingAPIClient();


export const searchProfileTool = tool(
    async (params) => {
        try {

            const profiles = await apiClient.searchProfiles(params);

            // Return the search results
            return JSON.stringify(profiles, null, 2);
        } catch (error) {
            console.error('Search profile error:', error);
            return "Failed to search profiles";
        }
    },
    {
        name: "searchProfile",
        description: "Use this tool to search for developers based on structured search parameters. Use only data provided by user to return proper search parameters. Do not hallucinate with search params that can not be reasoned from user query.",
        schema: SearchParamsSchema
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