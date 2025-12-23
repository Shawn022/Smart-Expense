export const monthlyTotals = (expenses)=>{
    const map={};

    expenses.forEach((exp)=>{
        const month = new Date(exp.date).toLocaleString("default", {month:"short"});

        map[month] = (map[month] || 0) +exp.amount;
    });

    return Object.keys(map).map((month) => ({
        month,
        amount: map[month]
    }));
}