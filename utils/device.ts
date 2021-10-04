const getDeviceSize = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window !== 'undefined') {
    const size = document.documentElement.clientWidth;
    if (size < 640) return 'mobile';
    else if (size < 1120) return 'tablet';
  }
  return 'desktop';
};

export {
  getDeviceSize,
};
