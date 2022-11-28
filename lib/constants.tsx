const BREAKPOINTS = {
  mobileMax: 550,
  tabletMax: 1100,
  laptopMax: 1500,
};

export const QUERIES = {
  mobileAndDown: `(max-width: ${BREAKPOINTS.mobileMax}px)`,
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax}px)`,
  laptopAndDown: `(max-width: ${BREAKPOINTS.laptopMax}px)`,
};
