import theme from './theme';

export const getTheme = () => theme;

export const getColor = (color, tone = 'main') => {
    const theme = getTheme();
    return theme.colors[color][tone]
};
