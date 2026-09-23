/* Handcrafted Levels Definition for Breakout */

export const BRICK_TYPES = {
    NORMAL: 'normal',
    REINFORCED: 'reinforced',
    UNBREAKABLE: 'unbreakable',
    EXPLOSIVE: 'explosive',
    POWERUP: 'powerup',
    BOSS_PART: 'boss_part'
};

export const BRICK_COLORS = {
    CYAN: '#00f0ff',
    PINK: '#ff0055',
    YELLOW: '#ffe600',
    PURPLE: '#b026ff',
    GREEN: '#00ff66',
    METAL: '#6c757d',
    EXPLOSIVE: '#ff3300',
    GOLD: '#ffd700'
};

export const LEVELS = [
    // Level 1: Neon Waves
    {
        id: 1,
        name: "Neon Waves",
        rows: 5,
        cols: 9,
        grid: [
            ['CYAN', 'CYAN', 'CYAN', 'CYAN', 'CYAN', 'CYAN', 'CYAN', 'CYAN', 'CYAN'],
            ['PINK', 'PINK', 'PINK', 'PINK', 'PINK', 'PINK', 'PINK', 'PINK', 'PINK'],
            ['YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW', 'YELLOW'],
            ['PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE'],
            ['GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN']
        ],
        types: [
            ['R', 'N', 'N', 'P', 'N', 'P', 'N', 'N', 'R'],
            ['N', 'N', 'P', 'N', 'N', 'N', 'P', 'N', 'N'],
            ['N', 'P', 'N', 'N', 'E', 'N', 'N', 'P', 'N'],
            ['N', 'N', 'N', 'P', 'N', 'P', 'N', 'N', 'N'],
            ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N']
        ]
    },
    // Level 2: Cyber Fortress
    {
        id: 2,
        name: "Cyber Fortress",
        rows: 6,
        cols: 9,
        grid: [
            ['METAL', 'PINK', 'PINK', 'PINK', 'GOLD', 'PINK', 'PINK', 'PINK', 'METAL'],
            ['CYAN', 'METAL', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'METAL', 'CYAN'],
            ['CYAN', 'YELLOW', 'METAL', 'GREEN', 'GREEN', 'GREEN', 'METAL', 'YELLOW', 'CYAN'],
            ['CYAN', 'YELLOW', 'GREEN', 'METAL', 'EXPLOSIVE', 'METAL', 'GREEN', 'YELLOW', 'CYAN'],
            ['CYAN', 'YELLOW', 'METAL', 'GREEN', 'GREEN', 'GREEN', 'METAL', 'YELLOW', 'CYAN'],
            ['METAL', 'PINK', 'PINK', 'PINK', 'GOLD', 'PINK', 'PINK', 'PINK', 'METAL']
        ],
        types: [
            ['U', 'R', 'R', 'R', 'P', 'R', 'R', 'R', 'U'],
            ['N', 'U', 'R', 'P', 'R', 'P', 'R', 'U', 'N'],
            ['N', 'N', 'U', 'N', 'N', 'N', 'U', 'N', 'N'],
            ['N', 'N', 'N', 'U', 'E', 'U', 'N', 'N', 'N'],
            ['N', 'N', 'U', 'N', 'N', 'N', 'U', 'N', 'N'],
            ['U', 'R', 'R', 'R', 'P', 'R', 'R', 'R', 'U']
        ]
    },
    // Level 3: Explosive Grid
    {
        id: 3,
        name: "Explosive Grid",
        rows: 6,
        cols: 9,
        grid: [
            ['EXPLOSIVE', 'CYAN', 'EXPLOSIVE', 'CYAN', 'EXPLOSIVE', 'CYAN', 'EXPLOSIVE', 'CYAN', 'EXPLOSIVE'],
            ['PURPLE', 'EXPLOSIVE', 'PURPLE', 'EXPLOSIVE', 'PURPLE', 'EXPLOSIVE', 'PURPLE', 'EXPLOSIVE', 'PURPLE'],
            ['YELLOW', 'YELLOW', 'EXPLOSIVE', 'YELLOW', 'GOLD', 'YELLOW', 'EXPLOSIVE', 'YELLOW', 'YELLOW'],
            ['GREEN', 'EXPLOSIVE', 'GREEN', 'EXPLOSIVE', 'GREEN', 'EXPLOSIVE', 'GREEN', 'EXPLOSIVE', 'GREEN'],
            ['PINK', 'PINK', 'PINK', 'EXPLOSIVE', 'PINK', 'EXPLOSIVE', 'PINK', 'PINK', 'PINK'],
            ['METAL', 'CYAN', 'CYAN', 'CYAN', 'METAL', 'CYAN', 'CYAN', 'CYAN', 'METAL']
        ],
        types: [
            ['E', 'N', 'E', 'N', 'E', 'N', 'E', 'N', 'E'],
            ['R', 'E', 'R', 'E', 'R', 'E', 'R', 'E', 'R'],
            ['N', 'N', 'E', 'N', 'P', 'N', 'E', 'N', 'N'],
            ['N', 'E', 'N', 'E', 'N', 'E', 'N', 'E', 'N'],
            ['P', 'N', 'N', 'E', 'N', 'E', 'N', 'N', 'P'],
            ['U', 'N', 'N', 'N', 'U', 'N', 'N', 'N', 'U']
        ]
    },
    // Level 4: Space Invader
    {
        id: 4,
        name: "Retro Invader",
        rows: 7,
        cols: 9,
        grid: [
            ['EMPTY', 'EMPTY', 'GREEN', 'EMPTY', 'EMPTY', 'EMPTY', 'GREEN', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY', 'GREEN', 'GREEN', 'GREEN', 'EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'EMPTY'],
            ['GREEN', 'GREEN', 'PINK', 'GREEN', 'GREEN', 'GREEN', 'PINK', 'GREEN', 'GREEN'],
            ['GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN', 'GREEN'],
            ['EMPTY', 'GREEN', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GREEN', 'EMPTY'],
            ['GREEN', 'EMPTY', 'GREEN', 'EMPTY', 'EMPTY', 'EMPTY', 'GREEN', 'EMPTY', 'GREEN']
        ],
        types: [
            ['', '', 'R', '', '', '', 'R', '', ''],
            ['', '', '', 'P', 'R', 'P', '', '', ''],
            ['', 'R', 'R', 'R', 'R', 'R', 'R', 'R', ''],
            ['R', 'R', 'E', 'R', 'P', 'R', 'E', 'R', 'R'],
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['', 'N', '', '', '', '', '', 'N', ''],
            ['P', '', 'N', '', '', '', 'N', '', 'P']
        ]
    },
    // Level 5: Diamond Citadel
    {
        id: 5,
        name: "Diamond Citadel",
        rows: 7,
        cols: 9,
        grid: [
            ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOLD', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY', 'PINK', 'CYAN', 'PINK', 'EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'PURPLE', 'YELLOW', 'EXPLOSIVE', 'YELLOW', 'PURPLE', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'GREEN', 'CYAN', 'METAL', 'GOLD', 'METAL', 'CYAN', 'GREEN', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'PURPLE', 'YELLOW', 'EXPLOSIVE', 'YELLOW', 'PURPLE', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY', 'PINK', 'CYAN', 'PINK', 'EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOLD', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY']
        ],
        types: [
            ['', '', '', '', 'P', '', '', '', ''],
            ['', '', '', 'R', 'R', 'R', '', '', ''],
            ['', '', 'R', 'N', 'E', 'N', 'R', '', ''],
            ['', 'N', 'N', 'U', 'P', 'U', 'N', 'N', ''],
            ['', '', 'R', 'N', 'E', 'N', 'R', '', ''],
            ['', '', '', 'R', 'R', 'R', '', '', ''],
            ['', '', '', '', 'P', '', '', '', '']
        ]
    },
    // Level 6: BOSS LEVEL (The Core)
    {
        id: 6,
        name: "THE CORE (Boss Encounter)",
        isBoss: true,
        bossHp: 150,
        rows: 4,
        cols: 9,
        grid: [
            ['METAL', 'PINK', 'CYAN', 'PINK', 'GOLD', 'PINK', 'CYAN', 'PINK', 'METAL'],
            ['CYAN', 'METAL', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'PURPLE', 'METAL', 'CYAN'],
            ['PINK', 'YELLOW', 'METAL', 'EXPLOSIVE', 'GOLD', 'EXPLOSIVE', 'METAL', 'YELLOW', 'PINK'],
            ['METAL', 'CYAN', 'PINK', 'CYAN', 'METAL', 'CYAN', 'PINK', 'CYAN', 'METAL']
        ],
        types: [
            ['U', 'R', 'R', 'R', 'P', 'R', 'R', 'R', 'U'],
            ['N', 'U', 'R', 'R', 'R', 'R', 'R', 'U', 'N'],
            ['R', 'N', 'U', 'E', 'P', 'E', 'U', 'N', 'R'],
            ['U', 'N', 'N', 'N', 'U', 'N', 'N', 'N', 'U']
        ]
    }
];
