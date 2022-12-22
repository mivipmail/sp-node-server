
// Complete relative (respect to 'static' folder) image path up to absolute path
export const completePath = (req: any, path: string): string|null => {
    return path ? `${req.protocol}://${req.headers.host}/${path}` : null
}

export const capitalizeFirst = (str: string): string => {
    return str[0].toUpperCase() + str.slice(1)
}

// module.exports = {
//     completePath,
//     capitalizeFirst,
// }