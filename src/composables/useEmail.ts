import type { MaybeRefOrGetter } from "vue";
import type { EmailTemplate } from "@/types";

const emailTemplates: Record<string, EmailTemplate> = {
  help: ({ fullName }: { fullName?: string }) => ({
    subject: "Compy Tracker Help Enquiry",
    body: `Hello,
        
        I have a question about Compy Tracker. Can you help me?
        
        Thank you,
        ${fullName}`,
  }),
  requestAccess: ({ fullName }: { fullName?: string }) => ({
    subject: "Compy Tracker Access Request",
    body: `Hello,
        
        I would like to request access to a different role within Compy Tracker. Can you help me?
        
        Thank you,
        ${fullName}`,
  }),
  contactLearner: ({
    fullName,
    learnerName,
    learnerEmail,
  }: {
    fullName?: string;
    learnerName?: string;
    learnerEmail: string;
  }) => ({
    subject: "Feedback for Compy Tracker",
    body: `Hello ${learnerName},
        
        I have some feedback for you from Compy Tracker. Please see the details below:
        
        Thank you,
        ${fullName}`,
  }),
};

const supportEmail = "help@support.com";

export function useEmail(
  templateName: string,
  params: MaybeRefOrGetter<Parameters<(typeof emailTemplates)[string]>[number]>,
) {
  const template = computed(() =>
    emailTemplates[templateName]?.(unref(toValue(params))),
  );

  const targetEmail = computed(() => {
    const { learnerEmail } = params();
    return learnerEmail ? learnerEmail : supportEmail;
  });

  const url = computed(
    () =>
      `mailto:${targetEmail.value}?subject=${template.value?.subject ?? ""}&body=${encodeURI(template.value?.body ?? "")}`,
  );

  const openEmail = () => window.open(url.value);

  return {
    openEmail,
  };
}
