
// Реалізувати функцію parseColor(str), що приймає колір у одному з форматів і повертає об’єкт { r, g, b } з числами 0-255:

//Викладач передасть 6-7 значень — функція має дати правильний результат.
// parseColor("#FF8800")            // { r: 255, g: 136, b: 0 }
// parseColor("#f80")
//                // { r: 255, g: 136, b: 0 }  (короткий hex)
// parseColor("rgb(255, 136, 0)")   // { r: 255, g: 136, b: 0 }
// parseColor("rgb(255,136,0)")     // те саме, без пробілів

// parseColor("red")                // { r: 255, g: 0, b: 0 }    (для топ-5 named кольорів)
// parseColor("invalid")            // null
// parseColor("")                   // null



const named_colors = {
    red: {r: 255, g:0 , b: 0},
    green: {r:0, g:255, b:0},
    blue: {r:0, g:0, b:255},
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0,   g: 0,   b: 0 }
}

function parseHex(str){
    let hex = str.slice(1); // remove #

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // check is all symbols are valid and there are 6 of them
    if(hex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(hex)){ // чи є рядок hex валідним 6значним hex числом
        return null;
    }

    // "ff8800"
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    }
}

// parse ("rgb(255, 136, 0)")
function parseRGB(str){
    const cleanStr = str.trim().toLowerCase();
    if (!cleanStr.startsWith("rgb(") || !cleanStr.endsWith(")")) {
        return null;
    }

    //"rgb(255,  136, 0)" -> "255,  136, 0"
    const innerContent = str.slice(4, -1)

    // split рядок за комами на масив фрагментів
    //  ["255", "  136", " 0"]
    const parts = innerContent.split(",");

    // Має бути рівно(R, G, B)
    if (parts.length !== 3) {
        return null;
    }

    const r = parseInt(parts[0].trim(), 10);
    const g = parseInt(parts[1].trim(), 10);
    const b = parseInt(parts[2].trim(), 10);

    if (Number.isNaN(r) || r < 0 || r > 255) return null;
    if (Number.isNaN(g) || g < 0 || g > 255) return null;
    if (Number.isNaN(b) || b < 0 || b > 255) return null;

    return { r, g, b };
}

function parseNumber(str){
    const lowerStr = str.toLowerCase();
    return named_colors[lowerStr] || null;
}


function parseColor(str){
    const cleanStr = str.trim();
    if(typeof str != "string" || !str.trim()){
        return null;
    }

    if(cleanStr.startsWith("#")){
        return parseHex(cleanStr)
    }
    if(cleanStr.toLowerCase().startsWith("rgb(")){
        return parseRGB(cleanStr)
    }
    return parseNumber(cleanStr);

}


console.log(parseColor("#FF8800"));
console.log(parseColor("#f80"));
console.log(parseColor("rgb(255, 136, 0)"));
console.log(parseColor("rgb(255,136,0)")); // без пробілів
console.log(parseColor("red"));
console.log(parseColor("invalid"));
console.log(parseColor(""));

// --------------------------------------


// Як ви розрізняєте hex від rgb?
// У функції-роутері parseColor ми аналізуємо початок переданого рядка за допомогою методу startsWith(). 
// Якщо рядок починається з символу #, ми розуміємо, що це Hex-формат і викликаємо хелпер parseHex.
//  Якщо рядок починається з rgb( (попередньо привівши його до нижнього регістру, щоб врахувати можливе RGB(), 
// ми передаємо його в хелпер parseRgb. Якщо жодна з цих умов не виконується, ми припускаємо, що це назва кольору, і передаємо в parseNamed.

// Як перетворити "FF" в число 255?
// Для цього використовується вбудована функція JavaScript — parseInt("FF", 16).
// Перший аргумент — це сам рядок, який треба перетворити, а другий аргумент (16) — це основа системи числення (radix).
