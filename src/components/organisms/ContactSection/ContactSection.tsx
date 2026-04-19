import { startTransition, useState } from "react";

import { contactMethods } from "../../../data/site";

import ContactField from "./subcomponents/ContactField";
import ContactMethodCard from "./subcomponents/ContactMethodCard";
import SectionHeading from "../../molecules/SectionHeading";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const ContactSection = (): JSX.Element => {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setSubmission({ status: "submitting" });

    try {
      const response = await fetch("https://formspree.io/f/xnqejzjk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`form submission failed: ${response.status}`);
      }

      event.currentTarget.reset();
      startTransition(() => {
        setSubmission({
          status: "success",
          message: "Thanks, your message has been sent.",
        });
      });
    } catch {
      startTransition(() => {
        setSubmission({
          status: "error",
          message: "Something went wrong while sending your message.",
        });
      });
    }
  };

  return (
    <section
      className="px-4 py-8 scroll-mt-28 sm:px-6 lg:px-8"
      id="contact"
      style={{
        containIntrinsicSize: "1px 960px",
        contentVisibility: "auto",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          description="If you’re building a product and want a frontend partner who cares about both implementation quality and interface feel, I’d love to talk."
          eyebrow="Contact"
          title="Let's build something thoughtful together."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
          <div className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-[0_24px_90px_rgba(4,10,24,0.28)] backdrop-blur-xl">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <ContactField
                label="Name"
                name="name"
                placeholder="Your name"
                required
              />
              <ContactField
                label="Email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
              <ContactField
                label="Message"
                multiline
                name="message"
                placeholder="Tell me a little about the product or role."
                required
              />
              <button
                className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-brand-300 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={submission.status === "submitting"}
                type="submit"
              >
                {submission.status === "submitting"
                  ? "Sending..."
                  : "Send message"}
              </button>
            </form>

            {submission.status === "success" ||
            submission.status === "error" ? (
              <p
                className={`mt-4 text-sm ${
                  submission.status === "success"
                    ? "text-mint-300"
                    : "text-rose-300"
                }`}
              >
                {submission.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4">
              {contactMethods.map((method) => (
                <ContactMethodCard key={method.label} method={method} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
