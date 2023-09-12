export const changeBackgroundColor = (color: string) => {
    const linearGradient = `linear-gradient(90deg, color-mix(in srgb, ${color || '#fff'}, #fff 30%), color-mix(in srgb, ${color || '#fff'}, #000 30%))`;
    document.body.style.background = linearGradient;
    document.body.style.transition = "background 0.3s ease-in";
    const timeout = setTimeout(() => {
        document.body.style.transition = "";
        clearTimeout(timeout);
    }, 300)
}