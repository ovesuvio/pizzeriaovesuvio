/*
  # O'Vesuvio Pizzeria Database Schema

  1. New Tables
    - `gallery_items`
      - `id` (uuid, primary key)
      - `image_url` (text) - URL to product image
      - `title_de` (text) - German title
      - `title_it` (text) - Italian title
      - `description_de` (text) - German description
      - `description_it` (text) - Italian description
      - `display_order` (integer) - Order for display
      - `created_at` (timestamptz)

    - `news`
      - `id` (uuid, primary key)
      - `title_de` (text) - German title
      - `title_it` (text) - Italian title
      - `content_de` (text) - German content
      - `content_it` (text) - Italian content
      - `image_url` (text) - Optional news image
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)

    - `menu_categories`
      - `id` (uuid, primary key)
      - `name_de` (text) - German category name
      - `name_it` (text) - Italian category name
      - `display_order` (integer)
      - `created_at` (timestamptz)

    - `menu_items`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name_de` (text) - German name
      - `name_it` (text) - Italian name
      - `description_de` (text) - German description
      - `description_it` (text) - Italian description
      - `price` (numeric)
      - `image_url` (text) - Optional item image
      - `display_order` (integer)
      - `available` (boolean) - Whether item is available
      - `created_at` (timestamptz)

    - `reservations`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `phone` (text) - Customer phone
      - `date` (date) - Reservation date
      - `time` (time) - Reservation time
      - `guests` (integer) - Number of guests
      - `notes` (text) - Optional notes
      - `status` (text) - pending, confirmed, cancelled
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Gallery, news, menu items, and categories are publicly readable
    - Reservations can be inserted by anyone, readable only by authenticated users
*/

CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title_de text NOT NULL,
  title_it text NOT NULL,
  description_de text DEFAULT '',
  description_it text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_de text NOT NULL,
  title_it text NOT NULL,
  content_de text NOT NULL,
  content_it text NOT NULL,
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_de text NOT NULL,
  name_it text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES menu_categories(id) ON DELETE CASCADE,
  name_de text NOT NULL,
  name_it text NOT NULL,
  description_de text DEFAULT '',
  description_it text DEFAULT '',
  price numeric(10,2) NOT NULL,
  image_url text,
  display_order integer DEFAULT 0,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL,
  notes text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are publicly readable"
  ON gallery_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "News are publicly readable"
  ON news FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Menu categories are publicly readable"
  ON menu_categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Menu items are publicly readable"
  ON menu_items FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create reservations"
  ON reservations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (true);