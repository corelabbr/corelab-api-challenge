
export function formatDateToBR(dateStr: string): string {
  if (!dateStr) return "";

  if (dateStr.includes("/") && dateStr.includes(",")) {
    return dateStr.split(",")[0]; 
  }

  if (dateStr.includes("/")) {
    return dateStr;
  }

  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return "";

  return `${day}/${month}/${year}`;
}