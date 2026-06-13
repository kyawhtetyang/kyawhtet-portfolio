2025-09-08
Fake News Detector - BiLSTM (First AI/ML Project)
Project Diary

This was my first serious AI/ML project. I started with classic supervised learning, then migrated to deep learning using a BiLSTM as I learned more about sequence models. The project went through multiple versions as I improved the pipeline design.

I learned to build a clean ML structure with clear stages: preprocess, features, train, model, and evaluate. That structure became a pattern I still use now.

Preprocess: I cleaned and normalized raw text, removed noise with regex, handled stopwords, and standardized input so training stayed stable.

Features: I converted clean text into token sequences, built embeddings, and padded sequences so the model could learn from consistent numeric inputs.

Train: I split training and validation sets (X_train/X_val), tuned epochs and batch size, and used early stopping and learning-rate reduction to reduce overfitting.

Model: I used an Embedding layer + BiLSTM + dropout, then a dense output for binary classification.

Evaluate: I measured accuracy and produced a confusion matrix and classification report to understand real vs fake predictions.

Skills gained: ML pipeline design, text preprocessing, tokenization and embeddings, BiLSTM modeling, evaluation workflows, and iteration across versions.
