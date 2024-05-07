

export default function updateByValue(data, updatedData){
  return data.map(d => {
    if (d.id === updatedData.id) {
      return { ...d, ...updatedData };
    }
    return d;
  });
};