import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

class HandleFinanceiro {
    dateDifference(date1: number | Date | any, date2: number | Date | any) {
        const diffInMilliseconds = Math.abs(date2 - date1);
        const diffInSeconds = diffInMilliseconds / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        const diffInMonths = diffInDays / 30.436875;
        const diffInYears = diffInMonths / 12;
        return {
            diffInMilliseconds,
            diffInSeconds,
            diffInMinutes,
            diffInHours,
            diffInDays,
            diffInMonths,
            diffInYears
        };
    };
    newData() {
        const data = new Date()
        return data.toISOString()
    };
    formatDate(date: string) {
        return format(parseISO(date), "dd ' ' MMM ' ' yyyy ' ' HH:mm'h'", {
            locale: ptBR
        })
    };
}

export { HandleFinanceiro }