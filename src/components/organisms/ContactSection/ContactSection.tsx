import { startTransition, useState } from "react";

import { contactMethods } from "../../../data/site";

import ContactField from "./subcomponents/ContactField";
import ContactMethodCard from "./subcomponents/ContactMethodCard";
import SectionReveal from "../../molecules/SectionReveal";
import SectionHeading from "../../molecules/SectionHeading";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const ContactSection = (): React.JSX.Element => {
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
      className="section-shell pb-20"
      id="contact"
      style={{
        containIntrinsicSize: "1px 960px",
        contentVisibility: "auto",
      }}
    >
      <div className="section-inner">
        <SectionReveal>
          <SectionHeading
            description="If you need frontend help on a product that should feel sharper, faster, and more memorable than the default, I'm always open to the right conversation."
            eyebrow="Contact"
            title="Let's shape something with real presence."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.92fr)]">
            <div className="surface-panel rounded-[2.3rem] p-6 sm:p-7">
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
                  className="mt-3 inline-flex items-center justify-center rounded-full border border-[rgba(255,122,170,0.32)] bg-[linear-gradient(135deg,rgba(255,74,138,0.94),rgba(126,76,255,0.94))] px-5 py-3 text-sm font-medium tracking-[0.08em] text-white shadow-[0_20px_60px_rgba(111,52,255,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
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
                      ? "text-[rgba(150,255,220,0.92)]"
                      : "text-[rgba(255,178,199,0.92)]"
                  }`}
                >
                  {submission.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-6">
              <div className="surface-panel rounded-4xl p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[rgba(255,170,204,0.82)]">
                  Best fit
                </p>
                <p className="mt-3 text-lg leading-8 text-white">
                  Product-focused frontend roles, design-system work,
                  interaction refinement, and ambitious portfolio or marketing
                  experiences.
                </p>
              </div>

              <div className="grid gap-4">
                {contactMethods.map((method) => (
                  <ContactMethodCard key={method.label} method={method} />
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default ContactSection;
