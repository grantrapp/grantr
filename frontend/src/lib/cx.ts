export const cx = (...args: (string | undefined)[]) => {
    return args.filter((a) => a).join(' ');
};
