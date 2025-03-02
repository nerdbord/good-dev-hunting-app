import React from 'react';
import type { Preview } from "@storybook/react";
import { ThemeProvider } from '../src/contexts/ThemeContext';

// Decorator to wrap all stories with ThemeProvider
const withThemeProvider = (Story) => (
    <ThemeProvider>
        <Story />
    </ThemeProvider>
);

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [withThemeProvider],
};

export default preview; 