export function convertNumberToEnglishText(n: number): string {
    var isNegative = false;
    var number = n;

    // check if number is negative
    if(number < 0){
        isNegative = true;
        number = Math.abs(number);
    }

    var string = number.toString(), 
        units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

    // check if number is zero, if so return 'zero'
    if(parseInt(string) === 0){
        return 'zero';
    }

    // words array of units
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 
    'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    // words array of tens
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    // words array of scales
    scales = ['', 'thousand'];

    // splint number into 3 digit chunks
    start = string.length;  
    chunks = [];            // string chunks array
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));      // Math.max is used in order to prevent error 'outside of boundaries'
    }

    // check if number is not too long
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return 'The number that you input is too long. Number must be between -99999 and 99999.';
    }

    //convert digits to words
    words = [];

    for(i = 0; i < chunksLen; i++){
        chunk = parseInt(chunks[i]);    // parse each chunk into integer

        if(chunk){
            // split into individual integers
            ints = chunks[i].split('').reverse().map(parseFloat);

            // If tens integer is 1, i.e. 10, then add 10 to units integer
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            // adds coresponding scale word, starts from thousands
            if ((word = scales[i])) {
                words.push(word);
            }

            // add coresponding unit word (up to 19)
            if ((word = units[ints[0]])) {
                words.push(word);
            }

            // add coresponding tens word
            if ((word = tens[ints[1]])) {
                words.push(word);
            }
            
            // add 'hundred' word 
            if ((word = units[ints[2]])) {
                words.push(word + ' hundred');
            }
        }
    }
    // if it's negative number add 'negative'
    if(isNegative){
        words.push('negative');
    }

    return words.reverse().join(' ');
}
