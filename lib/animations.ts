export const container = {
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};

export const container4 = {
  initial: {},
  show: {
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

export const container5 = {
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

export const frame = {
  initial: { x: "-100%" },
  show: {
    x: "100%",
    transition: { duration: 0.5 },
  },
};

export const commentSection = {
  initial: { opacity: 0, y: "50%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { delay: 1, duration: 0.5 },
  },
};

export const productShow = {
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.2 },
  },
};

export const burgerMenu = {
  initial: { opacity: 0, x: "-100%" },
  show: {
    opacity: 1,
    x: "0%",
    transition: { duration: 0.25 },
  },
  exit: { opacity: 0, x: "-100%" },
};

export const container3 = {
  initial: {},
  show: {
    transition: { staggerChildren: 0.3, when: "beforeChildren", delay: 1 },
  },
  exit: { opacity: 0, x: "-50%" },
};

export const container2 = {
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren" },
  },
};

export const slideUp = {
  initial: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55 },
  },
};

export const show = {
  initial: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
};

export const headerSlide = {
  initial: { x: "-100%" },
  show: { x: "0%", transition: { duration: 0.6, delay: 0.5 } },
};

export const show2 = {
  initial: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, delay: 0.35 } },
};

export const show3 = {
  initial: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export const slideRight = {
  initial: { opacity: 0, x: "-50%" },
  show: { opacity: 1, x: "0%", transition: { duration: 0.35, delay: 0.5 } },
};

export const scaleDown = {
  initial: { opacity: 0, scale: 1.2 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.6 } },
};

export const slideDown = {
  initial: { y: "-80%", x: "-50%", opacity: 0 },
  show: {
    y: "-60%",
    x: "-50%",
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    y: "-75%",
    x: "-50%",
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const loginContainer = {
  initial: { opacity: 0, y: "-50%", x: "-50%", scale: "40%" },
  show: {
    opacity: 1,
    y: "-50%",
    x: "-50%",
    scale: "100%",
    transition: { when: "beforeChildren", duration: 0.4 },
  },
  exit: { opacity: 0, y: "0%", x: "-50%", transition: { duration: 0.3 } },
};

export const loginChildren = {
  initial: { opacity: 0, x: "-30%" },
  show: {
    opacity: 1,
    x: "0%",
    transition: { duration: 0.4 },
  },
};

export const productAnim = {
  initial: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export const header = {
  initial: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.25 } },
};

export const header2 = {
  initial: { y: "-100%" },
  show: { y: "0%", transition: { duration: 0.25 } },
};

export const payment = {
  initial: { opacity: 0, y: "-10%" },
  show: { opacity: 1, y: "0%", transition: { duration: 0.3 } },
  exit: { opacity: 0, y: "-10%", transition: { duration: 0.5 } },
};
