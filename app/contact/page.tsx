"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/Button";
import { FadeInView } from "@/components/FadeInView";
import { FormInput } from "@/components/FormInput";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { TextArea } from "@/components/TextArea";
import { content } from "@/data/content";
// Fix: Correct import path for server action
import { submitContactForm } from "@/lib/action";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Prepare data object for server action
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("subject", formData.subject);
      dataToSend.append("message", formData.message);
      dataToSend.append("subject", ""); // Optional subject

      const response = await submitContactForm(null, dataToSend);

      if (response && response.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: response?.error || "Failed to send message. Please try again.",
        }));
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrors((prev) => ({
        ...prev,
        submit: "An unexpected error occurred.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="py-16 sm:py-24">
      <PageHeader title="Contact" subtitle={content.contact.subtitle} />

      <FadeInView className="mx-auto max-w-xl">
        {submitted ? (
          <div
            className="rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950/30"
            role="status"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mx-auto mb-4 h-10 w-10 text-green-600 dark:text-green-400"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="text-lg font-medium text-green-800 dark:text-green-200">
              {content.contact.successMessage}
            </p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {errors.submit && (
              <p className="text-sm font-medium text-red-600 dark:text-red-400 text-center">
                {errors.submit}
              </p>
            )}
            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
              placeholder="Your full name"
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
              required
            />
            <FormInput
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Project Inquiry / Feedback..."
            />
            <TextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              error={errors.message}
              placeholder="Tell me about your project or question..."
              required
            />
            <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Or reach me directly at{" "}
          <a
            href={`mailto:${content.contact.email}`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {content.contact.email}
          </a>
        </p>
      </FadeInView>
    </Section>
  );
}
