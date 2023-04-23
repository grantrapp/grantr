export const cx = (...arguments_: (string | undefined)[]) => {
    return arguments_.filter((a) => a).join(' ');
};
