import { NextResponse } from "next/server";
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

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "https://havconinfra.com", // 👈 allow all (or replace * with your domain)
      },
    });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// ✅ Handle preflight request
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "https://havconinfra.com", // or your domain
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
