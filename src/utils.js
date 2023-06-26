export const url = new URL(window.location);

export function newLineText( text ) {
    const newText = text.split('\\n');
    // console.log(newText)
    return newText.map( string => `<p>${string}</p>` ).join('')
}