const API_URL = 'http://localhost:3000/api';

export const apiClient = {
  publishMyProfile: async (profileId: string) => {
    if (!profileId) {
      throw new Error('No profile ID found');
    }

    const response = await fetch(
      `${API_URL}/profiles/${profileId}/publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to publish profile');
    }
  },
}