
const { createClient } = require('@supabase/supabase-js');
const https = require('https');

// Configuración Hardcoded
const SUPABASE_URL = 'https://dpqbvcyeylhxnvkeqakp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcWJ2Y3lleWxoeG52a2VxYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0OTIwOTgsImV4cCI6MjA4MTA2ODA5OH0.VsIBv3l5u_X9fFsdUFmN5SrpI9oRTPSFiQKen4WfAGg';
const BLOGGER_FEED = 'https://feriaagricolamelipilla.blogspot.com/feeds/posts/default?alt=json&max-results=50';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function migrate() {
    try {
        console.log("🚀 Iniciando migración de Blogger (Backend NodeJS)...");

        const json = await fetchJson(BLOGGER_FEED);
        const entries = json.feed.entry || [];

        console.log(`📡 Encontradas ${entries.length} noticias en Blogger.`);

        const newsToInsert = entries.map(entry => {
            let imgUrl = null;
            if (entry.media$thumbnail) {
                imgUrl = entry.media$thumbnail.url.replace(/\/s[0-9]+.*?\//, "/w800-h600-c/");
            }

            let content = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : '');

            // Limpieza básica de HTML para resumen
            let summary = content.replace(/<[^>]*>?/gm, '');
            summary = summary.substring(0, 150) + "...";

            return {
                title: entry.title.$t,
                content: content,
                summary: summary,
                image_url: imgUrl,
                published_at: entry.published.$t,
                is_published: true,
                author: entry.author && entry.author[0] ? entry.author[0].name.$t : 'Feria Melipilla'
            };
        });

        // Insertar en Supabase
        const { data, error } = await supabase
            .from('web_news')
            .insert(newsToInsert)
            .select();

        if (error) {
            console.error("❌ Error Supabase:", error);
        } else {
            console.log(`✅ ÉXITO TOTAL: Se migraron ${data.length} noticias a Supabase.`);
        }

    } catch (err) {
        console.error("❌ Error General:", err);
    }
}

migrate();
