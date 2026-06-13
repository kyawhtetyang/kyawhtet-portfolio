import musicAppVpsLaunch20260210 from './content/blog/music-app-vps-launch-2026-02-10.md?raw';
import fileOrganizerPro20260208 from './content/blog/file-organizer-pro-2026-02-08.md?raw';
import aimlPortfolioV220260210 from './content/blog/aiml-portfolio-v2-2026-02-10.md?raw';
import cloudLanguageRebrand20260216 from './content/blog/cloudlanguage-rebrand-2026-02-16.md?raw';
import aiNotesOs20260318 from './content/blog/ai-notes-os-2026-03-18.md?raw';
import ragKnowledgeAssistant20260603 from './content/blog/rag-knowledge-assistant-2026-06-03.md?raw';
import fakeNewsBilstm20251110 from './content/blog/fakenews-bilstm-2025-11-10.md?raw';
import movieRecommenderHybrid20251110 from './content/blog/movie-recommender-hybrid-2025-11-10.md?raw';
import articleAnalyzerSbert20251110 from './content/blog/article-analyzer-sbert-2025-11-10.md?raw';
import housePriceRegression20260315 from './content/blog/house-price-regression-2026-03-15.md?raw';
import imageClassifierCnn20260312 from './content/blog/image-classifier-cnn-2026-03-12.md?raw';
import flaskLoginUser20251110 from './content/blog/flask-loginuser-2025-11-10.md?raw';
import fastapiCrud20251001 from './content/blog/fastapi-crud-2025-10-01.md?raw';
import mediaDownloaderAutomation20251024 from './content/blog/media-downloader-automation-2025-10-24.md?raw';
import aiNotesOsThumbnail from './docs/blog_thumbnails/ai-notes-os.jpg';
import aimlPortfolioThumbnail from './docs/blog_thumbnails/aiml-portfolio.jpg';
import articleAnalyzerThumbnail from './docs/blog_thumbnails/article-analyzer.jpg';
import cloudLanguageThumbnail from './docs/blog_thumbnails/cloudlanguage.jpg';
import fakeNewsThumbnail from './docs/blog_thumbnails/fakenews-detector.jpg';
import fastapiCrudThumbnail from './docs/blog_thumbnails/fastapi-crud.png';
import fileOrganizerThumbnail from './docs/blog_thumbnails/file-organizer-pro.jpg';
import flaskLoginUserThumbnail from './docs/blog_thumbnails/flask-login-user.jpg';
import housePriceRegressionThumbnail from './docs/blog_thumbnails/house-price-regression.jpg';
import imageClassifierCnnThumbnail from './docs/blog_thumbnails/image-classifier-cnn.jpg';
import mediaDownloaderThumbnail from './docs/blog_thumbnails/media-downloader.jpg';
import movieRecommenderThumbnail from './docs/blog_thumbnails/movie-recommender.jpg';
import musicAppThumbnail from './docs/blog_thumbnails/music-app.jpg';
import ragKnowledgeAssistantThumbnail from './docs/blog_thumbnails/rag-knowledge-assistant.jpg';

export type BlogDraft = {
  title: string;
  status: string;
  summary: string;
  updated: string;
  content: string;
  thumbnail?: string;
};

export const BLOG_DRAFTS: BlogDraft[] = [
  {
    title: 'RAG Knowledge Assistant - Learning Retrieval End to End',
    status: 'Project Diary',
    summary: 'Built a deployable RAG system to understand chunking, embeddings, retrieval, citations, evals, and VPS delivery step by step.',
    updated: '2026-06-03',
    content: ragKnowledgeAssistant20260603,
    thumbnail: ragKnowledgeAssistantThumbnail
  },
  {
    title: 'AI + Human Collaboration OS for Notes',
    status: 'Project Diary',
    summary: 'Built a vault/code/storage system to stop notes and codebases from drifting.',
    updated: '2026-03-18',
    content: aiNotesOs20260318,
    thumbnail: aiNotesOsThumbnail
  },
  {
    title: 'House Price Regression - Supervised Learning Focus',
    status: 'Project Diary',
    summary: 'Regression pipeline with feature engineering, Ridge/Lasso, and RMSE/MAE/R² evaluation.',
    updated: '2025-12-15',
    content: housePriceRegression20260315,
    thumbnail: housePriceRegressionThumbnail
  },
  {
    title: 'Image Classifier CNN - PyTorch Focus',
    status: 'Project Diary',
    summary: 'Augmentation, transfer learning (MobileNetV2), and overfitting control in PyTorch.',
    updated: '2025-11-13',
    content: imageClassifierCnn20260312,
    thumbnail: imageClassifierCnnThumbnail
  },
  {
    title: 'Flask Login User - First Complete CRUD Project',
    status: 'Project Diary',
    summary: 'Flask CRUD app with auth, sessions, roles, and Jinja templates.',
    updated: '2025-08-11',
    content: flaskLoginUser20251110,
    thumbnail: flaskLoginUserThumbnail
  },
  {
    title: 'FastAPI CRUD - Moving Beyond Flask',
    status: 'Project Diary',
    summary: 'FastAPI CRUD app with templates, auth, and SQLite.',
    updated: '2025-12-01',
    content: fastapiCrud20251001,
    thumbnail: fastapiCrudThumbnail
  },
  {
    title: 'Media Downloader Automation - First Real Python App',
    status: 'Project Diary',
    summary: 'Automated video/audio downloads with config-driven Python scripts.',
    updated: '2025-10-24',
    content: mediaDownloaderAutomation20251024,
    thumbnail: mediaDownloaderThumbnail
  },
  {
    title: 'Fake News Detector - BiLSTM (First AI/ML Project)',
    status: 'Project Diary',
    summary: 'First supervised ML project evolved into a BiLSTM pipeline with preprocessing and evaluation.',
    updated: '2025-09-08',
    content: fakeNewsBilstm20251110,
    thumbnail: fakeNewsThumbnail
  },
  {
    title: 'Movie Recommender Hybrid - Collaborative Filtering (Second Project)',
    status: 'Project Diary',
    summary: 'Hybrid recommender with user/item similarity, content TF-IDF, and SVD latent factors.',
    updated: '2025-09-16',
    content: movieRecommenderHybrid20251110,
    thumbnail: movieRecommenderThumbnail
  },
  {
    title: 'Article Analyzer (SBERT) - Unsupervised NLP Pipeline',
    status: 'Project Diary',
    summary: 'SBERT embeddings + KMeans clustering + FAISS recommendations with transformer NLP.',
    updated: '2025-10-08',
    content: articleAnalyzerSbert20251110,
    thumbnail: articleAnalyzerThumbnail
  },
  {
    title: 'CloudLanguage - Burmese-First Learning MVP',
    status: 'Project Diary',
    summary: 'Mobile-first MVP built for Burmese learners with a music-style listening flow.',
    updated: '2026-02-16',
    content: cloudLanguageRebrand20260216,
    thumbnail: cloudLanguageThumbnail
  },
  {
    title: 'Kyaw Htet Portfolio - App-Inspired Design',
    status: 'Project Diary',
    summary: 'Rebuilt the portfolio with a CV + projects + blog in a single app-inspired layout.',
    updated: '2025-10-31',
    content: aimlPortfolioV220260210,
    thumbnail: aimlPortfolioThumbnail
  },
  {
    title: 'Music App - First VPS Launch',
    status: 'Project Diary',
    summary: 'First VPS deployment with GitHub Pages, Nginx, Postgres metadata, and Cloudflare R2.',
    updated: '2026-01-21',
    content: musicAppVpsLaunch20260210,
    thumbnail: musicAppThumbnail
  },
  {
    title: 'File Organizer Pro - First macOS Desktop App',
    status: 'Project Diary',
    summary: 'Built a Tauri .dmg app to remove duplicates, auto-rename, and group files by metadata.',
    updated: '2026-02',
    content: fileOrganizerPro20260208,
    thumbnail: fileOrganizerThumbnail
  },
];
