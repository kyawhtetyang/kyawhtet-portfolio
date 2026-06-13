2025-10-08
Article Analyzer (SBERT) - Unsupervised NLP Pipeline
Project Diary

This was my third ML project and it combined ideas from my earlier work into one end-to-end system. It is mostly unsupervised and representation-based: the goal is to discover patterns in raw text without labels, then layer supervised components where they add value.

The pipeline includes keyword extraction, summarization, NER, clustering, and recommendations. I used SBERT for sentence embeddings, KMeans for clustering, and FAISS for similarity search. For supervised pieces, I used pretrained transformers like distilBART (summarization) and distilBERT (sentiment).

A key lesson was that modern NLP often starts with unsupervised or self-supervised representations, then adds supervised fine-tuning or classification on top. It is not a strict order, but a practical workflow: learn representations first, then specialize.

Skills gained: NLP pipeline design, SBERT embeddings, KMeans clustering, FAISS similarity search, transformer integration (BART/DistilBERT), and building a full Flask + Docker deployable system.
