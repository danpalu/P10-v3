export function newQuestion(
  id: number,
  title: string,
  type: "chat" | "text"
): Question {
  return {
    id: id,
    title: title,
    type: type,
    answer: { answer: "", summary: "" },
  };
}
