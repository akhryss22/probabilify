# Probabilify
**Probabilify** is a personality-driven adaptive learning platform for Grade 11 Statistics and Probability at Mapúa University. Using the MBTI framework, it tailors content for Sensing, Intuitive, Thinking, and Feeling learners, and includes a virtual tutor for real-time support.

## Features
- **Adaptive Learning Paths:** Personalized based on MBTI results.
- **Virtual Tutor:** AI-powered chatbot for instant help.
- **Assessments:** Pretest/posttest evaluations to track progress.

  ## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/askiakhryss/probabilify.git
2. **Install Dependencies:**
   ```bash
   cd probabilify
   composer install
3. **Configure Environment:**
   ```bash
   cp .env.example .env
3. **Run Migrations and Start Server:**
   ```bash
   php artisan migrate
   php artisan serve

### Usage
- Register and take the MBTI assessment.
- Get a personalized learning path.
- Use the chatbot for help with Statistics and Probability problems.
