
/**
 *   两个数组的比较   内容不能为对象
 * @param {数组1} array 
 * @param {数组2} array1 
 */
export const arrEquals = (array,array1) => {
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length != array.length)
        return false;

    for (var i = 0, l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array1[i].equals(array[i]))
                return false;       
        }           
        else if (array1[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}