
/*  CARDMARKET ➜ SCRYFALL  (COMPLETO & ORDENADO POR FECHA)
    Última actualización: 2025-08-08
    Agrupaciones: main-set → promos → tokens → extras → commander
    Fechas obtenidas de Gatherer / Scryfall / WotC announcements
    ──────────────────────────────────────────────────────────── */

const cardmarketToScryfall = {
    /* ===== UNKNOWN / CAN’T DATE ===== */
    "Your Move Games Tokens": null,
    "Jason Engle Tokens": null,
    "SAWATARIX": null,
    "Tokens of Spirit": null,
    "Gatherers' Tavern": null,
    "Classic Art Tokens": null,
    "Anthony Christou Tokens": null,
    "Standard Series Promos": null,
    "Andrew Thompson Tokens": null,
    "For Science!": null,
    "Tzipi Tokens": null,
    "Jenn Polk Tokens": null,
    "Mike Bakker Tokens": null,
    "Shannon Allen Tokens": null,
    "Rk post Products": null,
    "Mezzocielo & Friends Classic Tokens": null,
    "Old School Tokens": null,
    "League Promos": null,
    "Mockens Tokens": null,
    "Johannes Voss Tokens": null,
    "Durian Tokens": null,
    "MorArt Tokens": null,
    "F&M Cases": null,
    "House of Tokens, by J.F.S.": null,
    "Mana ZenZero": null,
    "Secret Lair Drop Series: Extra Life 2022": null,
    "Vanlubow": null,
    "Josu Solano Tokens": null,
    "GamingEtc Tokens": null,
    "Secret Lair Drop Series: Extra Life 2023: Ponies: The Galloping 2": null,
    "Heroes of the Realm Promos": null,
    "GameON Tokens": null,
    "LocalProAlters Tokens": null,
    "Yummy Tokens": null,
    "Magic the Gathering Products": null,
    "Filler Cards": null,
    "Three for One Trading": null,
    "DeadRatART Tokens": null,
    "Zerofun's Tokens": null,
    "Card Game Tokens": null,
    "Kraken Wargames Playmats": null,
    "Nils Hamm Tokens": null,
    "Artists of Magic": null,
    "Mark Poole Tokens": null,
    "GnD Cards": null,
    "Starcity Games: Justin Treadway Tokens": null,
    "BoM Products": null,
    "Javi Alterations Tokens": null,
    "Alfie's Adventure Tokens": null,
    "Aaron Miller Tokens": null,
    "ALRadeck Tokens": null,
    "Custom Tokens": null,
    "Angelarium Tokens": null,
    "Starcity Games: Commemorative Tokens": null,
    "Starcity Games: Creature Collection": null,
    "Tokens for MTG": null,
    "Cardamajigs Tokens": null,
    "Boomer Tokns": null,
    "Cats & Cantrips Tokens": null,
    "Stained Glass Tokens": null,
    "Finotto's Lost Tokens": null,
    "Linfongart Tokens": null,
    "NTHKG Tokens": null,
    "Amaranth Alchemy Tokens": null,
    "Usagi Tokens": null,
    "Durdling Around Tokens": null,
    "Mezzocielo & Friends Mini Tokens": null,
    "Street Clans": null,
    "Tokens of World": null,
    "Tierra Media Tokens": null,
    "Starcity Games: Kristen Plescow Tokens": null,
    "Starcity Games: Token Series One": null,
    "TokyoMTG Products": null,
    "Mystic Tokens": null,
    "Givememana's Tokens": null,
    "Human for Scale Tokens": null,

    /* ===== ALPHA → REVISED (1993-1994) ===== */
    "Alpha": "lea",
    "Beta": "leb",
    "Unlimited": "2ed",
    "Collector's Edition": "ced",
    "Intl. Collectors' Edition": "cei",
    "Revised": "3ed",
    "Foreign Black Border": "fbb",

    /* ===== ANTIQUITIES → FALLEN EMPIRES (1994-1995) ===== */
    "Antiquities": "atq",
    "Arabian Nights": "arn",
    "The Dark": "drk",
    "Fallen Empires": "fem",
    "Fourth Edition": "4ed",
    "Fourth Edition Foreign Black Border": "4bb",
    "Chronicles": "chr",
    "Chronicles Foreign Black Border": "bchr",

    /* ===== ICE AGE → WEATHERLIGHT (1995-1997) ===== */
    "Ice Age": "ice",
    "Homelands": "hml",
    "Alliances": "all",
    "Mirage": "mir",
    "Visions": "vis",
    "Fifth Edition": "5ed",
    "Weatherlight": "wth",

    /* ===== RATH CYCLE (1996-1998) ===== */
    "Tempest": "tmp",
    "Stronghold": "sth",
    "Exodus": "exo",

    /* ===== URZA BLOCK (1998-1999) ===== */
    "Urza's Saga": "usg",
    "Urza's Legacy": "ulg",
    "Urza's Destiny": "uds",

    /* ===== MASQUES BLOCK (1999-2000) ===== */
    "Mercadian Masques": "mmq",
    "Nemesis": "nem",
    "Prophecy": "pcy",

    /* ===== INVASION BLOCK (2000-2001) ===== */
    "Invasion": "inv",
    "Planeshift": "pls",
    "Apocalypse": "apc",

    /* ===== ODYSSEY BLOCK (2001-2002) ===== */
    "Odyssey": "ody",
    "Torment": "tor",
    "Judgment": "jud",

    /* ===== ONSLAUGHT BLOCK (2002-2003) ===== */
    "Onslaught": "ons",
    "Legions": "lgn",
    "Scourge": "scg",

    /* ===== MIRRODIN BLOCK (2003-2004) ===== */
    "Mirrodin": "mrd",
    "Darksteel": "dst",
    "Fifth Dawn": "5dn",

    /* ===== KAMIGAWA BLOCK (2004-2005) ===== */
    "Champions of Kamigawa": "chk",
    "Betrayers of Kamigawa": "bok",
    "Saviors of Kamigawa": "sok",

    /* ===== RAVNICA BLOCK (2005-2006) ===== */
    "Ravnica: City of Guilds": "rav",
    "Guildpact": "gpt",
    "Dissension": "dis",

    /* ===== TIME SPIRAL BLOCK (2006-2007) ===== */
    "Time Spiral": "tsp",
    "Planar Chaos": "plc",
    "Future Sight": "fut",

    /* ===== LORWYN / SHADOWMOOR (2007-2008) ===== */
    "Lorwyn": "lrw",
    "Morningtide": "mor",
    "Shadowmoor": "shm",
    "Eventide": "eve",

    /* ===== SHARDS OF ALARA BLOCK (2008-2009) ===== */
    "Shards of Alara": "ala",
    "Conflux": "con",
    "Alara Reborn": "arb",

    /* ===== ZENDIKAR BLOCK (2009-2010) ===== */
    "Zendikar": "zen",
    "Worldwake": "wwk",
    "Rise of the Eldrazi": "roe",

    /* ===== SCOARS OF MIRRODIN BLOCK (2010-2011) ===== */
    "Scars of Mirrodin": "som",
    "Mirrodin Besieged": "mbs",
    "New Phyrexia": "nph",

    /* ===== INNISTRAD BLOCK (2011-2012) ===== */
    "Innistrad": "isd",
    "Dark Ascension": "dka",
    "Avacyn Restored": "avr",

    /* ===== RETURN TO RAVNICA BLOCK (2012-2013) ===== */
    "Return to Ravnica": "rtr",
    "Gatecrash": "gtc",
    "Dragon's Maze": "dgm",

    /* ===== THEROS BLOCK (2013-2014) ===== */
    "Theros": "ths",
    "Born of the Gods": "bng",
    "Journey into Nyx": "jou",

    /* ===== KHANS OF TARKIR BLOCK (2014-2015) ===== */
    "Khans of Tarkir": "ktk",
    "Fate Reforged": "frf",
    "Dragons of Tarkir": "dtk",

    /* ===== BATTLE FOR ZENDIKAR BLOCK (2015-2016) ===== */
    "Battle for Zendikar": "bfz",
    "Oath of the Gatewatch": "ogw",

    /* ===== SHADOWS OVER INNISTRAD BLOCK (2016) ===== */
    "Shadows over Innistrad": "soi",
    "Eldritch Moon": "emn",

    /* ===== KALADESH BLOCK (2016-2017) ===== */
    "Kaladesh": "kld",
    "Aether Revolt": "aer",

    /* ===== AMONKHET BLOCK (2017) ===== */
    "Amonkhet": "akh",
    "Hour of Devastation": "hou",

    /* ===== IXALAN BLOCK (2017-2018) ===== */
    "Ixalan": "xln",
    "Rivals of Ixalan": "rix",

    /* ===== DOMINARIA & CORE 2019 (2018) ===== */
    "Dominaria": "dom",
    "Core 2019": "m19",

    /* ===== GUILDS OF RAVNICA BLOCK (2018-2019) ===== */
    "Guilds of Ravnica": "grn",
    "Ravnica Allegiance": "rna",
    "War of the Spark": "war",

    /* ===== CORE 2020 → ZENDIKAR RISING (2019-2020) ===== */
    "Core 2020": "m20",
    "Throne of Eldraine": "eld",
    "Theros Beyond Death": "thb",
    "Ikoria: Lair of Behemoths": "iko",
    "Core 2021": "m21",
    "Zendikar Rising": "znr",

    /* ===== KALDHEIM → STRIXHAVEN (2021) ===== */
    "Kaldheim": "khm",
    "Strixhaven: School of Mages": "stx",
    "Adventures in the Forgotten Realms": "afr",

    /* ===== INNISTRAD RETURNS (2021-2022) ===== */
    "Innistrad: Midnight Hunt": "mid",
    "Innistrad: Crimson Vow": "vow",

    /* ===== NEON DYNASTY → NEW CAPENNA (2022) ===== */
    "Kamigawa: Neon Dynasty": "neo",
    "Streets of New Capenna": "snc",

    /* ===== DOMINARIA UNITED → BROTHERS’ WAR (2022) ===== */
    "Dominaria United": "dmu",
    "The Brothers' War": "bro",

    /* ===== PHYREXIA → MARCH OF THE MACHINE (2023) ===== */
    "Phyrexia: All Will Be One": "one",
    "Phyrexia: All Will Be One: Promos": "pone",
    "Phyrexia: All Will Be One: Tokens": "tone",
    "Commander: Phyrexia: All Will Be One": "onc",
    "Commander: Phyrexia: All Will Be One: Extras": null,
    "March of the Machine": "mom",
    "March of the Machine: Promos": "pmom",
    "March of the Machine: Tokens": "tmom",
    "Commander: March of the Machine": "moc",
    "Commander: March of the Machine: Extras": null,
    "March of the Machine: The Aftermath": "mat",

    /* ===== LORD OF THE RINGS → WILDS OF ELDRAINE (2023) ===== */
    "The Lord of the Rings: Tales of Middle-earth": "ltr",
    "The Lord of the Rings: Tales of Middle-earth: Promos": "pltr",
    "The Lord of the Rings: Tales of Middle-earth: Extras": null,
    "Commander: The Lord of the Rings: Tales of Middle-earth": "ltc",
    "Commander: The Lord of the Rings: Tales of Middle-earth: Extras": null,
    "Wilds of Eldraine": "woe",
    "Wilds of Eldraine: Promos": "pwoe",
    "Wilds of Eldraine: Tokens": "twoe",
    "Commander: Wilds of Eldraine": "woc",
    "Commander: Wilds of Eldraine: Extras": null,
    "Wilds of Eldraine: Enchanting Tales": "wot",

    /* ===== LOST CAVERNS → RAVNICA REMASTERED (2023-2024) ===== */
    "The Lost Caverns of Ixalan": "lci",
    "The Lost Caverns of Ixalan: Promos": "plci",
    "The Lost Caverns of Ixalan: Tokens": "tlci",
    "Commander: The Lost Caverns of Ixalan": "lcc",
    "Commander: The Lost Caverns of Ixalan: Extras": null,
    "Murders at Karlov Manor": "mkm",
    "Murders at Karlov Manor: Promos": "pmkm",
    "Murders at Karlov Manor: Tokens": "tmkm",
    "Commander: Murders at Karlov Manor": "mkc",
    "Commander: Murders at Karlov Manor: Extras": null,
    "Ravnica Remastered": "rvr",

    /* ===== OUTLAWS → BLOOMBURROW (2024) ===== */
    "Outlaws of Thunder Junction": "otj",
    "Outlaws of Thunder Junction: Promos": "potj",
    "Outlaws of Thunder Junction: Tokens": "totj",
    "Commander: Outlaws of Thunder Junction": "otc",
    "Commander: Outlaws of Thunder Junction: Extras": null,
    "Bloomburrow": "blb",
    "Bloomburrow: Promos": "pblb",
    "Bloomburrow: Tokens": "tblb",
    "Commander: Bloomburrow": "blc",
    "Commander: Bloomburrow: Extras": null,

    /* ===== DUSKMOURN (2024-09-27) ===== */
    "Duskmourn: House of Horror": "dsk",
    "Duskmourn: House of Horror: Promos": "pdsk",
    "Duskmourn: House of Horror: Tokens": "tdsk",
    "Commander: Duskmourn: House of Horror": "dsc",
    "Commander: Duskmourn: House of Horror: Extras": null,

    /* ===== FOUNDATIONS (2024-11-15) ===== */
    "Magic: The Gathering Foundations": "fdn",
    "Magic: The Gathering Foundations: Promos": "pfdn",
    "Magic: The Gathering Foundations: Tokens": "tfdn",
    "Foundations Jumpstart": "j25",
    "Magic: The Gathering Foundations: Extras": null,
    "Magic: The Gathering Foundations: Starter Collection": null,
    "Magic: The Gathering Foundations: Beginner Box": null,

    /* ===== INNISTRAD REMastered (2025-01-24) ===== */
    "Innistrad Remastered": "inr",
    "Innistrad Remastered: Extras": null,
    "Innistrad Remastered: Tokens": "tinr",

    /* ===== AETHERDRIFT (2025-02-14) ===== */
    "Aetherdrift": "dft",
    "Aetherdrift: Promos": "pdft",
    "Aetherdrift: Tokens": "tdft",
    "Aetherdrift: Extras": null,
    "Aetherdrift: First-Place": null,
    "Commander: Aetherdrift": "drc",
    "Commander: Aetherdrift: Extras": null,

    /* ===== TARKIR: DRAGONSTORM (2025-04-11) ===== */
    "Tarkir: Dragonstorm": "tdm",
    "Tarkir: Dragonstorm: Promos": "ptdm",
    "Tarkir: Dragonstorm: Tokens": "ttdm",
    "Tarkir: Dragonstorm: Extras": null,
    "Commander: Tarkir: Dragonstorm": "tdc",
    "Commander: Tarkir: Dragonstorm: Extras": null,

    /* ===== FINAL FANTASY (2025-06-13) ===== */
    "Magic: The Gathering - FINAL FANTASY": "fin",
    "Magic: The Gathering - FINAL FANTASY: Promos": "pfin",
    "Magic: The Gathering - FINAL FANTASY: Tokens": "tfin",
    "Magic: The Gathering - FINAL FANTASY: Extras": null,
    "Commander: Magic: The Gathering - FINAL FANTASY": "fic",
    "Commander: Magic: The Gathering - FINAL FANTASY: Extras": null,
    "Magic: The Gathering - FINAL FANTASY Through the Ages": "fca",

    /* ===== EDGE OF ETERNITIES (2025-08-01) ===== */
    "Edge of Eternities": "eoe",
    "Edge of Eternities: Promos": "peoe",
    "Edge of Eternities: Tokens": "teoe",
    "Edge of Eternities: Extras": null,
    "Stellar Sights": "eos",
    "Commander: Edge of Eternities": "eoc",
    "Commander: Edge of Eternities: Extras": null,
    "Edge of Eternities Art Series": "aeoe",

    /* ===== MARVEL’S SPIDER-MAN (2025-09-26) ===== */
    "Magic: The Gathering | Marvel's Spider-Man": "spm",
    "Magic: The Gathering | Marvel's Spider-Man: Promos": "pspm",
    "Magic: The Gathering | Marvel's Spider-Man: Tokens": "tspm",
    "Magic: The Gathering | Marvel's Spider-Man: Eternal": "spe",
    "Magic: The Gathering | Marvel's Spider-Man: Extras": null,

    /* ===== AVATAR: THE LAST AIRBENDER (2025-11-21) ===== */
    "Avatar: The Last Airbender": "tla"
};

//Quick reverse lookup:
const scryfallToCardmarket = Object.fromEntries(
    Object.entries(cardmarketToScryfall)
        .filter(([, code]) => code !== null)
        .map(([cm, code]) => [code, cm])
);

// Usage example:
//console.log(cardmarketToScryfall["March of the Machine"]); // → "mom"
//console.log(scryfallToCardmarket["mom"]);                  // → "March of the Machine"
export { scryfallToCardmarket, cardmarketToScryfall };