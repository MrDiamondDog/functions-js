const Functions = {
    "Array": {
        remove: function(array: Array<any>, index: number){
            if (index < 0) throw new Error("Functions.Array.remove: index is less than 0");
            if (index > array.length) throw new Error("Functions.Array.remove: index is greater than array length");
            return array.splice(index, 1);
        },
        removeByValue: function(array: Array<any>, value: any){
            const index = array.indexOf(value);
            if (index < 0) throw new Error("Functions.Array.removeByValue: value not found in array");
            return this.remove(array, index);
        },
        removeDuplicates: function(array: Array<any>){
            return array.filter((value, index) => array.indexOf(value) === index);
        },
        reverse(array: Array<any>){
            return array.reverse();
        }
    },
    "String": {
        replaceAll(str: string, search: string, replacement: string){
            const regex = new RegExp(search, "g");
            return str.replace(regex, replacement);
        },
        isASCII(str: string){
            return /^[\x00-\x7F]*$/.test(str);
        },
        isBool(str: string){
            return str === "true" || str === "false";
        },
        isNumber(str: string){
            return !isNaN(Number(str));
        },
        removeHTML(str: string){
            return str.replace(/<[^>]*>?/gm, "");
        },
        censorEmail(str: string){
            return str.replace(/(?<=.).(?=[^@]*?@)/g, "*");
        },
        censorPassword(str: string){
            return "*".repeat(str.length);
        },
        isDataURL(str: string){
            return /^data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*?$/i.test(str);
        },
        "Case": {
            camelCase(str: string){
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return index == 0 ? word.toLowerCase() : word.toUpperCase();
                }).replace(/\s+/g, "");
            },
            pascalCase(str: string){
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return word.toUpperCase();
                }).replace(/\s+/g, "");
            },
            snakeCase(str: string){
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return index == 0 ? word.toLowerCase() : "_" + word.toLowerCase();
                }).replace(/\s+/g, "");
            },
            kebabCase(str: string){
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return index == 0 ? word.toLowerCase() : "-" + word.toLowerCase();
                }).replace(/\s+/g, "");
            },
            titleCase(str: string){
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return word.toUpperCase();
                }).replace(/\s+/g, " ");
            },
            sentenceCase(str: string){
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                    return index == 0 ? word.toUpperCase() : word.toLowerCase();
                }).replace(/\s+/g, " ");
            }
        }
    },
    "JSON": {
        safeStringify(obj: any){
            // make sure there are no circular references
            const cache = new Set();
            const json = JSON.stringify(obj, (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (cache.has(value)) {
                        // Circular reference found, discard key
                        return;
                    }
                    // Store value in our set
                    cache.add(value);
                }
                return value;
            });
            cache.clear();
            return json;
        }
    },
    "Number": {
        format(number: number, thousandsSeparator: string = ","){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        },
        isEven(number: number){
            return number % 2 == 0;
        },
        isOdd(number: number){
            return number % 2 == 1;
        },
        isPrime(number: number){
            if (number < 2) return false;
            for (let i = 2; i < number; i++){
                if (number % i == 0) return false;
            }
            return true;
        },
        isDivisibleBy(number: number, divisor: number){
            return number % divisor == 0;
        },
        isValidEmail(email: string){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        isValidURL(url: string){
            return /^(http|https):\/\/[^\s]+$/.test(url);
        },
        isValidIPv4(ip: string){
            return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
        },
        romanNumerals: {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1
        },
        romanNumeral(number: number){
            if (number < 1 || number > 3999) throw new Error("Functions.Number.romanNumeral: Number must be between 1 and 3999");
            let roman = "";
            for (let key in Functions.Number.romanNumerals){
                while (number >= Functions.Number.romanNumerals[key]){
                    roman += key;
                    number -= Functions.Number.romanNumerals[key];
                }
            }
            return roman;
        },
        fibbonacci(n: number){
            if (n < 1) throw new Error("Functions.Number.fibbonacci: Number must be greater than 0");
            if (n == 1) return 1;
            if (n == 2) return 1;
            return Functions.Number.fibbonacci(n - 1) + Functions.Number.fibbonacci(n - 2);
        }
    },
    "Random": {
        random(min: number, max: number){
            return Math.random() * (max - min) + min;
        },
        randomInt(min: number, max: number){
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        randomElement(array: Array<any>){
            return array[Math.floor(Math.random() * array.length)];
        }
    },
    "Math": {
        average(...numbers: Array<number>){
            return numbers.reduce((a, b) => a + b) / numbers.length;
        },
        sum(...numbers: Array<number>){
            return numbers.reduce((a, b) => a + b);
        },
        difference(...numbers: Array<number>){
            return numbers.reduce((a, b) => a - b);
        },
        product(...numbers: Array<number>){
            return numbers.reduce((a, b) => a * b);
        },
        quotient(...numbers: Array<number>){
            return numbers.reduce((a, b) => a / b);
        },
        modulo(...numbers: Array<number>){
            return numbers.reduce((a, b) => a % b);
        },
        factorial(number: number, times: number = 1){
            if (number < 0) throw new Error("Functions.Math.factorial: number is less than 0");
            if (number == 0) return 1;
            let product = 1;
            for (let i = 0; i < times; i++){
                product *= number;
                number--;
            }
            return product;
        },
        pi(len: number){
            return Number(Math.PI.toFixed(len));
        },
        e(len: number){
            return Number(Math.E.toFixed(len));
        }
    },
    "Generators": {
        colorRGB: function(){
            return [Functions.Random.randomInt(0, 255), Functions.Random.randomInt(0, 255), Functions.Random.randomInt(0, 255)];
        },
        colorHex: function(){
            return "#" + Functions.Random.randomInt(0, 16777215).toString(16);
        },
        colorRGBA: function(){
            return [Functions.Random.randomInt(0, 255), Functions.Random.randomInt(0, 255), Functions.Random.randomInt(0, 255), Functions.Random.random(0, 1)];
        },
        hexToRGB: function(hex: string){
            if (hex.length == 4){
                let r = hex[1];
                let g = hex[2];
                let b = hex[3];
                return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16)];
            } else if (hex.length == 7){
                let r = hex[1] + hex[2];
                let g = hex[3] + hex[4];
                let b = hex[5] + hex[6];
                return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
            } else {
                throw new Error("Functions.Generators.hexToRGB: Invalid hex code");
            }
        },
        hexToRGBA: function(hex: string){
            if (hex.length == 5){
                let r = hex[1];
                let g = hex[2];
                let b = hex[3];
                let a = hex[4];
                return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a + a, 16) / 255];
            } else if (hex.length == 9){
                let r = hex[1] + hex[2];
                let g = hex[3] + hex[4];
                let b = hex[5] + hex[6];
                let a = hex[7] + hex[8];
                return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255];
            } else {
                throw new Error("Functions.Generators.hexToRGBA: Invalid hex code");
            }
        },
        RGBToHex: function(r: number, g: number, b: number){
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        RGBAToHex: function(r: number, g: number, b: number, a: number){
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + ((1 << 8) + Math.round(a * 255)).toString(16).slice(1);
        },
        IPv4: function(){
            let ip = "";
            for (let i = 0; i < 4; i++){
                ip += Functions.Random.randomInt(0, 255);
                if (i < 3) ip += ".";
            }
            return ip;
        },
        IPv6: function(){
            let ip = "";
            for (let i = 0; i < 8; i++){
                ip += Functions.Random.randomInt(0, 65535).toString(16);
                if (i < 7) ip += ":";
            }
            return ip;
        },
        UUID: function(){
            return crypto.randomUUID();
        }
    },
    "Date": {
        now(){
            return Date.now();
        },
        today(){
            return new Date();
        },
        tomorrow(){
            return new Date(Date.now() + 86400000);
        },
        yesterday(){
            return new Date(Date.now() - 86400000);
        },
    }
};