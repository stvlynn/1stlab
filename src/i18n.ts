export type Language = 'zh' | 'en' | 'ja';

export interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  zh: {
    'firstlab.title': 'FirstLab',
    'firstlab.subtitle': '国际化的AI爱好者社区',
    'firstlab.description': 'FirstLab是一个国际化的AI爱好者社区，主要以中文、英文、日文用户为主。我们致力于连接全球的AI开发者、研究者和爱好者，共同探索人工智能的无限可能。',
    'community.join': '加入社群',
    'community.discord': 'Discord 社群',
    'community.discord_url': 'https://discord.gg/PwZDHH4mv3',
    'guidebook.title': 'Hello Dify 指南',
    'guidebook.description': 'FirstLab旗下开源guidebook，帮助开发者快速上手Dify平台',
    'guidebook.visit': '访问指南',
    'guidebook.url': 'https://hellodify.com',
    'footer.copyright': '© 2025 FirstLab. 保留所有权利。',
    'nav.home': '首页',
    'nav.features': '功能',
    'nav.community': '社区',
    'nav.guidebook': '指南',
    'hero.welcome': '欢迎来到 FirstLab',
    'hero.tagline': '连接全球AI爱好者，共建未来',
    'features.title': '社区特色',
    'features.multilingual': '多语言支持',
    'features.multilingual_desc': '中文、英文、日文自动切换',
    'features.opensource': '开源精神',
    'features.opensource_desc': '共享知识，共同进步',
    'features.global': '全球连接',
    'features.global_desc': '连接世界各地的AI爱好者',
  },
  en: {
    'firstlab.title': 'FirstLab',
    'firstlab.subtitle': 'International AI Enthusiast Community',
    'firstlab.description': 'FirstLab is an international AI enthusiast community primarily serving Chinese, English, and Japanese users. We connect AI developers, researchers, and enthusiasts worldwide to explore the infinite possibilities of artificial intelligence.',
    'community.join': 'Join Community',
    'community.discord': 'Discord Community',
    'community.discord_url': 'https://discord.gg/PwZDHH4mv3',
    'guidebook.title': 'Hello Dify Guidebook',
    'guidebook.description': 'FirstLab\'s open-source guidebook to help developers quickly get started with the Dify platform',
    'guidebook.visit': 'Visit Guide',
    'guidebook.url': 'https://hellodify.com',
    'footer.copyright': '© 2025 FirstLab. All rights reserved.',
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.community': 'Community',
    'nav.guidebook': 'Guidebook',
    'hero.welcome': 'Welcome to FirstLab',
    'hero.tagline': 'Connecting global AI enthusiasts, building the future together',
    'features.title': 'Community Features',
    'features.multilingual': 'Multilingual Support',
    'features.multilingual_desc': 'Auto-switch between Chinese, English, and Japanese',
    'features.opensource': 'Open Source Spirit',
    'features.opensource_desc': 'Sharing knowledge, progressing together',
    'features.global': 'Global Connection',
    'features.global_desc': 'Connect AI enthusiasts from around the world',
  },
  ja: {
    'firstlab.title': 'FirstLab',
    'firstlab.subtitle': '国際的なAI愛好家コミュニティ',
    'firstlab.description': 'FirstLabは、主に中国語、英語、日本語ユーザーを対象とした国際的なAI愛好家コミュニティです。世界中のAI開発者、研究者、愛好家をつなぎ、人工知能の無限の可能性を探求します。',
    'community.join': 'コミュニティに参加',
    'community.discord': 'Discordコミュニティ',
    'community.discord_url': 'https://discord.gg/PwZDHH4mv3',
    'guidebook.title': 'Hello Difyガイドブック',
    'guidebook.description': 'FirstLabのオープンソースガイドブック。開発者がDifyプラットフォームをすぐに使い始めるのをお手伝いします',
    'guidebook.visit': 'ガイドを見る',
    'guidebook.url': 'https://hellodify.com',
    'footer.copyright': '© 2025 FirstLab. 無断転載を禁じます。',
    'nav.home': 'ホーム',
    'nav.features': '機能',
    'nav.community': 'コミュニティ',
    'nav.guidebook': 'ガイドブック',
    'hero.welcome': 'FirstLabへようこそ',
    'hero.tagline': '世界中のAI愛好家をつなぎ、未来を共に築く',
    'features.title': 'コミュニティの特徴',
    'features.multilingual': '多言語サポート',
    'features.multilingual_desc': '中国語、英語、日本語の自動切り替え',
    'features.opensource': 'オープンソースの精神',
    'features.opensource_desc': '知識を共有し、共に進歩する',
    'features.global': 'グローバルなつながり',
    'features.global_desc': '世界中のAI愛好家とつながる',
  },
};

export const detectLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('zh')) return 'zh';
  if (browserLang.startsWith('ja')) return 'ja';
  return 'en';
};

export const t = (key: string, lang: Language): string => {
  return translations[lang][key] || key;
};