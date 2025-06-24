
export const arrangeDaysName = (days) => {
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.sort((a,b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
    return days
}