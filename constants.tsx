import { AppInfo, Category } from './types';
import imgAimlPortfolio18 from './docs/18.png';
import imgCloudLanguage13 from './docs/13_CloudLanguage.png';
import imgGroup19 from './docs/19.png';
import imgGroup20 from './docs/20.png';
import imgMusic21 from './docs/21.png';
import imgFileOrganizer22 from './docs/22.png';

export const APPS: AppInfo[] = [
  {
    id: '1',
    name: 'CloudLanguage (MVP)',
    subtitle: 'Mobile-first language learning MVP for Burmese learners (in progress).',
    category: Category.Projects,
    icon: imgCloudLanguage13,
    banner: imgCloudLanguage13,
    overview: 'Language-learning app focused on Burmese learners with structured lessons, progress tracking, and review flow.',
    stack: 'Frontend: React + TypeScript\nBackend: FastAPI\nData: Lesson JSON + Postgres (optional)',
    outcome: 'Building an end-to-end lesson loop with progress persistence and review queue.',
    developer: 'Kyaw Htet',
    featured: true,
    website: 'https://cloudlanguage.vercel.app/',
    repo: 'https://github.com/kyawhtetyang/Cloud_Language'
  },
  {
    id: '2',
    name: 'Flask Login User',
    subtitle: 'User authentication and account session flow.',
    category: Category.Projects,
    icon: imgGroup20,
    banner: imgGroup20,
    overview: 'Authentication module with secure login/logout and protected routes for role-based access.',
    stack: 'Frontend: Jinja2 Templates\nBackend: Flask (Python)\nDatabase: SQLite',
    outcome: 'Delivered a reusable auth foundation for Flask apps with clean session management.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/Flask_LoginUser'
  },
  {
    id: '3',
    name: 'Flask Cloud Storage',
    subtitle: 'Upload, store, and manage files in cloud-like flow.',
    category: Category.Projects,
    icon: imgGroup20,
    banner: imgGroup20,
    overview: 'File upload and retrieval service with structured storage flow and user-friendly file listing.',
    stack: 'Frontend: Bootstrap\nBackend: Flask (Python)\nStorage: File System',
    outcome: 'Built a lightweight storage dashboard that reduces manual file handling time.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/Flask_Cloud_Storage'
  },
  {
    id: '4',
    name: 'Flask POS Inventory',
    subtitle: 'Point-of-sale and inventory management dashboard.',
    category: Category.Projects,
    icon: imgGroup20,
    banner: imgGroup20,
    overview: 'Inventory and transaction tracking for retail workflow with stock visibility and sales updates.',
    stack: 'Frontend: Flask Templates + Charting\nBackend: Flask (Python)\nDatabase: SQLAlchemy/SQLite',
    outcome: 'Improved visibility of stock and sales operations in one central interface.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/Flask_POS_Inventory'
  },
  {
    id: '5',
    name: 'FastAPI CRUD',
    subtitle: 'REST API backend with CRUD operations.',
    category: Category.Projects,
    icon: imgGroup20,
    banner: imgGroup20,
    overview: 'Backend service with clean CRUD endpoints and maintainable API structure.',
    stack: 'Backend: FastAPI + Pydantic (Python)\nDatabase: SQLite',
    outcome: 'Provided a reliable API template for rapid backend prototyping.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/FastAPI_CRUD'
  },
  {
    id: '6',
    name: 'House Price Regression',
    subtitle: 'Regression pipeline for housing price prediction.',
    category: Category.Projects,
    icon: imgGroup19,
    banner: imgGroup19,
    overview: 'End-to-end regression workflow for estimating house prices from structured features.',
    stack: 'ML/Engine: Scikit-learn Regression + EDA\nPipeline: Feature engineering + evaluation',
    outcome: 'Built a reproducible ML baseline with clear evaluation metrics.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/HousePrice_Regression'
  },
  {
    id: '7',
    name: 'Article Analyzer (SBERT)',
    subtitle: 'Semantic article analysis using SBERT embeddings.',
    category: Category.Projects,
    icon: imgGroup19,
    banner: imgGroup19,
    overview: 'Semantic similarity engine for comparing article meaning and clustering related content.',
    stack: 'ML/Engine: SBERT + Transformers + Pandas\nBackend: Flask (Python)\nPackaging: Docker',
    outcome: 'Enabled better article matching and semantic ranking for content analysis tasks.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/ArticleAnalyzer_SBERT'
  },
  {
    id: '8',
    name: 'Fake News Detector (BiLSTM)',
    subtitle: 'NLP classification model for fake news detection.',
    category: Category.Projects,
    icon: imgGroup19,
    banner: imgGroup19,
    overview: 'Sequence model that classifies news content using language patterns to detect misinformation.',
    stack: 'ML/Engine: TensorFlow BiLSTM + NLP Pipeline\nBackend: Flask (Python)\nPackaging: Docker',
    outcome: 'Created an end-to-end text classification pipeline for credibility screening experiments.',
    developer: 'Kyaw Htet',
    featured: true,
    website: 'https://fake-news.kyawhtet.com',
    repo: 'https://github.com/kyawhtetyang/FakeNewsDetector_BiLSTM'
  },
  {
    id: '9',
    name: 'Movie Recommender (Hybrid)',
    subtitle: 'Hybrid recommendation engine for movie suggestions.',
    category: Category.Projects,
    icon: imgGroup19,
    banner: imgGroup19,
    overview: 'Recommendation engine combining collaborative and content-based strategies for personalized results.',
    stack: 'Frontend: Flask Templates\nBackend: Flask (Python)\nML/Engine: Hybrid Recommender (Scikit-learn)\nDatabase: SQLite',
    outcome: 'Improved recommendation relevance by blending multiple ranking signals.',
    developer: 'Kyaw Htet',
    featured: true,
    website: 'https://movie-recommender-frontend-phi.vercel.app/',
    repo: 'https://github.com/kyawhtetyang/MovieRecommender_Hybrid',
    demo: 'Use demo login: username demo, password demo1234.'
  },
  {
    id: '10',
    name: 'Image Classifier (CNN)',
    subtitle: 'Convolutional neural network for image classification.',
    category: Category.Projects,
    icon: imgGroup19,
    banner: imgGroup19,
    overview: 'Computer vision classifier for image categories with model training and inference workflow.',
    stack: 'ML/Engine: PyTorch CNN + OpenCV\nBackend: Python Inference Pipeline',
    outcome: 'Delivered a practical baseline model for image recognition experimentation.',
    developer: 'Kyaw Htet',
    repo: 'https://github.com/kyawhtetyang/ImageClassifier_CNN'
  },
  {
    id: '11',
    name: 'Music App',
    subtitle: 'Apple-inspired music interface and interactions.',
    category: Category.Projects,
    icon: imgMusic21,
    banner: imgMusic21,
    overview: 'Frontend experience inspired by Apple Music with polished navigation and visual hierarchy.',
    stack: 'Frontend: React + TypeScript\nBackend: FastAPI\nDatabase/Storage: Postgres + Cloudflare R2',
    outcome: 'Demonstrated high-fidelity UI implementation and design-system consistency.',
    developer: 'Kyaw Htet',
    website: 'https://music.kyawhtet.com',
    repo: 'https://github.com/kyawhtetyang/Music_App'
  },
  {
    id: '12',
    name: 'Files Organizer',
    subtitle: 'Smart local file organizer for daily workflow.',
    category: Category.Projects,
    icon: imgFileOrganizer22,
    banner: imgFileOrganizer22,
    overview: 'Desktop automation utility that organizes files using rule-based sorting for cleaner workspace management, built with a Tauri app shell.',
    stack: 'Frontend: React + TypeScript\nBackend: FastAPI (Python)\nEngine: File Automation Rules\nDesktop/Packaging: Tauri (.dmg)',
    outcome: 'Reduced repetitive manual organization and improved daily workflow speed.',
    developer: 'Kyaw Htet',
    featured: true,
    website: 'https://files.kyawhtet.com/',
    repo: 'https://github.com/kyawhtetyang/File_Organizer',
    downloadUrl: 'https://github.com/kyawhtetyang/File_Organizer/releases/download/v0.2.0/File.Organizer_0.2.0_aarch64.dmg'
  }
];
