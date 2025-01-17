import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = "https://oztjzscfexuysiadcuzp.supabase.co"; // Ersätt med din Supabase-URL
const SUPABASE_ANON_KEY: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dGp6c2NmZXh1eXNpYWRjdXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjY0ODYsImV4cCI6MjA1MjYwMjQ4Nn0.xsfo1W0hJSzYREYoBD3PYN79SuLd_8whoEwTECbQLH8"; // Ersätt med din Anon-nyckel

// Skapa Supabase-klienten
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
