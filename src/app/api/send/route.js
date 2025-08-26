import { Resend } from "resend";
import EmailTemplate from "../../../emails/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  "https://havconinfra.com",
  "https://www.havconinfra.com",
  "https://havcon-infrastructures.vercel.app",
];

// ✅ Utility: build CORS headers dynamically
function getCorsHeaders(origin) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  }
  return {};
}

// ✅ Handle POST request
export async function POST(req) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, phone, company, service, budget, projectDetails } = body;

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL, // verified sender
      to: process.env.TO_EMAIL,     // recipient
      subject: "New Project Inquiry",
      react: EmailTemplate({
        firstname,
        lastname,
        email,
        phone,
        company,
        service,
        budget,
        projectDetails,
      }),
    });

    const headers = getCorsHeaders(req.headers.get("origin"));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch (error) {
    console.error("Resend Error:", error);

    const headers = getCorsHeaders(req.headers.get("origin"));

    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );
  }
}

// ✅ Handle CORS preflight request
export async function OPTIONS(req) {
  const headers = getCorsHeaders(req.headers.get("origin"));

  return new Response(null, {
    status: 204, // No Content
    headers,
  });
}
