// character etymology info for the poems
export const etymologyData = {
  '秋': {
    character: '秋',
    pinyin: 'qiū',
    meaning: 'Autumn, fall season',
    radical: '禾',
    radicalMeaning: 'grain, cereal',
    components: ['禾 (grain)', '火 (fire)'],
    etymology: 'Originally depicted grain being dried over fire after harvest. The combination of "grain" (禾) and "fire" (火) represents the autumn harvest season when crops are gathered and dried.',
    examples: [
      { text: '秋兴八首', translation: 'Eight Autumn Meditations', context: 'The title of Du Fu\'s poem sequence' },
      { text: '清秋', translation: 'clear autumn', context: 'Poem 3: 清秋燕子故飞飞' },
      { text: '秋风', translation: 'autumn wind', context: 'Common poetic image of seasonal change' }
    ]
  },
  '江': {
    character: '江',
    pinyin: 'jiāng',
    meaning: 'River, the Yangtze',
    radical: '氵',
    radicalMeaning: 'water',
    components: ['氵(water)', '工 (work/craftsmanship)'],
    etymology: 'The water radical (氵) combined with 工, which phonetically hints at "gōng" but also suggests the channeling and "work" of a great river. Specifically refers to the Yangtze River in classical usage.',
    examples: [
      { text: '江间波浪兼天涌', translation: 'Between the river\'s banks, waves surge to the sky', context: 'Poem 1: the mighty Yangtze' },
      { text: '日日江楼坐翠微', translation: 'daily at the river tower, sitting by green hills', context: 'Poem 3: Du Fu\'s riverside dwelling' },
      { text: '江汉思归客', translation: 'on Yangtze and Han, a traveler thinking of return', context: 'Classic exile imagery' }
    ]
  },
  '心': {
    character: '心',
    pinyin: 'xīn',
    meaning: 'Heart, mind, feeling',
    radical: '心',
    radicalMeaning: 'heart',
    components: ['心 (complete character)'],
    etymology: 'Pictograph of a human heart with chambers. In Chinese philosophy, the heart is the seat of both emotion and thought - no distinction between "heart" and "mind".',
    examples: [
      { text: '故园心', translation: 'heart bound to my homeland', context: 'Poem 1: 孤舟一系故园心' },
      { text: '心事违', translation: 'heartfelt intentions thwarted', context: 'Poem 3: 刘向传经心事违' },
      { text: '伤心', translation: 'heartbroken, sorrowful', context: 'Common expression of grief' }
    ]
  },
  '泪': {
    character: '泪',
    pinyin: 'lèi',
    meaning: 'Tears',
    radical: '氵',
    radicalMeaning: 'water',
    components: ['氵(water)', '目 (eye)'],
    etymology: 'Water (氵) flowing from the eye (目). The right component 戾 provides the pronunciation but the meaning is clearly "water from eyes".',
    examples: [
      { text: '他日泪', translation: 'tears of days past', context: 'Poem 1: 丛菊两开他日泪' },
      { text: '三声泪', translation: 'three cries bring tears', context: 'Poem 2: 听猿实下三声泪' },
      { text: '老泪', translation: 'old age tears', context: 'Tears of an elderly man reflecting on life' }
    ]
  },
  '山': {
    character: '山',
    pinyin: 'shān',
    meaning: 'Mountain',
    radical: '山',
    radicalMeaning: 'mountain',
    components: ['山 (complete character)'],
    etymology: 'Pictograph showing three peaks. One of the most iconic pictographic characters, clearly depicting mountain ranges on the horizon.',
    examples: [
      { text: '巫山', translation: 'Wu Mountain', context: 'Poem 1: 巫山巫峡气萧森' },
      { text: '千家山郭', translation: 'thousand homes in mountain hamlet', context: 'Poem 3: 千家山郭静朝晖' },
      { text: '山楼', translation: 'mountain tower', context: 'Poem 2: 山楼粉堞隐悲笳' }
    ]
  },
  '月': {
    character: '月',
    pinyin: 'yuè',
    meaning: 'Moon, month',
    radical: '月',
    radicalMeaning: 'moon',
    components: ['月 (complete character)'],
    etymology: 'Pictograph of a crescent moon. The two strokes inside represent the phases. Used for both "moon" and "month" as months were tracked by lunar cycles.',
    examples: [
      { text: '石上藤萝月', translation: 'moon on vines upon the rocks', context: 'Poem 2: 请看石上藤萝月' },
      { text: '八月槎', translation: 'August raft', context: 'Poem 2: 奉使虚随八月槎' },
      { text: '月明', translation: 'moonlight bright', context: 'Classic poetic image of clarity and longing' }
    ]
  },
  '风': {
    character: '风',
    pinyin: 'fēng',
    meaning: 'Wind',
    radical: '风',
    radicalMeaning: 'wind',
    components: ['风 (simplified form)'],
    etymology: 'Simplified from 風. Traditional form shows 虫 (insect) inside - wind was anciently associated with the movement of insects and air currents.',
    examples: [
      { text: '风云', translation: 'wind and clouds', context: 'Poem 1: 塞上风云接地阴' },
      { text: '秋风', translation: 'autumn wind', context: 'Harbinger of winter and change' },
      { text: '风波', translation: 'wind and waves, turmoil', context: 'Both literal and metaphorical storms' }
    ]
  },
  '雨': {
    character: '雨',
    pinyin: 'yǔ',
    meaning: 'Rain',
    radical: '雨',
    radicalMeaning: 'rain',
    components: ['⻗ (rain drops)', 'horizontal lines (sky)'],
    etymology: 'Pictograph showing rain falling from clouds. The top horizontal line represents the sky, with drops falling below.',
    examples: [
      { text: '雨露', translation: 'rain and dew', context: 'Imperial favor/blessing' },
      { text: '风雨', translation: 'wind and rain', context: 'Hardship and adversity' },
      { text: '春雨', translation: 'spring rain', context: 'Nurturing, renewal' }
    ]
  },
  '花': {
    character: '花',
    pinyin: 'huā',
    meaning: 'Flower, blossom',
    radical: '艹',
    radicalMeaning: 'grass, plant',
    components: ['艹 (grass)', '化 (transform)'],
    etymology: 'Grass radical (艹) with 化 (transform) - plants that transform into beautiful blooms. Represents the ephemeral beauty of blossoms.',
    examples: [
      { text: '芦荻花', translation: 'reeds and rushes flowers', context: 'Poem 2: 已映洲前芦荻花' },
      { text: '菊花', translation: 'chrysanthemum', context: 'Autumn flower symbolizing endurance' },
      { text: '落花', translation: 'falling flowers', context: 'Symbol of passing time and beauty' }
    ]
  },
  '云': {
    character: '云',
    pinyin: 'yún',
    meaning: 'Cloud',
    radical: '二',
    radicalMeaning: 'two',
    components: ['云 (simplified from 雲)'],
    etymology: 'Simplified from 雲, which showed rain (雨) rising to form clouds. The ancient form depicted swirling vapors.',
    examples: [
      { text: '风云', translation: 'wind and clouds', context: 'Poem 1: 塞上风云接地阴' },
      { text: '云雨', translation: 'clouds and rain', context: 'From the Wu Mountain legend of King Xiang' },
      { text: '白云', translation: 'white clouds', context: 'Symbol of transcendence and wandering' }
    ]
  },
  '孤': {
    character: '孤',
    pinyin: 'gū',
    meaning: 'Alone, solitary, orphaned',
    radical: '子',
    radicalMeaning: 'child',
    components: ['子 (child)', '瓜 (melon)'],
    etymology: 'A child (子) alone like a single melon (瓜) on a vine. Evokes isolation, vulnerability, being without family.',
    examples: [
      { text: '孤舟', translation: 'lone boat', context: 'Poem 1: 孤舟一系故园心' },
      { text: '孤城', translation: 'lonely fortress', context: 'Poem 2: 夔府孤城落日斜' },
      { text: '孤客', translation: 'solitary traveler', context: 'Du Fu\'s frequent self-description in exile' }
    ]
  },
  '故': {
    character: '故',
    pinyin: 'gù',
    meaning: 'Old, former, therefore, homeland',
    radical: '攵',
    radicalMeaning: 'strike, tap',
    components: ['古 (ancient)', '攵 (strike/action)'],
    etymology: 'Ancient (古) with action radical. Suggests returning to old ways, former times, or ancestral places. "Homeland" is a key meaning.',
    examples: [
      { text: '故园', translation: 'homeland, ancestral home', context: 'Poem 1: 孤舟一系故园心' },
      { text: '故国', translation: 'old country, former state', context: 'Longing for lost dynasties or home' },
      { text: '故人', translation: 'old friend', context: 'Friends from earlier, better days' }
    ]
  },
  '伤': {
    character: '伤',
    pinyin: 'shāng',
    meaning: 'Wound, injure, grieve',
    radical: '亻',
    radicalMeaning: 'person',
    components: ['亻(person)', '昜 (yang - open/expand)'],
    etymology: 'Person radical with phonetic component. Represents both physical wounds and emotional hurt - the character doesn\'t distinguish.',
    examples: [
      { text: '凋伤', translation: 'wither and wound', context: 'Poem 1: 玉露凋伤枫树林' },
      { text: '伤心', translation: 'heartbroken, grieving', context: 'Deep emotional pain' },
      { text: '伤感', translation: 'sentimental, melancholy', context: 'Sorrowful feelings' }
    ]
  },
  '望': {
    character: '望',
    pinyin: 'wàng',
    meaning: 'Gaze afar, hope, expect',
    radical: '月',
    radicalMeaning: 'moon',
    components: ['亡 (flee/lost)', '月 (moon)', '王 (king)'],
    etymology: 'A person gazing at the moon - combines looking into distance with longing/hoping. The full moon (望) also means the 15th of lunar month.',
    examples: [
      { text: '望京华', translation: 'gazing toward the capital', context: 'Poem 2: 每依北斗望京华' },
      { text: '望月', translation: 'gazing at the moon', context: 'Classic image of longing' },
      { text: '希望', translation: 'hope, expectation', context: 'Looking forward to something distant' }
    ]
  },
  '思': {
    character: '思',
    pinyin: 'sī',
    meaning: 'Think, ponder, long for',
    radical: '心',
    radicalMeaning: 'heart',
    components: ['田 (field)', '心 (heart)'],
    etymology: 'Heart (心) beneath a field/brain (田). The heart-mind contemplating and yearning. Represents both rational thought and emotional longing.',
    examples: [
      { text: '相思', translation: 'mutual longing, missing someone', context: 'Separated lovers or friends' },
      { text: '思乡', translation: 'homesickness', context: 'Longing for one\'s homeland' },
      { text: '思念', translation: 'miss, remember fondly', context: 'Thinking of absent loved ones' }
    ]
  }
};
