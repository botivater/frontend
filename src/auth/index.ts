/* eslint-disable import/prefer-default-export */

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await new Promise((resolve) => { setTimeout(resolve, 100); });

    return true;
  } catch (e) {
    return false;
  }
};
