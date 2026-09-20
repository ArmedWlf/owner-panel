// نمایش اعداد پولی به تومان با جداکننده هزارگان و ارقام فارسی
export function formatToman(value) {
  const num = Number(value || 0);
  return new Intl.NumberFormat('fa-IR').format(num);
}
