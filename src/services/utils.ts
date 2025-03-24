export const generateCVU = (): string => {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  const datePart = `${dd}${MM}${yy}${HH}${mm}${ss}`;

  return `000000${datePart}000`;
};
