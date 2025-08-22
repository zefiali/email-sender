import React from "react";
import {
  Tailwind,
  Html,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from "@react-email/components";

export default function EmailTemplate({
  firstname,
  lastname,
  email,
  phone,
  company,
  service,
  budget,
  projectDetails,
}) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-50 text-gray-800">
          <Container className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto shadow-md">
            <Heading className="text-2xl font-bold text-center text-red-800">
              New Project Inquiry
            </Heading>

            <Section className="mt-4">
              <Text className="mb-2">
                <strong>Name:</strong> {firstname} {lastname}
              </Text>
              <Text className="mb-2">
                <strong>Email:</strong> {email}
              </Text>
              {phone && (
                <Text className="mb-2">
                  <strong>Phone:</strong> {phone}
                </Text>
              )}
              {company && (
                <Text className="mb-2">
                  <strong>Company:</strong> {company}
                </Text>
              )}
              {service && (
                <Text className="mb-2">
                  <strong>Service Interested In:</strong> {service}
                </Text>
              )}
              {budget && (
                <Text className="mb-2">
                  <strong>Project Budget:</strong> {budget}
                </Text>
              )}
              <Text className="mb-2">
                <strong>Project Details:</strong>
              </Text>
              <Text className="bg-gray-100 p-3 rounded">{projectDetails}</Text>
            </Section>

            <Section className="mt-6 text-center text-gray-500 text-sm">
              <Text>Sent via Company Website Contact Form</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
