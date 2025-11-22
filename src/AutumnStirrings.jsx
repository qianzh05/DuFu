import React, { useState, useEffect, useRef, useCallback } from 'react';

// Complete poem data with all 8 poems
const poemsData = [
  {
    number: '一',
    title: "Autumn's Descent",
    theme: 'Setting the scene of exile and melancholy',
    chinese: [
      '玉露凋傷楓樹林',
      '巫山巫峽氣蕭森',
      '江間波浪兼天湧',
      '塞上風雲接地陰',
      '叢菊兩開他日淚',
      '孤舟一繫故園心',
      '寒衣處處催刀尺',
      '白帝城高急暮砧'
    ],
    pinyin: [
      'yù lù diāo shāng fēng shù lín',
      'wū shān wū xiá qì xiāo sēn',
      'jiāng jiān bō làng jiān tiān yǒng',
      'sài shàng fēng yún jiē dì yīn',
      'cóng jú liǎng kāi tā rì lèi',
      'gū zhōu yī xì gù yuán xīn',
      'hán yī chù chù cuī dāo chǐ',
      'bái dì chéng gāo jí mù zhēn'
    ],
    english: [
      'Jade dew withers and wounds the maple forest,',
      'Wu Mountain, Wu Gorge—the air bleak and somber.',
      'Between the river\'s banks, waves surge to the sky,',
      'Above the passes, wind and clouds press down to earth.',
      'Clustered chrysanthemums bloom twice, tears of days past,',
      'A lone boat moored—my heart bound to homeland.',
      'Everywhere, knife and ruler rush for winter clothes,',
      'White Emperor City\'s heights, urgent evening mallets pound.'
    ],
    annotations: {
      0: { term: '玉露', title: 'Jade Dew (玉露)', description: 'The white autumn frost, metaphorically called "jade dew" for its glistening purity. It marks the onset of autumn\'s killing cold that withers the vibrant maples.' },
      1: { term: '巫山巫峽', title: 'Wu Mountain & Wu Gorge (巫山巫峽)', description: 'Famous landmarks of the Three Gorges region near Kuizhou. In Chinese poetry, Wu Mountain is associated with dreams and longing, from the ancient tale of King Xiang of Chu.' },
      4: { term: '叢菊兩開', title: 'Chrysanthemums Bloom Twice (叢菊兩開)', description: 'Du Fu has now seen two autumn seasons in exile—the chrysanthemums have bloomed twice since he left his home. Each blooming brings tears of separation.' },
      5: { term: '孤舟', title: 'The Lone Boat (孤舟)', description: 'A powerful symbol of Du Fu\'s exile and wandering. Though moored, the boat represents both his physical displacement and his heart\'s eternal connection to Chang\'an.' },
      7: { term: '暮砧', title: 'Evening Mallets (暮砧)', description: 'The sound of women pounding cloth to make winter garments. This autumnal sound evokes both the passage of time and thoughts of loved ones preparing for winter.' }
    },
    analysis: 'The opening poem establishes the desolate autumn atmosphere of the Three Gorges. Du Fu masterfully interweaves natural imagery with personal emotion—the dying maples mirror his own decline, while the moored boat embodies his trapped longing for home.'
  },
  {
    number: '二',
    title: 'Gazing Toward the Capital',
    theme: 'Longing for Chang\'an at twilight',
    chinese: [
      '夔府孤城落日斜',
      '每依北斗望京華',
      '聽猿實下三聲淚',
      '奉使虛隨八月槎',
      '畫省香爐違伏枕',
      '山樓粉堞隱悲笳',
      '請看石上藤蘿月',
      '已映洲前蘆荻花'
    ],
    pinyin: [
      'kuí fǔ gū chéng luò rì xié',
      'měi yī běi dǒu wàng jīng huá',
      'tīng yuán shí xià sān shēng lèi',
      'fèng shǐ xū suí bā yuè chá',
      'huà shěng xiāng lú wéi fú zhěn',
      'shān lóu fěn dié yǐn bēi jiā',
      'qǐng kàn shí shàng téng luó yuè',
      'yǐ yìng zhōu qián lú dí huā'
    ],
    english: [
      'Kuizhou\'s lonely fortress, the setting sun slants,',
      'Each night I follow the Northern Dipper, gazing toward the capital.',
      'Hearing gibbons—truly three cries bring tears,',
      'On embassy\'s mission, vainly following the August raft.',
      'The painted ministry\'s incense burner—I lie sick, kept away,',
      'Mountain towers, powdered battlements hide mournful horns.',
      'Look at the moon on the vines upon the rocks—',
      'Already shining on the reeds and rushes by the islet.'
    ],
    annotations: {
      1: { term: '北斗望京華', title: 'Following the Northern Dipper (北斗望京華)', description: 'The Big Dipper points north toward Chang\'an. This line encapsulates Du Fu\'s nightly ritual of gazing homeward, using celestial navigation as spiritual orientation.' },
      2: { term: '三聲淚', title: 'Three Cries Bring Tears (三聲淚)', description: 'An allusion to the folk saying that hearing a gibbon cry three times will bring tears. The Three Gorges were famous for their melancholy gibbon calls echoing through the cliffs.' },
      3: { term: '八月槎', title: 'August Raft (八月槎)', description: 'Refers to the legend of Zhang Qian who traveled to the Milky Way on a raft. Du Fu laments that unlike the legendary ambassador, his own mission remains unfulfilled.' },
      4: { term: '畫省', title: 'Painted Ministry (畫省)', description: 'The imperial secretariat where Du Fu once served briefly. Now ill and far away, he can only dream of the incense-filled halls of government service.' }
    },
    analysis: 'This poem captures Du Fu\'s nightly vigil of longing. The contrast between his lofty aspirations (serving at court, journeying like Zhang Qian) and his reality (sick, isolated, listening to mournful gibbons) creates profound pathos.'
  },
  {
    number: '三',
    title: 'Morning in the Mountains',
    theme: 'Dawn reflections on faded ambitions',
    chinese: [
      '千家山郭靜朝暉',
      '日日江樓坐翠微',
      '信宿漁人還泛泛',
      '清秋燕子故飛飛',
      '匡衡抗疏功名薄',
      '劉向傳經心事違',
      '同學少年多不賤',
      '五陵衣馬自輕肥'
    ],
    pinyin: [
      'qiān jiā shān guō jìng zhāo huī',
      'rì rì jiāng lóu zuò cuì wēi',
      'xìn sù yú rén hái fàn fàn',
      'qīng qiū yàn zi gù fēi fēi',
      'kuāng héng kàng shū gōng míng bó',
      'liú xiàng chuán jīng xīn shì wéi',
      'tóng xué shào nián duō bù jiàn',
      'wǔ líng yī mǎ zì qīng féi'
    ],
    english: [
      'A thousand homes in mountain walls, quiet in morning light,',
      'Day after day I sit in the river tower amid blue-green haze.',
      'Fishermen who stayed the night still drift upon the waters,',
      'In clear autumn, swallows persist in their flying.',
      'Like Kuang Heng who submitted memorials—fame proved slight,',
      'Like Liu Xiang who transmitted classics—ambitions went awry.',
      'My classmates of youth, most have not stayed humble—',
      'At the Five Tombs, their robes and horses are naturally sleek and fine.'
    ],
    annotations: {
      4: { term: '匡衡', title: 'Kuang Heng (匡衡)', description: 'A Han dynasty scholar famous for his poverty and diligence (cutting a hole in the wall to read by his neighbor\'s light). Despite his moral memorials to the emperor, his career ended poorly.' },
      5: { term: '劉向', title: 'Liu Xiang (劉向)', description: 'A Han scholar who devoted his life to preserving classical texts. Despite his learning, he faced political setbacks. Du Fu sees himself in these frustrated scholars.' },
      7: { term: '五陵', title: 'Five Tombs (五陵)', description: 'The area near Chang\'an where five Han emperors were buried, an aristocratic district. Du Fu notes bitterly that his former classmates now enjoy wealth and status there.' }
    },
    analysis: 'Morning brings no relief—only bitter comparison. Du Fu contrasts his daily monotony with the success of former peers, and his moral integrity with the hollow victories of ambitious men. The natural world continues indifferently.'
  },
  {
    number: '四',
    title: 'News from Chang\'an',
    theme: 'The fallen capital and endless warfare',
    chinese: [
      '聞道長安似弈棋',
      '百年世事不勝悲',
      '王侯第宅皆新主',
      '文武衣冠異昔時',
      '直北關山金鼓振',
      '征西車馬羽書馳',
      '魚龍寂寞秋江冷',
      '故國平居有所思'
    ],
    pinyin: [
      'wén dào cháng ān sì yì qí',
      'bǎi nián shì shì bù shèng bēi',
      'wáng hóu dì zhái jiē xīn zhǔ',
      'wén wǔ yī guān yì xī shí',
      'zhí běi guān shān jīn gǔ zhèn',
      'zhēng xī chē mǎ yǔ shū chí',
      'yú lóng jì mò qiū jiāng lěng',
      'gù guó píng jū yǒu suǒ sī'
    ],
    english: [
      'I hear Chang\'an is like a chess game—',
      'A century of worldly affairs, sorrow beyond bearing.',
      'The mansions of princes and lords all have new masters,',
      'Civil and military court robes differ from former times.',
      'Due north, at the mountain passes, war drums thunder,',
      'Marching west, chariots and horses, urgent dispatches fly.',
      'Fish and dragons lonely, the autumn river cold—',
      'My homeland, peaceful dwelling—there lies my longing.'
    ],
    annotations: {
      0: { term: '似弈棋', title: 'Like a Chess Game (似弈棋)', description: 'The power struggles in Chang\'an are compared to weiqi (Go). Territory changes hands constantly; the situation is precarious and strategic. A profound metaphor for political instability.' },
      2: { term: '皆新主', title: 'All Have New Masters (皆新主)', description: 'After the An Lushan Rebellion, noble houses changed hands repeatedly. The old aristocracy was displaced, and new powers arose from the chaos.' },
      6: { term: '魚龍寂寞', title: 'Fish and Dragons Lonely (魚龍寂寞)', description: 'A dual image: literally the creatures of the cold river, but also an allusion to elaborate water performances that once graced the capital—now silent and forgotten.' }
    },
    analysis: 'This poem directly addresses the political catastrophe. The chess metaphor captures the endless power struggles post-rebellion. Du Fu\'s grief is both personal and national—he mourns not just his exile but the destruction of civilization itself.'
  },
  {
    number: '五',
    title: 'The Palace on the Mountain',
    theme: 'Memories of imperial splendor',
    chinese: [
      '蓬萊宮闕對南山',
      '承露金莖霄漢間',
      '西望瑤池降王母',
      '東來紫氣滿函關',
      '雲移雉尾開宮扇',
      '日繞龍鳞識聖顏',
      '一臥滄江驚歲晚',
      '幾回青瑣點朝班'
    ],
    pinyin: [
      'péng lái gōng què duì nán shān',
      'chéng lù jīn jīng xiāo hàn jiān',
      'xī wàng yáo chí jiàng wáng mǔ',
      'dōng lái zǐ qì mǎn hán guān',
      'yún yí zhì wěi kāi gōng shàn',
      'rì rào lóng lín shí shèng yán',
      'yī wò cāng jiāng jīng suì wǎn',
      'jǐ huí qīng suǒ diǎn cháo bān'
    ],
    english: [
      'Penglai Palace facing South Mountain,',
      'Dew-catching golden stems between sky and Milky Way.',
      'Looking west, the Queen Mother descends to Jade Pool,',
      'From the east, purple vapors fill the Han Pass.',
      'Clouds shift, pheasant-tail fans open in the palace,',
      'The sun circles dragon scales—I recognize the sage\'s face.',
      'Now lying by the dark river, startled that the year grows late,',
      'How many times did I stand at the green-latticed gates, attending morning court?'
    ],
    annotations: {
      0: { term: '蓬萊宮', title: 'Penglai Palace (蓬萊宮)', description: 'The Daming Palace in Chang\'an, named after the mythical island of immortals. Du Fu recalls its magnificence facing the sacred Zhongnan Mountains.' },
      1: { term: '承露金莖', title: 'Dew-Catching Golden Stems (承露金莖)', description: 'Bronze pillars topped with immortal figures holding plates to catch heavenly dew. Emperor Wu of Han built these seeking elixirs of immortality.' },
      3: { term: '紫氣東來', title: 'Purple Vapor from the East (紫氣東來)', description: 'Legend says purple clouds appeared at the Han Pass when Laozi traveled west. This auspicious sign was associated with sages and imperial destiny.' },
      5: { term: '龍鳞', title: 'Dragon Scales (龍鳞)', description: 'The emperor\'s golden robes, embroidered with dragons. To "recognize the dragon scales" means to have been in the emperor\'s presence—a privilege Du Fu once briefly held.' }
    },
    analysis: 'Du Fu\'s memory turns to the Daming Palace in its glory—a paradise on earth mixing Daoist mythology with imperial grandeur. The contrast between those shining halls and his current riverside exile is devastating.'
  },
  {
    number: '六',
    title: 'The Winding River',
    theme: 'Past pleasures now lost to war',
    chinese: [
      '瞿塘峽口曲江頭',
      '萬里風煙接素秋',
      '花萼夾城通御氣',
      '芙蓉小苑入邊愁',
      '珠簾繡柱圍黃鶴',
      '錦纜牙檣起白鷗',
      '回首可憐歌舞地',
      '秦中自古帝王州'
    ],
    pinyin: [
      'qú táng xiá kǒu qū jiāng tóu',
      'wàn lǐ fēng yān jiē sù qiū',
      'huā è jiā chéng tōng yù qì',
      'fú róng xiǎo yuàn rù biān chóu',
      'zhū lián xiù zhù wéi huáng hè',
      'jǐn lǎn yá qiáng qǐ bái ōu',
      'huí shǒu kě lián gē wǔ dì',
      'qín zhōng zì gǔ dì wáng zhōu'
    ],
    english: [
      'From Qutang Gorge\'s mouth to the Serpentine\'s head,',
      'Ten thousand li of wind and mist connect to pale autumn.',
      'The Flower Calyx Tower flanks the wall, channeling imperial spirit,',
      'The Lotus Garden\'s small park now harbors frontier sorrow.',
      'Pearl blinds, embroidered pillars once ringed golden orioles,',
      'Brocade cables, ivory masts once startled white gulls.',
      'Looking back with pity on that land of song and dance—',
      'The Qin heartland, since ancient times, a realm of emperors.'
    ],
    annotations: {
      0: { term: '瞿塘峽口曲江頭', title: 'Qutang Gorge to the Serpentine (瞿塘峽口曲江頭)', description: 'The pivotal line connecting Du Fu\'s present (Qutang Gorge in Kuizhou) to his past (the Serpentine lake in Chang\'an). Ten thousand li of longing condensed in one breath.' },
      2: { term: '花萼夾城', title: 'Flower Calyx Tower (花萼夾城)', description: 'A famous tower in Chang\'an where Emperor Xuanzong held lavish entertainments. Now the "imperial spirit" flows through ruins or is usurped.' },
      3: { term: '芙蓉小苑', title: 'Lotus Garden (芙蓉小苑)', description: 'The imperial garden where Yang Guifei and Xuanzong enjoyed their romance. Now it holds only "frontier sorrow"—the aftermath of their indulgence.' }
    },
    analysis: 'This is the structural center of the cycle. The opening couplet bridges geography and time, connecting Du Fu\'s exile to his memories of Chang\'an\'s pleasures. The ruined gardens become symbols of dynasty\'s decline.'
  },
  {
    number: '七',
    title: 'Kunming Pool',
    theme: 'Imperial monuments and the passage of time',
    chinese: [
      '昆明池水漢時功',
      '武帝旌旗在眼中',
      '織女機絲虛夜月',
      '石鯨鱗甲動秋風',
      '波漂菰米沈雲黑',
      '露冷蓮房墜粉紅',
      '關塞極天惟鳥道',
      '江湖滿地一漁翁'
    ],
    pinyin: [
      'kūn míng chí shuǐ hàn shí gōng',
      'wǔ dì jīng qí zài yǎn zhōng',
      'zhī nǚ jī sī xū yè yuè',
      'shí jīng lín jiǎ dòng qiū fēng',
      'bō piāo gū mǐ chén yún hēi',
      'lù lěng lián fáng zhuì fěn hóng',
      'guān sài jí tiān wéi niǎo dào',
      'jiāng hú mǎn dì yī yú wēng'
    ],
    english: [
      'Kunming Pool\'s waters—achievement of the Han,',
      'Emperor Wu\'s banners still before my eyes.',
      'The Weaving Maid\'s loom threads idle in moonlit night,',
      'The stone whale\'s scales stir in autumn wind.',
      'Waves drift wild rice dark as sunken clouds,',
      'Dew chills the lotus pods, dropping pink petals.',
      'The mountain passes reach the sky—only birds can pass,',
      'Rivers and lakes fill the land—just one old fisherman.'
    ],
    annotations: {
      0: { term: '昆明池', title: 'Kunming Pool (昆明池)', description: 'A vast artificial lake built by Emperor Wu of Han to train his navy. Du Fu recalls its imperial grandeur—now fallen into decay, its military purpose forgotten.' },
      2: { term: '織女', title: 'The Weaving Maid (織女)', description: 'A statue of the Weaving Maid (Vega) was placed on one shore of Kunming Pool, with the Cowherd (Altair) on the other, reenacting the celestial lovers\' separation.' },
      3: { term: '石鯨', title: 'Stone Whale (石鯨)', description: 'A massive stone whale sculpture in Kunming Pool, its scales seeming to move in the wind. A monument to imperial ambition now haunted by time.' },
      7: { term: '一漁翁', title: 'One Old Fisherman (一漁翁)', description: 'Du Fu identifies with the solitary fisherman—a recurring figure of the recluse who has withdrawn from worldly affairs, whether by choice or fate.' }
    },
    analysis: 'Kunming Pool becomes a meditation on imperial ambition and inevitable decline. The statues that once symbolized cosmic order now stand idle; the military lake serves only fishermen. Du Fu is that fisherman—displaced, aging, watching history crumble.'
  },
  {
    number: '八',
    title: 'The Beautiful Lake',
    theme: 'Farewell to youth and poetry\'s power',
    chinese: [
      '昆吾御宿自逶迤',
      '紫閣峰陰入渼陂',
      '香稻啄餘鸚鵡粒',
      '碧梧棲老鳳凰枝',
      '佳人拾翠春相問',
      '仙侶同舟晚更移',
      '彩筆昔曾干氣象',
      '白頭吟望苦低垂'
    ],
    pinyin: [
      'kūn wú yù sù zì wēi yí',
      'zǐ gé fēng yīn rù měi bēi',
      'xiāng dào zhuó yú yīng wǔ lì',
      'bì wú qī lǎo fèng huáng zhī',
      'jiā rén shí cuì chūn xiāng wèn',
      'xiān lǚ tóng zhōu wǎn gèng yí',
      'cǎi bǐ xī céng gān qì xiàng',
      'bái tóu yín wàng kǔ dī chuí'
    ],
    english: [
      'From Kunwu to Yuxiu, the path winds on,',
      'Purple Pavilion Peak\'s shadow enters Mei Lake.',
      'Fragrant rice—parrots peck the leftover grains,',
      'Green parasol trees—phoenixes perch on aging branches.',
      'Beautiful women gathering kingfisher feathers ask after each other in spring,',
      'Immortal companions in the same boat drift on toward evening.',
      'My colorful brush once stirred the very atmosphere—',
      'White-haired now, I chant and gaze, head bowed in bitter grief.'
    ],
    annotations: {
      0: { term: '昆吾御宿', title: 'Kunwu and Yuxiu (昆吾御宿)', description: 'Famous scenic spots near Chang\'an where Du Fu once wandered with friends. The winding path (逶迤) suggests both physical meandering and the long journey of memory.' },
      1: { term: '渼陂', title: 'Mei Lake (渼陂)', description: 'A beautiful lake near Chang\'an where poets gathered. Du Fu and his friends once spent carefree days here—now impossibly distant.' },
      3: { term: '碧梧鳳凰', title: 'Phoenix on the Parasol Tree (碧梧鳳凰)', description: 'Phoenixes were said to perch only on parasol trees and eat only bamboo seeds. This image of noble creatures on aging trees suggests Du Fu himself—a talent born in declining times.' },
      6: { term: '彩筆干氣象', title: 'My Brush Stirred the Atmosphere (彩筆干氣象)', description: 'Du Fu\'s proud claim for poetry\'s cosmic power—that his words once moved heaven and earth. Now his brush is still, his head white, his voice reduced to bitter chanting.' }
    },
    analysis: 'The final poem brings the cycle to its heartbreaking close. Memory of youthful excursions, brilliant friends, and poetic ambition crashes against present reality: old age, isolation, powerlessness. Yet in this very lament, Du Fu\'s brush achieves exactly what he mourns losing.'
  }
];

// Historical context data
const historicalContext = {
  year: 766,
  era: 'Tang Dynasty',
  event: 'Three years after the An Lushan Rebellion ended',
  location: 'Kuizhou (modern Fengjie, Chongqing)',
  summary: 'In 766 CE, Du Fu found himself in Kuizhou, a remote garrison town in the Three Gorges region. The An Lushan Rebellion (755-763) had devastated the Tang Empire, killing millions and permanently weakening imperial power. Though the rebellion was suppressed, warfare continued along the borders. Du Fu, now 55 and in failing health, was far from Chang\'an—the magnificent capital he had known in his youth. These eight poems, written in autumn, weave together personal grief and national tragedy into what many consider the supreme achievement of Chinese regulated verse.',
  duFuBio: 'Du Fu (712-770), styled Zimei and self-titled "The Old Man of Shaoling," is revered as the "Poet-Sage" (詩聖). Born into a scholarly family, he spent years pursuing an official career with little success. His brief service under Emperor Suzong ended in exile. The final years of his life were spent wandering the southwest, creating poetry of unparalleled depth and technical mastery. He died on a boat on the Xiang River, possibly of illness or food poisoning, having spent his last years in poverty.'
};

// Key imagery and symbols
const keyImagery = [
  { chinese: '秋', pinyin: 'qiū', english: 'Autumn', description: 'Season of decline, harvest, and reflection—Du Fu\'s metaphor for the dynasty\'s decay and his own aging' },
  { chinese: '孤舟', pinyin: 'gū zhōu', english: 'Lone Boat', description: 'Symbol of exile, drifting, and the poet\'s displaced existence' },
  { chinese: '長安', pinyin: 'cháng ān', english: 'Chang\'an', description: 'The lost capital—not just a city but an entire world of culture, order, and youth' },
  { chinese: '夔州', pinyin: 'kuí zhōu', english: 'Kuizhou', description: 'The remote frontier town where Du Fu composed these poems, surrounded by gorges and mountains' },
  { chinese: '江', pinyin: 'jiāng', english: 'River', description: 'The Yangtze—a barrier between Du Fu and home, but also a connection through its waters' },
  { chinese: '菊', pinyin: 'jú', english: 'Chrysanthemum', description: 'The flower of autumn and the ninth month—each blooming marks another year of exile' }
];

// Styles with enhanced aesthetics
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

  :root {
    --ink: #1a1612;
    --ink-light: #2d2824;
    --paper: #f5f1e8;
    --paper-dark: #e8e0d0;
    --paper-darker: #d9d0c0;
    --autumn-gold: #c9a227;
    --autumn-gold-light: #dab949;
    --autumn-red: #8b3a3a;
    --autumn-red-light: #a54a4a;
    --autumn-orange: #b5651d;
    --river-blue: #4a6670;
    --river-blue-light: #5d7a84;
    --mountain-grey: #6b7b7a;
    --mountain-grey-light: #8a9a99;
    --maple-red: #9b2335;
    --twilight-purple: #4a3a5c;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'EB Garamond', 'Noto Serif SC', serif;
    background: var(--paper);
    color: var(--ink);
    line-height: 1.8;
    overflow-x: hidden;
  }

  /* Texture overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.035;
    pointer-events: none;
    z-index: 1000;
  }

  .app { position: relative; }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    background: linear-gradient(to bottom, var(--paper) 0%, rgba(245, 241, 232, 0.95) 70%, transparent 100%);
    transition: all 0.3s ease;
  }

  .nav.scrolled {
    padding: 1rem 3rem;
    background: rgba(245, 241, 232, 0.98);
    box-shadow: 0 2px 20px rgba(26, 22, 18, 0.1);
  }

  .nav-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--mountain-grey);
  }

  .nav-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1rem;
    color: var(--autumn-red);
    letter-spacing: 0.3em;
  }

  .poem-indicators { display: flex; gap: 0.6rem; align-items: center; }

  .poem-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--paper-dark);
    border: 1.5px solid var(--mountain-grey);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .poem-dot::after {
    content: attr(data-num);
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Noto Serif SC', serif;
    font-size: 0.7rem;
    color: var(--mountain-grey);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .poem-dot:hover::after { opacity: 1; }

  .poem-dot.active {
    background: var(--autumn-gold);
    border-color: var(--autumn-gold);
    transform: scale(1.4);
    box-shadow: 0 0 15px rgba(201, 162, 39, 0.4);
  }

  .poem-dot:hover:not(.active) {
    background: var(--autumn-orange);
    border-color: var(--autumn-orange);
    transform: scale(1.2);
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background:
      radial-gradient(ellipse at 20% 80%, rgba(201, 162, 39, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(139, 58, 58, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(155, 35, 53, 0.05) 0%, transparent 60%);
    animation: heroGlow 10s ease-in-out infinite alternate;
  }

  /* Falling leaves animation */
  .falling-leaves {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .leaf {
    position: absolute;
    width: 15px;
    height: 15px;
    background: var(--maple-red);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    opacity: 0.6;
    animation: falling linear infinite;
  }

  @keyframes falling {
    0% {
      transform: translateY(-10vh) rotate(0deg) translateX(0);
      opacity: 0;
    }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% {
      transform: translateY(110vh) rotate(720deg) translateX(100px);
      opacity: 0;
    }
  }

  @keyframes heroGlow {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .hero-content { position: relative; z-index: 1; }

  .hero-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: clamp(3rem, 10vw, 7rem);
    font-weight: 700;
    letter-spacing: 0.5em;
    margin-left: 0.5em;
    color: var(--ink);
    opacity: 0;
    animation: fadeInUp 1.2s ease forwards;
    text-shadow: 2px 2px 4px rgba(26, 22, 18, 0.1);
  }

  .hero-english {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.2rem, 3vw, 2rem);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--mountain-grey);
    margin-top: 1.5rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 0.3s forwards;
  }

  .hero-byline {
    margin-top: 3rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 0.6s forwards;
  }

  .hero-poet {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.4rem;
    color: var(--autumn-red);
    letter-spacing: 0.2em;
  }

  .hero-poet-english {
    font-family: 'EB Garamond', serif;
    font-size: 1.1rem;
    font-style: italic;
    color: var(--mountain-grey);
    margin-top: 0.3rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    color: var(--mountain-grey);
    margin-top: 1rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 0.8s forwards;
    letter-spacing: 0.1em;
  }

  .hero-epigraph {
    margin-top: 4rem;
    padding: 2rem;
    border-left: 2px solid var(--autumn-gold);
    opacity: 0;
    animation: fadeInUp 1.2s ease 1s forwards;
  }

  .hero-epigraph-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.3rem;
    color: var(--ink);
    letter-spacing: 0.15em;
  }

  .hero-epigraph-english {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--mountain-grey);
    margin-top: 0.5rem;
  }

  .scroll-hint {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 1.4s forwards;
  }

  .scroll-hint span {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--mountain-grey);
  }

  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--autumn-gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(0.6); opacity: 0.5; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Context Section */
  .context-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    background: linear-gradient(to bottom, var(--paper), var(--paper-dark));
    position: relative;
  }

  .context-content {
    max-width: 900px;
    text-align: center;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  .context-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .context-year {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem;
    font-weight: 600;
    color: var(--autumn-gold);
    opacity: 0.25;
    margin-bottom: 0.5rem;
  }

  .context-era {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--autumn-red);
    margin-bottom: 2rem;
  }

  .context-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--ink);
  }

  .context-text {
    font-size: 1.15rem;
    line-height: 2;
    color: var(--mountain-grey);
    max-width: 700px;
    margin: 0 auto 3rem;
    text-align: left;
  }

  .context-bio {
    padding: 2rem;
    background: var(--paper);
    border: 1px solid var(--paper-darker);
    margin-top: 2rem;
  }

  .context-bio-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: var(--autumn-red);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .context-bio-title::before,
  .context-bio-title::after {
    content: '';
    width: 30px;
    height: 1px;
    background: var(--autumn-gold);
  }

  .context-bio p {
    font-size: 1rem;
    line-height: 1.9;
    color: var(--mountain-grey);
    text-align: left;
  }

  .location-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 2rem;
    padding: 1rem 2rem;
    background: var(--paper);
    border: 1px solid var(--autumn-gold);
    font-size: 1rem;
  }

  .location-badge .chinese {
    font-family: 'Noto Serif SC', serif;
    color: var(--autumn-red);
    font-size: 1.2rem;
  }

  .location-badge .arrow {
    color: var(--autumn-gold);
  }

  .location-badge .distance {
    color: var(--mountain-grey);
    font-size: 0.9rem;
  }

  /* Poem Section */
  .poem-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .poem-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0.03;
    background-size: 200px;
    pointer-events: none;
  }

  .poem-section:nth-child(odd) {
    background: var(--paper);
  }

  .poem-section:nth-child(even) {
    background: linear-gradient(135deg, var(--paper-dark) 0%, var(--paper) 100%);
  }

  .poem-header {
    text-align: center;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  .poem-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .poem-number-display {
    font-family: 'Noto Serif SC', serif;
    font-size: 2rem;
    color: var(--autumn-gold);
    margin-bottom: 0.5rem;
  }

  .poem-title-english {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: var(--ink);
    letter-spacing: 0.1em;
  }

  .poem-theme {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--mountain-grey);
    margin-top: 0.5rem;
  }

  .poem-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  @media (max-width: 1000px) {
    .poem-container {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .poem-chinese {
      writing-mode: horizontal-tb !important;
      height: auto !important;
      text-align: center;
    }
  }

  .poem-chinese-block {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease;
    display: flex;
    justify-content: center;
  }

  .poem-chinese-block.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .poem-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    line-height: 2.8;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    height: 500px;
    letter-spacing: 0.15em;
  }

  .poem-line {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    position: relative;
  }

  .poem-line:hover {
    color: var(--autumn-red);
    background: linear-gradient(to bottom, transparent, rgba(201, 162, 39, 0.15), transparent);
  }

  .poem-line.has-annotation::after {
    content: '·';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--autumn-gold);
    font-size: 1.5rem;
  }

  .poem-line.highlighted {
    color: var(--autumn-red);
    text-shadow: 0 0 20px rgba(139, 58, 58, 0.3);
    background: rgba(201, 162, 39, 0.1);
  }

  .poem-english-block {
    padding-left: 2.5rem;
    border-left: 2px solid var(--autumn-gold);
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease 0.2s;
  }

  .poem-english-block.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .poem-english {
    font-family: 'EB Garamond', serif;
    font-size: 1.2rem;
    line-height: 2.4;
    color: var(--ink-light);
  }

  .poem-english-line {
    opacity: 0.75;
    transition: all 0.3s ease;
    padding: 0.4rem 0;
    cursor: pointer;
  }

  .poem-english-line:hover {
    opacity: 1;
    color: var(--ink);
    padding-left: 0.75rem;
    border-left: 2px solid var(--autumn-orange);
    margin-left: -2px;
  }

  .poem-english-line.highlighted {
    opacity: 1;
    color: var(--autumn-red);
    padding-left: 0.75rem;
    border-left: 2px solid var(--autumn-red);
    margin-left: -2px;
  }

  .poem-analysis {
    max-width: 800px;
    margin: 3rem auto 0;
    padding: 2rem;
    background: rgba(232, 224, 208, 0.5);
    border-radius: 4px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.4s;
  }

  .poem-analysis.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .poem-analysis h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--autumn-red);
    margin-bottom: 1rem;
  }

  .poem-analysis p {
    font-size: 1.05rem;
    line-height: 1.9;
    color: var(--mountain-grey);
  }

  /* Annotation Panel */
  .annotation-panel {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    background: linear-gradient(to right, var(--ink), var(--ink-light));
    color: var(--paper);
    padding: 2rem 3rem;
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    display: flex;
    align-items: flex-start;
    gap: 2.5rem;
  }

  .annotation-panel.visible { transform: translateY(0); }

  .annotation-term {
    font-family: 'Noto Serif SC', serif;
    font-size: 2.5rem;
    color: var(--autumn-gold);
    min-width: 100px;
    text-align: center;
  }

  .annotation-content {
    flex: 1;
  }

  .annotation-content h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: var(--paper);
  }

  .annotation-content p {
    font-size: 1rem;
    color: var(--paper-dark);
    max-width: 700px;
    line-height: 1.8;
  }

  .annotation-close {
    background: none;
    border: 1px solid var(--paper-dark);
    color: var(--paper);
    padding: 0.6rem 1.2rem;
    font-family: 'EB Garamond', serif;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.1em;
  }

  .annotation-close:hover {
    background: var(--paper);
    color: var(--ink);
  }

  /* Language Toggle */
  .controls {
    position: fixed;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .lang-toggle {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .lang-btn {
    width: 44px; height: 44px;
    border: 1px solid var(--mountain-grey);
    background: var(--paper);
    font-family: 'Noto Serif SC', serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .lang-btn:hover, .lang-btn.active {
    background: var(--autumn-gold);
    border-color: var(--autumn-gold);
    color: var(--paper);
  }

  .pinyin-toggle {
    width: 44px; height: 44px;
    border: 1px solid var(--mountain-grey);
    background: var(--paper);
    font-family: 'EB Garamond', serif;
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .pinyin-toggle:hover, .pinyin-toggle.active {
    background: var(--river-blue);
    border-color: var(--river-blue);
    color: var(--paper);
  }

  /* Imagery Section */
  .imagery-section {
    padding: 6rem 2rem;
    background: var(--paper-dark);
  }

  .imagery-title {
    text-align: center;
    margin-bottom: 4rem;
  }

  .imagery-title h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: var(--ink);
    margin-bottom: 0.5rem;
  }

  .imagery-title p {
    font-family: 'EB Garamond', serif;
    color: var(--mountain-grey);
    font-style: italic;
  }

  .imagery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .imagery-card {
    background: var(--paper);
    padding: 2rem;
    border: 1px solid var(--paper-darker);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .imagery-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(26, 22, 18, 0.1);
    border-color: var(--autumn-gold);
  }

  .imagery-card-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 2rem;
    color: var(--autumn-gold);
    margin-bottom: 0.3rem;
  }

  .imagery-card-pinyin {
    font-family: 'EB Garamond', serif;
    font-size: 0.9rem;
    color: var(--river-blue);
    font-style: italic;
    margin-bottom: 0.5rem;
  }

  .imagery-card-english {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: var(--ink);
    margin-bottom: 1rem;
  }

  .imagery-card-description {
    font-size: 0.95rem;
    color: var(--mountain-grey);
    line-height: 1.7;
  }

  /* Map Section */
  .map-section {
    min-height: 100vh;
    background: var(--ink);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .map-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(74, 102, 112, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba(201, 162, 39, 0.15) 0%, transparent 50%);
  }

  .map-container {
    width: 100%;
    max-width: 1000px;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  .map-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .map-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: var(--paper);
    text-align: center;
    margin-bottom: 1rem;
    letter-spacing: 0.2em;
  }

  .map-subtitle {
    font-family: 'EB Garamond', serif;
    font-size: 1.1rem;
    color: var(--paper-dark);
    text-align: center;
    margin-bottom: 3rem;
    font-style: italic;
  }

  .map-visual {
    position: relative;
    height: 400px;
    background: linear-gradient(135deg,
      rgba(74, 102, 112, 0.3) 0%,
      rgba(107, 123, 122, 0.2) 50%,
      rgba(139, 58, 58, 0.2) 100%);
    border-radius: 8px;
    overflow: hidden;
  }

  .map-river {
    position: absolute;
    top: 45%; left: 10%;
    width: 80%; height: 4px;
    background: linear-gradient(to right,
      var(--river-blue) 0%,
      var(--river-blue-light) 40%,
      var(--autumn-gold) 100%);
    transform: translateY(-50%);
    border-radius: 2px;
    animation: riverFlow 3s ease-in-out infinite;
  }

  @keyframes riverFlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  .map-river::before {
    content: '';
    position: absolute;
    top: -2px; left: 0;
    width: 100%; height: 8px;
    background: linear-gradient(to right,
      transparent 0%,
      rgba(74, 102, 112, 0.3) 50%,
      transparent 100%);
    animation: riverShimmer 2s ease-in-out infinite;
  }

  @keyframes riverShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .map-location {
    position: absolute;
    text-align: center;
    color: var(--paper);
    transition: all 0.3s ease;
  }

  .map-location:hover {
    transform: scale(1.05);
  }

  .map-location.kuizhou { top: 55%; left: 8%; }
  .map-location.changan { top: 55%; right: 8%; }

  .map-location .dot {
    width: 16px; height: 16px;
    border-radius: 50%;
    margin: 0 auto 0.75rem;
    animation: pulse 2s ease-in-out infinite;
  }

  .map-location.kuizhou .dot {
    background: var(--river-blue);
    box-shadow: 0 0 20px var(--river-blue);
  }

  .map-location.changan .dot {
    background: var(--autumn-gold);
    box-shadow: 0 0 20px var(--autumn-gold);
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }

  .map-location .chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.8rem;
    color: var(--autumn-gold);
    display: block;
    margin-bottom: 0.3rem;
  }

  .map-location .english {
    font-size: 0.9rem;
    color: var(--paper-dark);
    letter-spacing: 0.1em;
  }

  .map-distance {
    position: absolute;
    top: 25%; left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .map-distance .number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem;
    color: var(--autumn-red);
    text-shadow: 0 0 30px rgba(139, 58, 58, 0.5);
  }

  .map-distance .unit {
    font-size: 1rem;
    color: var(--paper-dark);
    display: block;
    margin-top: 0.3rem;
  }

  .map-quote {
    text-align: center;
    margin-top: 3rem;
    padding: 0 2rem;
  }

  .map-quote-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    color: var(--autumn-gold);
    margin-bottom: 0.75rem;
  }

  .map-quote-english {
    font-style: italic;
    color: var(--paper-dark);
    font-size: 1.1rem;
  }

  /* Timeline Section */
  .timeline-section {
    padding: 6rem 2rem;
    background: var(--paper);
  }

  .timeline-title {
    text-align: center;
    margin-bottom: 4rem;
  }

  .timeline-title h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: var(--ink);
  }

  .timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--autumn-gold), var(--autumn-red), var(--river-blue));
    transform: translateX(-50%);
  }

  .timeline-item {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .timeline-item:nth-child(odd) {
    flex-direction: row-reverse;
    text-align: right;
  }

  .timeline-item:nth-child(odd) .timeline-content {
    padding-right: 3rem;
    padding-left: 0;
  }

  .timeline-item:nth-child(even) .timeline-content {
    padding-left: 3rem;
  }

  .timeline-dot {
    width: 16px; height: 16px;
    background: var(--autumn-gold);
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .timeline-content {
    width: 45%;
  }

  .timeline-year {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: var(--autumn-red);
    margin-bottom: 0.5rem;
  }

  .timeline-event {
    font-size: 1rem;
    color: var(--mountain-grey);
    line-height: 1.7;
  }

  /* Footer */
  footer {
    background: var(--ink);
    color: var(--paper);
    padding: 5rem 2rem;
    text-align: center;
  }

  .footer-quote {
    font-family: 'Noto Serif SC', serif;
    font-size: 2rem;
    color: var(--autumn-gold);
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
  }

  .footer-translation {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    color: var(--paper-dark);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .footer-attribution {
    font-size: 0.9rem;
    color: var(--mountain-grey);
    margin-bottom: 3rem;
  }

  .footer-divider {
    width: 60px;
    height: 1px;
    background: var(--autumn-gold);
    margin: 2rem auto;
  }

  .footer-info {
    font-size: 0.9rem;
    color: var(--mountain-grey);
    line-height: 1.8;
  }

  .footer-info a {
    color: var(--autumn-gold);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-info a:hover {
    color: var(--paper);
  }

  /* Pinyin display */
  .pinyin-line {
    font-family: 'EB Garamond', serif;
    font-size: 0.75rem;
    color: var(--river-blue);
    font-style: italic;
    display: block;
    writing-mode: horizontal-tb;
    margin-top: 0.2rem;
  }

  .poem-chinese.show-pinyin .poem-line {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Hidden utility */
  .hidden { display: none !important; }

  /* Responsive */
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .controls { right: 1rem; }
    .poem-section { padding: 4rem 1rem; }
    .annotation-panel { flex-direction: column; padding: 1.5rem; }
    .timeline::before { left: 20px; }
    .timeline-item { flex-direction: column !important; text-align: left !important; }
    .timeline-content { width: 100% !important; padding-left: 3rem !important; padding-right: 0 !important; }
    .timeline-dot { left: 20px; }
  }
`;

// Falling Leaves Component
const FallingLeaves = () => {
  const leaves = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 10,
    size: 10 + Math.random() * 10
  }));

  return (
    <div className="falling-leaves">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`
          }}
        />
      ))}
    </div>
  );
};

// Navigation Component
const Navigation = ({ activePoem, onPoemClick, scrolled }) => (
  <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
    <div>
      <div className="nav-title">Autumn Stirrings</div>
      <div className="nav-chinese">秋興八首</div>
    </div>
    <div className="poem-indicators">
      {['一','二','三','四','五','六','七','八'].map((num, i) => (
        <div
          key={i}
          data-num={num}
          className={`poem-dot ${activePoem === i + 1 ? 'active' : ''}`}
          onClick={() => onPoemClick(i + 1)}
          title={`Poem ${i + 1}: ${poemsData[i].title}`}
        />
      ))}
    </div>
  </nav>
);

// Controls Component
const Controls = ({ language, setLanguage, showPinyin, setShowPinyin }) => (
  <div className="controls">
    <div className="lang-toggle">
      {['both', 'zh', 'en'].map(lang => (
        <button
          key={lang}
          className={`lang-btn ${language === lang ? 'active' : ''}`}
          onClick={() => setLanguage(lang)}
          title={lang === 'both' ? 'Show both languages' : lang === 'zh' ? 'Chinese only' : 'English only'}
        >
          {lang === 'both' ? '雙' : lang === 'zh' ? '中' : 'En'}
        </button>
      ))}
    </div>
    <button
      className={`pinyin-toggle ${showPinyin ? 'active' : ''}`}
      onClick={() => setShowPinyin(!showPinyin)}
      title="Toggle pinyin"
    >
      拼音
    </button>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <section className="hero" id="hero">
    <FallingLeaves />
    <div className="hero-content">
      <h1 className="hero-chinese">秋興八首</h1>
      <p className="hero-english">Autumn Stirrings</p>
      <div className="hero-byline">
        <p className="hero-poet">杜甫</p>
        <p className="hero-poet-english">Du Fu (712-770)</p>
      </div>
      <p className="hero-subtitle">Eight Poems Written in Kuizhou, 766 CE</p>
      <div className="hero-epigraph">
        <p className="hero-epigraph-chinese">叢菊兩開他日淚，孤舟一繫故園心</p>
        <p className="hero-epigraph-english">"Clustered chrysanthemums bloom twice, tears of days past; / A lone boat moored—my heart bound to homeland."</p>
      </div>
    </div>
    <div className="scroll-hint">
      <span>Scroll to explore</span>
      <div className="scroll-line"></div>
    </div>
  </section>
);

// Context Section Component
const ContextSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="context-section" id="context">
      <div ref={ref} className={`context-content ${visible ? 'visible' : ''}`}>
        <div className="context-year">{historicalContext.year}</div>
        <div className="context-era">{historicalContext.era}</div>
        <h2 className="context-title">A Poet in Exile</h2>
        <p className="context-text">{historicalContext.summary}</p>

        <div className="location-badge">
          <span className="chinese">夔州</span>
          <span className="arrow">→</span>
          <span className="chinese">長安</span>
          <span className="distance">~1,500 li (750 km) apart</span>
        </div>

        <div className="context-bio">
          <h3 className="context-bio-title">
            <span>The Poet-Sage</span>
          </h3>
          <p>{historicalContext.duFuBio}</p>
        </div>
      </div>
    </section>
  );
};

// Poem Section Component
const PoemSection = ({
  poem,
  index,
  language,
  showPinyin,
  highlightedLine,
  setHighlightedLine,
  onAnnotationClick
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleLineClick = (lineIndex) => {
    if (poem.annotations[lineIndex]) {
      onAnnotationClick(poem.annotations[lineIndex]);
    }
  };

  return (
    <section className="poem-section" id={`poem-${index + 1}`} ref={ref}>
      <div className={`poem-header ${visible ? 'visible' : ''}`}>
        <div className="poem-number-display">其{poem.number}</div>
        <h3 className="poem-title-english">{poem.title}</h3>
        <p className="poem-theme">{poem.theme}</p>
      </div>

      <div className="poem-container">
        <div className={`poem-chinese-block ${visible ? 'visible' : ''} ${language === 'en' ? 'hidden' : ''}`}>
          <div className={`poem-chinese ${showPinyin ? 'show-pinyin' : ''}`}>
            {poem.chinese.map((line, i) => (
              <span
                key={i}
                className={`poem-line ${highlightedLine === i ? 'highlighted' : ''} ${poem.annotations[i] ? 'has-annotation' : ''}`}
                onMouseEnter={() => setHighlightedLine(i)}
                onMouseLeave={() => setHighlightedLine(null)}
                onClick={() => handleLineClick(i)}
              >
                {line}
                {showPinyin && <span className="pinyin-line">{poem.pinyin[i]}</span>}
              </span>
            ))}
          </div>
        </div>

        <div className={`poem-english-block ${visible ? 'visible' : ''} ${language === 'zh' ? 'hidden' : ''}`}>
          <div className="poem-english">
            {poem.english.map((line, i) => (
              <p
                key={i}
                className={`poem-english-line ${highlightedLine === i ? 'highlighted' : ''}`}
                onMouseEnter={() => setHighlightedLine(i)}
                onMouseLeave={() => setHighlightedLine(null)}
                onClick={() => handleLineClick(i)}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={`poem-analysis ${visible ? 'visible' : ''}`}>
        <h4>Analysis</h4>
        <p>{poem.analysis}</p>
      </div>
    </section>
  );
};

// Imagery Section Component
const ImagerySection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="imagery-section" id="imagery" ref={ref}>
      <div className="imagery-title">
        <h2>Key Imagery & Symbols</h2>
        <p>The recurring images that weave through Du Fu's autumn meditation</p>
      </div>
      <div className="imagery-grid" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        {keyImagery.map((item, i) => (
          <div key={i} className="imagery-card" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="imagery-card-chinese">{item.chinese}</div>
            <div className="imagery-card-pinyin">{item.pinyin}</div>
            <div className="imagery-card-english">{item.english}</div>
            <p className="imagery-card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Map Section Component
const MapSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="map-section" id="map">
      <div ref={ref} className={`map-container ${visible ? 'visible' : ''}`}>
        <h2 className="map-title">The Distance Between</h2>
        <p className="map-subtitle">Kuizhou to Chang'an: A Journey of Longing</p>
        <div className="map-visual">
          <div className="map-river"></div>
          <div className="map-location kuizhou">
            <div className="dot"></div>
            <span className="chinese">夔州</span>
            <span className="english">Kuizhou (Fengjie)</span>
          </div>
          <div className="map-location changan">
            <div className="dot"></div>
            <span className="chinese">長安</span>
            <span className="english">Chang'an (Xi'an)</span>
          </div>
          <div className="map-distance">
            <span className="number">~1,500</span>
            <span className="unit">li (里) · approximately 750 kilometers</span>
          </div>
        </div>
        <div className="map-quote">
          <p className="map-quote-chinese">每依北斗望京華</p>
          <p className="map-quote-english">"Each night I follow the Northern Dipper, gazing toward the capital."</p>
        </div>
      </div>
    </section>
  );
};

// Timeline Section Component
const TimelineSection = () => {
  const events = [
    { year: '712', event: 'Du Fu is born in Gongxian, Henan Province, into a scholarly family.' },
    { year: '736', event: 'Fails the imperial examination for the first time. Begins years of wandering and poetry.' },
    { year: '755', event: 'The An Lushan Rebellion erupts, plunging the Tang Dynasty into chaos.' },
    { year: '757', event: 'Brief service under Emperor Suzong; soon falls out of favor and leaves the capital.' },
    { year: '759', event: 'Flees war-torn northern China; begins journey to Chengdu in Sichuan.' },
    { year: '765', event: 'Leaves Chengdu after his patron Yan Wu dies; travels down the Yangtze.' },
    { year: '766', event: 'Arrives in Kuizhou; writes "Autumn Stirrings" (秋興八首) during autumn.' },
    { year: '770', event: 'Dies on a boat on the Xiang River, aged 58, in poverty and illness.' }
  ];

  return (
    <section className="timeline-section" id="timeline">
      <div className="timeline-title">
        <h2>Du Fu's Journey</h2>
      </div>
      <div className="timeline">
        {events.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <p className="timeline-event">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Annotation Panel Component
const AnnotationPanel = ({ annotation, onClose }) => (
  <div className={`annotation-panel ${annotation ? 'visible' : ''}`}>
    {annotation && (
      <>
        <div className="annotation-term">{annotation.term}</div>
        <div className="annotation-content">
          <h3>{annotation.title}</h3>
          <p>{annotation.description}</p>
        </div>
        <button className="annotation-close" onClick={onClose}>Close</button>
      </>
    )}
  </div>
);

// Footer Component
const Footer = () => (
  <footer>
    <div className="footer-quote">飄飄何所似 天地一沙鷗</div>
    <p className="footer-translation">"Drifting, drifting—what am I like? / A lone sandpiper between heaven and earth."</p>
    <p className="footer-attribution">— Du Fu, "Travelling at Night"</p>
    <div className="footer-divider"></div>
    <p className="footer-info">
      An interactive exploration of Du Fu's masterpiece<br />
      秋興八首 · Eight Poems of Autumn Stirrings<br /><br />
      Created for EALC 145: Introduction to Chinese Literature<br />
      Fall 2025
    </p>
  </footer>
);

// Main App Component
export default function AutumnStirrings() {
  const [language, setLanguage] = useState('both');
  const [showPinyin, setShowPinyin] = useState(false);
  const [activePoem, setActivePoem] = useState(1);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [activeAnnotation, setActiveAnnotation] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const scrollToPoem = useCallback((num) => {
    const section = document.getElementById(`poem-${num}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Update active poem and nav state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = document.querySelectorAll('.poem-section');
      let current = 1;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = index + 1;
        }
      });
      setActivePoem(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && activePoem < 8) {
        scrollToPoem(activePoem + 1);
      } else if (e.key === 'ArrowLeft' && activePoem > 1) {
        scrollToPoem(activePoem - 1);
      } else if (e.key === 'Escape') {
        setActiveAnnotation(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePoem, scrollToPoem]);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Navigation
          activePoem={activePoem}
          onPoemClick={scrollToPoem}
          scrolled={scrolled}
        />
        <Controls
          language={language}
          setLanguage={setLanguage}
          showPinyin={showPinyin}
          setShowPinyin={setShowPinyin}
        />

        <HeroSection />
        <ContextSection />

        {poemsData.map((poem, index) => (
          <PoemSection
            key={index}
            poem={poem}
            index={index}
            language={language}
            showPinyin={showPinyin}
            highlightedLine={highlightedLine}
            setHighlightedLine={setHighlightedLine}
            onAnnotationClick={setActiveAnnotation}
          />
        ))}

        <ImagerySection />
        <MapSection />
        <TimelineSection />
        <Footer />

        <AnnotationPanel
          annotation={activeAnnotation}
          onClose={() => setActiveAnnotation(null)}
        />
      </div>
    </>
  );
}

