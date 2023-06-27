# Woot Wut Translator

Made for an in-joke where we said nothing but woot wut to each other. I decided to make our system of talking actually usable.

## Usage
You can simply open the index.html file in any browser and start translating to and fro.

## Basics
The translation works by converting each word to it's corresponding woot using the following steps.
1. A word is identified, and converted to lowercase
2. the program iterates over each letter and gets it's `ascii` value
3. the `ascii` value is then normalized to bring it to a space between 0-26
4. then it's corresponding wooot sequence is generated
   1. `w___t` denote the starting and ending of a word
   2. the letter between the two contain information on decoding the word itself
   3. the normalized `ascii` value is then converted to a base 3 number system
   4. since the available letters for use between `w` and `t` are only `o` and `u` i decided to go with a base 3 system since that allows for a 26 possiblity space using only 3 spaces: `3**3 = 27` where `o` is `0`; `O` is `1`; and `u` is `2`
   5. this is done for each letter, and then the word is wrapped in `w` and `t` to make it a word

The process is reversed for converting back.

# ENJOY!