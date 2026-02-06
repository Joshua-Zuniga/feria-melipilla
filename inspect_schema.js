
const url = 'https://dpqbvcyeylhxnvkeqakp.supabase.co/rest/v1/members?select=*&limit=1';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcWJ2Y3lleWxoeG52a2VxYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0OTIwOTgsImV4cCI6MjA4MTA2ODA5OH0.VsIBv3l5u_X9fFsdUFmN5SrpI9oRTPSFiQKen4WfAGg';

fetch(url, {
    headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
    }
})
    .then(res => res.json())
    .then(data => {
        if (data.length > 0) {
            console.log(Object.keys(data[0]));
        } else {
            console.log("No data found");
        }
    })
    .catch(err => console.error(err));
