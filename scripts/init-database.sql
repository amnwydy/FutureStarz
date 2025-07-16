-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create basketball_stats table
CREATE TABLE IF NOT EXISTS basketball_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  field_goal_percentage INTEGER,
  three_point_percentage INTEGER,
  free_throw_percentage INTEGER,
  points INTEGER,
  rebounds INTEGER,
  assists INTEGER,
  steals INTEGER,
  blocks INTEGER,
  vertical_jump DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create strength_training table
CREATE TABLE IF NOT EXISTS strength_training (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  weight DECIMAL(5,2),
  bench_press INTEGER,
  squat INTEGER,
  deadlift INTEGER,
  workout_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_feedback table to store generated feedback
CREATE TABLE IF NOT EXISTS ai_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  feedback_text TEXT,
  comparison_text TEXT,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_goals table
CREATE TABLE IF NOT EXISTS training_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  goal_type TEXT, -- 'basketball' or 'strength'
  goal_description TEXT,
  target_value DECIMAL(8,2),
  current_value DECIMAL(8,2),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  target_date TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE basketball_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE strength_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_goals ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
-- Profiles: Users can only view and update their own profiles
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Basketball Stats: Users can only view, create, and update their own stats
CREATE POLICY "Users can view own basketball stats" 
  ON basketball_stats FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own basketball stats" 
  ON basketball_stats FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own basketball stats" 
  ON basketball_stats FOR UPDATE USING (auth.uid() = user_id);

-- Strength Training: Users can only view, create, and update their own data
CREATE POLICY "Users can view own strength training data" 
  ON strength_training FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own strength training data" 
  ON strength_training FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own strength training data" 
  ON strength_training FOR UPDATE USING (auth.uid() = user_id);

-- AI Feedback: Users can only view their own feedback
CREATE POLICY "Users can view own AI feedback" 
  ON ai_feedback FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own AI feedback" 
  ON ai_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Training Goals: Users can only view, create, and update their own goals
CREATE POLICY "Users can view own training goals" 
  ON training_goals FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own training goals" 
  ON training_goals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own training goals" 
  ON training_goals FOR UPDATE USING (auth.uid() = user_id);
