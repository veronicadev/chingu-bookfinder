export function checkDefault(item){
        if(item!==null && typeof item!=='undefined'){
            return item
        }
}

export function trimString(title, l){
    if(title.length>l){
        return `${title.substring(0,l)}...` 
    }
    return title
}
