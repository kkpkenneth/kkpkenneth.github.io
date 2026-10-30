/********************************************************************
 * questions.js
 * Regional Trivia Question Banks:
 * 1. OG_REGION_QUESTIONS: Very easy questions across all 18 types
 * 2. EAST_ASIA_QUESTIONS: Chinese character (Hanzi) questions across all 18 types
 * (Original scientific trivia questions preserved in comments below)
 ********************************************************************/

const OG_REGION_QUESTIONS = [
  // --- NORMAL ---
  { type: 'NORMAL', difficulty: 1, q: 'How many legs does a pet dog have?', options: ['4', '2', '6', '8'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What sound does a house cat make?', options: ['Meow', 'Woof', 'Moo', 'Quack'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'How many days are in one week?', options: ['7', '5', '10', '12'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What is the standard biological classification term for modern human beings?', options: ['Homo sapiens', 'Pan troglodytes', 'Canis lupus', 'Felis catus'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'In linguistics, what term describes a word that reads the same backward as forward?', options: ['Palindrome', 'Anagram', 'Homophone', 'Portmanteau'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which of the following is a traditional primary color in paint and pigment mixing?', options: ['Red', 'Orange', 'Green', 'Purple'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'How many permanent teeth does an average healthy adult human have, including wisdom teeth?', options: ['32', '28', '30', '34'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'How many letters are in the modern English alphabet?', options: ['26', '24', '28', '25'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What literary term describes a word blending the sounds and meanings of two other words (e.g., "brunch")?', options: ['Portmanteau', 'Acronym', 'Euphemism', 'Idiom'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which of these animals is commonly known as man\'s best friend?', options: ['Dog', 'Cat', 'Hamster', 'Parrot'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What figure of speech combines contradictory terms, such as "deafening silence"?', options: ['Oxymoron', 'Hyperbole', 'Metaphor', 'Onomatopoeia'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after January?', options: ['March', 'February', 'December', 'April'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after February?', options: ['April', 'January', 'March', 'May'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after March?', options: ['April', 'May', 'June', 'February'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after April?', options: ['June', 'March', 'July', 'May'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after May?', options: ['July', 'June', 'April', 'August'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after June?', options: ['May', 'August', 'July', 'September'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after July?', options: ['August', 'June', 'September', 'October'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after August?', options: ['October', 'November', 'July', 'September'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after September?', options: ['August', 'November', 'October', 'December'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after October?', options: ['December', 'November', 'September', 'January'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after November?', options: ['October', 'January', 'February', 'December'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after December?', options: ['January', 'February', 'November', 'March'], answer: 0 },

  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Monday?', options: ['Wednesday', 'Tuesday', 'Sunday', 'Thursday'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Tuesday?', options: ['Thursday', 'Monday', 'Wednesday', 'Friday'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Wednesday?', options: ['Tuesday', 'Friday', 'Saturday', 'Thursday'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Thursday?', options: ['Friday', 'Wednesday', 'Saturday', 'Monday'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Friday?', options: ['Sunday', 'Saturday', 'Thursday', 'Monday'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Saturday?', options: ['Friday', 'Monday', 'Sunday', 'Tuesday'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Sunday?', options: ['Tuesday', 'Saturday', 'Wednesday', 'Monday'], answer: 3 },

  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Spring?', options: ['Summer', 'Autumn', 'Winter', 'Fall'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Summer?', options: ['Winter', 'Spring', 'Autumn', 'Dry'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Autumn?', options: ['Spring', 'Summer', 'Monsoon', 'Winter'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Winter?', options: ['Summer', 'Spring', 'Autumn', 'Fall'], answer: 1 },

  // --- FIRE ---
  { type: 'FIRE', difficulty: 1, q: 'Is fire hot or cold?', options: ['Hot', 'Cold', 'Frozen', 'Wet'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What bright object in the sky gives us warmth during the day?', options: ['The Sun', 'The Moon', 'A Cloud', 'A Rainbow'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What do you use to put out a campfire?', options: ['Water', 'Paper', 'Dry leaves', 'Wood'], answer: 0 },

  // --- WATER ---
  { type: 'WATER', difficulty: 1, q: 'What animal lives and swims in the water?', options: ['Fish', 'Squirrel', 'Chicken', 'Camel'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What falls from clouds when it is raining?', options: ['Water', 'Sand', 'Rocks', 'Leaves'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What do we drink when we feel thirsty?', options: ['Water', 'Rocks', 'Sand', 'Paper'], answer: 0 },

  // --- GRASS ---
  { type: 'GRASS', difficulty: 1, q: 'What color is healthy grass on a lawn?', options: ['Green', 'Blue', 'Purple', 'Red'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What do plants need from the sky to grow?', options: ['Sunlight and rain', 'Toys', 'Shoes', 'rocks'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'Which part of a tree grows underground?', options: ['Roots', 'Leaves', 'Branches', 'Apples'], answer: 0 },

  // --- ELECTRIC ---
  { type: 'ELECTRIC', difficulty: 1, q: 'What bright flash appears in the sky during a thunderstorm?', options: ['Lightning', 'Snow', 'Fog', 'Rainbow'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What do you put inside a flashlight or TV remote to power it?', options: ['Batteries', 'Coins', 'Marbles', 'Cookies'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What do you flip on the wall to turn on a room light?', options: ['Light switch', 'Door handle', 'Window lock', 'Faucet'], answer: 0 },

  // --- ICE ---
  { type: 'ICE', difficulty: 1, q: 'What happens to water when it gets very, very cold?', options: ['It freezes into ice', 'It boils', 'It turns into fire', 'It disappears'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What cold white flakes fall from the sky in winter?', options: ['Snow', 'Sand', 'Leaves', 'Confetti'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What cold sweet treat do people eat on a cone in summer?', options: ['Ice cream', 'Hot soup', 'Toast', 'Oatmeal'], answer: 0 },

  // --- FIGHTING ---
  { type: 'FIGHTING', difficulty: 1, q: 'What part of your body do you use to kick a soccer ball?', options: ['Foot', 'Ear', 'Nose', 'Elbow'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'Why do people exercise and play sports?', options: ['To stay strong and healthy', 'To fall asleep in class', 'To break their shoes', 'To get hungry'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What padded gear do boxers wear on their hands?', options: ['Boxing gloves', 'Mittens', 'Socks', 'Boots'], answer: 0 },

  // --- POISON ---
  { type: 'POISON', difficulty: 1, q: 'Should you ever eat wild mushrooms you find on the ground?', options: ['No, they can be poisonous', 'Yes, always', 'Only purple ones', 'Only at night'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'Why should you wash your hands with soap before eating?', options: ['To wash away germs', 'To make your hands cold', 'To waste water', 'To paint your hands'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'Which slithering animal can sometimes have venomous fangs?', options: ['Snake', 'Rabbit', 'Pigeon', 'Goldfish'], answer: 0 },

  // --- GROUND ---
  { type: 'GROUND', difficulty: 1, q: 'What is a sandy beach covered with?', options: ['Sand', 'Carpet', 'Snow', 'Bricks'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What do you dig into when planting a garden?', options: ['Soil / Dirt', 'Clouds', 'Glass', 'Plastic'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What happens when dirt mixes with rain water?', options: ['It turns into mud', 'It turns into gold', 'It floats into space', 'It catches fire'], answer: 0 },

  // --- FLYING ---
  { type: 'FLYING', difficulty: 1, q: 'What body parts do birds use to fly in the sky?', options: ['Wings', 'Fins', 'Horns', 'Shells'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'Which machine flies passengers high above the clouds?', options: ['Airplane', 'Submarine', 'Train', 'Bicycle'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What covers a bird\'s body to help it fly and stay warm?', options: ['Feathers', 'Scales', 'Fur', 'Shell'], answer: 0 },

  // --- PSYCHIC ---
  { type: 'PSYCHIC', difficulty: 1, q: 'Which organ inside your head do you use to think and learn?', options: ['Brain', 'Stomach', 'Knee', 'Toe'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What do we experience in our minds while sleeping at night?', options: ['Dreams', 'Homework', 'Running', 'Cooking'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What is 5 + 5?', options: ['10', '8', '12', '55'], answer: 0 },

  // --- BUG ---
  { type: 'BUG', difficulty: 1, q: 'What colorful insect does a caterpillar turn into?', options: ['Butterfly', 'Beetle', 'Ant', 'Grasshopper'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'Which buzzing insect makes sweet honey?', options: ['Bee', 'Mosquito', 'Fly', 'Cricket'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'Which small red bug has black spots on its back?', options: ['Ladybug', 'Dragonfly', 'Moth', 'Wasp'], answer: 0 },

  // --- ROCK ---
  { type: 'ROCK', difficulty: 1, q: 'Is a rock hard or soft?', options: ['Hard', 'Soft like a pillow', 'Fluffy', 'Liquid'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What are small, smooth rocks found by a river called?', options: ['Pebbles', 'Boulders', 'Clouds', 'Leaves'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What giant landforms are made of towering rock?', options: ['Mountains', 'Puddles', 'Meadows', 'Ponds'], answer: 0 },

  // --- GHOST ---
  { type: 'GHOST', difficulty: 1, q: 'What holiday features carved pumpkins and spooky costumes?', options: ['Halloween', 'Valentine\'s Day', 'New Year\'s Day', 'Earth Day'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What dark shape follows you on the ground when the sun shines?', options: ['Your shadow', 'A puddle', 'A cloud', 'A rainbow'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What traditional sound does a cartoon ghost make?', options: ['Boo!', 'ribbit!', 'Cock-a-doodle-doo!', 'Chirp!'], answer: 0 },

  // --- DRAGON ---
  { type: 'DRAGON', difficulty: 1, q: 'In storybooks, what does a mythical dragon breathe from its mouth?', options: ['Fire', 'Bubbles', 'Confetti', 'Feathers'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What giant reptiles lived on Earth millions of years ago?', options: ['Dinosaurs', 'Puppies', 'Kittens', 'Hamsters'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'Does a mythical flying dragon have wings?', options: ['Yes', 'No, it has wheels', 'No, it has fins only', 'No'], answer: 0 },

  // --- DARK ---
  { type: 'DARK', difficulty: 1, q: 'When does the sky become dark?', options: ['At night', 'At noon', 'In the morning', 'At lunchtime'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What shines in the night sky along with the stars?', options: ['The Moon', 'A Rainbow', 'The Sun', 'A Cloud'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'Which bird stays awake at night and says "Hoot"?', options: ['Owl', 'Robin', 'Duck', 'Penguin'], answer: 0 },

  // --- STEEL ---
  { type: 'STEEL', difficulty: 1, q: 'What material are spoons, forks, and keys usually made of?', options: ['Metal', 'Paper', 'Cloth', 'Bread'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What sticks to a refrigerator door?', options: ['A magnet', 'A leaf', 'A деревянный block', 'A feather'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What machine made of metal parts can be programmed to help people?', options: ['Robot', 'Pillow', 'Tree', 'Cloud'], answer: 0 },

  // --- FAIRY ---
  { type: 'FAIRY', difficulty: 1, q: 'How many colors are in a classic rainbow?', options: ['7', '2', '15', '1'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What magical stick does a fairy godmother wave in stories?', options: ['Magic wand', 'Broomstick', 'Umbrella', 'Spoon'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'How do many fairy tale storybooks end?', options: ['Happily ever after', 'To be continued tomorrow', 'Time for lunch', 'The alarm rang'], answer: 0 }
];

const EAST_ASIA_QUESTIONS = [
  // --- NORMAL ---
  { type: 'NORMAL', difficulty: 1, q: 'What is the Chinese character for "person / human"?', options: ['人 (rén)', '木 (mù)', '水 (shuǐ)', '火 (huǒ)'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What is the Chinese character for "big / large"?', options: ['大 (dà)', '小 (xiǎo)', '山 (shān)', '田 (tián)'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What is the Chinese character for "mouth"?', options: ['口 (kǒu)', '日 (rì)', '月 (yuè)', '手 (shǒu)'], answer: 0 },

  // --- FIRE ---
  { type: 'FIRE', difficulty: 1, q: 'What is the Chinese character for "fire"?', options: ['火 (huǒ)', '水 (shuǐ)', '木 (mù)', '金 (jīn)'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What is the Chinese character for "hot"?', options: ['熱 / 热 (rè)', '冷 (lěng)', '水 (shuǐ)', '冰 (bīng)'], answer: 0 },

  // --- WATER ---
  { type: 'WATER', difficulty: 1, q: 'What is the Chinese character for "water"?', options: ['水 (shuǐ)', '火 (huǒ)', '山 (shān)', '土 (tǔ)'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What is the Chinese character for "sea / ocean"?', options: ['海 (hǎi)', '山 (shān)', '林 (lín)', '日 (rì)'], answer: 0 },

  // --- GRASS ---
  { type: 'GRASS', difficulty: 1, q: 'What is the Chinese character for "tree / wood"?', options: ['木 (mù)', '火 (huǒ)', '水 (shuǐ)', '金 (jīn)'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What is the Chinese character for "grass"?', options: ['草 (cǎo)', '石 (shí)', '鳥 (niǎo)', '魚 (yú)'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What is the Chinese character for "flower"?', options: ['花 (huā)', '月 (yuè)', '風 (fēng)', '雪 (xuě)'], answer: 0 },

  // --- ELECTRIC ---
  { type: 'ELECTRIC', difficulty: 1, q: 'What is the Chinese character for "electricity / lightning"?', options: ['電 / 电 (diàn)', '水 (shuǐ)', '木 (mù)', '土 (tǔ)'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What is the Chinese character for "thunder"?', options: ['雷 (léi)', '雲 (yún)', '雪 (xuě)', '山 (shān)'], answer: 0 },

  // --- ICE ---
  { type: 'ICE', difficulty: 1, q: 'What is the Chinese character for "ice"?', options: ['冰 (bīng)', '火 (huǒ)', '日 (rì)', '木 (mù)'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What is the Chinese character for "snow"?', options: ['雪 (xuě)', '雨 (yǔ)', '風 (fēng)', '花 (huā)'], answer: 0 },

  // --- FIGHTING ---
  { type: 'FIGHTING', difficulty: 1, q: 'What is the Chinese character for "hand"?', options: ['手 (shǒu)', '口 (kǒu)', '目 (mù)', '耳 (ěr)'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What is the Chinese character for "strength / power"?', options: ['力 (lì)', '刀 (dāo)', '人 (rén)', '心 (xīn)'], answer: 0 },

  // --- POISON ---
  { type: 'POISON', difficulty: 1, q: 'What is the Chinese character for "poison / toxin"?', options: ['毒 (dú)', '藥 (yào)', '茶 (chá)', '水 (shuǐ)'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What is the Chinese character for "snake"?', options: ['蛇 (shé)', '馬 (mǎ)', '羊 (yáng)', '牛 (niú)'], answer: 0 },

  // --- GROUND ---
  { type: 'GROUND', difficulty: 1, q: 'What is the Chinese character for "earth / soil"?', options: ['土 (tǔ)', '水 (shuǐ)', '火 (huǒ)', '風 (fēng)'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What is the Chinese character for "field / farmland"?', options: ['田 (tián)', '日 (rì)', '月 (yuè)', '目 (mù)'], answer: 0 },

  // --- FLYING ---
  { type: 'FLYING', difficulty: 1, q: 'What is the Chinese character for "sky / heaven"?', options: ['天 (tiān)', '地 (dì)', '山 (shān)', '水 (shuǐ)'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What is the Chinese character for "wind"?', options: ['風 / 风 (fēng)', '雨 (yǔ)', '石 (shí)', '火 (huǒ)'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What is the Chinese character for "bird"?', options: ['鳥 / 鸟 (niǎo)', '魚 (yú)', '馬 (mǎ)', '犬 (quǎn)'], answer: 0 },

  // --- PSYCHIC ---
  { type: 'PSYCHIC', difficulty: 1, q: 'What is the Chinese character for "heart / mind"?', options: ['心 (xīn)', '手 (shǒu)', '足 (zú)', '口 (kǒu)'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What is the Chinese character for "eye"?', options: ['目 (mù)', '耳 (ěr)', '口 (kǒu)', '日 (rì)'], answer: 0 },

  // --- BUG ---
  { type: 'BUG', difficulty: 1, q: 'What is the Chinese character for "insect / bug / worm"?', options: ['蟲 / 虫 (chóng)', '魚 (yú)', '鳥 (niǎo)', '木 (mù)'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What is the Chinese character for "silkworm"?', options: ['蠶 / 蚕 (cán)', '馬 (mǎ)', '牛 (niú)', '羊 (yáng)'], answer: 0 },

  // --- ROCK ---
  { type: 'ROCK', difficulty: 1, q: 'What is the Chinese character for "mountain"?', options: ['山 (shān)', '水 (shuǐ)', '川 (chuān)', '火 (huǒ)'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What is the Chinese character for "stone / rock"?', options: ['石 (shí)', '木 (mù)', '田 (tián)', '金 (jīn)'], answer: 0 },

  // --- GHOST ---
  { type: 'GHOST', difficulty: 1, q: 'What is the Chinese character for "ghost / spirit"?', options: ['鬼 (guǐ)', '人 (rén)', '王 (wáng)', '天 (tiān)'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What is the Chinese character for "shadow"?', options: ['影 (yǐng)', '光 (guāng)', '日 (rì)', '火 (huǒ)'], answer: 0 },

  // --- DRAGON ---
  { type: 'DRAGON', difficulty: 1, q: 'What is the Chinese character for "dragon"?', options: ['龍 / 龙 (lóng)', '虎 (hǔ)', '馬 (mǎ)', '鳥 (niǎo)'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What is the Chinese character for "king / monarch"?', options: ['王 (wáng)', '玉 (yù)', '土 (tǔ)', '工 (gōng)'], answer: 0 },

  // --- DARK ---
  { type: 'DARK', difficulty: 1, q: 'What is the Chinese character for "moon"?', options: ['月 (yuè)', '日 (rì)', '火 (huǒ)', '山 (shān)'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What is the Chinese character for "black"?', options: ['黑 (hēi)', '白 (bái)', '紅 (hóng)', '青 (qīng)'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What is the Chinese character for "night"?', options: ['夜 (yè)', '早 (zǎo)', '日 (rì)', '春 (chūn)'], answer: 0 },

  // --- STEEL ---
  { type: 'STEEL', difficulty: 1, q: 'What is the Chinese character for "metal / gold"?', options: ['金 (jīn)', '木 (mù)', '水 (shuǐ)', '火 (huǒ)'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What is the Chinese character for "iron"?', options: ['鐵 / 铁 (tiě)', '木 (mù)', '石 (shí)', '草 (cǎo)'], answer: 0 },

  // --- FAIRY ---
  { type: 'FAIRY', difficulty: 1, q: 'What is the Chinese character for "immortal / fairy" (person + mountain)?', options: ['仙 (xiān)', '休 (xiū)', '林 (lín)', '明 (míng)'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What is the Chinese character for "star"?', options: ['星 (xīng)', '雨 (yǔ)', '雲 (yún)', '土 (tǔ)'], answer: 0 }
];

const DEFAULT_QUESTIONS = OG_REGION_QUESTIONS;

/* ====================================================================
 * COMMENTED OUT ORIGINAL SCIENTIFIC & TYPE QUESTIONS
 * ====================================================================
const ORIGINAL_SCIENTIFIC_QUESTIONS = [
  { type: 'NORMAL', difficulty: 1, q: 'What is the standard biological classification term for modern human beings?', options: ['Homo sapiens', 'Pan troglodytes', 'Canis lupus', 'Felis catus'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What chemical process rapidly combines oxygen with materials, releasing heat and light?', options: ['Combustion', 'Oxidation', 'Reduction', 'Pyrolysis'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'Approximately what percentage of Earths surface is covered by oceans?', options: ['71%', '50%', '85%', '60%'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What primary green pigment do plants use to absorb light energy for photosynthesis?', options: ['Chlorophyll', 'Carotene', 'Xanthophyll', 'Anthocyanin'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What electrical unit measures the rate of flow of electric charge (current)?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'At what temperature in Celsius does pure water freeze at standard atmospheric pressure?', options: ['0°C', '32°C', '-10°C', '4°C'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'Which human body system is primarily responsible for voluntary movement and posture?', options: ['Muscular system', 'Digestive system', 'Endocrine system', 'Lymphatic system'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks vitamin C?', options: ['Scurvy', 'Rickets', 'Beriberi', 'Anemia'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What is the outermost solid shell or skin of a rocky planet called?', options: ['Crust', 'Mantle', 'Core', 'Magma'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What physical aerodynamic force counteracts gravity to allow an aircraft or bird to rise?', options: ['Lift', 'Drag', 'Thrust', 'Inertia'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'Which lobe of the human brain is primarily responsible for reasoning, motor control, and higher executive function?', options: ['Frontal lobe', 'Occipital lobe', 'Cerebellum', 'Brainstem'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What are the three main body segments of a typical adult insect?', options: ['Head, thorax, abdomen', 'Head, torso, tail', 'Cervix, chest, pelvis', 'Exoskeleton, wings, legs'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What category of rock is formed by the cooling and solidification of molten magma or lava?', options: ['Igneous', 'Sedimentary', 'Metamorphic', 'Fossiliferous'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'In cosmology, what invisible form of matter accounts for approximately 85% of the universe\'s total mass?', options: ['Dark matter', 'Antimatter', 'Baryonic matter', 'Plasma'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What major group of extinct reptiles dominated terrestrial ecosystems during the Mesozoic era?', options: ['Dinosaurs', 'Mammoths', 'Amphibians', 'Trilobites'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'In astronomy, what region of spacetime exhibits gravitational attraction so strong that nothing can escape?', options: ['Black hole', 'Pulsar', 'Quasar', 'Supernova'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'Steel is an industrial alloy primarily composed of iron combined with which chemical element?', options: ['Carbon', 'Copper', 'Zinc', 'Aluminum'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'In European folklore and mythology, what legendary diminutive spirits are traditionally associated with nature and woodlands?', options: ['Fae / Pixies', 'Goblins', 'Trolls', 'Ogres'], answer: 0 },

  // --- NORMAL ---
  { type: 'NORMAL', difficulty: 1, q: 'What is the standard biological classification term for modern human beings?', options: ['Homo sapiens', 'Pan troglodytes', 'Canis lupus', 'Felis catus'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'In linguistics, what term describes a word that reads the same backward as forward?', options: ['Palindrome', 'Anagram', 'Homophone', 'Portmanteau'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which of the following is a traditional primary color in paint and pigment mixing?', options: ['Red', 'Orange', 'Green', 'Purple'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'How many permanent teeth does an average healthy adult human have, including wisdom teeth?', options: ['32', '28', '30', '34'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'How many letters are in the modern English alphabet?', options: ['26', '24', '28', '25'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What literary term describes a word blending the sounds and meanings of two other words (e.g., "brunch")?', options: ['Portmanteau', 'Acronym', 'Euphemism', 'Idiom'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which of these animals is commonly known as man\'s best friend?', options: ['Dog', 'Cat', 'Hamster', 'Parrot'], answer: 0 },
  { type: 'NORMAL', difficulty: 2, q: 'What figure of speech combines contradictory terms, such as "deafening silence"?', options: ['Oxymoron', 'Hyperbole', 'Metaphor', 'Onomatopoeia'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after January?', options: ['March', 'February', 'December', 'April'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after February?', options: ['April', 'January', 'March', 'May'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after March?', options: ['April', 'May', 'June', 'February'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after April?', options: ['June', 'March', 'July', 'May'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after May?', options: ['July', 'June', 'April', 'August'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after June?', options: ['May', 'August', 'July', 'September'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after July?', options: ['August', 'June', 'September', 'October'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after August?', options: ['October', 'November', 'July', 'September'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after September?', options: ['August', 'November', 'October', 'December'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after October?', options: ['December', 'November', 'September', 'January'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after November?', options: ['October', 'January', 'February', 'December'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What calendar month comes immediately after December?', options: ['January', 'February', 'November', 'March'], answer: 0 },

  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Monday?', options: ['Wednesday', 'Tuesday', 'Sunday', 'Thursday'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Tuesday?', options: ['Thursday', 'Monday', 'Wednesday', 'Friday'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Wednesday?', options: ['Tuesday', 'Friday', 'Saturday', 'Thursday'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Thursday?', options: ['Friday', 'Wednesday', 'Saturday', 'Monday'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Friday?', options: ['Sunday', 'Saturday', 'Thursday', 'Monday'], answer: 1 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Saturday?', options: ['Friday', 'Monday', 'Sunday', 'Tuesday'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'What day of the week comes immediately after Sunday?', options: ['Tuesday', 'Saturday', 'Wednesday', 'Monday'], answer: 3 },

  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Spring?', options: ['Summer', 'Autumn', 'Winter', 'Fall'], answer: 0 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Summer?', options: ['Winter', 'Spring', 'Autumn', 'Dry'], answer: 2 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Autumn?', options: ['Spring', 'Summer', 'Monsoon', 'Winter'], answer: 3 },
  { type: 'NORMAL', difficulty: 1, q: 'Which season comes immediately after Winter?', options: ['Summer', 'Spring', 'Autumn', 'Fall'], answer: 1 },
  { type: 'NORMAL', difficulty: 2, q: 'What is the term for a word that has the exact opposite meaning of another word?', options: ['Antonym', 'Synonym', 'Homonym', 'Acronym'], answer: 0 },

  // --- FIRE (10 Questions) ---
  { type: 'FIRE', difficulty: 1, q: 'What chemical process rapidly combines oxygen with materials, releasing heat and light?', options: ['Combustion', 'Oxidation', 'Reduction', 'Pyrolysis'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What is the most abundant gas found in Earths atmosphere?', options: ['Nitrogen', 'Oxygen', 'Argon', 'Carbon dioxide'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What scientific term describes a chemical reaction that absorbs heat from its surroundings?', options: ['Endothermic', 'Exothermic', 'Isothermal', 'Adiabatic'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What element is essential for sustaining a fire and acts as the primary oxidizer?', options: ['Oxygen', 'Hydrogen', 'Helium', 'Nitrogen'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What state of matter is created when a gas is superheated until its atoms become ionized?', options: ['Plasma', 'Bose-Einstein condensate', 'Supercritical fluid', 'Solid'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What color flame typically indicates the hottest part of a standard gas burner flame?', options: ['Blue', 'Red', 'Yellow', 'Orange'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What law states that the total energy of an isolated system is constant (cannot be created or destroyed)?', options: ['First Law of Thermodynamics', 'Second Law of Thermodynamics', 'Third Law', 'Boyle\'s Law'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'What common household safety device detects smoke and products of combustion?', options: ['Smoke detector', 'Thermometer', 'Barometer', 'Hygrometer'], answer: 0 },
  { type: 'FIRE', difficulty: 2, q: 'What temperature scale has its zero point at absolute zero?', options: ['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine'], answer: 0 },
  { type: 'FIRE', difficulty: 1, q: 'Which fossil fuel is a flammable gas primarily composed of methane?', options: ['Natural gas', 'Coal', 'Propane', 'Petroleum'], answer: 0 },

  // --- WATER (10 Questions) ---
  { type: 'WATER', difficulty: 1, q: 'Approximately what percentage of Earths surface is covered by oceans?', options: ['71%', '50%', '85%', '60%'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What is the standard chemical formula for pure water?', options: ['H2O', 'CO2', 'NaCl', 'O2'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What scientific term describes the movement of water molecules across a semipermeable membrane?', options: ['Osmosis', 'Diffusion', 'Active transport', 'Filtration'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'At standard atmospheric pressure, what is the boiling point of pure water in Celsius?', options: ['100°C', '0°C', '212°C', '50°C'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What global ocean circulation pattern is driven by differences in water temperature and salinity?', options: ['Thermohaline circulation', 'Coriolis drift', 'Upwelling', 'Tidal current'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What phase change occurs when liquid water turns into water vapor?', options: ['Evaporation', 'Condensation', 'Freezing', 'Sublimation'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What is the term for an underground layer of water-bearing permeable rock or sediment?', options: ['Aquifer', 'Reservoir', 'Estuary', 'Watershed'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What term describes precipitation in the form of lumps or balls of ice?', options: ['Hail', 'Sleet', 'Snow', 'Dew'], answer: 0 },
  { type: 'WATER', difficulty: 2, q: 'What coastal body of water has a free connection to the open sea, where fresh water meets salt water?', options: ['Estuary', 'Fjord', 'Lagoon', 'Atoll'], answer: 0 },
  { type: 'WATER', difficulty: 1, q: 'What is the primary force responsible for ocean tides on Earth?', options: ['Moon\'s gravitational pull', 'Wind velocity', 'Earth\'s magnetic field', 'Solar radiation'], answer: 0 },

  // --- GRASS (10 Questions) ---
  { type: 'GRASS', difficulty: 1, q: 'What primary green pigment do plants use to absorb light energy for photosynthesis?', options: ['Chlorophyll', 'Carotene', 'Xanthophyll', 'Anthocyanin'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What gas do plants primarily take in from the atmosphere during photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What vascular plant tissue is responsible for transporting water and dissolved minerals upward from roots?', options: ['Xylem', 'Phloem', 'Cortex', 'Cambium'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What plant organ is primarily responsible for anchoring the plant and absorbing water and nutrients?', options: ['Roots', 'Leaves', 'Stems', 'Flowers'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What term describes the stable final community stage in ecological succession?', options: ['Climax community', 'Pioneer community', 'Seral community', 'Biizing community'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What structural green cellular feature gives plant cells rigidity and protection?', options: ['Cell wall', 'Cell membrane', 'Nucleus', 'Ribosome'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What vascular tissue in plants distributes sugars and organic compounds produced by photosynthesis?', options: ['Phloem', 'Xylem', 'Pith', 'Epidermis'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What are the tiny pores on plant leaves that allow gas exchange called?', options: ['Stomata', 'Chloroplasts', 'Lenticels', 'Vili'], answer: 0 },
  { type: 'GRASS', difficulty: 2, q: 'What symbiotic relationship occurs between plant roots and specialized fungi that aid nutrient absorption?', options: ['Mycorrhiza', 'Lichens', 'Rhizome', 'Mycelium'], answer: 0 },
  { type: 'GRASS', difficulty: 1, q: 'What plant reproductive structure contains seeds enclosed within a fruit?', options: ['Angiosperm flower', 'Gymnosperm cone', 'Spore', 'Fern frond'], answer: 0 },

  // --- ELECTRIC (10 Questions) ---
  { type: 'ELECTRIC', difficulty: 1, q: 'What electrical unit measures the rate of flow of electric charge (current)?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What passive electronic component is used to store electrical energy in an electric field?', options: ['Capacitor', 'Resistor', 'Transistor', 'Inductor'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'According to Ohm\'s law, voltage equals current multiplied by what?', options: ['Resistance', 'Capacitance', 'Inductance', 'Frequency'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What subatomic particle carries a negative electric charge?', options: ['Electron', 'Proton', 'Neutron', 'Positron'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What semiconductor device is primarily used to amplify or switch electrical signals and power?', options: ['Transistor', 'Diode', 'Transformer', 'Fuse'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What instrument is used to measure electrical potential difference (voltage)?', options: ['Voltmeter', 'Ammeter', 'Ohmmeter', 'Wattmeter'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What electrical law states that the total current entering a junction must equal the total current leaving it?', options: ['Kirchhoff\'s Current Law', 'Ohm\'s Law', 'Coulomb\'s Law', 'Faraday\'s Law'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What material allows electrical current to flow through it easily?', options: ['Conductor', 'Insulator', 'Semiconductor', 'Dielectric'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 2, q: 'What unit measures electrical power, representing one joule per second?', options: ['Watt', 'Joule', 'Volt', 'Ampere'], answer: 0 },
  { type: 'ELECTRIC', difficulty: 1, q: 'What safety device contains a thin wire that melts when current exceeds a safe limit?', options: ['Fuse', 'Resistor', 'Capacitor', 'Transistor'], answer: 0 },

  // --- ICE (10 Questions) ---
  { type: 'ICE', difficulty: 1, q: 'At what temperature in Celsius does pure water freeze at standard atmospheric pressure?', options: ['0°C', '32°C', '-10°C', '4°C'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What scientific term describes the direct phase transition from a solid directly into a gas?', options: ['Sublimation', 'Condensation', 'Deposition', 'Melting'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What massive body of dense ice constantly moves under its own weight?', options: ['Glacier', 'Iceberg', 'Tundra', 'Permafrost'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What term describes ground that remains at or below 0°C for two or more consecutive years?', options: ['Permafrost', 'Glacial till', 'Sleet', 'Pack ice'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What is a large piece of freshwater ice that has broken off a glacier and floats in open water called?', options: ['Iceberg', 'Floe', 'Glacier', 'Shelf'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What crystal structure does ordinary water ice form at standard atmospheric pressure?', options: ['Hexagonal', 'Cubic', 'Tetragonal', 'Orthorhombic'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'What winter sport involves sliding across ice using specialized footwear with metal blades?', options: ['Ice skating', 'Skiing', 'Snowshoeing', 'Curling'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What is the name of the geological epoch characterized by repeated glacial expansion (the Ice Age)?', options: ['Pleistocene', 'Holocene', 'Miocene', 'Cretaceous'], answer: 0 },
  { type: 'ICE', difficulty: 1, q: 'Which polar region contains the vast majority of Earths glacial ice?', options: ['Antarctica', 'The Arctic', 'Greenland only', 'Siberia'], answer: 0 },
  { type: 'ICE', difficulty: 2, q: 'What term refers to the phase change where water vapor turns directly into ice without becoming liquid?', options: ['Deposition (Desublimation)', 'Sublimation', 'Condensation', 'Evaporation'], answer: 0 },

  // --- FIGHTING (10 Questions) ---
  { type: 'FIGHTING', difficulty: 1, q: 'Which human body system is primarily responsible for voluntary movement and posture?', options: ['Muscular system', 'Digestive system', 'Endocrine system', 'Lymphatic system'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What high-energy molecule stores and transports chemical energy within cellular structures?', options: ['ATP (Adenosine triphosphate)', 'DNA', 'RNA', 'Glucose'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'What tough fibrous connective tissue connects skeletal muscles to bones?', options: ['Tendon', 'Ligament', 'Cartilage', 'Joint'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What specialized protein filaments slide past each other during muscle contraction?', options: ['Actin and Myosin', 'Keratin and Collagen', 'Hemoglobin and Albumin', 'Insulin and Glucagon'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'What fibrous connective tissue connects bones to other bones at joints?', options: ['Ligament', 'Tendon', 'Fascia', 'Cartilage'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What mineral ion is critically required inside muscle cells to trigger contraction?', options: ['Calcium (Ca2+)', 'Sodium (Na+)', 'Potassium (K+)', 'Iron (Fe)'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'What type of muscle tissue forms the walls of the human heart?', options: ['Cardiac muscle', 'Skeletal muscle', 'Smooth muscle', 'Striated muscle'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What aerobic metabolic process generates ATP inside cellular mitochondria using oxygen?', options: ['Cellular respiration (Oxidative phosphorylation)', 'Glycolysis only', 'Fermentation', 'Lactic acid pathway'], answer: 0 },
  { type: 'FIGHTING', difficulty: 1, q: 'Which organ system provides structural support, protection, and blood cell production?', options: ['Skeletal system', 'Nervous system', 'Integumentary system', 'Respiratory system'], answer: 0 },
  { type: 'FIGHTING', difficulty: 2, q: 'What chemical byproduct builds up in skeletal muscle tissue during strenuous anaerobic exercise?', options: ['Lactic acid (Lactate)', 'Uric acid', 'Citric acid', 'Carbonic acid'], answer: 0 },

  // --- POISON (10 Deficiency Questions) ---
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks vitamin C?', options: ['Scurvy', 'Rickets', 'Beriberi', 'Anemia'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks vitamin D?', options: ['Rickets', 'Scurvy', 'Pellagra', 'Goiter'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks thiamine (vitamin B1)?', options: ['Beriberi', 'Scurvy', 'Night blindness', 'Kwashiorkor'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks niacin (vitamin B3)?', options: ['Pellagra', 'Scurvy', 'Rickets', 'Anemia'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks vitamin A?', options: ['Night blindness', 'Scurvy', 'Rickets', 'Goiter'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks iron?', options: ['Anemia', 'Scurvy', 'Goiter', 'Beriberi'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks iodine?', options: ['Goiter', 'Anemia', 'Scurvy', 'Rickets'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks dietary protein?', options: ['Kwashiorkor', 'Scurvy', 'Beriberi', 'Rickets'], answer: 0 },
  { type: 'POISON', difficulty: 1, q: 'What disease/disorder will develop if the body lacks calcium?', options: ['Osteoporosis', 'Anemia', 'Scurvy', 'Beriberi'], answer: 0 },
  { type: 'POISON', difficulty: 2, q: 'What disease/disorder will develop if the body lacks vitamin K?', options: ['Bleeding disorders (impaired clotting)', 'Scurvy', 'Rickets', 'Night blindness'], answer: 0 },

  // --- GROUND (10 Questions) ---
  { type: 'GROUND', difficulty: 1, q: 'What is the outermost solid shell or skin of a rocky planet called?', options: ['Crust', 'Mantle', 'Core', 'Magma'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What scientific theory describes the large-scale motion of Earths lithosphere plates?', options: ['Plate tectonics', 'Continental drift only', 'Seafloor spreading', 'Isostasy'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What dense, hot layer of Earth sits directly beneath the crust and above the core?', options: ['Mantle', 'Atmosphere', 'Lithosphere', 'Biosphere'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What scale is used to quantify the magnitude or energy released by an earthquake?', options: ['Moment magnitude scale (Richter scale)', 'Mercalli scale', 'Mohs scale', 'Fujita scale'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'Molten or semi-molten rock located beneath the surface of a terrestrial planet is called what?', options: ['Magma', 'Lava', 'Ash', 'Basalt'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What boundary type occurs where tectonic plates move apart from one another?', options: ['Divergent boundary', 'Convergent boundary', 'Transform fault', 'Subduction zone'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What is molten rock called once it erupts onto Earths surface?', options: ['Lava', 'Magma', 'Pumice', 'Tuff'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What term describes the geological process where one tectonic plate moves under another and sinks into the mantle?', options: ['Subduction', 'Accretion', 'Orogeny', 'Faulting'], answer: 0 },
  { type: 'GROUND', difficulty: 1, q: 'What branch of science deals with the solid Earth, the rocks of which it is composed, and the processes by which they change?', options: ['Geology', 'Meteorology', 'Astronomy', 'Oceanography'], answer: 0 },
  { type: 'GROUND', difficulty: 2, q: 'What geological term refers to the formation of mountain ranges, typically via tectonic plate compression?', options: ['Orogeny', 'Erosion', 'Sedimentation', 'Weathering'], answer: 0 },

  // --- FLYING (10 Questions) ---
  { type: 'FLYING', difficulty: 1, q: 'What physical aerodynamic force counteracts gravity to allow an aircraft or bird to rise?', options: ['Lift', 'Drag', 'Thrust', 'Inertia'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What lowest layer of Earths atmosphere is where weather phenomena occur?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What forward force propels an aircraft or bird through the air, overcoming aerodynamic drag?', options: ['Thrust', 'Lift', 'Gravity', 'Friction'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What atmospheric layer sits directly above the troposphere and contains the ozone layer?', options: ['Stratosphere', 'Troposphere', 'Thermosphere', 'Exosphere'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What aerodynamic resistance force slows down an object moving through a fluid or gas?', options: ['Drag (Air resistance)', 'Lift', 'Thrust', 'Gravity'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What apparent force deflects moving objects (like winds and ocean currents) due to Earths rotation?', options: ['Coriolis effect', 'Centrifugal force', 'Centripetal force', 'Gravitational pull'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What winged vertebrate class includes birds, which are uniquely adapted for flight?', options: ['Aves (Birds)', 'Mammalia', 'Reptilia', 'Amphibia'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in pressure?', options: ['Bernoulli\'s principle', 'Archimedes\' principle', 'Pascal\'s law', 'Newton\'s third law'], answer: 0 },
  { type: 'FLYING', difficulty: 1, q: 'What natural flying mammals belong to the order Chiroptera?', options: ['Bats', 'Flying squirrels', 'Gliding possums', 'Birds'], answer: 0 },
  { type: 'FLYING', difficulty: 2, q: 'What atmospheric phenomenon features powerful, narrow meandering air currents high in the atmosphere?', options: ['Jet stream', 'Trade winds', 'Monsoon', 'Doldrums'], answer: 0 },

  // --- PSYCHIC (10 Questions) ---
  { type: 'PSYCHIC', difficulty: 1, q: 'Which lobe of the human brain is primarily responsible for reasoning, motor control, and higher executive function?', options: ['Frontal lobe', 'Occipital lobe', 'Cerebellum', 'Brainstem'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What microscopic gap allows neurons to transmit chemical neurotransmitter signals to adjacent cells?', options: ['Synapse', 'Axon', 'Dendrite', 'Myelin sheath'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What central nervous system organ serves as the main control center for the human body?', options: ['Brain', 'Spinal cord', 'Heart', 'Liver'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What lobe of the brain is primarily responsible for processing visual information?', options: ['Occipital lobe', 'Temporal lobe', 'Parietal lobe', 'Frontal lobe'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What long, slender nerve fiber conducts electrical impulses away from a neuron\'s cell body?', options: ['Axon', 'Dendrite', 'Synapse', 'Neuron'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What insulating fatty substance surrounds nerve cell axons to speed up electrical impulse transmission?', options: ['Myelin', 'Plasma', 'Collagen', 'Keratin'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What branch-like structures of a neuron receive electrical signals from other neurons?', options: ['Dendrites', 'Axons', 'Synapses', 'Soma'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What part of the brain coordinates voluntary muscular movements, balance, and posture?', options: ['Cerebellum', 'Cerebrum', 'Thalamus', 'Hypothalamus'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 1, q: 'What specialized chemical messengers transmit signals across a synapse between neurons?', options: ['Neurotransmitters', 'Hormones', 'Enzymes', 'Antibodies'], answer: 0 },
  { type: 'PSYCHIC', difficulty: 2, q: 'What limbic structure deeply embedded within the temporal lobe plays a major role in memory and emotion?', options: ['Hippocampus', 'Amygdala', 'Medulla', 'Pons'], answer: 0 },

  // --- BUG (10 Questions) ---
  { type: 'BUG', difficulty: 1, q: 'What are the three main body segments of a typical adult insect?', options: ['Head, thorax, abdomen', 'Head, torso, tail', 'Cervix, chest, pelvis', 'Exoskeleton, wings, legs'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What biological process transforms an insect through distinct developmental stages from larva to adult?', options: ['Metamorphosis', 'Mitosis', 'Meiosis', 'Osmosis'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'How many jointed legs do adult insects possess as a defining physical characteristic?', options: ['6', '8', '4', '10'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What tough, protective external skeleton composed of chitin do arthropods possess?', options: ['Exoskeleton', 'Endoskeleton', 'Shell', 'Carapace'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What class of invertebrate animals includes insects, spiders, and crustaceans?', options: ['Arthropods', 'Mollusks', 'Annelids', 'Echinoderms'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What specialized breathing organs do insects use to take in oxygen directly from the air?', options: ['Tracheae / Spiracles', 'Gills', 'Lungs', 'Book lungs'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What social insects live in large colonies and are famous for building complex nests and producing honey?', options: ['Honeybees', 'Wasps', 'Termites', 'Ants'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What is the immature, caterpillar-like feeding stage of complete metamorphosis in insects called?', options: ['Larva', 'Nymph', 'Pupa', 'Imago'], answer: 0 },
  { type: 'BUG', difficulty: 1, q: 'What protective resting stage sits between the larval and adult forms in complete metamorphosis (e.g., a chrysalis)?', options: ['Pupa', 'Larva', 'Nymph', 'Egg'], answer: 0 },
  { type: 'BUG', difficulty: 2, q: 'What biological structural polysaccharide gives insect exoskeletons their tough, resilient properties?', options: ['Chitin', 'Cellulose', 'Glycogen', 'Keratin'], answer: 0 },

  // --- ROCK (10 Questions) ---
  { type: 'ROCK', difficulty: 1, q: 'What category of rock is formed by the cooling and solidification of molten magma or lava?', options: ['Igneous', 'Sedimentary', 'Metamorphic', 'Fossiliferous'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What standard geological scale characterizes the scratch resistance of various minerals?', options: ['Mohs scale', 'Richter scale', 'Fujita scale', 'Kelvin scale'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What category of rock is formed from the accumulation and cementation of mineral or organic particles over time?', options: ['Sedimentary', 'Igneous', 'Metamorphic', 'Basaltic'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What geological process transforms existing rocks under intense heat and pressure into new rock types?', options: ['Metamorphism', 'Weathering', 'Erosion', 'Melting'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What is the most abundant mineral found in Earths continental crust, composed of silicon and oxygen?', options: ['Quartz', 'Feldspar', 'Calcite', 'Mica'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What common sedimentary rock is formed primarily from the accumulation of microscopic skeletal remains of marine organisms?', options: ['Limestone', 'Sandstone', 'Shale', 'Conglomerate'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What igneous rock is dark-colored, fine-grained, and forms the primary constituent of oceanic crust?', options: ['Basalt', 'Granite', 'Pumice', 'Obsidian'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What mineral is rated as a 10 (the hardest) on the Mohs hardness scale?', options: ['Diamond', 'Corundum', 'Topaz', 'Quartz'], answer: 0 },
  { type: 'ROCK', difficulty: 1, q: 'What coarse-grained intrusive igneous rock is widely used for monuments and countertops?', options: ['Granite', 'Basalt', 'Obsidian', 'Slate'], answer: 0 },
  { type: 'ROCK', difficulty: 2, q: 'What cyclic geological model describes how rocks transition between igneous, sedimentary, and metamorphic states?', options: ['The Rock Cycle', 'Plate Tectonics', 'Hydrologic Cycle', 'Carbon Cycle'], answer: 0 },

  // --- GHOST (10 Questions) ---
  { type: 'GHOST', difficulty: 1, q: 'In cosmology, what invisible form of matter accounts for approximately 85% of the universe\'s total mass?', options: ['Dark matter', 'Antimatter', 'Baryonic matter', 'Plasma'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What theoretical massless particle is hypothesized in physics to mediate the force of gravity?', options: ['Graviton', 'Photon', 'Gluon', 'Boson'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What type of subatomic particle has an identical mass to an ordinary particle but opposite electric charge?', options: ['Antiparticle (Antimatter)', 'Neutron', 'Photon', 'Neutrino'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What ghostly, nearly massless subatomic particle interacts very weakly with normal matter?', options: ['Neutrino', 'Electron', 'Proton', 'Quark'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What phenomenon occurs when matter and antimatter collide, completely converting mass into energy?', options: ['Annihilation', 'Fission', 'Fusion', 'Ionization'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'In quantum mechanics, what phenomenon describes particles remaining interconnected regardless of distance?', options: ['Quantum entanglement', 'Superposition', 'Tunneling', 'Wave-particle duality'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What celestial remnant is an extremely dense collapsed core of a massive supergiant star?', options: ['Neutron star', 'Red giant', 'White dwarf', 'Protostar'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What quantum physics principle states that a system can exist in multiple states simultaneously until observed?', options: ['Quantum superposition', 'Heisenberg uncertainty', 'Pauli exclusion', 'Quantum tunneling'], answer: 0 },
  { type: 'GHOST', difficulty: 1, q: 'What type of high-energy electromagnetic radiation is produced by radioactive decay and cosmic events?', options: ['Gamma rays', 'X-rays', 'Ultraviolet', 'Infrared'], answer: 0 },
  { type: 'GHOST', difficulty: 2, q: 'What theoretical concept describes bridges through spacetime that could connect distant points in the universe?', options: ['Wormhole (Einstein-Rosen bridge)', 'Black hole', 'Event horizon', 'Singularity'], answer: 0 },

  // --- DRAGON (10 Questions) ---
  { type: 'DRAGON', difficulty: 1, q: 'What major group of extinct reptiles dominated terrestrial ecosystems during the Mesozoic era?', options: ['Dinosaurs', 'Mammoths', 'Amphibians', 'Trilobites'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What biological macromolecules carry hereditary genetic information essential for all cellular life?', options: ['Nucleic acids (DNA/RNA)', 'Proteins', 'Carbohydrates', 'Lipids'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What geological era is commonly known as the Age of Reptiles or Age of Dinosaurs?', options: ['Mesozoic era', 'Paleozoic era', 'Cenozoic era', 'Precambrian'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What scientific term describes animals (like reptiles and dinosaurs) whose body temperature depends on external sources?', options: ['Ectotherm (Cold-blooded)', 'Endotherm', 'Homeotherm', 'Marsupial'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What famous massive carnivorous dinosaur lived during the late Cretaceous period?', options: ['Tyrannosaurus rex', 'Stegosaurus', 'Triceratops', 'Brachiosaurus'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What evolutionary theory proposes that modern birds are direct descendants of a group of two-legged dinosaurs?', options: ['Theropod dinosaur ancestry', 'Mammalian convergence', 'Pterosaur evolution', 'Amphibian divergence'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What large marine reptiles lived alongside dinosaurs in Mesozoic oceans but were technically not dinosaurs?', options: ['Plesiosaurs / Ichthyosaurs', 'Whales', 'Sharks', 'Crocodiles'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What catastrophic global event at the end of the Cretaceous period caused the extinction of non-avian dinosaurs?', options: ['An asteroid impact (Chicxulub impact)', 'Massive global glaciation', 'Supervolcano eruption only', 'Solar flare'], answer: 0 },
  { type: 'DRAGON', difficulty: 1, q: 'What living reptile group is considered the closest surviving evolutionary relative to crocodiles and birds?', options: ['Alligators / Crocodilians', 'Snakes', 'Lizards', 'Turtles'], answer: 0 },
  { type: 'DRAGON', difficulty: 2, q: 'What nitrogenous base pairs form the rungs of the DNA double helix structure?', options: ['Adenine, Thymine, Cytosine, Guanine', 'Carbon, Hydrogen, Oxygen, Nitrogen', 'Glucose, Fructose, Sucrose', 'Amino acids'], answer: 0 },

  // --- DARK (10 Questions) ---
  { type: 'DARK', difficulty: 1, q: 'In astronomy, what region of spacetime exhibits gravitational attraction so strong that nothing can escape?', options: ['Black hole', 'Pulsar', 'Quasar', 'Supernova'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What mysterious repulsive force is driving the current accelerated expansion of the universe?', options: ['Dark energy', 'Solar wind', 'Magnetic flux', 'Centrifugal force'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What boundary surrounding a black hole marks the point of no return for light and matter?', options: ['Event horizon', 'Singularity', 'Accretion disk', 'Photon sphere'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What theoretical radiation is predicted to be thermally emitted by black holes?', options: ['Hawking radiation', 'Cherenkov radiation', 'Synchrotron radiation', 'Cosmic microwave background'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What is the infinitely dense central point of a black hole called?', options: ['Gravitational singularity', 'Event horizon', 'Core', 'Pulsar'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What type of extremely dense rotating neutron star emits regular pulses of electromagnetic radiation?', options: ['Pulsar', 'Quasar', 'Magnetar', 'Supergiant'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What term describes the celestial phenomenon where a massive star explodes at the end of its life cycle?', options: ['Supernova', 'Nebula', 'Eclipse', 'Flares'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What extremely luminous active galactic nucleus is powered by a supermassive black hole?', options: ['Quasar', 'Pulsar', 'Magnetar', 'Binary star'], answer: 0 },
  { type: 'DARK', difficulty: 1, q: 'What interstellar cloud of dust, hydrogen, helium, and ionized gases is often a birthplace of stars?', options: ['Nebula', 'Galaxy', 'Cluster', 'Asteroid belt'], answer: 0 },
  { type: 'DARK', difficulty: 2, q: 'What theoretical dense star is composed entirely of closely packed neutrons resulting from gravitational collapse?', options: ['Neutron star', 'White dwarf', 'Brown dwarf', 'Black dwarf'], answer: 0 },

  // --- STEEL (10 Questions) ---
  { type: 'STEEL', difficulty: 1, q: 'Steel is an industrial alloy primarily composed of iron combined with which chemical element?', options: ['Carbon', 'Copper', 'Zinc', 'Aluminum'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What mechanical property describes a material\'s ability to deform under tensile stress without fracturing?', options: ['Ductility', 'Brittleness', 'Hardness', 'Density'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What metal is alloyed with iron and chromium to create corrosion-resistant stainless steel?', options: ['Chromium', 'Gold', 'Lead', 'Mercury'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What metallurgical heat treatment process involves heating steel and cooling it rapidly to increase hardness?', options: ['Quenching', 'Annealing', 'Tempering', 'Smelting'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What is the chemical symbol for the metal iron?', options: ['Fe', 'Ir', 'In', 'I'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What mechanical property measures a material\'s resistance to permanent indentation or scratching?', options: ['Hardness', 'Toughness', 'Elasticity', 'Mallability'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What term describes a mixture of two or more metallic elements to enhance desirable properties?', options: ['Alloy', 'Compound', 'Solution', 'Ore'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What industrial process extracts usable metal from raw mineral ore using heat and chemical reduction?', options: ['Smelting', 'Forging', 'Casting', 'Extrusion'], answer: 0 },
  { type: 'STEEL', difficulty: 1, q: 'What is the most widely used structural metal in human construction and manufacturing?', options: ['Iron / Steel', 'Aluminum', 'Copper', 'Titanium'], answer: 0 },
  { type: 'STEEL', difficulty: 2, q: 'What metallurgical process reheats quenched steel to a lower temperature to relieve internal stress and increase toughness?', options: ['Tempering', 'Quenching', 'Annealing', 'Galvanizing'], answer: 0 },

  // --- FAIRY (10 Questions) ---
  { type: 'FAIRY', difficulty: 1, q: 'In European folklore and mythology, what legendary diminutive spirits are traditionally associated with nature and woodlands?', options: ['Fae / Pixies', 'Goblins', 'Trolls', 'Ogres'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'In literature, what narrative technique uses symbolic fictional characters and events to express a deeper moral meaning?', options: ['Allegory', 'Metaphor', 'Hyperbole', 'Oxymoron'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What classic folklore genre features magical creatures, royalty, spells, and mythical transformations?', options: ['Fairy tale', 'Sci-fi thriller', 'Historical drama', 'Biographical essay'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What literary device assigns human emotions, traits, or intentions to non-human objects or nature?', options: ['Anthropomorphism (Personification)', 'Alliteration', 'Simile', 'Irony'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'In mythology, what winged magical humanoid creature is often depicted granting wishes or bestowing enchantments?', options: ['Fairy / Pixie', 'Vampire', 'Zombie', 'Cyclops'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What traditional folklore term describes a ring of mushrooms that supernatural beings were believed to dance inside?', options: ['Fairy ring', 'Stone circle', 'Witches\' sabbath', 'Labyrinth'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What famous Danish author wrote classic fairy tales such as "The Little Mermaid" and "The Ugly Duckling"?', options: ['Hans Christian Andersen', 'Brothers Grimm', 'Charles Perrault', 'J.R.R. Tolkien'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What folkloric term describes a malicious supernatural being or mischief-maker often living underground or in forests?', options: ['Goblin / Imp', 'Angel', 'Titan', 'Sphinx'], answer: 0 },
  { type: 'FAIRY', difficulty: 1, q: 'What traditional German brothers compiled and published famous folklore collections including Cinderella and Snow White?', options: ['Brothers Grimm', 'Brothers Wright', 'Brothers Marx', 'Brothers Lumière'], answer: 0 },
  { type: 'FAIRY', difficulty: 2, q: 'What term describes traditional stories passed down orally within a specific culture before being written down?', options: ['Folklore / Oral tradition', 'Primary sources', 'Academic thesis', 'Legal statute'], answer: 0 }
];
*/