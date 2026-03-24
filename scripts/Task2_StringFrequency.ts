/**
 * Task 2: String Character Frequency
 * * Assumption: Based on the example output (Input: "hello world" -> h:1, e:1, l:3, o:2, w:1, r:1, d:1)
 * it appears that whitespace characters are ignored in the final count. 
 * This implementation removes spaces and counts case-sensitively.
 */
function getCharacterFrequency(input: string): string {
    if (!input) return "";

    const frequencyMap = new Map<string, number>();

    const sanitizedInput = input.replace(/\s+/g, '');

    for (const char of sanitizedInput) {
        frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }

    return Array.from(frequencyMap.entries())
        .map(([char, count]) => `${char}:${count}`)
        .join(', ');
}

const testString = "hello world";
console.log(`Input: "${testString}"`);
console.log(`Output: ${getCharacterFrequency(testString)}`);