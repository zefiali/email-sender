import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../emails/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: process.env.FROM_EMAIL, // 👈 use your verified sender
      to: process.env.TO_EMAIL,  // 👈 your recipient
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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
