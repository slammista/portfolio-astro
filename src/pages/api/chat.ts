export const prerender = false;

import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Sei un assistente AI addestrato sul profilo di Matteo Aslam, Data & BI Professional.
Rispondi in italiano in modo professionale ma conciso.
Informazioni chiave:
- Ruolo: Data & BI Professional
- Location: Roma, Italia
- Certificazione: PL-300 Microsoft
- Esperienza: 2+ anni
- Clienti: Toyota (Proxima Group), Vodafone (Origin Srl), RAI/SIAE (Comit Srl)
- Competenze: Power BI, DAX, SQL Server, Oracle PL/SQL, Talend, Python, GCP, Azure, ElasticSearch
- Obiettivo: posizioni Senior Data Analyst / Data Science
- Disponibile per nuove opportunità.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const userMessage = body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return new Response(JSON.stringify({ error: "Messaggio mancante" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = msg.content[0].type === "text" ? msg.content[0].text : "Errore nella risposta.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Errore server" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
