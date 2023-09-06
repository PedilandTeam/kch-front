

export default (value: number | number[]): string | undefined => {

    if(!value)
        return undefined
    if(Array.isArray(value))
        return value.join(",")
    else    
        return value.toString()
}