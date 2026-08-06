export const CHAT_LANGUAGE_PREFERENCES = ["auto", "en", "es"] as const;

export type ChatLanguagePreference =
  (typeof CHAT_LANGUAGE_PREFERENCES)[number];
export type ChatUiLanguage = "en" | "es";

export function isChatLanguagePreference(
  value: unknown,
): value is ChatLanguagePreference {
  return (
    typeof value === "string" &&
    (CHAT_LANGUAGE_PREFERENCES as readonly string[]).includes(value)
  );
}

export function chatUiLanguage(
  preference: ChatLanguagePreference,
): ChatUiLanguage {
  return preference === "es" ? "es" : "en";
}

export const CHAT_UI_COPY = {
  en: {
    assistant: "Assistant",
    officialInformation: "Official information",
    today: "Today",
    welcome:
      "Hi! I can help you find approved information from MentorMe North Georgia about mentoring programs, volunteering, enrollment, and more. What would you like help with?",
    languageSelector: "Response language",
    languageLabel: "Language",
    languageAuto: "Auto",
    languageEnglish: "English",
    languageSpanish: "Español",
    restart: "Restart conversation",
    minimize: "Minimize chat",
    close: "Close chat",
    typing: "Assistant is looking through approved sources",
    privacy:
      "Please do not share Social Security numbers, bank information, medical details, passwords, or private documents in this chat.",
    inputLabel: "Ask the MentorMe information assistant",
    inputPlaceholder: "Ask about programs, volunteering, or enrollment...",
    send: "Send message",
    groundingNote: "Answers require a confirmed official source.",
    suggestedQuestions: "Suggested questions",
    sources: "Sources",
    officialSources: "Official sources",
    viewSource: "View on the MentorMe website",
    assistantMessage: "Assistant message",
    userMessage: "Your message",
    invalidLong:
      "That message is too long to send. Please shorten it and try again.",
    invalidMessage:
      "The chat control could not read that message. Please type your question in the message box and try again.",
    unavailable:
      "The information assistant is temporarily unavailable. Please try again in a moment. If you still need help, contact MentorMe at (678) 341-8028 or use the contact page.",
    sensitiveReplacement: "Sensitive information was not sent.",
    resize:
      "Resize chat. Drag the corner, or use arrow keys while focused.",
    quickActions: [
      { label: "Become a mentor", question: "How do I become a mentor?" },
      {
        label: "Enroll a child",
        question: "How do I enroll my child in a mentoring program?",
      },
      { label: "Our programs", question: "What mentoring programs do you offer?" },
      {
        label: "Volunteer requirements",
        question: "What are the requirements to volunteer as a mentor?",
      },
      {
        label: "Upcoming events",
        question: "What upcoming events does MentorMe have?",
      },
      {
        label: "Contact & locations",
        question: "What are MentorMe's contact information and locations?",
      },
    ],
  },
  es: {
    assistant: "Asistente",
    officialInformation: "Información oficial",
    today: "Hoy",
    welcome:
      "¡Hola! Puedo ayudarte a encontrar información aprobada de MentorMe North Georgia sobre programas de mentoría, voluntariado, inscripción y más. ¿En qué puedo ayudarte?",
    languageSelector: "Idioma de respuesta",
    languageLabel: "Idioma",
    languageAuto: "Auto",
    languageEnglish: "English",
    languageSpanish: "Español",
    restart: "Reiniciar conversación",
    minimize: "Minimizar chat",
    close: "Cerrar chat",
    typing: "El asistente está consultando fuentes aprobadas",
    privacy:
      "No compartas números de Seguro Social, información bancaria, datos médicos, contraseñas ni documentos privados en este chat.",
    inputLabel: "Pregúntale al asistente de información de MentorMe",
    inputPlaceholder: "Pregunta sobre programas, voluntariado o inscripción...",
    send: "Enviar mensaje",
    groundingNote: "Las respuestas requieren una fuente oficial confirmada.",
    suggestedQuestions: "Preguntas sugeridas",
    sources: "Fuentes",
    officialSources: "Fuentes oficiales",
    viewSource: "Ver en el sitio web de MentorMe",
    assistantMessage: "Mensaje del asistente",
    userMessage: "Tu mensaje",
    invalidLong:
      "Ese mensaje es demasiado largo. Acórtalo e inténtalo de nuevo.",
    invalidMessage:
      "El chat no pudo leer ese mensaje. Escribe tu pregunta en el cuadro e inténtalo de nuevo.",
    unavailable:
      "El asistente de información no está disponible temporalmente. Inténtalo de nuevo en un momento. Si aún necesitas ayuda, llama a MentorMe al (678) 341-8028 o usa la página de contacto.",
    sensitiveReplacement: "La información confidencial no se envió.",
    resize:
      "Cambiar el tamaño del chat. Arrastra la esquina o usa las flechas del teclado.",
    quickActions: [
      {
        label: "Ser mentor",
        question: "¿Cómo puedo convertirme en mentor?",
      },
      {
        label: "Inscribir a un niño",
        question: "¿Cómo inscribo a mi hijo en un programa de mentoría?",
      },
      {
        label: "Nuestros programas",
        question: "¿Qué programas de mentoría ofrecen?",
      },
      {
        label: "Requisitos de voluntariado",
        question: "¿Cuáles son los requisitos para ser mentor voluntario?",
      },
      {
        label: "Próximos eventos",
        question: "¿Qué próximos eventos tiene MentorMe?",
      },
      {
        label: "Contacto y ubicaciones",
        question: "¿Cuáles son la información de contacto y las ubicaciones de MentorMe?",
      },
    ],
  },
} as const;
