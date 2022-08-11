const darkTheme = "rgb(51, 50, 50)";
const lightTheme = "#fff";
const lightBorderTheme = "#d6d6d6";

// 获取对应的主题色值
export const getThemeMap = (isLight) => {
    return {
        "theme-bg": isLight ? lightTheme : darkTheme,
        "theme-color": isLight ? darkTheme : lightTheme,
        "theme-boder-color": isLight ? lightBorderTheme : lightTheme,
    };
};

// 设置主题色值
export const setTheme = (isLight = true) => {
    const themeMap = getThemeMap(isLight);
    const body = document.body;
    /* 实现方式一 */
    Object.keys(themeMap).forEach((key) => {
        body.style.setProperty(`--${key}`, themeMap[key]);
    });

    /* 实现方式二 */
    // body.style.setProperty('data-theme', isLight ? 'light' : 'dark')
};
