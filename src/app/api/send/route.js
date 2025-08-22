import { Resend } from "resend";
import EmailTemplate from "../../../emails/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Handle POST request
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      firstname,
      lastname,
      email,
      phone,
      company,
      service,
      budget,
      projectDetails,
    } = body;

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL, // verified sender
      to: process.env.TO_EMAIL,     // recipient
      subject: "New Project Inquiry",
      react: (
        <EmailTemplate
          firstname={firstname}
          lastname={lastname}
          email={email}
          phone={phone}
          company={company}
          service={service}
          budget={budget}
          projectDetails={projectDetails}
        />
      ),
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://havconinfra.com", // 👈 your domain
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Resend Error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://havconinfra.com",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

// ✅ Handle CORS preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "https://havconinfra.com", // 👈 your domain
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
