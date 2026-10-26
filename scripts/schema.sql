CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text UNIQUE NOT NULL, password_hash text NOT NULL, name text NOT NULL, phone text, role text NOT NULL DEFAULT 'guest' CHECK (role IN ('guest','manager','admin')), admin_notes text, created_at timestamptz NOT NULL DEFAULT now(), last_login_at timestamptz);
CREATE TABLE IF NOT EXISTS rooms (slug text PRIMARY KEY, name text NOT NULL, sort int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS bookings (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), ref text UNIQUE NOT NULL, user_id uuid REFERENCES users(id) ON DELETE SET NULL, guest_name text NOT NULL, guest_email text, guest_phone text, kind text NOT NULL CHECK (kind IN ('room','house')), room_slugs text[] NOT NULL DEFAULT '{}', check_in date NOT NULL, check_out date NOT NULL, adults int NOT NULL DEFAULT 2, children int NOT NULL DEFAULT 0, pets int NOT NULL DEFAULT 0, status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','confirmed','declined','cancelled','completed')), source text NOT NULL DEFAULT 'web' CHECK (source IN ('web','manual')), guest_notes text, admin_notes text, amount numeric(10,2), advance_paid numeric(10,2) NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), CHECK (check_out > check_in));
CREATE TABLE IF NOT EXISTS blocked_dates (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), room_slug text REFERENCES rooms(slug) ON DELETE CASCADE, start_date date NOT NULL, end_date date NOT NULL, reason text, created_at timestamptz NOT NULL DEFAULT now(), CHECK (end_date >= start_date));
CREATE TABLE IF NOT EXISTS rates (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), kind text NOT NULL CHECK (kind IN ('room','house')), label text NOT NULL DEFAULT 'Standard', weekday numeric(10,2) NOT NULL, weekend numeric(10,2) NOT NULL, valid_from date, valid_to date, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS enquiries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, phone text NOT NULL, email text, check_in date, check_out date, adults int, children int, kind text, message text, status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','replied','closed')), admin_notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS booking_events (id bigserial PRIMARY KEY, booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE, actor_id uuid REFERENCES users(id) ON DELETE SET NULL, action text NOT NULL, note text, created_at timestamptz NOT NULL DEFAULT now());
INSERT INTO rooms (slug, name, sort) VALUES ('neem','Neem',1),('tamarind','Tamarind',2),('jamun','Jamun',3),('amla','Amla',4) ON CONFLICT (slug) DO NOTHING;
CREATE TABLE IF NOT EXISTS password_resets (token text PRIMARY KEY, user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at timestamptz NOT NULL, used_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS settings (key text PRIMARY KEY, value text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
INSERT INTO settings (key, value) VALUES ('calendar_token', md5(random()::text)) ON CONFLICT (key) DO NOTHING;

-- 2026-10-26: manager role (run once on existing DBs)
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('guest','manager','admin'));

-- 2026-10-26: invoices (GST tax invoices; numbers assigned only on issue, sequential per financial year)
CREATE TABLE IF NOT EXISTS invoice_counters (fy text PRIMARY KEY, last int NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text UNIQUE,
  public_token text UNIQUE NOT NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','issued','cancelled')),
  invoice_date date NOT NULL DEFAULT CURRENT_DATE,
  bill_name text NOT NULL, bill_phone text, bill_email text, bill_address text, bill_gstin text, bill_state text,
  tax_inclusive boolean NOT NULL DEFAULT true,
  amount_paid numeric(12,2) NOT NULL DEFAULT 0,
  notes text,
  seller jsonb,
  subtotal numeric(12,2), cgst numeric(12,2), sgst numeric(12,2), round_off numeric(12,2), total numeric(12,2),
  cancel_reason text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  issued_at timestamptz, cancelled_at timestamptz
);
CREATE TABLE IF NOT EXISTS invoice_items (
  id bigserial PRIMARY KEY,
  invoice_id uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  sort int NOT NULL DEFAULT 0,
  description text NOT NULL, sac text, qty numeric(10,2) NOT NULL DEFAULT 1, unit text, rate numeric(12,2) NOT NULL DEFAULT 0,
  tax_rate numeric(5,2) NOT NULL DEFAULT 5 CHECK (tax_rate IN (0,5,12,18,28))
);
CREATE INDEX IF NOT EXISTS invoices_booking_idx ON invoices(booking_id);
