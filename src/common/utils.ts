export function debounce(f: any, ms: number) {
  let isCooldown = false;

  return function (this: any, ...args: any[]) {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}
