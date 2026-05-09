-- AI 建站 — 数据库表结构
-- 在 Supabase SQL Editor 里执行这段 SQL

-- 网站表
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  pages JSONB DEFAULT '[]',
  theme JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 询盘表
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 订阅表
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'active',
  lemon_squeezy_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_sites_user_id ON sites(user_id);
CREATE INDEX idx_leads_site_id ON leads(site_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- 行级安全：用户只能看自己的数据
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sites"
  ON sites FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own leads"
  ON leads FOR ALL
  USING (
    site_id IN (SELECT id FROM sites WHERE user_id = auth.uid())
  );
