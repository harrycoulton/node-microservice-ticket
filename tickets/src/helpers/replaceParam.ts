export const replaceParam = (routeConst: string, targetParam: string, value: string | number): string => {
    return routeConst.replace(':' + targetParam, value.toString());
}