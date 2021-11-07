export const file2Base64 = (blob: any): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result?.toString() ?? '');
    reader.readAsDataURL(blob);
  });
};
