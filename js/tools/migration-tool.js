
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuración (Hardcoded solo para este script temporal)
const SUPABASE_URL = 'https://dpqbvcyeylhxnvkeqakp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcWJ2Y3lleWxoeG52a2VxYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0OTIwOTgsImV4cCI6MjA4MTA2ODA5OH0.VsIBv3l5u_X9fFsdUFmN5SrpI9oRTPSFiQKen4WfAGg';
const BLOGGER_FEED = 'https://feriaagricolamelipilla.blogspot.com/feeds/posts/default?alt=json&max-results=50';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("🚀 Iniciando migración de Blogger a Supabase...");

async function migrate() {
    try {
        // 1. Obtener datos de Blogger
        const response = await fetch(BLOGGER_FEED);
        const json = await response.json();
        const entries = json.feed.entry || [];

        console.log(`📡 Encontradas ${entries.length} noticias en Blogger.`);

        const newsToInsert = entries.map(entry => {
            // Extraer imagen
            let imgUrl = null;
            if (entry.media$thumbnail) {
                // Blogger da miniaturas sq default (/s72-c/), cambiamos a resoluciómn media
                imgUrl = entry.media$thumbnail.url.replace(/\/s[0-9]+.*?\//, "/w800-h600-c/");
            }

            // Limpiar contenido (Básico)
            let content = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');

            // Extraer un resumen plano
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            let summary = tempDiv.textContent || tempDiv.innerText || "";
            summary = summary.substring(0, 150) + "...";

            return {
                title: entry.title.$t,
                content: content,
                summary: summary,
                image_url: imgUrl,
                published_at: entry.published.$t,
                is_published: true,
                author: entry.author[0].name.$t || 'Feria Melipilla'
            };
        });

        // 2. Insertar en Supabase
        const { data, error } = await supabase
            .from('web_news')
            .insert(newsToInsert)
            .select();

        if (error) {
            console.error("❌ Error Supabase:", error);
        } else {
            console.log(`✅ ÉXITO: Se migraron ${data.length} noticias correctamente a la tabla 'web_news'.`);
            console.log("🔄 Recarga la página para verlas.");
        }

    } catch (err) {
        console.error("❌ Error General:", err);
    }
}

migrate();
