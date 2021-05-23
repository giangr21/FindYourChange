export function getWeekDayName(weekDay: number): string {
    switch (weekDay) {
        case 1:
            return 'Segunda-Feira';
        case 2:
            return 'Terca-Feira';
        case 3:
            return 'Quarta-Feira';
        case 4:
            return 'Quinta-Feira';
        case 5:
            return 'Sexta-Feira';
        case 6:
            return 'Sabado';
        default:
            return 'Segunda-Feira';
    }
}
