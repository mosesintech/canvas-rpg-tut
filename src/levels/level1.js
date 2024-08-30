export const walls = new Set();

walls.add(`64,48`); // left tree
walls.add(`208,64`) // right tree
walls.add(`224,32`) // top-right tree

walls.add(`64,64`) // left squares
walls.add(`64,80`) // left squares
walls.add(`80,64`) // left squares
walls.add(`80,80`) // left squares
walls.add(`128,48`) //center squares
walls.add(`144,48`) //center squares


walls.add(`112,80`) // water
walls.add(`128,80`) // water
walls.add(`144,80`) // water
walls.add(`160,80`) // water

walls.add(`224,64`) // house

walls.add(`224,96`) // rock
walls.add(`208,96`) // rock
walls.add(`192,96`) // rock

// boundaries
// right wall
walls.add(`240,32`)
walls.add(`256,64`)
walls.add(`256,80`)
walls.add(`256,48`)
walls.add(`256,96`)
walls.add(`240,112`)
// bottom wall
walls.add(`224,112`)
walls.add(`208,112`)
walls.add(`192,112`)
walls.add(`176,112`)
walls.add(`160,112`)
walls.add(`144,112`)
walls.add(`128,112`)
walls.add(`112,112`)
walls.add(`96,112`)
walls.add(`80,112`)
walls.add(`64,112`)
walls.add(`48,112`)
// left wall
walls.add(`32,96`)
walls.add(`32,80`)
walls.add(`32,64`)
walls.add(`32,48`)
// top left wall
walls.add(`48,32`)
walls.add(`64,32`)
walls.add(`80,32`)
walls.add(`96,32`)
// top center wall
walls.add(`112,16`)
walls.add(`128,16`)
walls.add(`144,16`)
walls.add(`160,16`)
walls.add(`176,16`)
walls.add(`192,16`)
walls.add(`208,16`)
