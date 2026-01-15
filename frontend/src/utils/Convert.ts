export const Convert = {
  dataQueryToList: (data: any = {}) => {
    const convertList: any = [];
    console.log({ data });
    data?.pages?.forEach((element: any) => {
      if (!element?.tasks) {
        return;
      }
      if (Array.isArray(element.tasks)) {
        convertList.unshift(...element.tasks);
      } else {
        convertList.unshift(element.tasks);
      }
    });
    return [...new Set(convertList)];
  },
};
