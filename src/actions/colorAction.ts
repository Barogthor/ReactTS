export const CHANGE_COLOR = "CHANGE_COLOR"

export const change_color = (color: string) => {
    return {
        type: CHANGE_COLOR,
        color: color
    }
}

