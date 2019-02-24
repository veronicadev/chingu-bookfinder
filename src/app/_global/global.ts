export function check_default(obj, defvar) {
    if (typeof(defvar) == 'undefined' || defvar == null) {
        defvar = ''
    }
    if (typeof(obj) == 'undefined' || obj == null) {
        obj = defvar
    }

    return obj
}

export function check_var(obj) {
    try {
        if (typeof(obj) == 'undefined' || obj == null) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return false
    }

}

export function trimString(title, l){
    if(title.length>l){
        return `${title.substring(0,l)}...` 
    }
    return title
}
