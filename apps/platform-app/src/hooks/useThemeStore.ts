import { create } from 'zustand'

type ThemeState = {
  isDarkTheme: boolean
  toggleTheme: () => void
  setTheme: (isDarkTheme: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkTheme: false,
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
  setTheme: (isDarkTheme: boolean) => set({ isDarkTheme }),
}))
