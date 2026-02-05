
// Cliente Supabase para Feria Agrícola Web
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://dpqbvcyeylhxnvkeqakp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcWJ2Y3lleWxoeG52a2VxYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0OTIwOTgsImV4cCI6MjA4MTA2ODA5OH0.VsIBv3l5u_X9fFsdUFmN5SrpI9oRTPSFiQKen4WfAGg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
