import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://zflrsfmakpoicnqifztj.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFlMTEyMDlmLTk2ODMtNDVhZS05ZjQxLTMwNmM0MGFlM2E1YSJ9.eyJwcm9qZWN0SWQiOiJ6Zmxyc2ZtYWtwb2ljbnFpZnp0aiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY5ODQwMDAyLCJleHAiOjIwODUyMDAwMDIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.ruQoP2wGJPIjDC5p_hK8sdHwXiCQU4eCoHy3lPiOp_Y';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };